import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useLoading } from "../../contexts/IntroLoadingContext";

function Loader({ onComplete }) {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const progressBarRef = useRef(null);
  const progressCont = useRef(null);
  const [active, setActive] = useState(true);
  const {setLoading} = useLoading()

  useEffect(() => {
    const chars = textRef.current?.querySelectorAll(".char");
    const tl = gsap.timeline();


    // Step 1: Animate the title
    tl.to(chars, {
      opacity: 1,
      y: -50,
      stagger: 0.1,
      duration: 0.9,
      ease: "power3.out",
      onComplete: onComplete,
    });

    tl.to(progressCont.current, {
      opacity: 1,
      y: 0,
      duration: 0.5
    })
    .to(progressBarRef.current, {
      scaleX: 1,
      opacity: 1,
      duration: 0.7,
      ease: "power1.inOut",
      onComplete: () => {
        gsap.to(containerRef.current, {
          y: "-100%",
          duration: 0.8,
          ease: "power2.inOut",
          onComplete: () => {
            setLoading(false)
            setActive(false);
          },
        });
      },
    });
  }, [onComplete]);

  return (
    active && (
      <div
        ref={containerRef}
        className="loader fixed inset-0 bg-black text-white z-50 flex flex-col items-center justify-center pointer-events-none"
      >
        <h1 ref={textRef} className="text-4xl font-bold mb-6">
          {"Nika Vars".split("").map((char, i) => (
            <span key={i} className="char opacity-0 inline-block">
              {char}
            </span>
          ))}
        </h1>


        <div
          ref={progressCont}
          className="w-[30%] h-1 bg-white/20 rounded overflow-hidden opacity-0"
        >
          <div
            ref={progressBarRef}
            className="h-full bg-white origin-left scale-x-0 opacity-0"
          />
        </div>
      </div>
    )
  );
}

export default Loader;
