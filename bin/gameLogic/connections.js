"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// gamesInSession stores an array of all active socket connections
var gamesInSession = [];
var gameSocket;
var io;
var initializeGame = function (sio, socket) {
    /**
     * initializeGame sets up all the socket event listeners.
     */
    // initialize global variables.
    io = sio;
    gameSocket = socket;
    // pushes this socket to an array which stores all the active sockets.
    gamesInSession.push(gameSocket);
    // Run code when the client disconnects from their socket session.
    gameSocket.on("disconnect", onDisconnect);
    // Sends new move to the other socket session in the same room.
    gameSocket.on("new move", newMove);
    // User creates new game room after clicking 'submit' on the frontend
    gameSocket.on("createNewGame", createNewGame);
    // User joins gameRoom after going to a URL with '/game/:gameId'
    gameSocket.on("playerJoinGame", playerJoinsGame);
    gameSocket.on('request username', requestUserName);
    gameSocket.on('recieved userName', recievedUserName);
    // register event listeners for video chat app:
    videoChatBackend();
};
var videoChatBackend = function () {
    // main const listeners
    gameSocket.on("callUser", function (data) {
        io.to(data.userToCall).emit('hey', { signal: data.signalData, from: data.from });
    });
    gameSocket.on("acceptCall", function (data) {
        io.to(data.to).emit('callAccepted', data.signal);
    });
};
var playerJoinsGame = function (idData) {
    console.log(idData);
    /**
     * Joins the given socket to a session with it's gameId
     */
    console.log("called");
    // A reference to the player's Socket.IO socket object
    var sock = gameSocket;
    // Look up the room ID in the Socket.IO manager object.
    var room = io.sockets.adapter.rooms.get(idData.gameId);
    // If the room exists...
    if (room === undefined) {
        gameSocket.emit('status', "This game session does not exist.");
        return;
    }
    if (room.size < 2) {
        // attach the socket id to the data object.
        idData.mySocketId = sock.id;
        // Join the room
        sock.join(idData.gameId);
        console.log(room.size);
        if (room.size === 2) {
            io.sockets.in(idData.gameId).emit('start game', idData.userName);
        }
        // Emit an event notifying the clients that the player has joined the room.
        io.sockets.in(idData.gameId).emit('playerJoinedRoom', idData);
    }
    else {
        // Otherwise, send an error message back to the player.
        gameSocket.emit('status', "There are already 2 people playing in this room.");
    }
};
var createNewGame = function (gameId) {
    // Return the Room ID (gameId) and the socket ID (mySocketId) to the browser client
    console.log("sdf");
    gameSocket.emit('createNewGame', {
        gameId: gameId,
        mySocketId: gameSocket.id
    });
    // Join the Room and wait for the other player
    gameSocket.join(gameId);
    console.log(io.sockets.adapter.rooms);
    io.to(gameId).emit('hi');
};
var newMove = function (move) {
    /**
     * First, we need to get the room ID in which to send this message.
     * Next, we actually send this message to everyone except the sender
     * in this room.
     */
    console.log(JSON.stringify(move));
    var gameId = move.gameId;
    io.to(gameId).emit('opponent move', move);
};
var onDisconnect = function () {
    var i = gamesInSession.indexOf(gameSocket);
    gamesInSession.splice(i, 1);
};
var requestUserName = function (gameId) {
    io.to(gameId).emit('give userName', gameSocket.id);
};
var recievedUserName = function (data) {
    console.log(data);
    data.socketId = gameSocket.id;
    io.to(data.gameId).emit('get Opponent UserName', data);
};
exports.default = initializeGame;
