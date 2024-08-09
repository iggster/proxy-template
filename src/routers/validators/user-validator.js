import { body, query } from "express-validator";

const UserValidator = {
  userCreate: [
    body("fname", "Invalid fisrt name.")
      .trim()
      .not()
      .isEmpty()
      .isAlpha("en-US", { ignore: " " })
      .exists()
      .escape(),
    body("lname", "Invalid last name.")
      .trim()
      .not()
      .isEmpty()
      .isAlpha("en-US", { ignore: " " })
      .exists()
      .escape(),
    // body('email', 'Invalid email').trim().isEmail().escape(),
  ],
  userFindAll:[],//Stub for future use. 
  userFindOne: [
    query("user_id", "Check user id.")
      .trim()
      .not()
      .isEmpty()
      .isNumeric(true,"en-US")
      .exists()
      .escape(),
  ],
  userUpdate: [
    body("user_id", "Check user id.")
      .trim()
      .not()
      .isEmpty()
      .isNumeric(true,"en-US")
      .exists()
      .escape(),
    body("fname", "Invalid fisrt name.")
      .trim()
      .not()
      .isEmpty()
      .isAlpha("en-US", { ignore: " " })
      .exists()
      .escape(),
    body("lname", "Invalid last name.")
      .trim()
      .not()
      .isEmpty()
      .isAlpha("en-US", { ignore: " " })
      .exists()
      .escape(),
    // body('email', 'Invalid email').trim().isEmail().escape(),
  ],
  userFindOne: [
    query("user_id", "Check user id.")
      .trim()
      .not()
      .isEmpty()
      .isNumeric(true,"en-US")
      .exists()
      .escape(),
  ],
  userDelete: [
    query("user_id", "Check user id.")
      .trim()
      .not()
      .isEmpty()
      .isNumeric(true,"en-US")
      .exists()
      .escape(),
  ],
};

export default UserValidator;

