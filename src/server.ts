import "reflect-metadata";
import * as express from "express";
import { Server, json, urlencoded } from "express";
import * as passport from "passport";
import * as cors from "cors";
import * as dotenv from "dotenv";
import * as swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "../swagger.json";

dotenv.config();

import appConfig from "./config/app.config";
import { AppRoutes } from "./core/app.routes";
import {
  passportJWt,
} from "./middleware/passport.middleware";

export const startServer = async () => {
  const app: Server = express();

  app.use(json());

  app.use(
    urlencoded({
      extended: false,
    })
  );

  app.use(
    cors({
      credentials: true,
      origin: true,
      methods: ["GET", "PUT", "POST", "PATCH", "DELETE"],
      allowHeaders: ["Content-Type", "Authorization", "Accept-Language"],
      exposedHeaders: ["Content-Disposition"]
    })
  );

  passportJWt(passport);
  app.use(passport.initialize());

  const appRoutes: AppRoutes = new AppRoutes();

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.use(appConfig.API_PATH, appRoutes.getRouter());

  return app;
};
