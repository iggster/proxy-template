/**
 * Postgeres database handler module for "secrets" table.
 * @module handlers/secret-db-handler
 * @requires utilities/pg-run-query
 */
import { pgRunQuery } from "../../database/utilities/pg-run-query.js";
/**
 * Wrapper for secrets database handler functions.
 * @namespace SecretQuery
 * @memberof module:handlers/secret-db-handler
 * @type {object}
 * @const
 */
const SecretQuery = {
  /**
   * Postgres db secret create request.
   * @namespace secretCreate
   * @memberof module:handlers/secret-db-handler
   * @param {number} user_id - User id.
   * @param {string} title -   Title.
   * @param {string} contents - Contents.
   * @returns {array<object> | string} - Raw Postgres response with new secret or error.
   */
  secretCreate: async (user_id, title, contents) => {
    try {
      const queryParams = {
        text:
          "INSERT INTO dirty_secrets.secrets (user_id, title, contents)" +
          "VALUES ($1,$2,$3) RETURNING *",
        values: [user_id, title, contents],
      };
      return await pgRunQuery(queryParams);
    } catch (error) {
      console.log(error);
      return {
        value: "UserDbHandler Critical Error.",
        error: new Error(
          'ERROR: UserDbHandler.js: "SecretCreate()".  ------------>.'
        ),
      };
    }
  },
  /**
   * Postgres db secret find-all request.
   * @namespace secretFindAll
   * @memberof module:handlers/secret-db-handler
   * @returns {array<object> | string} Raw Postgres response or error.
   */
  secretFindAll: async () => {
    try {
      const queryParams = {
        text: "SELECT * FROM dirty_secrets.secrets",
      };
      return await pgRunQuery(queryParams);
    } catch (error) {
      console.log(error);
      return {
        value: "UserDbHandler Critical Error.",
        error: new Error(
          'ERROR: UserDbHandler.js: "UserFindAll()".  ------------>.'
        ),
      };
    }
  },
  /**
   * Postgres db request find secrets by user id.
   * @namespace secretFindByUser
   * @memberof module:handlers/secret-db-handler
   * @param {number} user_id - User id.
   * @returns {array<object> | string} Raw Postgres response or error.
   */
  secretFindByUser: async (user_id) => {
    try {
      const queryParams = {
        text:
          "SELECT json_build_object('secret_id', secret_id, " +
          "'user_id', user_id, " +
          "'title',title, " +
          "'contents', contents) " +
          "FROM dirty_secrets.secrets s where s.user_id=$1",
        values: [user_id],
      };
      return await pgRunQuery(queryParams);
    } catch (error) {
      console.log(error);
      return {
        value: "UserDbHandler Critical Error.",
        error: new Error(
          'ERROR: UserDbHandler.js: "UserCreate()".  ------------>.' + error
        ),
      };
    }
  },
  /**
   * Postgres db request find a secret by secret id.
   * @namespace secretFindOne
   * @memberof module:handlers/secret-db-handler
   * @param {number} user_id - User id.
   * @returns {array<object> | string} Raw Postgres response or error.
   */
  secretFindOne: async (secret_id) => {
    try {
      const queryParams = {
        text: "SELECT * FROM dirty_secrets.secrets WHERE secret_id=$1",
        values: [secret_id],
      };

      const dbResponse = await pgRunQuery(queryParams);
      return dbResponse;
    } catch (error) {
      console.log(error);
      return {
        value: "SecretDbHandler Critical Error.",
        error: new Error(
          'ERROR: SecretDbHandler.js: "secretFindOne()".  ------------>.'
        ),
      };
    }
  },
  /**
   * Postgres db request update secret by secret id.
   * @namespace secretUpdate
   * @memberof module:handlers/secret-db-handler
   * @param {number} secret_id
   * @param {number} user_id
   * @param {number} title
   * @param {number} contents
   * @returns {array<object>} - Raw Postgres response with modified row count or error.
   */
  secretUpdate: async (secret_id, user_id, title, contents) => {
    try {
      const queryParams = {
        text: "UPDATE dirty_secrets.secrets SET title=$4, contents=$3 WHERE user_id=$2 secret_id=$1",
        values: [secret_id, user_id, contents, title],
      };
      return await pgRunQuery(queryParams);
    } catch (error) {
      console.log(error);
      return {
        value: "SecretDbHandler Critical Error.",
        error: new Error(
          'ERROR: SecretDbHandler.js: "secretUpdate()".  ------------>.'
        ),
      };
    }
  },
  /**
   * Postgres db request delete secret by secret id.
   * @namespace secretDelete
   * @memberof module:handlers/secret-db-handler
   * @param {number} secret_id
   * @returns {array<object>} - Raw Postgres response with modified row count or error.
   */
  secretDelete: async (secret_id) => {
    try {
      const queryParams = {
        text: "DELETE FROM dirty_secrets.secrets WHERE secret_id = $1",
        values: [secret_id],
      };
      return await pgRunQuery(queryParams);
    } catch (error) {
      return {
        value: "SecretDbHandler Critical Error.",
        error: new Error(
          'ERROR: UserDbHandler.js: "SecretDelete()".  ------------>.'
        ),
      };
    }
  },
};
export default SecretQuery;
