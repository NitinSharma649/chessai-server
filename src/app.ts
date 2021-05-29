import cacheExternal from './utils/cache_external'
import db from './utils/db'
import logger from './utils/logger'
import {createServer} from './utils/server'
import {createSocketServer} from "./utils/socketio";
import {Server} from "http";
import {Express} from "express";
import config from './config'

cacheExternal.open()
    .then(() => db.open())
    .then(() => createServer())
    .then((app: Express) => createSocketServer(app))
    .then((app: Server) => {
        app.listen(config.PORT || 3000, () => {
            logger.info(`Listening on http://localhost:${config.PORT}`)
        })
    })
    .catch((err: Error) => {
        logger.error(`Error: ${err}`)
    })
