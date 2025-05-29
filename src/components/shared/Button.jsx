import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";

export default function Button({ className, handleClick, text, isActive }) {
  const buttonRef = useRef(null);
    useGSAP(() => {
        if (!buttonRef.current) return;

        gsap.set(buttonRef.current, { scaleX: 0, transformOrigin: "center" });
        gsap.to(buttonRef.current, { scaleX: 1, duration: 0.4 });
      
    }, [isActive] )
  return (
    <div>
      <button className={className} onClick={handleClick} style={{opacity: isActive ? "1" : "0.8"}}>
        {text}
      </button>
      {isActive && <div ref={buttonRef} className="h-0.5 rounded-md bg-white w-full"></div>}
    </div>
  );
}
