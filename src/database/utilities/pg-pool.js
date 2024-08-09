
/**
 * A node-postgres connection pool.
 * @module utilities/pg-pool
 * @requires pg
 * @requires dotenv
 * @requires Pool
 */
import pg from "pg";
import dotenv from 'dotenv';
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
const { Pool } = pg;
const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../../../.env/dev.env")})



/**
* Returns a handle to the Postgres connection pool object.
* @namespace pgPool
* @memberof module:utilities/pg-pool
* @property {string} user  - Postgres user.
* @property {string} password  - Postgres database password.
* @property {string} host  - Name or IP of host computer.
* @property {number} port  - Postgres listening port.
* @property {string} database  - Database name.
* @property {number} max - Maximum number of simultaneous pool connections.
* @property {number} idleTimeoutMillis  - Time out before dropping a user connection.
* @property {number} connectionTimeoutMillis - Time out before dropping a database connection.
* @const
*/

 console.log(process.env.PG_PORT);
 console.log(process.env.PG_PWD)

 const pgPool = new Pool({
  user:  process.env.PG_USER,
  password: process.env.PG_PWD,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DB,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export { pgPool };
