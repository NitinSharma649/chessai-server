import {Socket, Server as ServerIo} from "socket.io";
import http, {Server} from "http";
import {Express} from "express";
import initializeGame from "@chessAi/gameLogic/connections";
import config from '@chessAi/config'

export async function createSocketServer(app: Express): Promise<Server> {

    const server = http.createServer(app)
    const io = new ServerIo(server, {
        cors: {
            origin: config.CLIENT_URL,
            methods: ["GET", "POST"]
        }
    });

    io.on("connection", function(socket: Socket) {
        console.log("a user connected");
        initializeGame(io, socket)
    });

    return server;
}
