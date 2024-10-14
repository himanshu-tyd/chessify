import { WebSocket } from "ws";
import { INIT_GAME, MOVE } from "./messages";
import { Game } from "./Game";

export class GameManager {
  private games: Game[];  // this will hold all the games
  private pendingUsers: WebSocket | null;  // this will hold the pending users that mean when user click on play and there is no user online it will store that user
  private users: WebSocket[];  // this will hold all the users

  constructor() {
    this.games = [];
    this.pendingUsers = null;
    this.users = [];
  }

  addUser(socket: WebSocket) {
    this.users.push(socket); 
    this.handleMessage(socket);
  }

  removeUser(socket: WebSocket) {
    this.users.filter((user) => user !== socket);

    //stop the game if there is no user left
  }

  private handleMessage(socket: WebSocket) {
    socket.on("message", (data) => {
      const message = JSON.parse(data.toString());

      if (message.type === INIT_GAME) {
        if (this.pendingUsers) {
          const newGame = new Game(this.pendingUsers, socket);

          this.games.push(newGame);
          this.pendingUsers = null;
          
        } else {
          this.pendingUsers = socket;
        }
      }

      if (message.type === MOVE) {
        console.log("inside move");

        const game = this.games.find(
          (g) => g.player1 == socket || g.player2 == socket
        );
        if (game) {
          console.log("inside game");
          game.makeMove(socket, message.payload.move);
        }
      }
    });
  }
}
