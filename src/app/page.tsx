import { ScrollExperience } from "@/components/canvas/scroll-experience";
import { CapabilitiesPreview } from "@/components/sections/capabilities-preview";
import { ServicesSection } from "@/components/sections/services-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { AboutSection } from "@/components/sections/about-section";
import { TeamSection } from "@/components/sections/team-section";
import { ContactSection } from "@/components/sections/contact-section";

export default function Home() {
  return (
    <>
      {/* 1. Main 3D Scroll-Driven Storytelling Experience */}
      <ScrollExperience />

      {/* 2. Direct follow-up section confirming continuous scroll */}
      <CapabilitiesPreview />

      {/* 3. Corporate sections for exploration */}
      <ServicesSection />
      <ProjectsSection />
      <AboutSection />
      <TeamSection />
      <ContactSection />
    </>
  );
}
