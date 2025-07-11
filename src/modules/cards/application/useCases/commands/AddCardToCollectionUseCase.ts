import { Result, ok, err } from "../../../../../shared/core/Result";
import { UseCase } from "../../../../../shared/core/UseCase";
import { UseCaseError } from "../../../../../shared/core/UseCaseError";
import { AppError } from "../../../../../shared/core/AppError";
import { ICardRepository } from "../../../domain/ICardRepository";
import { CardId } from "../../../domain/value-objects/CardId";
import { CollectionId } from "../../../domain/value-objects/CollectionId";
import { CuratorId } from "../../../domain/value-objects/CuratorId";
import { CardCollectionService } from "../../../domain/services/CardCollectionService";

export interface AddCardToCollectionDTO {
  cardId: string;
  collectionIds: string[];
  curatorId: string;
}

export interface AddCardToCollectionResponseDTO {
  cardId: string;
}

export class ValidationError extends UseCaseError {
  constructor(message: string) {
    super(message);
  }
}

export class AddCardToCollectionUseCase
  implements
    UseCase<
      AddCardToCollectionDTO,
      Result<
        AddCardToCollectionResponseDTO,
        ValidationError | AppError.UnexpectedError
      >
    >
{
  constructor(
    private cardRepository: ICardRepository,
    private cardCollectionService: CardCollectionService
  ) {}

  async execute(
    request: AddCardToCollectionDTO
  ): Promise<
    Result<
      AddCardToCollectionResponseDTO,
      ValidationError | AppError.UnexpectedError
    >
  > {
    try {
      // Validate and create CuratorId
      const curatorIdResult = CuratorId.create(request.curatorId);
      if (curatorIdResult.isErr()) {
        return err(
          new ValidationError(
            `Invalid curator ID: ${curatorIdResult.error.message}`
          )
        );
      }
      const curatorId = curatorIdResult.value;

      // Validate and create CardId
      const cardIdResult = CardId.createFromString(request.cardId);
      if (cardIdResult.isErr()) {
        return err(
          new ValidationError(`Invalid card ID: ${cardIdResult.error.message}`)
        );
      }
      const cardId = cardIdResult.value;

      // Validate and create CollectionIds
      const collectionIds: CollectionId[] = [];
      for (const collectionIdStr of request.collectionIds) {
        const collectionIdResult =
          CollectionId.createFromString(collectionIdStr);
        if (collectionIdResult.isErr()) {
          return err(
            new ValidationError(
              `Invalid collection ID: ${collectionIdResult.error.message}`
            )
          );
        }
        collectionIds.push(collectionIdResult.value);
      }

      // Find the card
      const cardResult = await this.cardRepository.findById(cardId);
      if (cardResult.isErr()) {
        return err(AppError.UnexpectedError.create(cardResult.error));
      }

      const card = cardResult.value;
      if (!card) {
        return err(new ValidationError(`Card not found: ${request.cardId}`));
      }

      // Add card to collections using domain service
      const addToCollectionsResult =
        await this.cardCollectionService.addCardToCollections(
          card,
          collectionIds,
          curatorId
        );
      if (addToCollectionsResult.isErr()) {
        if (addToCollectionsResult.error instanceof AppError.UnexpectedError) {
          return err(addToCollectionsResult.error);
        }
        return err(new ValidationError(addToCollectionsResult.error.message));
      }

      return ok({
        cardId: card.cardId.getStringValue(),
      });
    } catch (error) {
      return err(AppError.UnexpectedError.create(error));
    }
  }
}
