import Section from "../shared/Section";
import TechsBox from "./TechsBox";
import {
  frontend,
  beckend,
  otherTechs,
  inProgress,
} from "../../data/techCollections";
import AnimatedText from "../shared/AnimatedText";


export default function ResumeSection() {
  
  return (
    <Section id={"resume"} sectionClass={"min-h-screen"}>
      <div className="flex flex-col pt-25 sm:pt-30 pb-10 px-2 md:px-10 xl:px-30 min-h-full">
        <AnimatedText text={"Resume"} trigger={"#resume"}/>
        <div className="p-3 sm:p-20">
          <AnimatedText
            text={"The technologies I use for building client-side applications"}
            withLine={false}
            duration={1}
            textClass={"text-2xl sm:text-4xl font-bold text-center mb-10"}
          />

          <div className="flex flex-col gap-5 sm:gap-15">
            <TechsBox title={"Frontend Stack"} techs={frontend} logoSize={60} />
            <TechsBox title={"Beckend Stack"} techs={beckend} logoSize={60} />
            <TechsBox
              title={"Other techs I have some experience"}
              techs={otherTechs}
              logoSize={60}
            />
            <TechsBox
              title={"tech I am going to learn soon"}
              techs={inProgress}
              logoSize={60}
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
