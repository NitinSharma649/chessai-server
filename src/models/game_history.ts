import {Schema, Document, model, Model} from 'mongoose'

export interface IGameHistory extends Document {
    gameId: string;
    userId: string;
    color: string;
    socketId: string;
    username: string;
}

const GameHistorySchema = new Schema<IGameHistory>({
    gameId: {type: String, required: true},
    userId: {type: String, required: true},
    color: {type: String, required: true},
    socketId: {type: String, required: true},
    username: {type: String, required: true}
});

export interface IGameHistoryModel extends Model<IGameHistory> {
    // collection/docouments level operations (fetch one or many, update, save back to db)
}

export const GameHistory: IGameHistoryModel = model<IGameHistory, IGameHistoryModel>('GameHistory', GameHistorySchema)

export default GameHistory
