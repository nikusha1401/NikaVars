import React, { useRef, useEffect, useState } from "react";
import { useActiveSection } from "../../contexts/ActiveSectionContext";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useScrollFade } from "../../hooks/useScrollFade";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Section({ id, sectionClass, children }) {
  const { activeSection, setActiveSection } = useActiveSection();
  const sectionRef = useRef(null);
  useScrollFade(sectionRef);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 40%",
      end: "bottom center",
      scroller: "#smooth-wrapper",
      scrub: true,
      onToggle: (self) => {
        if (self.isActive) {
          setActiveSection(id);
        }

        // ჰედერის გაშუქების კონტროლი
        if (activeSection !== "hero") {
          gsap.to("#header-overlay", { opacity: 1, duration: 0.4 });
        } else {
          gsap.to("#header-overlay", { opacity: 0, duration: 0.4 });
        }
      },
    });

    ScrollTrigger.refresh()

    return () => {
      trigger.kill();
    };
  }, [id, activeSection, setActiveSection]);

  return (
    <section ref={sectionRef} id={id} className={sectionClass}>
      {children}
    </section>
  );
}
