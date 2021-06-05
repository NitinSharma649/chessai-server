import cacheExternal from '@chessAi/utils/cache_external'
import db from '@chessAi/utils/db'
import logger from '@chessAi/utils/logger'
import {createServer} from '@chessAi/utils/server'
import {createSocketServer} from "@chessAi/utils/socketio";
import {Server} from "http";
import {Express} from "express";
import config from '@chessAi/config'

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
