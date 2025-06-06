import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { Transition } from "react-transition-group";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useActiveStory } from "../../contexts/ActiveStoryContext";
import ScrollButton from "../shared/ScrollButton";
import StoryText from "./StoryText";
import Button from "../shared/Button";
import { storys } from "./StorysMap";
import AnimatedText from "../shared/AnimatedText";
import { useActiveSection } from "../../contexts/ActiveSectionContext";


function StoryBook() {
  const nodeRef = useRef(null);
  const { active, setActive } = useActiveStory();
  const scrollBtnRef = useRef(null);

  useEffect(() => {
    let ctx;
    const loadSplitText = async () => {
      const { SplitText } = await import("gsap/SplitText");

      ctx = gsap.context(() => {
        const splitTarget = document.querySelector("#story");
        if (!splitTarget) return;

        const split = new SplitText(splitTarget, { type: "words" });
        const tl = gsap.timeline();

        tl.set("#buttons-cont", { opacity: 0, y: -30 });
        tl.set(scrollBtnRef.current, { opacity: 0, y: 30 });

        tl.from(split.words, {
          opacity: 0,
          stagger: 0.04,
          duration: 0.4,
          ease: "power2.out",
        }, "+=0.5")
          .to(scrollBtnRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.in"
          }, "<0.5")
          .to("#buttons-cont", {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "bounce.out"
          }, "<1");

        ScrollTrigger.create({
          trigger: "#story-book",
          animation: tl,
          start: "top 80%",
          once: true
        });
      });
    };

    loadSplitText();
    return () => ctx && ctx.revert();
  }, []);

  const onEnter = useCallback(() => {
    gsap.fromTo(
      nodeRef.current,
      { opacity: 0, x: 100 },
      { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" }
    );
  }, []);

  const onExit = useCallback(() => {
    gsap.to(nodeRef.current, {
      opacity: 0,
      x: 300,
      duration: 0.3,
      ease: "power2.inOut"
    });
  }, []);

  return (
    <Transition
      nodeRef={nodeRef}
      onEnter={onEnter}
      onExit={onExit}
      timeout={100}
      in={active}
      mountOnEnter
      unmountOnExit
    >
      {() => (
        <div ref={nodeRef} className="flex-1/3 overflow-hidden" id="story-book">
          <div className="p-5 w-full sm:border-1 relative rounded-sm flex flex-col gap-3 sm:items-center justify-evenly h-[80vh] sm:overflow-x-hidden">
            <div className="flex flex-col gap-2 w-fit">
              <AnimatedText text="ABOUT ME" trigger="#story-book" textClass={"whitespace-nowrap text-5xl sm:text-6xl font-black"} />
              <div
                id="buttons-cont"
                className="flex flex-row gap-3 sm:justify-center sm:mt-3 p-1 text-2xl"
              >
                <Button
                  handleClick={() => setActive("bio")}
                  text="Bio"
                  isActive={active === "bio"}
                />
                <Button
                  handleClick={() => setActive("works")}
                  text="Work"
                  isActive={active === "works"}
                />
                <Button
                  handleClick={() => setActive("hobby")}
                  text="Hobby"
                  isActive={active === "hobby"}
                />
              </div>
            </div>

            <StoryText text={storys[active]} active={active} />

            <div className="flex flex-row gap-5 text-nowrap" ref={scrollBtnRef}>
               <ScrollButton
                text="My Resume"
                buttonClass="border-1 px-1 xs:px-5 py-1 rounded-full hover:bg-white hover:text-black transition cursor-pointer"
                idSelector="#resume"
              />
              <ScrollButton
                text="My Projects"
                buttonClass="border-1 px-1 xs:px-5 py-1 rounded-full hover:bg-white hover:text-black transition cursor-pointer"
                idSelector="#works"
              />
             
            </div>
          </div>
        </div>
      )}
    </Transition>
  );
}

export default StoryBook;