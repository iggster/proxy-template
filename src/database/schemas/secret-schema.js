/**
 * Secret db table schema.
 * @module schemas/secret-schema
 * @requires validator
 */
import validator from "validator";

/**
 * Object definition of "secrets" db table.
 * @namespace secretSchema
 * @memberof module:schemas/secret-schema
 * @type {object}
 * @property {numeric} - secretSchema.secret_id
 * @property {numeric} - secretSchema.user_id
 * @property {string} - secretSchema.title
 * @property {string} - secretSchema.contents
 * @property {array<string>} - secretSchema.tokens
 * @const
 */
const secretSchema = {
  secret_id: {
    type: Number,
    validate(value) {
      if (!validator.isInt(value)) {
        throw new Error("Dirty Secret title required.");
      }
    },
  },
  secret_id: {
    type: Number,
    validate(value) {
      if (!validator.isInt(value)) {
        throw new Error("Dirty Secret title required.");
      }
    },
  },
  title: {
    type: String,
    required: true,
    validate(value) {
      if (!value) {
        throw new Error("Dirty Secret title required.");
      }
    },
  },
  contents: {
    type: String,
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
export default secretSchema;
