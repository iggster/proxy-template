/** Express router providing user related routes
 * @module routers/secret-route
 * @requires express
 * @requires express-validator
 * @requires user-validator
 * @requires secret-proxy
 */
import express, { query } from "express";
import secretsProxy from "../model/proxies/secret-proxy.js";
import { matchedData, validationResult } from "express-validator";
import secretValidator from "./validators/secret-validator.js";
/**
 * Express router to mount secret related request
 * @namespace secretRouter
 * @memberof module:routers/secret-route
 * @type {object}
 * @const
 */
const secretRouter = express.Router();
/**
 * Route serving create secret service.
 * @namespace secretCreate
 * @memberof module:routers/secret-route
 * @inner
 * @route POST /secret/create
 * @param {string} path - Express path /secret/create
 * @param {express-validator} secretCreate - Create configuration object
 * @param {express} req - Express request
 * @param {express} res - Express res
 * @returns {Array<Secret> | HttpStatusCode | ValidatorError} Array of one secret object. HTTP STATUS: 500 - Validator.
 */
secretRouter.post("/create", secretValidator.secretCreate, async (req, res) => {
  try {
    const result = validationResult(req);
    if (result.isEmpty()) {
      const queryParams = matchedData(req);
      const secretObj = await secretsProxy.secretCreate(queryParams);
      secretObj != "undefined"
        ? res.send(secretObj)
        : res
            .status(500)
            .send("Database critical router error @ secretCreate");
    } else {
      res.send({ errors: result.array() });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Critical router error @ 'secret/create'!" });
  }
});
/**
 * Route serving find all secrets
 * @namespace secretFindAll
 * @memberof module:routers/secret-route
 * @inner
 * @route GET /secret/findall
 * @param {express} req - Express request
 * @param {express} res - Express res
 * @returns {array<secret> | HttpStatusCode | ValidatorError} Array of all secret objects or HTTP STATUS: 404/500/503 or Validator.
 */
secretRouter.get("/findall", async (req, res) => {
  try {
    const secretsList = await secretsProxy.secretFindAll();

    if (!secretsList.error) {
      secretsList.rows != []
      ? res.send(JSON.stringify(secretsList))
      : res.status(404).json({ message: 'No available secrets data.' });
     } else {
      res.status(503).json({message: "Database service unavailable: secret/findall!"});
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Critical error secret/findall!" });
  }
});
/**
 * Route serving find secrets by user id.
 * @namespace secretFindByUser
 * @memberof module:routers/secret-route
 * @inner
 * @route GET /secret/findbyuser
 * @param {express-validator} secretFindByUser - Find by user configuration object
 * @param {express} req - Express request
 * @param {express} res - Express res
 * @returns {array<secret> | HttpStatusCode | ValidatorError} Array of secret objects. HTTP STATUS: 404/500 - Validator.
 */
secretRouter.get(
  "/findbyuser",
  secretValidator.secretFindByUser,
  async (req, res) => {
    try {
      const result = validationResult(req);
      if (result.isEmpty()) {
        const queryParams = matchedData(req);
        const secretList = await secretsProxy.secretFindByUser(queryParams);
        secretList != []
          ? res.send(JSON.stringify(secretList))
          : res.sendStatus(404);
      } else {
        res.send({ errors: result.array() });
      }
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "Critical router error @ 'user/findbyuser'!" });
    }
  }
);
/**
 * Route serving find one secret by secret id
 * @namespace secretFindOne
 * @memberof module:routers/secret-route
 * @inner
 * @route GET /secret/findone
 * @param {express-validator} secretFindOne - Find one secret configuration object
 * @param {express} req - Express request
 * @param {express} res - Express res
 * @returns {array<secret> | HttpStatusCode | ValidatorError} Array of one secret object. HTTP STATUS: 404/500 - Validator.
 */
secretRouter.get(
  "/findone",
  secretValidator.secretFindOne,
  async (req, res) => {
    try {
      const result = validationResult(req);
      if (result.isEmpty()) {
        const queryParams = matchedData(req);
        //JSON object for secret.
        const secretObj = await secretsProxy.secretFindOne(queryParams);
        secretObj != []
          ? res.send(JSON.stringify(secretObj))
          : res.status(404).json({ message: "Secret not found!" });
      } else {
        res.send({ errors: result.array() });
      }
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "Critical router error @ 'secret/findone'!" });
    }
  }
);
/**
 * Route serving update secret by secret id
 * @namespace secretUpdate
 * @memberof module:routers/secret-route
 * @inner
 * @route GET /secret/update
 * @param {express-validator} secretUpdate -  Update secret configuration object
 * @param {express} req - Express request
 * @param {express} res - Express res
 * @returns@returns {Array<Secret> | HttpStatusCode | ValidatorError} HTTP STATUS: 200/404/500 - Validator.
 */
secretRouter.put("/update", secretValidator.secretUpdate, async (req, res) => {
  console.log(req.body.secret_id);
  try {
    const result = validationResult(req);
    if (result.isEmpty()) {
      const queryParams = matchedData(req);
      const rowCount = await secretsProxy.secretUpdate(queryParams);
      rowCount > 0 ? res.sendStatus(200) : res.sendStatus(404);
    } else {
      res.send({ errors: result.array() });
    }
  } catch (error) {
    res.status(500).json({ message: "Critical router error @ 'user/upDate'!" });
  }
});
/**
 * Route serving delete secret by secret id
 * @namespace secretDelete
 * @memberof module:routers/secret-route
 * @inner
 * @route GET /secret/delete
 * @param {express-validator} secretDelete - Delete secret
 * @param {express} req - Express request
 * @param {express} res - Express res
 * @returns { HttpStatusCode | ValidatorError} HTTP STATUS: 200/404/500 - Validator error.
 */
secretRouter.delete(
  "/delete",
  secretValidator.secretDelete,
  async (req, res) => {
    try {
      const result = validationResult(req);
      if (result.isEmpty()) {
        const queryParams = matchedData(req);
        const rowCount = await secretsProxy.secretDelete(queryParams);
        rowCount > 0 ? res.sendStatus(200) : res.sendStatus(404);
      } else {
        res.send({ errors: result.array() });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Critical router error @ 'user/delete'!" });
    }
  }
);
export { secretRouter };
