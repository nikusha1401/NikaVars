import React, { useState, useRef, useEffect } from "react";
import { Spin as Hamburger } from "hamburger-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";


export default function Menu() {
  const [isOpen, setOpen] = useState(false);
  const [isMenuVisible, setMenuVisible] = useState(false); // დამატებითი სტეიტი
  const menuRef = useRef(null);
  const linksRef = useRef([]);

  // როცა ღილაკს ვაჭერთ
  const handleToggle = (nextState) => {
    if (nextState) {
      setMenuVisible(true); // გახსნისას პირდაპირ ვაჩენთ
    }
    setOpen(nextState);
  };

  useGSAP(() => {
    if (isOpen && isMenuVisible) {
      const tl = gsap.timeline();

      tl.fromTo(
        menuRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, transformOrigin: "center center", duration: 0.4, ease: "power2.out" }
      );

      tl.fromTo(
        linksRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.5,
          ease: "power3.out"
        },
        "<"
      );
    } else if (!isOpen && isMenuVisible) {
      const tl = gsap.timeline({
        onComplete: () => setMenuVisible(false) // დასრულების შემდეგ მოვშლით
      });

      tl.to(linksRef.current, {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.3,
        ease: "power2.in"
      });

      tl.to(menuRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 0.3,
        ease: "power2.in"
      }, "<"); // პარალელურად მენიუ ქრება
    }
  }, [isOpen, isMenuVisible]);

  const handleHoverEnter = (el) => {
    gsap.to(el, {
      scale: 1.1,
      rotation: 0,
      duration: 0.4,
      ease: "power2.out",
      overwrite: "auto",
      textShadow: "0 0 15px rgba(255, 255, 255, 0.2)"
    });
  };

  const handleHoverLeave = (el) => {
    gsap.to(el, {
      scale: 1,
      rotation: 0,
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto",
      textShadow: "none"
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

      {isMenuVisible && (
        <div
          ref={menuRef}
          className="fixed top-0 left-0 w-full h-screen bg-black flex flex-col items-center justify-center space-y-8 z-40"
        >
          {["About", "Resume", "Works", "Contact"].map((text, index) => (
            <h1
              key={index}
              ref={(el) => (linksRef.current[index] = el)}
              onMouseEnter={() => handleHoverEnter(linksRef.current[index])}
              onMouseLeave={() => handleHoverLeave(linksRef.current[index])}
              className="text-white text-6xl font-black cursor-pointer"
            >
              {text}
            </h1>
          ))}
        </div>
      )}
    </>
  );
}
