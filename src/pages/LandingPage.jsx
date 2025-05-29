import AboutSection from "../components/about/AboutSection.";
import ContactSection from "../components/contact/ContactSection";
import HeroSection from "../components/hero/HeroSection";
import ResumeSection from "../components/resume/ResumeSection";
import WorkSection from "../components/works/WorkSection";
import { useLoading } from "../contexts/IntroLoadingContext";


export default function LandingPage() {
  const { loading } = useLoading();

  return (
    <>
      <HeroSection loading={loading} withBg/>
      <AboutSection />
      <ResumeSection />
      <WorkSection />
      <ContactSection />
    </>
  );
}
