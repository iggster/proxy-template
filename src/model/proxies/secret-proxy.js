/**
 * Secret proxy is used for binding a specific router-request to a specific database-handler service
 * @module proxies/secret-proxy
 * @requires handlers/secret-db-handler
 */
import SecretQuery from "../handlers/secret-db-handler.js";
/**
 * Proxy to bind router with database-handler.
 * @namespace SecretProxy
 * @memberof module:proxies/secret-proxy
 * @type {object}
 * @const
 */
const SecretProxy = {
  /**
   * Forwards requests to db handlers create secret.
   * @namespace secretCreate
   * @memberof module:proxies/secret-proxy
   * @param {object} queryParams - Express Validator body object.
   * @param {string} queryParams.title - Secret title.
   * @param {string} queryParams.contents - Secret contents.
   * @returns {array<secret> | undefined } New secret object with secret_id or undefined for graceful return.
   */
  secretCreate: async (queryParams) => {
    try {
      const dbResponse = await SecretQuery.secretCreate(
        queryParams.user_id,
        queryParams.title,
        queryParams.contents
      );
      return dbResponse.rowCount > 0 ? dbResponse.rows : undefined;
    } catch (error) {
      return {
        value: "UserProxy Critical Error.",
        error: new Error('ERROR: UserProxy.js: "UserCreate()".  ------------>.'),
      };
    }
  },
  /**
   * Find all secrets in the database.
   * @namespace secretFindAll
   * @memberof module:proxies/secret-proxy
   * @param {number} secret_id
   * @returns {array<secret>} - All secrets in the database, [] or error.
   */
  secretFindAll: async () => {
    try {
      const dbResponse = await SecretQuery.secretFindAll();
      return dbResponse.rowCount > 0 ? dbResponse.rows : [];
    } catch (error) {
      console.log(error);
      return {
        value: "UserProxy Critical Error.",
        error: new Error('UserProxy.js: "userFindAll()".  ------------>.'),
      };
    }
  },
  /**
   * Finds all secrets for a specific user.
   * @namespace secretFindByUser
   * @memberof module:proxies/secret-proxy
   * @param {object} queryParams options - Express Validator object.
   * @param {number} secret_id
   * @returns {array<secret>} - All secret objects for a specific user, [] or error.
   */ 
   secretFindByUser: async (queryParams) => {
    try {
      const dbResponse = await SecretQuery.secretFindByUser(
        queryParams.user_id
      );
      return dbResponse.rowCount > 0 ? dbResponse.rows : [];
    } catch (error) {
      console.log(error);
      return {
        value: "SecretProxy Critical Error.",
        error: new Error(
          'ERROR: SecretProxy.js: "secretFindByUser()".  ------------>.'
        ),
      };
    }
  },
  /**
   * Find secret by id.
   * @namespace secretFineOne
   * @memberof module:proxies/secret-proxy
   * @param {object} queryParams options - Express Validator object.
   * @param {number} secret_id
   * @returns {array<secret>} - Single secret from the database, [] or error.
   */
  secretFindOne: async (queryParams) => {
    try {
      const dbResponse = await SecretQuery.secretFindOne(queryParams.secret_id);
      let x = dbResponse.rowCount > 0 ? dbResponse.rows : [];
      return x; //dbResponse.rowCount > 0 ? dbResponse.rows : [];
    } catch (error) {
      console.log(error);
      return {
        value: 'ERROR: SecretProxy.js: "secretFindOne()".',
        error: new Error(
          'ERROR: SecretProxy.js: "secretFindOne()".  ------------>.'
        ),
      };
    }
  },
  /**
   * Update secret by id.
   * @namespace secretUpdate
   * @memberof module:proxies/secret-proxy
   * @param {object} queryParams options - Express Validator object.
   * @param {number} queryParams.secret_id
   * @param {number} queryParams.user_id
   * @param {string} queryParams.title
   * @param {string} queryParams.contents 
   * @returns {number} - Integer with number of modified rows.
   */
  secretUpdate: async (queryParams) => {
    try {
      const dbResponse = await SecretQuery.secretUpdate(
        queryParams.secret_id,
        queryParams.user_id,
        queryParams.title,
        queryParams.contents
      );
      return dbResponse.rowCount;
    } catch (error) {
      console.log(error);
      return {
        value: "UserDbHandler Critical Error.",
        error: new Error('ERROR: UserProxy.js: "userUpdate()".  ------------>.'),
      };
    }
  },
   /**
   * Delete a secret by id.
   * @namespace secretDelete
   * @memberof module:proxies/secret-proxy
   * @param {object} queryParams options - Express Validator object.
   * @param {number} queryParams.secret_id
   * @returns {number} - Integer with number of modified rows.
   */
  secretDelete: async (queryParams) => {
    try {
      const dbResponse = await SecretQuery.secretDelete(queryParams.secret_id);
      return dbResponse.rowCount;
    } catch (error) {
      console.log(error);
      return {
        value: "SecretProxy Critical Error.",
        error: new Error(
          'ERROR: SecretProxy.js: "secretDelete()".  ------------>.'
        ),
      };
    }
  },
}; //END MODULE
export default SecretProxy;
