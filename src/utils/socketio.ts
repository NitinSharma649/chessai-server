import * as socket from "socket.io";
import http from "http";
import {Express} from "express";
import initializeGame from "../gameLogic/connections";

export async function createSocketServer(app: Express): Promise<Express> {

    const server = http.createServer(app)
    const io = require("socket.io")(server);

    io.on("connection", function(socket: socket.Socket) {
        console.log("a user connected");
        initializeGame(io, socket)
    });

    return app;
}
