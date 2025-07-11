import express, { Express } from "express";
import cors from "cors";
import { Router } from "express";
import { createUserRoutes } from "../../../modules/user/infrastructure/http/routes/userRoutes";
import { createAtprotoRoutes } from "../../../modules/atproto/infrastructure/atprotoRoutes";
import { createCardsModuleRoutes } from "../../../modules/cards/infrastructure/http/routes";
import { EnvironmentConfigService } from "../config/EnvironmentConfigService";
import { RepositoryFactory } from "./factories/RepositoryFactory";
import { ServiceFactory } from "./factories/ServiceFactory";
import { UseCaseFactory } from "./factories/UseCaseFactory";
import { ControllerFactory } from "./factories/ControllerFactory";

export const createExpressApp = (
  configService: EnvironmentConfigService
): Express => {
  const app = express();

  app.use(
    cors({
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: false,
    })
  );

  // Middleware setup
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Create all dependencies using factories
  const repositories = RepositoryFactory.create(configService);
  const services = ServiceFactory.create(configService, repositories);
  const useCases = UseCaseFactory.create(repositories, services);
  const controllers = ControllerFactory.create(useCases);

  // Routes
  const userRouter = Router();
  const atprotoRouter = Router();

  createUserRoutes(
    userRouter,
    services.authMiddleware,
    controllers.initiateOAuthSignInController,
    controllers.completeOAuthSignInController,
    controllers.loginWithAppPasswordController,
    controllers.getMyProfileController,
    controllers.refreshAccessTokenController
  );

  createAtprotoRoutes(atprotoRouter, services.nodeOauthClient);

  const cardsRouter = createCardsModuleRoutes(
    services.authMiddleware,
    // Card controllers
    controllers.addUrlToLibraryController,
    controllers.addCardToLibraryController,
    controllers.addCardToCollectionController,
    controllers.updateNoteCardController,
    controllers.removeCardFromLibraryController,
    controllers.removeCardFromCollectionController,
    controllers.getUrlMetadataController,
    controllers.getUrlCardViewController,
    controllers.getLibrariesForCardController,
    controllers.getMyUrlCardsController,
    // Collection controllers
    controllers.createCollectionController,
    controllers.updateCollectionController,
    controllers.deleteCollectionController,
    controllers.getCollectionPageController,
    controllers.getMyCollectionsController
  );

  // Register routes
  app.use("/api/users", userRouter);
  app.use("/atproto", atprotoRouter);
  app.use("/api", cardsRouter);

  return app;
};
