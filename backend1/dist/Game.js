"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const chess_js_1 = require("chess.js");
const messages_1 = require("./messages");
class Game {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.board = new chess_js_1.Chess();
        this.moves = [];
        this.startTime = new Date();
        this.player1.send(JSON.stringify({
            type: messages_1.INIT_GAME,
            payload: {
                color: "white",
            },
        }));
        this.player2.send(JSON.stringify({
            type: messages_1.INIT_GAME,
            payload: {
                color: "black",
            },
        }));
    }
    makeMove(socket, move) {
        //validate the type of move using zod
        if (this.board.moves().length % 2 === 0 && socket !== this.player1) {
            console.log('player 1 return');
            return;
        }
        if (this.board.moves().length % 2 === 1 && socket !== this.player2) {
            console.log('player 2 return');
            return;
        }
        try {
            this.board.move(move);
        }
        catch (e) {
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
            this.player1.send(JSON.stringify({
                type: messages_1.GAME_OVER,
                payload: {
                    winnder: this.board.turn() === "w" ? "black" : "white",
                },
            }));
            this.player2.send(JSON.stringify({
                type: messages_1.GAME_OVER,
                payload: {
                    winner: this.board.turn() === "w" ? "white" : "black",
                },
            }));
            return;
        }
        console.log('move conditon ', this.board.moves().length % 2 === 0);
        if (this.board.moves().length % 2 === 0) {
            console.log("player 1");
            this.player2.send(JSON.stringify({
                type: messages_1.MOVE,
                payload: move,
            }));
        }
        console.log("player 2");
        this.player1.send(JSON.stringify({
            type: messages_1.MOVE,
            payload: move,
        }));
    }
}
exports.Game = Game;
