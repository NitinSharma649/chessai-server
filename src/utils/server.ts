import bodyParser from 'body-parser'
import express, {Express, Request, Response} from 'express'
import morgan from 'morgan'
import morganBody from 'morgan-body'
import config from '@chessAi/config'
import {expressDevLogger} from '@chessAi/utils/express_dev_logger'
import Routes from "@chessAi/routes";
import cors from 'cors';

export async function createServer(): Promise<Express> {

    const app = express()

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: false }));

    /* istanbul ignore next */
    if (config.morganLogger) {
        app.use(morgan(':method :url :status :response-time ms - :res[content-length]'))
    }

    /* istanbul ignore next */
    if (config.morganBodyLogger) {
        morganBody(app)
    }

    /* istanbul ignore next */
    if (config.exmplDevLogger) {
        app.use(expressDevLogger)
    }

    app.use(cors());

    // app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    //     res.header("Access-Control-Allow-Origin", "*")
    //     res.header("Access-Control-Allow-Headers", "Origin, X-Request-With");
    //     res.header("Access-Control-Allow-Method", "GET, POST, OPTIONS, PUT, DELETE, PATCH");
    //     next();
    // });

    // error customization, if request is invalid
    app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
        res.status(err.status).json({
            error: {
                type: 'request_validation',
                message: err.message,
                errors: err.errors
            }
        })
    })

    Routes(app);

    return app
}
