import Tech from "../shared/Tech";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function TechsBox({ title, titleClass, techs, withLine = true, logoSize }) {
  const boxRef = useRef(null);
  const titleRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(
    () => {
      const ctx = gsap.context(() => {
        const logos = boxRef.current.querySelectorAll(".tech-logo");
        const tl = gsap.timeline();

        tl.set(titleRef?.current, { opacity: 0, y: 50 });
        tl.set(logos, { opacity: 0, x: 40 });

        tl.to(titleRef?.current, { opacity: 1, y: 0, duration: 1 });

        tl.to(
          logos,
          {
            opacity: 1,
            x: 0,
            ease: "power2.out",
            duration: 0.4,
            stagger: 0.1,
          },
          "+=0.2"
        );

        if (withLine && lineRef.current) {
          tl.to(lineRef.current, { width: "100%", duration: 1 }, "<0.5");
        }

        ScrollTrigger.create({
          trigger: boxRef.current,
          animation: tl,
          start: "top 80%",
          toggleActions: "play pause play pause",
        });
      });

      return () => ctx.revert();
    },
    []
  );

  return (
    <div className="flex flex-col gap-10 py-2 sm:py-5" ref={boxRef}>
      {title && (
        <h1 className={titleClass || "text-2xl font-bold text-center"} ref={titleRef}>
          {title}
        </h1>
      )}

      <div className="flex flex-wrap justify-center gap-5 sm:gap-10">
        {techs?.map((tech, index) => (
          <Tech tech={tech} key={index} width={logoSize} />
        ))}
      </div>
      {withLine && (
        <div
          ref={lineRef}
          className="h-[1px] opacity-50 w-0 bg-white rounded-2xl"
        >
        </div>
      )}
    </div>
  );
}
