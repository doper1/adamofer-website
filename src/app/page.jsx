"use client";
import HeroSection from "@/components/portfolio/HeroSection";
import ExpertiseSection from "@/components/portfolio/ExpertiseSection";
import ProjectsSection from "@/components/portfolio/ProjectsSection";
import ExperienceSection from "@/components/portfolio/ExperienceSection";
import PhotosSection from "@/components/portfolio/PhotosSection";
import CertificatesSection from "@/components/portfolio/CertificatesSection";
import ContactSection from "@/components/portfolio/ContactSection";
import NavBar from "@/components/portfolio/NavBar";

export default function Home() {
  return (
    <div className="bg-[#030014] min-h-screen text-white font-sans">
      <NavBar />
      <HeroSection />
      <CertificatesSection />
      <ExpertiseSection />
      <ProjectsSection />
      <ExperienceSection />
      <PhotosSection />
      <ContactSection />
      <footer className="text-center py-8 text-gray-600 text-sm border-t border-white/5">
        <span className="bg-gradient-to-r from-purple-400 to-violet-500 bg-clip-text text-transparent font-semibold">Adam Ofer</span> © {new Date().getFullYear()} — All rights reserved.
      </footer>
    </div>
  );
}