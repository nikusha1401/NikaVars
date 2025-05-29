import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "../shared/Button";
import SplitText from "gsap/SplitText";
import Typed from "typed.js";
import TechsBox from "../resume/TechsBox";

export default function Project({ project, handleNext, handlePrev }) {
  const titleRef = useRef(null);
  const imgRef = useRef(null);
  const roleContRef = useRef(null);
  const roleRef = useRef(null);
  const textRef = useRef(null);
  const btnRef = useRef(null);
  const navRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    const x = e.changedTouches[0].clientX;
    const y = e.changedTouches[0].clientY;
    const deltaX = x - touchStartX.current;
    const deltaY = y - e.changedTouches[0].clientY;

    touchEndX.current = x;

    const angle = Math.abs(deltaY / deltaX); 

    if (angle < 0.4) {
      e.preventDefault(); // ეს წყვეტს ვერტიკალურ scroll-ს
    }
  };

  const handleTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      handleNext(); // swipe left
    } else if (distance < -minSwipeDistance) {
      handlePrev(); // swipe right
    }
  };

  const colors = ["yellow", "green", "purple"];

  useEffect(() => {
    const typed = new Typed(roleRef.current, {
      strings: project.roles,
      typeSpeed: 80,
      backSpeed: 30,
      backDelay: 2000,
      smartBackspace: false,
      showCursor: false,
      loop: true,
      preStringTyped: (arrayPos, self) => {
        if (roleRef.current) {
          roleRef.current.style.color = colors[arrayPos];
        }
      },
    });

    if (textRef.current) {
      textRef.current.innerHTML = project.text;
    }

    const ctx = gsap.context(() => {
      const split = new SplitText(textRef.current, {
        type: "words",
      });

      const tl = gsap.timeline();
      tl.set(imgRef.current, { opacity: 0, x: -60 });

      tl.from(titleRef.current, { opacity: 0, y: 50, duration: 0.8 })
        .from(
          split.words,
          {
            opacity: 0,
            y: 0,
            stagger: 0.05,
            autoAlpha: 1,
            ease: "none",
            duration: 0.1,
          },
          "<"
        )
        .to(imgRef.current, { opacity: 1, x: 0, duration: 1 }, "<0.1")
        .from(roleContRef.current, { opacity: 0, x: 100, duration: 1 }, "<")
        .from(".logos", { opacity: 0, duration: 0.8 }, "<0.2")
        .from(btnRef.current, { opacity: 0, y: 50, duration: 0.6 }, "<")
        .from(navRef.current, { opacity: 0, y: 50, duration: 0.8 }, "<");

      ScrollTrigger.create({
        trigger: "#works",
        animation: tl,
        start: "10% center",
        toggleActions: "play pause play pause",
      });
    });

    return () => {
      ctx.revert();
      typed.destroy();
    };
  }, [project]);

  return (
    <div
      className="relative px-5 touch-pan-y"
      style={{ touchAction: "pan-y" }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="font-bold w-full text-center  py-2 flex justify-start gap-2"
        ref={roleContRef}
      >
        <span className="text-xl md:text-3xl py-1 md:py-2">My Role:</span>
        <span className="text-2xl md:text-4xl font-black" ref={roleRef}></span>
      </div>

      <div className="flex flex-col md:flex-row gap-2 md:gap-15 xl:gap-20">
        <div
          ref={imgRef}
          className="overflow-hidden xl flex items-center justify-center"
        >
          <img
            src={project.img}
            alt={project.img}
            loading="lazy"
            className="rounded-md sm:rounded-xl w-[600px] md:w-[700px] lg:w-[800px]"
          />
        </div>
        <div className="flex flex-col gap-5 md:gap-7 xl:gap-10 justify-center items-center flex-1/3">
          <h1
            ref={titleRef}
            className="text-3xl md:text-2xl lg:text-4xl text-center font-bold py-1"
          >
            {project.name}
          </h1>

          <div>
            <p ref={textRef} className="text-xl sm:text-lg text-center">
              {project.text}
            </p>
          </div>

          <div className="logos">
            <TechsBox techs={project.techs} logoSize={25} withLine={false} />
          </div>

          <div
            ref={btnRef}
            className="flex flex-row gap-10 sm:gap-5 xl:gap-10 text-nowrap"
          >
            <Button
              text={"View Live"}
              className={
                "border-1 text-md sm:text-lg px-3 md:px-5 py-0.5 rounded-full hover:bg-white  hover:text-black transition cursor-pointer"
              }
            />
            <Button
              text={"Git Repo"}
              className={
                "border-1 text-md sm:text-lg  px-3 md:px-5 py-0.5 rounded-full hover:bg-white  hover:text-black transition cursor-pointer"
              }
            />
          </div>
          <div ref={navRef} className="flex justify-center gap-4">
            <button onClick={handlePrev} className="">
              ← Prev
            </button>
            <button onClick={handleNext} className="">
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
