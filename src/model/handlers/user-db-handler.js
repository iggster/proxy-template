/**
 * Postgres database handlers module for "users" table.
 * @module handlers/user-db-handler
 * @requires pg-run-query
 * 
 */

import { pgRunQuery } from "../../database/utilities/pg-run-query.js";
/**
 * Wrapper for users database handler functions.
 * @namespace UserQuery
 * @memberof module:handlers/user-db-handler
 * @type {object}
 * @const
 */
const UserQuery = {
  /**
   * Postgres db user create request.
   * @namespace userCreate
   * @memberof module:handlers/user-db-handler
   * @param {string} fname - First name.
   * @param {string} lname - Last name.
   * @returns {array<object> | string} Raw Postgres response with new user or error.
   */
  userCreate: async (fname, lname) => {
    try {
      const queryParams = {
        text:
          "INSERT INTO dirty_secrets.users (fname, lname) " +
          "VALUES ($1,$2) RETURNING *",
        values: [fname, lname],
      };
      return await pgRunQuery(queryParams);
    } catch (error) {
      console.log(error);
      return {
        value: "UserDbHandler Critical Error.",
        error: new Error(
          'ERROR: UserDbHandler.js: "UserCreate()".  ------------>.'
        ),
      };
    }
  },
  /**
   * Postgres db user find-all request.
   * @namespace userFindAll
   * @memberof module:handlers/user-db-handler
   * @returns {array<object>} - Raw Postgres response or error.
   */
  userFindAll: async () => {
    try {
      const queryParams = {
        text: "SELECT * FROM dirty_secrets.users",
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
   * Postgres db request find a user by user id.
   * @namespace userFindOne
   * @memberof module:handlers/user-db-handler
   * @param {number} user_id - User id.
   * @returns {array<object> | string} Raw Postgres response or error.
   */
  userFindOne: async (user_id) => {
    try {
      const queryParams = {
        text: "SELECT * FROM dirty_secrets.users WHERE user_id=$1",
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
   * Postgres db request update user by user id.
   * @namespace userUpdate
   * @module: handlers/user-db-handler
   * @param {number} - user_id
   * @param {string} - fname
   * @param {string} - lname
   * @returns {array<object>} - Raw Postgres response with modified row count or error.
   */
  userUpdate: async (user_id, fname, lname) => {
    try {
      const queryParams = {
        text: "UPDATE dirty_secrets.users SET fname=$1, lname=$2 WHERE user_id=$3",
        values: [fname, lname, user_id],
      };
      return await pgRunQuery(queryParams);
    } catch (error) {
      console.log(error);
      return {
        value: "UserDbHandler Critical Error.",
        error: new Error(
          'ERROR: UserDbHandler.js: "UserCreate()".  ------------>.'
        ),
      };
    }
  },
  /**
   * Postgres db request delete a user by user id.
   * @namespace userDelete
   * @memberof module:handlers/user-db-handler
   * @param {number} user_id - User id.
   * @returns {array<object> | string} Raw Postgres response with modified row count or error.
   */
  userDelete: async (user_id) => {
    try {
      const queryParams = {
        text: "DELETE FROM dirty_secrets.users u WHERE u.user_id=$1",
        values: [user_id],
      };
      return await pgRunQuery(queryParams);
    } catch (error) {
      console.log(error);
      return {
        value: "UserDbHandler Critical Error.",
        error: new Error(
          'ERROR: UserDbHandler.js: "UserDelete()".  ------------>.'
        ),
      };
    }
  },
};

export default UserQuery;
