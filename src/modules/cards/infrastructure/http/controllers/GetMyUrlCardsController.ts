import { Controller } from "../../../../../shared/infrastructure/http/Controller";
import { Response } from "express";
import { GetMyUrlCardsUseCase } from "../../../application/useCases/queries/GetMyUrlCardsUseCase";
import { AuthenticatedRequest } from "../../../../../shared/infrastructure/http/middleware/AuthMiddleware";
import { CardSortField, SortOrder } from "../../../domain/ICardQueryRepository";

export class GetMyUrlCardsController extends Controller {
  constructor(private getMyUrlCardsUseCase: GetMyUrlCardsUseCase) {
    super();
  }

  async executeImpl(req: AuthenticatedRequest, res: Response): Promise<any> {
    try {
      const userId = req.did;
      const { page, limit, sortBy, sortOrder } = req.query;

      if (!userId) {
        return this.unauthorized(res);
      }

      const result = await this.getMyUrlCardsUseCase.execute({
        userId,
        page: page ? parseInt(page as string) : undefined,
        limit: limit ? parseInt(limit as string) : undefined,
        sortBy: sortBy as CardSortField,
        sortOrder: sortOrder as SortOrder,
      });

      if (result.isErr()) {
        return this.fail(res, result.error as any);
      }

      return this.ok(res, result.value);
    } catch (error: any) {
      return this.fail(res, error);
    }
  }
}
