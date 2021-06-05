import {NextFunction, Request, Response} from "express";
import UserService, {ErrorResponse} from "@chessAi/services/user";
import {writeJsonResponse} from "@chessAi/utils/response";
import logger from "@chessAi/utils/logger";

export function login(req: Request, res: Response): void {
    const {email, password} = req.body

    UserService.login(email, password)
        .then((resp) => {
            if ((resp as any).error) {
                if ((resp as ErrorResponse).error.type === 'invalid_credentials') {
                    writeJsonResponse(res, 401, resp)
                } else {
                    throw new Error(`unsupported ${resp}`)
                }
            } else {
                const {userId, token, expireAt, username} = resp as { token: string, userId: string, expireAt: Date, username: string }
                writeJsonResponse(res, 200, {userId: userId, token: token, username}, {'X-Expires-After': expireAt.toISOString()})
            }
        })
        .catch((err: any) => {
            logger.error(`login: ${err}`)
            writeJsonResponse(res, 500, {error: {type: 'internal_server_error', message: 'Internal Server Error'}})
        })
}

export function createUser(req: Request, res: Response): void {
    const {username, email, password, name} = req.body

    UserService.createUser(username, email, password, name)
        .then(resp => {
            if ((resp as any).error) {
                if ((resp as ErrorResponse).error.type === 'account_already_exists') {
                    writeJsonResponse(res, 409, resp)
                } else {
                    throw new Error(`unsupported ${resp}`)
                }
            } else {
                writeJsonResponse(res, 201, resp)
            }
        })
        .catch((err: any) => {
            logger.error(`createUser: ${err}`)
            writeJsonResponse(res, 500, {error: {type: 'internal_server_error', message: 'Internal Server Error'}})
        })
}

export function profile(req: Request, res: Response, next: NextFunction): void {
    UserService.profile(res.locals.auth.userId)
        .then((resp) => {
            if ((resp as any).error) {
                throw new Error(`unsupported ${resp}`)
            } else {
                writeJsonResponse(res, 200, resp)
            }
        })
        .catch((err: any) => {
            logger.error(`login: ${err}`)
            writeJsonResponse(res, 500, {error: {type: 'internal_server_error', message: 'Internal Server Error'}})
        })
}
