import Section from "../shared/Section";
import StoryBook from "./StoryBook";

export default function AboutSection() {
    

    return (
        <Section id={"aboutme"} sectionClass={"min-h-screen"}>
            <div className={`flex flex-col md:flex-row pt-25 sm:pt-30 pb-10 px-2 md:px-10 xl:px-50 min-h-full`}>
                <StoryBook />
            </div>
        </Section>
    )
}