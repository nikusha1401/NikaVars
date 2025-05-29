import { useRef, useEffect, useState } from "react";
import gsap from "gsap";

export default function StoryText({ text, active }) {
  const nodeRef = useRef(null);
  const [displayedText, setDisplayedText] = useState(text);
  const [prevActive, setPrevActive] = useState(active);

  useEffect(() => {
    if (active === prevActive) return;

    const el = nodeRef.current;

    gsap.to(el, {
      opacity: 0,
      x: -300,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        setDisplayedText(text); 
        gsap.fromTo(
          el,
          { opacity: 0, x: 300 },
          { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" }
        );
      },
    });

    setPrevActive(active);
  }, [active, text, prevActive]);

  return (
    <div className="p-1 sm:p-6 h-[50%] w-full overflow-y-auto overflow-x-hidden sm:text-center">
      <span id="story" ref={nodeRef} className="text-xl block">
        {displayedText}
      </span>
    </div>
  );
}
