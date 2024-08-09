import { pgPool } from "./pg-pool.js";

async function pgRunQuery(pgQueryParam) {
    try {
      const client = await pgPool.connect();
      const result = await client.query(pgQueryParam);
      client.release();
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  export {pgRunQuery};
  