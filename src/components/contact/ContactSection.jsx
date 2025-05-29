import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Section from "../shared/Section";
import Globe from "../shared/Globe";
import TechsBox from "../resume/TechsBox";
import { contacts } from "../../data/techCollections";
import AnimatedText from "../shared/AnimatedText";

export default function ContactSection() {
  const globeRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      globeRef.current,
      { y: 1000, opacity: 0 },
      {
        scrollTrigger: {
          trigger: "#contact",
          start: "top 80%",
        },
        y: 0,
        opacity: 1,
        duration: 3,
        ease: "power1.out",
      }
    );
  }, []);

  return (
    <Section
      id="contact"
      sectionClass="min-h-screen pt-25 sm:pt-40 pb-10 px-3 md:px-10 xl:px-30"
    >
      <AnimatedText text={"Contact"} trigger={"#contact"} />
      <div className="flex flex-col sm:flex-row items-center justify-center gap-10">
        <div ref={globeRef} className="flex-1 flex justify-around">
          <Globe />
        </div>
        <div className="w-full flex flex-col items-center justify-around sm:w-1/2 text-center sm:text-left">
          <AnimatedText
            text={"Im Ready to make some great experience from Worldwide"}
            textClass={"text-3xl text-center font-bold mb-10"}
            withLine={false}
            duration={1}
          />
          <TechsBox
            title={"Find me on"}
            titleClass={"text-4xl text-center font-black"}
            techs={contacts}
            logoSize={50}
            withLine={false}
          />
        </div>
      </div>
    </Section>
  );
}
