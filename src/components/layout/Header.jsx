import Menu from "./Menu";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useScrollSmoother } from "../../contexts/ScrollSmootherContext";
import Assistent from "../assistent/Assistent";
import { useActiveSection } from "../../contexts/ActiveSectionContext";

export default function Header() {
  const smoother = useScrollSmoother();
  const { activeSection } = useActiveSection();

  useGSAP(() => {
    gsap.from("#header", {
      opacity: 0,
      y: -50,
      duration: 1.5,
      ease: "power2.out",
    });
  }, []);

  useGSAP(() => {
    if (activeSection !== "hero") {
      gsap.to("#header-overlay", { opacity: 1, duration: 0.4 });
    } else {
      gsap.to("#header-overlay", { opacity: 0, duration: 0.4 });
    }
  }, [activeSection]);

  return (
    <header
      id="header"
      className="pointer-events-none top-0 fixed px-2 sm:px-6 py-2 sm:py-6 flex flex-row bg-transparent justify-between items-center z-200 w-full"
    >
      <div
        id={"header-overlay"}
        className="w-full absolute top-0 left-0 h-full opacity-0 bg-black"
      ></div>
      <div
        id="logo"
        className="scale-80 sm:scale-100 pointer-events-auto z-50 cursor-pointer"
        onClick={() => {
          smoother?.scrollTo(0, true);
        }}
      >
        <img src="/assets/logo-white.svg" alt="" width={80} className="z-200" />
      </div>
      {<Assistent />}
      <Menu />
    </header>
  );
}
