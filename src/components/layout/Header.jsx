import Menu from "./Menu";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useScrollSmoother } from "../../contexts/ScrollSmootherContext";
import Assistent from "../assistent/Assistent";

export default function Header() {
  const smoother = useScrollSmoother()
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
      className="pointer-events-none top-0 fixed px-2 sm:px-6 py-2 sm:py-6 flex flex-row bg-transparent justify-between items-center z-200 w-full"
    >
      <div
        id={"header-overlay"}
        className="w-full absolute top-0 left-0 h-full opacity-0 bg-black"
      ></div>
      <div id="logo"
        className="scale-80 sm:scale-100 pointer-events-auto z-50 cursor-pointer"
        onClick={() => smoother?.scrollTo("resume", true, "top")}
      >
        <img src="/assets/logo-white.svg" alt="" width={80} className="z-200" />
      </div>
      {<Assistent />}
      <Menu />
    </header>
  );
}
