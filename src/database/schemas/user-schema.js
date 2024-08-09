/**
 * User db table schema.
 * @module schemas/user-schema
 * @requires validator
 */
import validator from "validator";

/**
 * Object definition of "users" db table.
 * @namespace userSchema
 * @memberof module:schemas/user-schema
 * @type {object}
 * @property {numeric} - userSchema.user_id
 * @property {string} - userSchema.fname
 * @property {string} - userSchema.lname
 * @property {array<string>} - userSchema.tokens 
 * @const
 */
const userSchema = {
  user_id: {
    type: Number,
    validate(value) {
      if (!validator.isInt(value)) {
        throw new Error("Dirty Secret title required.");
      }
    },
  },
  fname: {  type: String,
    required: true,
    validate(value) {
      if (!value) {
        throw new Error("Dirty Secret title required.");
      }
    },},
  lname: {
    type: String,
    required: true,
    validate(value) {
      if (!value) {
        throw new Error("Dirty Secret title required.");
      }
    },
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
};

export default userSchema;
