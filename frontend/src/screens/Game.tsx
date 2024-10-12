import React, { useEffect, useState } from "react";
import ChessBoard from "../components/ChessBoard";
import Button from "../components/Button";
import { useSocket } from "../hooks/useSocket";
import { Chess } from "chess.js";

export const INIT_GAME = "init_game";
export const MOVE = "move";
export const GAME_OVER = "gameover";

const Game = () => {
  const socket = useSocket();
  const [chess, setChess] = useState(new Chess());
  const [board, setBoard] = useState(chess.board());

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.onmessage = (e) => {
      const message = JSON.parse(e.data);

      console.log(message);

      switch (message.type) {
        case INIT_GAME:
          setChess(new Chess());
          setBoard(chess.board());

          console.log("inside init game");
          break;

        case MOVE: {
          const move = message.payload;
          chess.move(move)
          setBoard(chess.board())
          console.log("move happend");
          break;
        }

        case GAME_OVER:
          console.log("game over");
          break;

        default:
          console.log("inside default");
      }
    };
  }, [socket, chess]);

  const handlePlay = () => {
    socket.send(
      JSON.stringify({
        type: INIT_GAME,
      })
    );
  };

  if (!socket) return <div>Connecting...</div>;

  return (
    <section className="w-full px-5 py-5 md:px-20 md:py-10 ">
      <div className="w-full grid grid-cols-1 gap-2 md:grid-cols-2 text-white ">
        <div className="cols-span-1 w-full flex items-center justify-center ">
          <ChessBoard board={board} socket={socket} />
        </div>

        <div className="flex items-center justify-center text-white cols-span-2 w-full ">
          <Button
            onClick={handlePlay}
            title="play"
          />
        </div>
      </div>
    </section>
  );
};

export default Game;
