import express from "express";
import cors from "cors";
import compression from "compression";
import morgan from "morgan";
import bodyParser from "body-parser";
import { errorHandler as queryErrorHandler } from "querymen";
import { errorHandler as bodyErrorHandler } from "bodymen";
import { env } from "../../config";

//import rateLimit from "express-rate-limit";

export default (apiRoot, routes) => {
  const app = express();

  /* istanbul ignore next */
  if (env === "production" || env === "development") {
    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 10,
    });

    //app.use(limiter);
    app.use(
      cors({
        origin: true,
        methods: "GET",
        credentials: true,
      })
    );
    app.use(compression());
    app.use(morgan("dev"));
  }

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(apiRoot, routes);
  app.use(queryErrorHandler());
  app.use(bodyErrorHandler());

  return app;
};
