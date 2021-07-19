import {Schema, Document, model, Model} from 'mongoose'

import validator from 'validator'

export interface IMove {
    from: string;
    to: string;
    promotion: string;
}
export interface IGameHandHistory extends Document {
    nextPlayerColorToMove: boolean;
    playerColorThatJustMovedIsWhite: boolean;
    gameId: string;
    move: IMove;
    fen: string;
}

const GameHandHistorySchema = new Schema<IGameHandHistory>({
    nextPlayerColorToMove: {type: Boolean, required: true},
    playerColorThatJustMovedIsWhite: {type: Boolean, required: true},
    gameId: {type: String, required: true},
    move: {type: Object, required: true},
    fen: {type: String, required: true},
});

export interface IGameHandHistoryModel extends Model<IGameHandHistory> {
    // collection/docouments level operations (fetch one or many, update, save back to db)
}

export const GameHandHistory: IGameHandHistoryModel = model<IGameHandHistory, IGameHandHistoryModel>('GameHandHistory', GameHandHistorySchema)

export default GameHandHistory
