import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

export default function MotionBg() {
  const bgRef = useRef(null);

  useGSAP(() => {
    const anim = gsap.to(bgRef.current, {
      scale: 2,
      duration: 20,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
      paused: true, // დავაპაუზებთ თავიდანვე
    });

    ScrollTrigger.create({
      trigger: bgRef.current,
      start: "top bottom",
      end: "bottom top",
      scroller: "#smooth-wrapper",
      animation: anim,
      toggleActions: "play pause play pause",
    });
  }, []);

  return (
    <>
      <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10" />
      <div
        ref={bgRef}
        className="absolute top-0 left-0 w-full h-full"
        style={{
          backgroundImage: `url("/src/assets/hero-bg.webp")`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          willChange: "transform",
        }}
      />
    </>
  );
}
