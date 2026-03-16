"use client";
import { useState } from "react";
import Link from "next/link";
import { useUser, SignOutButton } from "@clerk/nextjs";
import {
  BarChart2,
  Settings,
  Award,
  BookOpen,
  Rocket,
  Briefcase,
  Image as ImageIcon,
  LogOut,
  ArrowLeft
} from "lucide-react";

export default function AdminLayout({ children, currentTab, setCurrentTab }) {
  const { user } = useUser();
  
  const tabs = [
    { id: "stats", label: "Stats", icon: BarChart2 },
    { id: "config", label: "Site Config", icon: Settings },
    { id: "certificates", label: "Certificates", icon: Award },
    { id: "skills", label: "Skills", icon: BookOpen },
    { id: "projects", label: "Projects", icon: Rocket },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "photos", label: "Photos", icon: ImageIcon },
  ];

  return (
    <div className="bg-[#030014] min-h-screen text-white flex flex-col font-sans">
      {/* Top Header */}
      <header className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-black/40 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-violet-500 bg-clip-text text-transparent">
            AO
          </span>
          <span className="text-gray-500 text-lg">/ Admin</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-gray-400 text-sm hidden sm:inline">
            {user?.primaryEmailAddress?.emailAddress || "Admin"}
          </span>
          <div className="flex items-center gap-3">
            <Link href="/" className="text-gray-400 hover:text-white text-sm flex items-center gap-1 border border-white/10 rounded-full px-3 py-1 hover:bg-white/5 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Site
            </Link>
            <SignOutButton>
              <button className="text-gray-400 hover:text-white text-sm flex items-center gap-1 transition-colors">
                 Logout
              </button>
            </SignOutButton>
          </div>
        </div>
      </header>

      <div className="flex flex-1 flex-col md:flex-row overflow-hidden">
        {/* Sidebar - Desktop only */}
        <aside className="hidden md:flex w-56 border-r border-white/10 bg-black/20 flex-col p-4 overflow-y-auto">
          <nav className="flex flex-col gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = currentTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setCurrentTab(tab.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-purple-600/20 text-purple-300 border border-purple-500/30 shadow-lg shadow-purple-900/20"
                      : "text-gray-400 hover:text-gray-200 hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-purple-400" : "text-gray-500"}`} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Mobile Navigation - Horizontal Scroll */}
        <nav className="md:hidden flex overflow-x-auto border-b border-white/10 bg-black/20 p-2 gap-2 no-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setCurrentTab(tab.id)}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg text-[10px] font-medium transition-all duration-200 whitespace-nowrap min-w-[70px] ${
                  isActive
                    ? "bg-purple-600/20 text-purple-300 border border-purple-500/30"
                    : "text-gray-500 hover:text-gray-300"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-purple-400" : "text-gray-500"}`} />
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-gradient-to-br from-transparent to-purple-950/10">
          <div className="max-w-5xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
