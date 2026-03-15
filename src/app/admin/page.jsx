"use client";
import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useUser } from "@clerk/nextjs";
import { getDashboardStats } from "@/app/actions";
import SiteConfigTab from "@/components/admin/tabs/SiteConfigTab";
import CertificatesTab from "@/components/admin/tabs/CertificatesTab";
import SkillsTab from "@/components/admin/tabs/SkillsTab";
import ProjectsTab from "@/components/admin/tabs/ProjectsTab";
import ExperienceTab from "@/components/admin/tabs/ExperienceTab";
import PhotosTab from "@/components/admin/tabs/PhotosTab";

export default function Admin() {
  const [currentTab, setCurrentTab] = useState("stats");
  const { user, isLoaded } = useUser();
  const [stats, setStats] = useState({ totalVisits: 0, uniqueVisitors: 0, chartData: [...Array(14)].map(() => 0) });

  useEffect(() => {
    if (isLoaded && user && currentTab === "stats") {
      getDashboardStats().then(setStats);
    }
  }, [isLoaded, user, currentTab]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#030014] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-purple-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  const tabTitles = {
    stats: "Site Statistics",
    config: "Site Configuration",
    certificates: "Manage Certificates",
    skills: "Manage Skills",
    projects: "Manage Projects",
    experience: "Manage Experience",
    photos: "Manage Photos",
  };

  return (
    <AdminLayout currentTab={currentTab} setCurrentTab={setCurrentTab}>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          {tabTitles[currentTab]}
        </h1>
      </div>

      {currentTab === "stats" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center">
              <span className="text-5xl font-extrabold text-purple-400 mb-2">{stats.totalVisits}</span>
              <span className="text-gray-500 font-medium">Total Visits</span>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center">
              <span className="text-5xl font-extrabold text-purple-400 mb-2">{stats.uniqueVisitors}</span>
              <span className="text-gray-500 font-medium">Unique Visitors</span>
            </div>
          </div>
          <div className="p-8 bg-white/5 border border-white/10 rounded-2xl">
            <p className="text-gray-400 text-sm mb-6">Daily Visits (last 14 days)</p>
            <div className="w-full h-40 flex items-end justify-between border-b border-white/10 pb-4 gap-2">
              {stats.chartData.map((val, i) => (
                <div key={i} className="w-full bg-purple-600/50 hover:bg-purple-500 transition-colors rounded-t-sm" style={{ height: `${Math.max(val, 2)}%` }}></div>
              ))}
            </div>
          </div>
        </div>
      )}

      {currentTab === "config" && <SiteConfigTab />}
      {currentTab === "certificates" && <CertificatesTab />}
      {currentTab === "skills" && <SkillsTab />}
      {currentTab === "projects" && <ProjectsTab />}
      {currentTab === "experience" && <ExperienceTab />}
      {currentTab === "photos" && <PhotosTab />}
    </AdminLayout>
  );
}
