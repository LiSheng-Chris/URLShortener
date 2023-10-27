import * as express from "express";
import * as cors from "cors";
import { urlRouter } from "./urlRouter";
import { errorHandler } from "../common/errorHandler";

const urlShortenerApp = express();
urlShortenerApp.use(cors());
urlShortenerApp.use("/", urlRouter);
urlShortenerApp.use(errorHandler);

export { urlShortenerApp };
