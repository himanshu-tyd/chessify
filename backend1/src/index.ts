import { WebSocketServer } from "ws";
import { GameManager } from "./GameManager";

const wss = new WebSocketServer({ port: 8000 });

const gameManger = new GameManager();

wss.on("connection", (ws) => {
  gameManger.addUser(ws);

  ws.on("error", console.error);

  ws.on("disconnect", () => {
    gameManger.removeUser(ws);
  });
});
 