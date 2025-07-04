import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useLoading } from "../../contexts/IntroLoadingContext";
import SplitText from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

function Loader({ startRender }) {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const progressBarRef = useRef(null);
  const progressCont = useRef(null);
  const [active, setActive] = useState(true);
  const { setLoading } = useLoading();

  useGSAP(() => {
  document.fonts.ready.then(() => {
    const split = new SplitText(textRef.current, { type: "chars" });
    gsap.set(split.chars, { y: 50 });

    const tl = gsap.timeline({
      onComplete: () => {
        setLoading(false);
        setActive(false);
      }
    });

    tl.to(split.chars, {
      y: 0,
      visibility: "visible",
      stagger: 0.1,
      duration: 0.9,
      ease: "power3.out",
      onComplete: startRender
    })
      .to(progressCont.current, {
        opacity: 1,
        y: 0,
        duration: 0.5
      }, "<0.5")
      .to(progressBarRef.current, {
        scaleX: 1,
        opacity: 1,
        duration: 2,
        ease: "power1.inOut"
      }, "<0.2")
      .to(containerRef.current, {
        y: "-100%",
        duration: 0.8,
        ease: "power2.inOut"
      });
  });
}, []);




  return (
    active && (
      <div ref={containerRef} className="loader">
        <div>
          <h1
            ref={textRef}
            className="text-white text-5xl sm:text-6xl font-black invisible"
          >
            Nika Vars
          </h1>

          <div
            ref={progressCont}
            className="w-full h-1 bg-white/20 rounded overflow-hidden opacity-0 will-change-transform"
          >
            <div
              ref={progressBarRef}
              className="h-full bg-white origin-left scale-x-0 opacity-0 will-change-transform"
            />
          </div>
        </div>
      </div>
    )
  );
}

export default Loader;
