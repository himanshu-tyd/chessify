import React from "react";

interface ButtonProps {
  onClick: () => void;
  children?: React.ReactNode;
  title: string;
  desc?: string;
}

const Button = ({ onClick, children, desc, title }: ButtonProps) => {
  return (
    <button
      className="bg-[#81B64C] rounded-lg p-3 lg:w-84 hover:bg-[#8f9e80] shadow-xl w-full flex items-end justify-center gap-5"
      onClick={onClick}
    >
      {children}

      <div className="flex items-center flex-col justify-center  ">
        <h2 className="capitalize text-[38px] font-bold drop-shadow-lg ">
          {title}
        </h2>
        <p className="text-[12px] drop-shadow-lg">{desc}</p>
      </div>
    </button>
  );
};

export default Button;
