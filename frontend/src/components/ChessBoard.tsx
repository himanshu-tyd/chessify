import React, { useState } from "react";
import { Square, PieceSymbol, Color } from "chess.js";

interface boardProps {
  board: ({
    square: Square;
    type: PieceSymbol;
    color: Color;
  } | null)[][];
}



const ChessBoar = ({ board  }: boardProps , {socket}: WebSocket ) => {

  const [from,setFrom]=useState<null | Square> (null)
  const [to, setTo]=useState<null | Square>(null)


  const handleClick=(square)=>{
      if(!from){
        setFrom(square?.square ?? null)
      }else{
        try {
          
        } catch (e) {
          console.log("Error in while move",e)

            
        } 
        setTo(square?.square ?? null)
        socket.send(JSON.stringify({
          type: 'move',
          payload:{
            from,
            to
          }
        }))
      }
  }

  return (
    <div className="text-black ">
      {board.map((row, i) => {
        return (
          <div key={i} className="flex ">
            {row.map((s, j) => (
              <div
                  onClick={()=>handleClick(s)}
                key={j}
                className={`w-12 h-12 md:w-16 md:h-16 flex  items-center justify-center drop-shadow-md ${
                  (i + j) % 2 == 0 ? "bg-[#739552]" : "  bg-[#EBECD0]  "
                }`}
              >
                {s ? s.type : ""}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default ChessBoar;
