import { useRef, useEffect } from "react";
import { useActiveSection } from "../../contexts/ActiveSectionContext";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useScrollFade } from "../../hooks/useScrollFade";

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
      },
    });

    ScrollTrigger.refresh();

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
