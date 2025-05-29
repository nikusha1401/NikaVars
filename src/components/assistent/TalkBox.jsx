import React from "react";

export default function TalkBox({ title, buttons = [] }) {
  return (
    <div
      className="text-black flex flex-col justify-around h-full w-[110px]"
    >
      <h1 className="type-anim text-[12px] text-center">{title}</h1>
      <div className="flex flex-row justify-center gap-2 w-full">
        {buttons.map((btn, i) => (
          <button
            key={i}
            onClick={btn.onClick}           
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}
