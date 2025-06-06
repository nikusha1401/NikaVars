import React, { useRef, useState } from "react";
import { Spin as Hamburger } from "hamburger-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollButton from "../shared/ScrollButton";

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const linksRef = useRef([]);
  const tlRef = useRef(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      tlRef.current = gsap.timeline({ paused: true });

      tlRef.current
        .fromTo(
          menuRef.current,
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" }
        )
        .fromTo(
          linksRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, stagger: 0.1, duration: 0.3, ease: "power3.out" },
          ">"
        );
    }, menuRef);

    return () => ctx.revert();
  }, [isOpen]);

  const handleToggle = (next) => {
    setIsOpen(next);
    if (next) {
      tlRef.current?.play();
    } else {
      tlRef.current?.reverse();
    }
  };

  const handleHoverEnter = (el) => {
    gsap.to(el, {
      scale: 1.1,
      duration: 0.3,
      ease: "power2.out",
      textShadow: "0 0 15px rgba(255, 255, 255, 0.2)",
    });
  };

  const handleHoverLeave = (el) => {
    gsap.to(el, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
      textShadow: "none",
    });
  };

  return (
    <>
      <div className="z-50 scale-80 sm:scale-100 pointer-events-auto">
        <Hamburger
          toggled={isOpen}
          toggle={handleToggle}
          size={44}
          rounded
          distance="lg"
          duration={0.5}
          color="#ffffff"
        />
      </div>

      <div
        ref={menuRef}
        className={`fixed top-0 left-0 w-full h-screen bg-black flex flex-col items-center justify-center space-y-8 pointer-events-auto ${
          isOpen ? "block" : "hidden"
        }`}
      >
        {["About", "Resume", "Works", "Contact"].map((text, index) => (
          <ScrollButton
            key={index}
            text={text}
            idSelector={`#${text.toLowerCase()}`}
            ref={(el) => (linksRef.current[index] = el)}
            onMouseEnter={() => handleHoverEnter(linksRef.current[index])}
            onMouseLeave={() => handleHoverLeave(linksRef.current[index])}
            onScroll={() => handleToggle(false)}
            buttonClass="text-white text-6xl md:text-8xl font-black cursor-pointer"
          />
        ))}
      </div>
    </>
  );
}
