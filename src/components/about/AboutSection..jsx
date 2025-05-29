import Section from "../shared/Section";
import { useMediaQuery } from 'react-responsive'
import StoryBook from "./StoryBook";
import { useActiveSection } from "../../contexts/ActiveSectionContext";

export default function AboutSection() {
    const { activeSection } = useActiveSection()
    

    return (
        <Section id={"aboutme"} sectionClass={"min-h-screen"}>
            <div className={`flex flex-col md:flex-row pt-25 sm:pt-40 pb-10 px-3 md:px-10 xl:px-50 min-h-full`}>
                {/* {activeSection === "aboutme" && <StoryBook />} */}
                <StoryBook />
            </div>
        </Section>
    )
}