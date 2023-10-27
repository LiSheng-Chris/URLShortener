import * as logger from "firebase-functions/logger";
import * as express from "express";
import { urlService } from "./urlService";
import { generateUrl } from "../common/generateUrl";

const urlRouter = express.Router();
const service = new urlService();

urlRouter.get("/", async (request, response) => {
  const result = await service.getUrls();
  response.status(200).json(result);
});

urlRouter.get("/:url", async (request, response) => {
  logger.info(request.params.url);
  const result = await service.getOriginalUrl(request.params.url);
  response.status(200).send(result);
});

urlRouter.post("/create", async (request, response) => {
  logger.info(request.body);

  const long: string = request.body.long ?? "";

  if (!long) {
    response.status(422).send("Invalid Request");
  }

  let short: string = "";
  let duplicate: boolean = false;
  while (!short || duplicate) {
    short = generateUrl();
    const res = await service.getOriginalUrl(short);
    duplicate = !!res;
  }

  await service.createUrl(short, long);

  response.status(200).json({ short, long });
});

urlRouter.post("/delete", async (request, response) => {
  logger.info(request.body);

  const short: string = request.body.short ?? "";

  if (!short) {
    response.status(422).send("Invalid Request");
  }

  await service.deleteUrl(short);
  response.status(200).json("Deleted");
});

export { urlRouter };
