export default function TalkBox({ title, buttons = [] }) {
  return (
    <div
      className="text-black flex flex-col gap-2 justify-between h-full w-[110px]"
    >
      <h1 className="type-anim text-[10px] text-center">{title}</h1>
      <div className="flex flex-row justify-center gap-2 w-full">
        {buttons.map((btn, i) => (
          <button
            key={i}
            onClick={btn.onClick}
            className="text-[12px] font-bold"
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}
