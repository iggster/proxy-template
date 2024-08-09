/** User proxy module to bind router database request
 * @module proxies/user-proxy
 * @requires handlers/user-db-handler
 */
import UserQuery from "../handlers/user-db-handler.js";
/**
 * Proxy to bind router with database-handler.
 * @namespace UserProxy
 * @memberof module:proxies/user-proxy
 * @type {object}
 * @const
 */
const UserProxy = {
  /**
   * Forwards requests to db handlers create user.
   * @namespace userCreate
   * @memberof module:proxies/user-proxy
   * @param {object} queryParams  - Express Validator body object.
   * @param {string} queryParams.fname - User first name.
   * @param {string} queryParams.lname - User last name.
   * @returns {array<user> | undefined}  New user object with user_id or undefined for graceful return.
   */
  userCreate: async (queryParams) => {
    try {
      const dbResponse = await UserQuery.userCreate(
        queryParams.fname,
        queryParams.lname
      );
      //JSON: Newly created user object.
      return dbResponse.rowCount > 0 ? dbResponse.rows : undefined;
    } catch (error) {
      console.log(error);
      return {
        value: "UserProxy Critical Error.",
        error: new Error(
          'ERROR: UserProxy.js: "UserCreate()".  ------------>.'
        ),
      };
    }
  },
  /**
   * Find all users in the database.
   * @namespace userFindAll
   * @memberof module:proxies/user-proxy
   * @param {number} user_id
   * @returns {array<user>} - All users in the database, [] or error.
   */
  userFindAll: async () => {
    try {
      const dbResponse = await UserQuery.userFindAll();
      return dbResponse.rowCount > 0 ? dbResponse.rows : [];
    } catch (error) {
      console.log(error);
      return {
        value: "UserProxy Critical Error.",
        error: new Error(
          'ERROR: UserProxy.js: "userFindAll()".  ------------>.'
        ),
      };
    }
  },
  /**
   * Find user by id.
   * @namespace userFineOne
   * @memberof module:proxies/user-proxy
   * @param {object} queryParams options - Express Validator object.
   * @param {number} user_id
   * @returns {array<user>} - Single user from the database, [] or error.
   */
  userFindOne: async (queryParams) => {
    try {
      const dbResponse = await UserQuery.userFindOne(queryParams.user_id);
      return dbResponse.rowCount > 0 ? dbResponse.rows : [];
    } catch (error) {
      console.log(error);
      return {
        value: "UserDbHandler Critical Error.",
        error: new Error(
          'ERROR: UserProxy.js: "userFindOne()".  ------------>.'
        ),
      };
    }
  },
  /**
   * Update user by id.
   * @namespace userUpdate
   * @memberof module:proxies/user-proxy
   * @param {object} queryParams options - Express Validator object.
   * @param {number} queryParams.user_id
   * @param {string} queryParams.fname
   * @param {string} queryParams.lname
   * @returns {number} - Integer with number of modified rows.
   */
  userUpdate: async (queryParams) => {
    try {
      const dbResponse = await UserQuery.userUpdate(
        queryParams.user_id,
        queryParams.fname,
        queryParams.lname
      );
      return dbResponse.rowCount;
    } catch (error) {
      console.log(error);
      return {
        value: "UserDbHandler Critical Error.",
        error: new Error(
          'ERROR: UserProxy.js: "userUpdate()".  ------------>.'
        ),
      };
    }
  },
   /**
   * Delete a user by id.
   * @namespace userDelete
   * @memberof module:proxies/user-proxy
   * @param {object} queryParams options - Express Validator object.
   * @param {number} queryParams.user_id
   * @returns {number} - Integer with number of modified rows.
   */
  userDelete: async (queryParams) => {
    try {
      const dbResponse = await UserQuery.userDelete(queryParams.user_id);
      return dbResponse.rowCount;
    } catch (error) {
      console.log(error);
      return {
        value: "UserDbHandler Critical Error.",
        error: new Error(
          'ERROR: UserProxy.js: "userDelete()".  ------------>.'
        ),
      };
    }
  },
}; //END MODULE
export default UserProxy;
