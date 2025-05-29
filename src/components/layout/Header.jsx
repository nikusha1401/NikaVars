import react, { useRef, useState } from "react";
import Menu from "./Menu";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useActiveSection } from "../../contexts/ActiveSectionContext";

export default function Header() {
  const { activeSection } = useActiveSection();

  useGSAP(() => {
    gsap.from("#header", {
      opacity: 0,
      y: -50,
      duration: 1.5,
      ease: "power2.out",
    });
  }, []);

  return (
    <header
      id="header"
      className="pointer-events-none top-0 fixed px-4 sm:px-6 py-4 sm:py-6 flex flex-row bg-transparent justify-between z-200 w-full"
    >
      <div
        id={"header-overlay"}
        className="w-full absolute top-0 left-0 h-full opacity-0 bg-black"
        // style={{
        //   backgroundImage: "url('/src/assets/star-textured.webp')",
        //   backgroundSize: "cover",
        // }}
      ></div>
      <div id="logo" className="scale-80 sm:scale-100 pointer-events-auto">
        <img
          src="/src/assets/logo-white.svg"
          alt=""
          width={90}
          className="z-200"
        />
      </div>
      <Menu />
    </header>
  );
}
