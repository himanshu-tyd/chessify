import { WebSocketServer } from "ws";
import { GameManager } from "./GameManager";

const wss = new WebSocketServer({ port: 8000 });

const gameManger = new GameManager();

wss.on("connection", (ws) => {

  //whenever a user connects to the server we invoke the addUser Function which is in GameManger
  gameManger.addUser(ws);

  //handling error in connection
  ws.on("error", console.error);

  ws.on("disconnect", () => {
    console.log('user disconnected')

    //when user is disconencted we remove it from the game
    gameManger.removeUser(ws);
  });
});
 