"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const GameManager_1 = require("./GameManager");
const wss = new ws_1.WebSocketServer({ port: 8000 });
const gameManger = new GameManager_1.GameManager();
wss.on("connection", (ws) => {
    //whenever a user connects to the server we invoke the addUser Function which is in GameManger
    gameManger.addUser(ws);
    //handling error in connection
    ws.on("error", console.error);
    ws.on("disconnect", () => {
        console.log('user disconnected');
        //when user is disconencted we remove it from the game
        gameManger.removeUser(ws);
    });
});
