import { useCallback } from "react";
import gsap from "gsap";
// import { openAnimation, closeAnimation } from "./animations";

export const useAssistantHandlers = ({
  imgRef,
  talkRef,
  container,
  isSmallScreen,
  setPosition,
  setActive,
  activeSection,
  position,
}) => {
  const flyToTop = useCallback(() => {
    closeAnimation(imgRef, talkRef);
    gsap.to(container.current, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.4,
      ease: "power2.out",
      onComplete: () => {
        setPosition("top");
      },
    });
  }, [imgRef, talkRef, container, setPosition]);

  const flyToCenter = useCallback(() => {
    const containerHeight = container.current.getBoundingClientRect().height;
    gsap.to(container.current, {
      y: isSmallScreen
        ? window.innerHeight / 2 + 20
        : window.innerHeight / 2 - containerHeight / 2,
      scale: isSmallScreen ? 2.5 : 3,
      duration: 0.4,
      ease: "power2.out",
      onComplete: () => {
        setPosition("center");
        openAnimation(imgRef, talkRef, isSmallScreen);
      },
    });
  }, [imgRef, talkRef, container, isSmallScreen, setPosition]);

  const openAnimation = useCallback(() => {
    gsap.to(imgRef.current, {
      rotateY: 12,
      x: isSmallScreen ? -40 : -70,
      duration: 0.2,
      ease: "power1.in",
    });

    gsap.fromTo(
      talkRef.current,
      { y: -80, x: -80 },
      {
        scale: isSmallScreen ? 0.7 : 1,
        opacity: 1,
        x: isSmallScreen ? -35 : 0,
        y: isSmallScreen ? -150 : -100,
        display: "block",
        duration: 0.4,
        ease: "power1.in",
      }
    );
  }, [imgRef, talkRef, isSmallScreen]);

  const closeAnimation = useCallback(() => {
    gsap.to(imgRef.current, {
      rotateY: 0,
      x: 0,
      duration: 0.1,
      ease: "power2.out",
    });

    gsap.to(talkRef.current, {
      scale: 0,
      opacity: 0,
      x: 0,
      y: 0,
      display: "none",
      duration: 0.1,
      ease: "power2.out",
    });
  }, [imgRef, talkRef]);

  const onClick = useCallback(() => {
    if (position === "center") {
      if (activeSection === "aboutme") setActive("bio");
      flyToTop();
    } else {
      if (activeSection === "aboutme") setActive(false);
      flyToCenter();
    }
  }, [position, activeSection, setActive, flyToTop, flyToCenter]);

  return { flyToTop, flyToCenter, onClick };
};
