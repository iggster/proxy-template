import { body, query } from "express-validator";

const SecretValidator = {
  secretCreate: [
    body("user_id", "Invalid user id.").trim().isNumeric().not().isEmpty().exists().escape(),
    body("title", "Invalid title.").trim().not().isEmpty().exists().escape(),
    body("contents", "Invalid contents.")
      .trim()
      .not()
      .isEmpty()
      .exists()
      .escape(),
  ],
  secretFindAll: [], //Stub for future use.
  secretFindByUser: [
    query("user_id", "Check user id.")
      .trim()
      .not()
      .isEmpty()
      .isNumeric(true, "en-US")
      .exists()
      .escape(),
  ],
  secretFindOne: [
    query("secret_id", "Check secret id.")
      .trim()
      .not()
      .isEmpty()
      .isNumeric(true, "en-US")
      .exists()
      .escape(),
  ],
  secretUpdate: [
    body("secret_id", "Check id.")
      .trim()
      .not()
      .isEmpty()
      .isNumeric(true, "en-US")
      .exists()
      .escape(),
    body("title", "Invalid title.")
      .trim()
      .not()
      .isEmpty()
      .exists()
      .escape(),
    body("contents", "Check contents.")
      .trim()
      .not()
      .isEmpty()
      .exists()
      .escape(),
    // body('email', 'Invalid email').trim().isEmail().escape(),
  ],
  secretDelete: [
     query("secret_id", "Check user id.")
      .trim()
      .not()
      .isEmpty()
      .isNumeric(true, "en-US")
      .exists()
      .escape(),
  ],
};

export default SecretValidator;
