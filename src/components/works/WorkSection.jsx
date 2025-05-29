import { useState } from "react";
import Section from "../shared/Section";
import Project from "./Project";
import AnimatedText from "../shared/AnimatedText";
import { projectsList } from "../../data/projectsList";

export default function WorkSection() {
  const [activeProject, setActiveProject] = useState(0);

  

  const handleNext = () => {
    setActiveProject((prev) => (prev + 1) % projectsList.length);
  };

  const handlePrev = () => {
    setActiveProject((prev) => (prev - 1 + projectsList.length) % projectsList.length);
  };



  return (
    <Section id={"works"} sectionClass={"min-h-screen"}>
      <div
        className={`flex flex-col pt-25 sm:pt-40 pb-10 px-3 md:px-10 xl:px-30 min-h-full`}
      >
        <AnimatedText text={"Projects"} trigger={"#works"}/>
        
        <Project project={projectsList[activeProject]} handleNext={handleNext} handlePrev={handlePrev}/>
      </div>
    </Section>
  );
}
