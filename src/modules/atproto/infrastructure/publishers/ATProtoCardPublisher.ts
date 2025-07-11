import { ICardPublisher } from "src/modules/cards/application/ports/ICardPublisher";
import { Card } from "src/modules/cards/domain/Card";
import { Result, ok, err } from "src/shared/core/Result";
import { UseCaseError } from "src/shared/core/UseCaseError";
import { CuratorId } from "src/modules/cards/domain/value-objects/CuratorId";
import { CardMapper } from "../mappers/CardMapper";
import { StrongRef } from "../../domain";
import { IAgentService } from "../../application/IAgentService";
import { DID } from "../../domain/DID";
import { PublishedRecordId } from "src/modules/cards/domain/value-objects/PublishedRecordId";
export class ATProtoCardPublisher implements ICardPublisher {
  private readonly COLLECTION = "network.cosmik.card";

  constructor(private readonly agentService: IAgentService) {}

  /**
   * Publishes a Card to the curator's library in the AT Protocol
   */
  async publishCardToLibrary(
    card: Card,
    curatorId: CuratorId
  ): Promise<Result<PublishedRecordId, UseCaseError>> {
    try {
      const record = CardMapper.toCreateRecordDTO(card);
      const curatorDid = new DID(curatorId.value);

      // Get an authenticated agent for this curator
      const agentResult =
        await this.agentService.getAuthenticatedAgent(curatorDid);

      if (agentResult.isErr()) {
        return err(
          new Error(`Authentication error: ${agentResult.error.message}`)
        );
      }

      const agent = agentResult.value;

      if (!agent) {
        return err(new Error("No authenticated session found for curator"));
      }

      // Check if this card is already published in this curator's library
      const existingMembership = card.libraryMemberships.find(
        (membership) =>
          membership.curatorId.equals(curatorId) && membership.publishedRecordId
      );

      if (existingMembership && existingMembership.publishedRecordId) {
        // Update existing record
        const publishedRecordId =
          existingMembership.publishedRecordId.getValue();
        const strongRef = new StrongRef(publishedRecordId);
        const atUri = strongRef.atUri;
        const rkey = atUri.rkey;

        await agent.com.atproto.repo.putRecord({
          repo: curatorDid.value,
          collection: this.COLLECTION,
          rkey: rkey,
          record,
        });

        return ok(existingMembership.publishedRecordId);
      } else {
        // Create new record
        const createResult = await agent.com.atproto.repo.createRecord({
          repo: curatorDid.value,
          collection: this.COLLECTION,
          record,
        });

        const publishedRecordId = PublishedRecordId.create({
          uri: createResult.data.uri,
          cid: createResult.data.cid,
        });

        return ok(publishedRecordId);
      }
    } catch (error) {
      return err(
        new Error(error instanceof Error ? error.message : String(error))
      );
    }
  }

  /**
   * Unpublishes (deletes) a Card from the curator's library in the AT Protocol
   */
  async unpublishCardFromLibrary(
    recordId: PublishedRecordId,
    curatorId: CuratorId
  ): Promise<Result<void, UseCaseError>> {
    try {
      const publishedRecordId = recordId.getValue();
      const strongRef = new StrongRef(publishedRecordId);
      const atUri = strongRef.atUri;
      const curatorDid = new DID(curatorId.value);
      const repo = curatorDid.value;
      const rkey = atUri.rkey;

      // Get an authenticated agent for this curator
      const agentResult =
        await this.agentService.getAuthenticatedAgent(curatorDid);

      if (agentResult.isErr()) {
        return err(
          new Error(`Authentication error: ${agentResult.error.message}`)
        );
      }

      const agent = agentResult.value;

      if (!agent) {
        return err(new Error("No authenticated session found for curator"));
      }

      await agent.com.atproto.repo.deleteRecord({
        repo,
        collection: this.COLLECTION,
        rkey,
      });

      return ok(undefined);
    } catch (error) {
      return err(
        new Error(error instanceof Error ? error.message : String(error))
      );
    }
  }
}
