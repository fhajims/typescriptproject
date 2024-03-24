import * as dotenv from "dotenv";

const result = dotenv.config();

if (result.error) {
    console.log(`Error loading env vars, aborting.`);
    process.exit(1);
}

console.log(process.env.PORT)

import "reflect-metadata";
import * as express from 'express';
import { root } from './routes/root';
import { isInteger } from './utils';
import { logger } from "./logger";
import * as pg from "pg";
import { AppDataSource } from "./data-source";

const app = express();
/*
const client = new pg.Client({
    user: "postgres",
    host: "localhost", 
    database: "postgres",
    password: "postgres",
    port: 5432
  })
  

  client.connect()
  .then(() => {
    return client.query('set search_path TO typescriptproject')
    console.log('Connected to PostgreSQL database');
    
  
})


  .catch(err => console.error('Connection error', err));
 */

function setupExpress() {

    // http://localhost:9000/
    app.route("/").get(root);



}

function startServer() {

    const portEnv = process.env.PORT, 
    portArg = process.argv[2]

    let port:Number;

    if (isInteger(portEnv)) {
        port = parseInt(portEnv);
    }
    
    if (!port && isInteger(portArg)) {
        port = parseInt(portArg);
    }

    if(!port) {
        port = 9000;
    }

    console.log(process.argv);

    app.listen(port, () => {

        logger.info(`v2 HTTP REST running at localhost:${port}`);
    
    });


}



AppDataSource.initialize()
    .then(() => {
        AppDataSource.query('set search_path TO typescriptproject')
        logger.info(`The datasource has been initialized successfully`)
        setupExpress();
        startServer();
    })
    .catch(err => {
        logger.error(`Error during init`, err)
        process.exit(1);
    })