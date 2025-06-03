import { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function AnimatedText({
  text,
  textClass,
  withLine = true,
  duration = "0.5",
}) {
  const wrapperRef = useRef(null);
  const titleRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.set(titleRef.current, { opacity: 0 });
      if (withLine) {
        tl.set(lineRef.current, {
          scaleX: 0,
          transformOrigin: "center center",
        });
        tl.to(lineRef.current, {
          scaleX: 1,
          duration: duration,
        });
      }

      tl.fromTo(
        titleRef.current,
        { autoAlpha: 0, y: 50 },
        { duration: duration, autoAlpha: 1, y: 0 },
        ">"
      );

      ScrollTrigger.create({
        trigger: wrapperRef.current,
        animation: tl,
        start: "top 80%",
        markers: true,
        once: true
        });
    }, );



    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapperRef} className="flex items-center justify-center mb-5">
      <div className="flex flex-col  w-fit">
        <div
          ref={titleRef}
          className={textClass || " flex text-5xl  opacity-100"}
        >
          <span
            className={
              textClass ||
              "whitespace-nowrap text-5xl sm:text-6xl font-black"
            }
          >
            {text}
          </span>
        </div>
        {withLine && (
          <div ref={lineRef} className="h-1 bg-white rounded-md w-full"></div>
        )}
      </div>
    </div>
  );
}
