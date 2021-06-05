import {NextFunction, Request, Response} from "express";
import UserService from "@chessAi/services/user";
import {writeJsonResponse} from "@chessAi/utils/response";
import logger from "@chessAi/utils/logger";

export function auth(req: Request, res: Response, next: NextFunction): void {
    const token = req.headers.authorization!
    if (token) {
        UserService.auth(token)
            .then(authResponse => {
                if (!(authResponse as any).error) {
                    res.locals.auth = {
                        userId: (authResponse as {userId: string}).userId
                    }
                    next()
                } else {
                    writeJsonResponse(res, 401, authResponse)
                }
            })
            .catch(err => {
                logger.error(`auth: ${err}`)
                writeJsonResponse(res, 500, {error: {type: 'internal_server_error', message: 'Internal Server Error'}})
            })
    } else {
        writeJsonResponse(res, 401, {error: {type: 'authentication required', message: 'Authentication Required'}})
    }
}