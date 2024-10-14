import {  WebSocket } from "ws";
import { Chess } from "chess.js";
import { GAME_OVER, INIT_GAME, MOVE } from "./messages";

export class Game {
  public player1: WebSocket; 
  public player2: WebSocket;
  private board: Chess;
  private moves: string[];
  private startTime: Date;
  private moveCount=0;

  constructor(player1: WebSocket, player2: WebSocket) {
    this.player1 = player1;
    this.player2 = player2;
    this.board = new Chess();
    this.moves = [];
    this.startTime = new Date();
    this.player1.send(
      JSON.stringify({
        type: INIT_GAME,
        payload: {
          color: "white",
        },
      })
    );

    console.log('player1', this.player1)
    
    this.player2.send(
      JSON.stringify({
        type: INIT_GAME,
        payload: {
          color: "black",
        },
      })
    );
    console.log('player2', this.player2)
  }

  makeMove(
    socket: WebSocket,
    move: {
      from: string;
      to: string;
    }
  ) {

    console.log('move', move)

    //Validate the type of move using zod

    if (this.moveCount % 2 === 0 && socket !== this.player1) {
      console.log('player 1 return')
      return;
    }



    if (this.moveCount % 2 === 1 && socket !== this.player2) {
      console.log('player 2 return')
      return;
    }


    try {

      this.board.move(move);
      this.moveCount++;
      
    } catch (e) {
      console.log(e);
      return;
    }

    //validatation
    // is it this user move
    // is this valid move

    //update board
    //push the move

    //check the game is over
    if (this.board.isGameOver()) {
      this.player1.send(
        JSON.stringify({
          type: GAME_OVER,
          payload: {
            winnder: this.board.turn() === "w" ? "black" : "white",
          },
        })
      );

      this.player2.send(
        JSON.stringify({
          type: GAME_OVER,
          payload: {
            winner: this.board.turn() === "w" ? "white" : "black",
          },
        })
      );

      return;
    }

    //send update to the both playes
    if (this.moveCount % 2 === 0) {
      console.log("player 1");
      this.player2.send(
        JSON.stringify({
          type: MOVE,
          payload: move,
        })
      );
    }
      console.log("player 2");
      this.player1.send(
        JSON.stringify({
          type: MOVE,
          payload: move,
        })
      );

      this.moveCount++;
    }
    //send update to the both playes
  }

