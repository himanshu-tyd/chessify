import React, { useState } from "react";
import { Square, PieceSymbol, Color } from "chess.js";
import { MOVE } from "../screens/Game";

interface boardProps {
  chess: any;
  setBoard: any;
  board: ({
    square: Square;
    type: PieceSymbol;
    color: Color;
  } | null)[][];
  socket: WebSocket;
}

const ChessBoar = ({ chess, setBoard, board, socket }: boardProps) => {
  const [from, setFrom] = useState<null | Square>(null);
  const [to, setTo] = useState<null | Square>(null);

  const handleClick = (
    square: {
      square: Square;
      type: PieceSymbol;
      color: Color;
    } | null,
    sr: Square
  ) => {
    if (!from) {
      setFrom(sr);
    } else {
      try {
        socket.send(
          JSON.stringify({
            type: MOVE,
            payload: {
              move:{
                from,
                to: sr,

              }
            },
          })
        );

        setFrom(null);
        chess.move({
          from,
          to: sr,
        });
        setBoard(chess.board());
        console.log({
          from,
          to: sr,
        });
      } catch (e) {
        console.log("invalid move", e);
      }
    }
  };

  return (
    <div className="text-black ">
      {board.map((row, i) => {
        return (
          <div key={i} className="flex ">
            {row.map((s, j) => {
              const squareRepresentation = (String.fromCharCode(65 + (j % 8)) +
                "" +
                (8 - i)) as Square;

              return (
                <div
                  onClick={() => handleClick(s, squareRepresentation)}
                  key={j}
                  className={`w-12 h-12 md:w-16 md:h-16 flex  items-center justify-center drop-shadow-md ${
                    (i + j) % 2 == 0 ? "bg-[#739552]" : "  bg-[#EBECD0]  "
                  }`}
                >
                  {s ? s.type : ""}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default ChessBoar;
