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
        { duration: 0.5, autoAlpha: 1, y: 0 },
        ">"
      );

      ScrollTrigger.create({
        trigger: wrapperRef.current,
        animation: tl,
        start: "top 80%",
        toggleActions: "play pause play pause",
      });
    }, wrapperRef);

     setTimeout(() => {
    ScrollTrigger.refresh();
  }, 100);

    return () => ctx.revert();
  }, [wrapperRef]);

  return (
    <div ref={wrapperRef} className="flex items-center justify-center">
      <div className="flex flex-col  w-fit">
        <div
          ref={titleRef}
          className={textClass || " flex text-5xl  opacity-100"}
        >
          <span
            className={
              textClass ||
              "whitespace-nowrap xs:text-6xl md:text-6xl font-black"
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
