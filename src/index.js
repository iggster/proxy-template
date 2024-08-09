
/** 
 * Index file for bootstrapping "basic template" server.
 * @module index
 * @requires express
 * @requires body-parser
 * @requires path
 * @requires url
 * @requires cors
 * @requires dotenv
 * @requires routers/user-route
 * @requires routers/secret-route
 */
import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import { userRouter } from "./routers/user-route.js";
import { secretRouter } from "./routers/secret-route.js";
import dotenv from 'dotenv';




/**
 * Express application object.
 * @namespace app
 * @memberof module:index
 * @type {express}
 * @const
 */
const app = express();
/**
 * The path.dirname() method returns the directories of a file path.
 * @namespace __dirname
 * @memberof module:index
 * @type {string}
 * @const
 */
const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, ".env/dev.env")})
dotenv.config();
app.use(express.json());
//Must be renabled for use with react.
//app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "src")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/user", userRouter);
app.use("/secret", secretRouter);
app.use(cors); 
const PORT = process.env.PORT || 3005;

console.log(process.env.PG_USER)
/**
import winston from 'winston';
const logger = winston.createLogger({
    transports: [
        new winston.transports.Console()
    ]
});

logger.info('What rolls down stairs');
logger.info('alone or in pairs,');
logger.info('and over your neighbors dog?');
logger.warn('Whats great for a snack,');
logger.info('And fits on your back?');
logger.error('Its log, log, log');

*/





app.listen(PORT, () => {
  console.log("Express running on port: " + PORT);
});
