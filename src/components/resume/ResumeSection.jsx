import Section from "../shared/Section";
import TechsBox from "./TechsBox";
import {
  frontend,
  beckend,
  otherTechs,
  inProgress,
} from "../../data/techCollections";
import AnimatedText from "../shared/AnimatedText";
import DownloadButton from "./DownloadButton";


export default function ResumeSection() {
  
  return (
    <Section id={"resume"} sectionClass={"min-h-screen"}>
      <div className="flex flex-col pt-25 sm:pt-30 pb-10 px-2 md:px-10 xl:px-30 min-h-full">
        <AnimatedText text={"Resume"} trigger={"#resume"} />
        <DownloadButton />
        <div className="p-3 sm:p-20">
          <AnimatedText
            text={"Technologies I Use to Build Scalable, Efficient, and Maintainable Software"}
            withLine={false}
            textElement={"p"}
            duration={1}
            textClass={"text-xl sm:text-4xl font-bold text-center mb-10"}
          />

          <div className="flex flex-col gap-5 sm:gap-15">
            <TechsBox title={"UI & Frontend Tools"} techs={frontend} logoSize={60} />
            <TechsBox title={"The Engine Behind the Application"} techs={beckend} logoSize={60} />
            <TechsBox
              title={"Additional Tools I’ve Worked With"}
              techs={otherTechs}
              logoSize={60}
            />
            <TechsBox
              title={"What I’m Diving Into Right Now"}
              techs={inProgress}
              logoSize={60}
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
