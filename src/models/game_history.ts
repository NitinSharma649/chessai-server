import {Schema, Document, model, Model} from 'mongoose'

export interface IGameHistory extends Document {
    nextPlayerColorToMove: boolean;
    playerColorThatJustMovedIsWhite: boolean;
    gameId: string;
    move: string;
    fen: string;
}

const GameHistorySchema = new Schema<IGameHistory>({
    nextPlayerColorToMove: {type: Boolean, required: true},
    playerColorThatJustMovedIsWhite: {type: Boolean, required: true},
    gameId: {type: String, required: true},
    move: {type: Object, required: true},
    fen: {type: String, required: true},
});

export interface IGameHistoryModel extends Model<IGameHistory> {
    // collection/docouments level operations (fetch one or many, update, save back to db)
}

export const GameHistory: IGameHistoryModel = model<IGameHistory, IGameHistoryModel>('GameHistory', GameHistorySchema)

export default GameHistory
