import {GameHandHistory, IMove, IGameHandHistory } from "@chessAi/models/game_hand_history_single";
import logger from "@chessAi/utils/logger";

export type ErrorResponse = { error: { type: string, message: string } }
export type CreateGameHistoryResponse = ErrorResponse | { userId: string }

export function createHandHistory(gamehandHistoryParams: IGameHandHistory): Promise<CreateGameHistoryResponse> {
    return new Promise(function (resolve, reject) {
        const gameHandHistory = new GameHandHistory({
            nextPlayerColorToMove: gamehandHistoryParams.nextPlayerColorToMove,
            playerColorThatJustMovedIsWhite: gamehandHistoryParams.playerColorThatJustMovedIsWhite,
            gameId: gamehandHistoryParams.gameId,
            move: gamehandHistoryParams.move,
            fen: gamehandHistoryParams.fen
        })
        gameHandHistory.save()
            .then(u => {
                resolve({userId: u._id.toString()})
            })
            .catch(err => {
                logger.error(err)
                reject(err)
            })
    })
}