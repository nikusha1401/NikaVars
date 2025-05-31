import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import MotionBg from "../shared/MotionBg";
import Section from "../shared/Section";
import ScrollButton from "../shared/ScrollButton";

const HeroSection = ({ withBg, loading }) => {
  const buttonRef = useRef(null);
  const container = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      defaults: { ease: "sine.inOut" },
      scrollTrigger: {
        trigger: container.current,
        toggleActions: "restart none none none",
        start: "top 80%",
      },
    });
    tl.from(container.current, {
      opacity: 0,
      y: 50,
      duration: 1,
    });
  }, [loading, buttonRef, container]);

  return (
    <Section
      id={"hero"}
      sectionClass={"relative w-full overflow-hidden h-screen"}
    >
      {withBg && <MotionBg />}
      {!loading && (
        <>
          <div
            ref={container}
            className="relative z-20 flex flex-col items-center justify-center h-full text-white text-center px-4 max-w-80%"
          >
            
            <div className="flex flex-col font-bold gap-1">
              <span className="text-xl xs:text-2xl sm:text-3xl ">
                Hi, I'm
              </span>
              <span className="text-xl xs:text-3xl sm:text-3xl">
                Nika Varsimashvili
              </span>
              <span className="text-2xl xs:text-4xl sm:text-7xl">
                Full-Stack Developer
              </span>
              <span className="text-2xl xs:text-4xl sm:text-7xl">
                &
              </span>
              <span className="text-2xl xs:text-4xl sm:text-7xl">
                UI/UX designer
              </span>
            </div>
            <p className="text-lg md:text-2xl mt-4">
              building innovative projects is my passion
            </p>

            <ScrollButton
              text={"About Me"}
              buttonClass="mt-6 px-6 py-2 font-bold bg-white text-black rounded-full  hover:bg-[#18ff61] transition cursor-pointer"
              idSelector={"#about"}
            />
          </div>
        </>
      )}
    </Section>
  );
};

export default HeroSection;
