import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function useScrollFade(ref) {
  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    const trigger = ScrollTrigger.create({
      trigger: element,
      start: "bottom center",
      end: "bottom top",
      scroller: "#smooth-wrapper",
      invalidateOnRefresh: true,
      scrub: true,
      id: "fade",
      animation: gsap.to(element, {
        opacity: 0,
        overwrite: true,
      })
    });

    return () => trigger.kill();
  }, [ref]);
}
