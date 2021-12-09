import Express from 'express'
import http from 'http'
import path from 'path'
import logger from './src/middleware/logger.js'

import router from './src/routes/index.mjs'; //DIR_IMPORT NOT SUPPORTED
// import { HOST, PORT} from './src/config/index.js';

let HOST = 'localhost';
let PORT = 8080;

export const app = new Express(); 
const server = new http.Server(app);
// import logger from './src/middleware/logger.js';
// import { connect } from "./src/config/mongo.js";
import cookieParser from 'cookie-parser';
// import jwt from 'express-jwt';
import cors from 'cors'; //dont know what is it for


const STRING = "HELLO STRING";

app.use(cors());
app.use(Express.json({ limit: '200kb' }));
app.use(Express.urlencoded({extended: true }));
app.use(cookieParser());

app.use(router);

app.use(logger);

server.listen(PORT, () =>

console.log(`[LOGGER] The server is listening on port ${PORT} and nb ${STRING}`))