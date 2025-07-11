import { eq, desc, asc, count, sql } from "drizzle-orm";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import {
  ICollectionQueryRepository,
  CollectionQueryOptions,
  PaginatedQueryResult,
  CollectionQueryResultDTO,
  CollectionSortField,
  SortOrder,
} from "../../domain/ICollectionQueryRepository";
import {
  collections,
  collectionCards,
} from "./schema/collection.sql";
import { CollectionMapper } from "./mappers/CollectionMapper";

export class DrizzleCollectionQueryRepository implements ICollectionQueryRepository {
  constructor(private db: PostgresJsDatabase) {}

  async findByCreator(
    curatorId: string,
    options: CollectionQueryOptions
  ): Promise<PaginatedQueryResult<CollectionQueryResultDTO>> {
    try {
      const { page, limit, sortBy, sortOrder } = options;
      const offset = (page - 1) * limit;

      // Build the sort order
      const orderDirection = sortOrder === SortOrder.ASC ? asc : desc;

      // Simple query: get collections with their stored card counts
      const collectionsQuery = this.db
        .select({
          id: collections.id,
          name: collections.name,
          description: collections.description,
          createdAt: collections.createdAt,
          updatedAt: collections.updatedAt,
          authorId: collections.authorId,
          cardCount: collections.cardCount,
        })
        .from(collections)
        .where(eq(collections.authorId, curatorId))
        .orderBy(orderDirection(this.getSortColumn(sortBy)))
        .limit(limit)
        .offset(offset);

      const collectionsResult = await collectionsQuery;

      // Get total count
      const totalCountResult = await this.db
        .select({ count: count() })
        .from(collections)
        .where(eq(collections.authorId, curatorId));

      const totalCount = totalCountResult[0]?.count || 0;
      const hasMore = offset + collectionsResult.length < totalCount;

      // Map to DTOs
      const items = collectionsResult.map((raw) =>
        CollectionMapper.toQueryResult({
          id: raw.id,
          name: raw.name,
          description: raw.description,
          createdAt: raw.createdAt,
          updatedAt: raw.updatedAt,
          authorId: raw.authorId,
          cardCount: raw.cardCount,
        })
      );

      return {
        items,
        totalCount,
        hasMore,
      };
    } catch (error) {
      console.error("Error in findByCreator:", error);
      throw error;
    }
  }

  private getSortColumn(sortBy: CollectionSortField) {
    switch (sortBy) {
      case CollectionSortField.NAME:
        return collections.name;
      case CollectionSortField.CREATED_AT:
        return collections.createdAt;
      case CollectionSortField.UPDATED_AT:
        return collections.updatedAt;
      case CollectionSortField.CARD_COUNT:
        return collections.cardCount;
      default:
        return collections.updatedAt;
    }
  }
}
