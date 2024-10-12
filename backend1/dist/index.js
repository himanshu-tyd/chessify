"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const GameManager_1 = require("./GameManager");
const wss = new ws_1.WebSocketServer({ port: 8000 });
const gameManger = new GameManager_1.GameManager();
wss.on("connection", (ws) => {
    gameManger.addUser(ws);
    ws.on("error", console.error);
    ws.on("disconnect", () => {
        gameManger.removeUser(ws);
    });
});
