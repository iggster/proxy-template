/**
 * Express router providing user related routes
 * @module routers/user-route
 * @requires express
 * @requires express-validator
 * @requires user-validator
 * @requires user-proxy
 */
import express from "express";
import userProxy from "../model/proxies/user-proxy.js";
import { matchedData, validationResult } from "express-validator";
import userValidator from "./validators/user-validator.js";
/**
 * Express router to mount user related request
 * @namespace userRoute
 * @memberof module:routers/user-route
 * @type {object}
 * @const
 */
const userRouter = express.Router();
/**
 * Route serving create user service.
 * @namespace userCreate
 * @memberof module:routers/user-route
 * @inner
 * @route Post /user/create
 * @param {express-validator} userCreate - Express middleware
 * @param {string} path - Express path /user/create
 * @param {express} req - Express request
 * @param {express} res - Express res
 * @returns {Array<Secret> | HttpStatusCode | ValidatorError} Array of one user object or HTTP STATUS: 500/503 or Validator error.
 */
userRouter.post("/create", userValidator.userCreate, async (req, res) => {
  try {
    // const { fname, lname } = req.body;
    const result = validationResult(req);
    if (result.isEmpty()) {
      const queryParams = matchedData(req);
      const userObj = await userProxy.userCreate(queryParams);
      if (!userObj.error) {
        userObj.rows != []
          ? res.send(JSON.stringify(userObj))
          : res.status(503).json({ message: "Database service unavailable: user/create!" });
      }
    } else {
      res.send({ errors: result.array() });
    }
  } catch (error) {
    res.status(500).json({ message: "Critical router error @ 'user/create'!" });
  }
});
/**
 * Route serving find all users
 * @namespace userFindAll
 * @memberof module:routers/user-route
 * @inner
 * @route GET /user/findall
 * @param {express} req - Express request
 * @param {express} res - Express res
 * @returns {Array<User> | HttpStatusCode | ValidatorError} Array of all user objects or HTTP STATUS: 404/500/503 or Validator.
 */
userRouter.get("/findall", async (req, res) => {
  try {
    //Affected row count.
    const usersList = await userProxy.userFindAll();
    if (!usersList.error) {
      usersList.rows != []
        ? res.send(JSON.stringify(usersList))
        : res.status(404).json({ message: "No available users data." });
    } else {
      res
        .status(503)
        .json({ message: "Database service unavailable: user/findall!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Critical error user/findall!" });
  }
});
/**
 * Route serving find one user by user id
 * @namespace userFindOne
 * @memberof module:routers/user-route
 * @inner
 * @route GET /user/findone
 * @param {express-validator} userFindOne - Find one user configuration object
 * @param {express} req - Express request
 * @param {express} res - Express res
 * @returns {Array<Secret> | HttpStatusCode | ValidatorError} Array of one user object or HTTP STATUS: 404/500/503 or Validator.
 */
userRouter.get("/findone", userValidator.userFindOne, async (req, res) => {
  try {
    const result = validationResult(req);

    if (result.isEmpty()) {
      const queryParams = matchedData(req);
      //JSON object for user.
      const userObj = await userProxy.userFindOne(queryParams);
      if (!userObj.error) {
        userObj.rows != []
          ? res.send(JSON.stringify(userObj))
          : res.status(404).json({ message: "No available users data." });
      } else {
        res
          .status(503)
          .json({ message: "Database service unavailable: user/findone!" });
      }
    } else {
      //Send validator error status.
      res.status(400).send({ errors: result.array() });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Critical router error @ 'user/findone'!" });
  }
});
/**
 * Route serving update user by user id
 * @namespace userUpdate
 * @memberof module:routers/user-route
 * @inner
 * @route GET /user/update
 * @param {express-validator} userUpdate -  Update user configuration object
 * @param {express-validator} userUpdate.user_id - Update user id
 * @param {express-validator} userUpdate.user_id - User id of owner
 * @param {express-validator} userUpdate.title - Secret title to update
 * @param {express-validator} userUpdate.contents - Secret contents to update
 * @param {express} req - Express request
 * @param {express} res - Express res
 * @returns@returns {Array<User> | HttpStatusCode | ValidatorError} HTTP STATUS: 200/404/500 - Validator.
 */
userRouter.put("/update", userValidator.userUpdate, async (req, res) => {
  try {
    const result = validationResult(req);
    if (result.isEmpty()) {
      const queryParams = matchedData(req);
      const rowCount = await userProxy.userUpdate(queryParams);
      rowCount > 0 ? res.sendStatus(200) : res.sendStatus(404);
    } else {
      res.send({ errors: result.array() });
    }
  } catch (error) {
    res.status(500).json({ message: "Critical router error @ 'user/upDate'!" });
  }
});
/**
 * Route serving delete user by user id
 * @namespace userDelete
 * @memberof module:routers/user-route
 * @inner
 * @route GET /user/delete
 * @param {express-validator} userDelete - Delete user
 * @param {express-validator} userDelete.user_id - Delete user id
 * @param {express} req - Express request
 * @param {express} res - Express res
 * @returns { HttpStatusCode | ValidatorError} HTTP STATUS: 200/404/500 - Validator error.
 */
userRouter.delete("/delete", userValidator.userDelete, async (req, res) => {
  try {
    const result = validationResult(req);
    if (result.isEmpty()) {
      const queryParams = matchedData(req);
      const rowCount = await userProxy.userDelete(queryParams);
      rowCount > 0 ? res.sendStatus(200) : res.sendStatus(404);
    } else {
      res.send({ errors: result.array() });
    }
  } catch (error) {
    res.status(500).json({ message: "Critical router error @ 'user/delete'!" });
  }
});
export { userRouter };
