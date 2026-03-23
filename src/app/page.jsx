import HeroSection from "@/components/portfolio/HeroSection";
import ExpertiseSection from "@/components/portfolio/ExpertiseSection";
import ProjectsSection from "@/components/portfolio/ProjectsSection";
import ExperienceSection from "@/components/portfolio/ExperienceSection";
import PhotosSection from "@/components/portfolio/PhotosSection";
import CertificatesSection from "@/components/portfolio/CertificatesSection";
import ContactSection from "@/components/portfolio/ContactSection";
import NavBar from "@/components/portfolio/NavBar";
import VisitLogger from "@/components/portfolio/VisitLogger";
import { getSiteConfig } from "@/app/actions";

export default async function Home() {
  let config = {};
  try {
    const result = await getSiteConfig();
    if (result.success) {
      config = result.data;
    }
  } catch (error) {
    console.error("Failed to load site config:", error);
  }

  const name = config.name || "Adam Ofer";
  const subtitle = config.subtitle || "DevOps Engineer & Software Developer";
  const description = config.description || "Building robust infrastructure, elegant code, and scalable systems.";
  const githubUrl = config.github_url || "#";
  const linkedinUrl = config.linkedin_url || "#";
  const publicEmail = config.public_email || "adam@example.com";

  return (
    <div className="bg-[#030014] min-h-screen text-white font-sans">
      <NavBar />
      <HeroSection name={name} subtitle={subtitle} description={description} />
      <CertificatesSection />
      <ExpertiseSection />
      <ProjectsSection />
      <ExperienceSection />
      <PhotosSection />
      <ContactSection githubUrl={githubUrl} linkedinUrl={linkedinUrl} publicEmail={publicEmail} />
      <footer className="text-center py-8 text-gray-600 text-sm border-t border-white/5">
        <span className="bg-gradient-to-r from-purple-400 to-violet-500 bg-clip-text text-transparent font-semibold">{name}</span> © {new Date().getFullYear()} — All rights reserved.
      </footer>
      <VisitLogger />
    </div>
  );
}
