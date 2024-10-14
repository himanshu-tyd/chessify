import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const Landing = () => {
  
  const navigation = useNavigate();

  return (
    <section className="h-screen w-full">
      <div className="mt-10 grid gird-cols-1 md:grid-cols-2 px-5 py-5 md:px-20 md:py-10">
        <div className="p-5">
          <img
            src="./chess_board.jpg"
            alt="chess"
            className="object-cover rounded-lg "
            width={500}
          />
        </div>

        <div className="w-full flex items-center flex-col text-white ">
          <h1 className="capitalize text-[38px] md:text-[42] lg:text-[48px] font-bold drop-shadow-lg">
            play chess online
          </h1>
          <h1 className="capitalize  text-[38px] md:text-[42] lg:text-[48px] font-bold  drop-shadow-lg mb-10">
            on #2 site
          </h1>

          <Button onClick={() => navigation("/game")} title={'play online '} desc="play with your friends"  >
            <img
              src="./strategy.png"
              alt="chess"
              width={56}  
              height={56}
              className="drop-shadow-xl"
            />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Landing;
