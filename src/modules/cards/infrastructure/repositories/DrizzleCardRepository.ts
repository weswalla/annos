import { eq, and } from "drizzle-orm";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { ICardRepository } from "../../domain/ICardRepository";
import { Card } from "../../domain/Card";
import { CardId } from "../../domain/value-objects/CardId";
import { cards } from "./schema/card.sql";
import { libraryMemberships } from "./schema/libraryMembership.sql";
import { publishedRecords } from "./schema/publishedRecord.sql";
import { CardDTO, CardMapper } from "./mappers/CardMapper";
import { Result, ok, err } from "../../../../shared/core/Result";
import { URL } from "../../domain/value-objects/URL";

export class DrizzleCardRepository implements ICardRepository {
  constructor(private db: PostgresJsDatabase) {}

  async findById(id: CardId): Promise<Result<Card | null>> {
    try {
      const cardId = id.getStringValue();

      const cardResult = await this.db
        .select()
        .from(cards)
        .where(eq(cards.id, cardId))
        .limit(1);

      if (cardResult.length === 0) {
        return ok(null);
      }

      const result = cardResult[0];
      if (!result) {
        return ok(null);
      }

      // Get library memberships for this card with published record details
      const membershipResults = await this.db
        .select({
          userId: libraryMemberships.userId,
          addedAt: libraryMemberships.addedAt,
          publishedRecordUri: publishedRecords.uri,
          publishedRecordCid: publishedRecords.cid,
        })
        .from(libraryMemberships)
        .leftJoin(
          publishedRecords,
          eq(libraryMemberships.publishedRecordId, publishedRecords.id)
        )
        .where(eq(libraryMemberships.cardId, cardId));

      // Get original published record if it exists
      let originalPublishedRecord = null;
      if (result.originalPublishedRecordId) {
        const originalRecordResult = await this.db
          .select({
            uri: publishedRecords.uri,
            cid: publishedRecords.cid,
          })
          .from(publishedRecords)
          .where(eq(publishedRecords.id, result.originalPublishedRecordId))
          .limit(1);

        if (originalRecordResult.length > 0) {
          originalPublishedRecord = originalRecordResult[0];
        }
      }

      const cardDTO: CardDTO = {
        id: result.id,
        type: result.type,
        contentData: result.contentData,
        url: result.url || undefined,
        parentCardId: result.parentCardId || undefined,
        originalPublishedRecordId: originalPublishedRecord
          ? {
              uri: originalPublishedRecord.uri,
              cid: originalPublishedRecord.cid,
            }
          : undefined,
        libraryCount: result.libraryCount ?? 0,
        libraryMemberships: membershipResults.map((membership) => ({
          userId: membership.userId,
          addedAt: membership.addedAt,
          publishedRecordId:
            membership.publishedRecordUri && membership.publishedRecordCid
              ? {
                  uri: membership.publishedRecordUri,
                  cid: membership.publishedRecordCid,
                }
              : undefined,
        })),
        createdAt: result.createdAt,
        updatedAt: result.updatedAt,
      };

      const domainResult = CardMapper.toDomain(cardDTO);
      if (domainResult.isErr()) {
        return err(domainResult.error);
      }

      return ok(domainResult.value);
    } catch (error) {
      return err(error as Error);
    }
  }

  async save(card: Card): Promise<Result<void>> {
    try {
      const {
        card: cardData,
        libraryMemberships: membershipData,
        originalPublishedRecord,
        membershipPublishedRecords,
      } = CardMapper.toPersistence(card);

      await this.db.transaction(async (tx) => {
        // Handle original published record if it exists
        let originalPublishedRecordId: string | undefined = undefined;

        if (originalPublishedRecord) {
          const originalRecordResult = await tx
            .insert(publishedRecords)
            .values({
              id: originalPublishedRecord.id,
              uri: originalPublishedRecord.uri,
              cid: originalPublishedRecord.cid,
              recordedAt: originalPublishedRecord.recordedAt || new Date(),
            })
            .onConflictDoNothing({
              target: [publishedRecords.uri, publishedRecords.cid],
            })
            .returning({ id: publishedRecords.id });

          if (originalRecordResult.length === 0) {
            const existingRecord = await tx
              .select()
              .from(publishedRecords)
              .where(
                and(
                  eq(publishedRecords.uri, originalPublishedRecord.uri),
                  eq(publishedRecords.cid, originalPublishedRecord.cid)
                )
              )
              .limit(1);

            if (existingRecord.length > 0) {
              originalPublishedRecordId = existingRecord[0]!.id;
            }
          } else {
            originalPublishedRecordId = originalRecordResult[0]!.id;
          }
        }

        // Handle membership published records
        const membershipPublishedRecordMap = new Map<string, string>();
        if (membershipPublishedRecords) {
          for (const membershipRecord of membershipPublishedRecords) {
            const membershipRecordResult = await tx
              .insert(publishedRecords)
              .values({
                id: membershipRecord.id,
                uri: membershipRecord.uri,
                cid: membershipRecord.cid,
                recordedAt: membershipRecord.recordedAt || new Date(),
              })
              .onConflictDoNothing({
                target: [publishedRecords.uri, publishedRecords.cid],
              })
              .returning({ id: publishedRecords.id });

            let actualRecordId: string;
            if (membershipRecordResult.length === 0) {
              const existingRecord = await tx
                .select()
                .from(publishedRecords)
                .where(
                  and(
                    eq(publishedRecords.uri, membershipRecord.uri),
                    eq(publishedRecords.cid, membershipRecord.cid)
                  )
                )
                .limit(1);

              if (existingRecord.length > 0) {
                actualRecordId = existingRecord[0]!.id;
              } else {
                actualRecordId = membershipRecord.id;
              }
            } else {
              actualRecordId = membershipRecordResult[0]!.id;
            }

            membershipPublishedRecordMap.set(
              membershipRecord.id,
              actualRecordId
            );
          }
        }

        // Upsert the card
        await tx
          .insert(cards)
          .values({
            ...cardData,
            originalPublishedRecordId: originalPublishedRecordId,
          })
          .onConflictDoUpdate({
            target: cards.id,
            set: {
              type: cardData.type,
              contentData: cardData.contentData,
              url: cardData.url,
              parentCardId: cardData.parentCardId,
              originalPublishedRecordId: originalPublishedRecordId,
              libraryCount: cardData.libraryCount,
              updatedAt: cardData.updatedAt,
            },
          });

        // Handle library memberships - replace all memberships
        await tx
          .delete(libraryMemberships)
          .where(eq(libraryMemberships.cardId, cardData.id));

        if (membershipData.length > 0) {
          const membershipDataWithMappedRecords = membershipData.map(
            (membership) => ({
              cardId: membership.cardId,
              userId: membership.userId,
              addedAt: membership.addedAt,
              publishedRecordId: membership.publishedRecordId
                ? membershipPublishedRecordMap.get(
                    membership.publishedRecordId
                  ) || membership.publishedRecordId
                : null,
            })
          );

          await tx
            .insert(libraryMemberships)
            .values(membershipDataWithMappedRecords);
        }
      });

      return ok(undefined);
    } catch (error) {
      return err(error as Error);
    }
  }

  async delete(cardId: CardId): Promise<Result<void>> {
    try {
      const id = cardId.getStringValue();
      await this.db.delete(cards).where(eq(cards.id, id));
      return ok(undefined);
    } catch (error) {
      return err(error as Error);
    }
  }

  async findUrlCardByUrl(url: URL): Promise<Result<Card | null>> {
    try {
      const urlValue = url.value;

      const cardResult = await this.db
        .select()
        .from(cards)
        .where(and(eq(cards.url, urlValue), eq(cards.type, "URL")))
        .limit(1);

      if (cardResult.length === 0) {
        return ok(null);
      }

      const result = cardResult[0];
      if (!result) {
        return ok(null);
      }

      // Get library memberships for this card with published record details
      const membershipResults = await this.db
        .select({
          userId: libraryMemberships.userId,
          addedAt: libraryMemberships.addedAt,
          publishedRecordUri: publishedRecords.uri,
          publishedRecordCid: publishedRecords.cid,
        })
        .from(libraryMemberships)
        .leftJoin(
          publishedRecords,
          eq(libraryMemberships.publishedRecordId, publishedRecords.id)
        )
        .where(eq(libraryMemberships.cardId, result.id));

      // Get original published record if it exists
      let originalPublishedRecord = null;
      if (result.originalPublishedRecordId) {
        const originalRecordResult = await this.db
          .select({
            uri: publishedRecords.uri,
            cid: publishedRecords.cid,
          })
          .from(publishedRecords)
          .where(eq(publishedRecords.id, result.originalPublishedRecordId))
          .limit(1);

        if (originalRecordResult.length > 0) {
          originalPublishedRecord = originalRecordResult[0];
        }
      }

      const cardDTO: CardDTO = {
        id: result.id,
        type: result.type,
        contentData: result.contentData,
        url: result.url || undefined,
        parentCardId: result.parentCardId || undefined,
        originalPublishedRecordId: originalPublishedRecord
          ? {
              uri: originalPublishedRecord.uri,
              cid: originalPublishedRecord.cid,
            }
          : undefined,
        libraryCount: result.libraryCount ?? 0,
        libraryMemberships: membershipResults.map((membership) => ({
          userId: membership.userId,
          addedAt: membership.addedAt,
          publishedRecordId:
            membership.publishedRecordUri && membership.publishedRecordCid
              ? {
                  uri: membership.publishedRecordUri,
                  cid: membership.publishedRecordCid,
                }
              : undefined,
        })),
        createdAt: result.createdAt,
        updatedAt: result.updatedAt,
      };

      const domainResult = CardMapper.toDomain(cardDTO);
      if (domainResult.isErr()) {
        return err(domainResult.error);
      }

      return ok(domainResult.value);
    } catch (error) {
      return err(error as Error);
    }
  }
}
