import { useEffect, useRef, useState, useMemo } from "react";
import { useMediaQuery } from "react-responsive";
import { useActiveSection } from "../../contexts/ActiveSectionContext";
import { useActiveStory } from "../../contexts/ActiveStoryContext";
import { useScrollSmoother } from "../../contexts/ScrollSmootherContext";
import TalkBox from "./TalkBox";
import Overlay from "../shared/Overlay";
import { useAssistantHandlers } from "./useAssistantHandlers";

export default function Assistant() {
  const imgRef = useRef(null);
  const talkRef = useRef(null);
  const container = useRef(null);
  const isSmallScreen = useMediaQuery({ query: "(max-width: 800px)" });
  const smoother = useScrollSmoother();

  const [position, setPosition] = useState("top");
  const { activeSection } = useActiveSection();
  const { setActive } = useActiveStory();

  const { flyToTop, onClick } = useAssistantHandlers({
    imgRef,
    talkRef,
    container,
    isSmallScreen,
    setPosition,
    setActive,
    activeSection,
    position,
  });

  useEffect(() => {
    if (position === "center") {
      smoother?.paused(true);
    } else {
      smoother?.paused(false);
    }
    return () => {
      smoother?.paused(false);
    };
  }, [position, smoother]);

  const talkContent = useMemo(
    () => ({
      about: {
        title: "Want to learn a little more about who I am?",
        buttons: [
          {
            label: "Bio",
            onClick: () => {
              setActive("bio");
              flyToTop();
            },
          },
          {
            label: "Work",
            onClick: () => {
              setActive("works");
              flyToTop();
            },
          },
          {
            label: "Hobby",
            onClick: () => {
              setActive("hobby");
              flyToTop();
            },
          },
        ],
      },
      hero: {
        title:
          "Hello, I’m Nika 😊 welcome to my portfolio. I’m always ready to assist you 👋",
      },
      works: {
        title: "Enjoyed my projects? Let’s bring your ideas to life together.",
        buttons: [
          {
            label: "Contact Me",
            onClick: () => {
              flyToTop();
              smoother?.scrollTo("#contact", true, "top");
            },
          },
        ],
      },

      contact: {
        title: "I’m here 24/7 to hear your offer — wherever you are.",
        buttons: [
          {
            label: "Email Me",
            onClick: () => {
              window.location.href = "mailto:nikavars.com@gmail.com";
            },
          },
        ],
      },

      resume: {
        title: "I believe in continuous learning and self-development.",
        buttons: [
          {
            label: "See My Projects",
            onClick: () => {
              flyToTop();
              smoother?.scrollTo("#works", true, "top");
            },
          },
        ],
      },
    }),
    [setActive, flyToTop, smoother]
  );

  const content = talkContent[activeSection] ?? talkContent["hero"];

  return (
    <>
      <Overlay active={position === "center"} />
      <div
        id="assistant"
        ref={container}
        className="fixed top-0 left-1/2 -translate-x-1/2 z-200 flex flex-col origin-center"
      >
        <div
          className="relative inline-block cursor-pointer pointer-events-none"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div
            ref={imgRef}
            className="transition flex justify-center pointer-events-auto"
            onClick={onClick}
          >
            <img
              src="/assets/about.webp"
              alt="assistant image"
              width={isSmallScreen ? "50px" : "80px"}
              height={"auto"}
            />
          </div>
          <div
            ref={talkRef}
            className="hidden absolute top-10 left-0 scale-0 opacity-0 pt-[20px] pr-[28px] pb-[112px] pl-[20px] z-30 transition pointer-events-auto"
            style={{
              backgroundImage: "url('/assets/talk.webp')",
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
            }}
          >
            {content && (
              <TalkBox title={content.title} buttons={content.buttons} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
