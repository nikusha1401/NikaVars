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

  // add backlinks for A-Store
  const formatText = (text) => {
    const parts = text.split(/(A-Store)/g);
    return parts.map((part, i) =>
      part === "A-Store" ? (
        <a
          key={i}
          href="https://www.a-store.ge"
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold"
          style={{textDecoration: "underline", textUnderlineOffset: 4}}
        >
          A-Store
        </a>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  };

  return (
    <div className="p-1 sm:px-20 xl:px-35 h-[50%] w-full overflow-y-auto overflow-x-hidden">
      <div id="story" ref={nodeRef} className="text-xl block space-y-4">
        {displayedText.split("\n\n").map((para, idx) => (
          <p key={idx} className="whitespace-pre-line">
            {formatText(para)}
          </p>
        ))}
      </div>
    </div>
  );
}
