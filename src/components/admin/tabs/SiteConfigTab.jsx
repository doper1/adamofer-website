"use client";
import { useState } from "react";

const inputCls = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all text-sm";
const labelCls = "block text-sm text-gray-400 mb-2 font-medium";

export default function SiteConfigTab() {
  const [form, setForm] = useState({
    name: "Adam Ofer",
    subtitle: "DevOps Engineer & Software Developer",
    description: "Building robust infrastructure, elegant code, and scalable systems. Based in Israel — passionate about automation, clean architecture, and performance.",
    githubUrl: "#",
    linkedinUrl: "#",
    publicEmail: "adam@example.com",
    contactEmail: "adam.ofer@example.com",
    hobbies: "🏃 Marathon Runner, 🎹 Piano Player, ☁️ Cloud Architect, 🇮🇱 Based in Israel",
  });
  const [saved, setSaved] = useState(false);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const handleSave = (e) => {
    e.preventDefault();
    // In production, this would call a server action to persist to DB.
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <form onSubmit={handleSave} className="space-y-6 max-w-2xl">
      <div>
        <label className={labelCls}>Name / Hero Title</label>
        <input className={inputCls} value={form.name} onChange={set("name")} placeholder="Your Name" />
      </div>
      <div>
        <label className={labelCls}>Hero Subtitle</label>
        <input className={inputCls} value={form.subtitle} onChange={set("subtitle")} placeholder="Your Role" />
      </div>
      <div>
        <label className={labelCls}>Hero Description</label>
        <textarea className={`${inputCls} resize-none`} rows={3} value={form.description} onChange={set("description")} />
      </div>
      <div>
        <label className={labelCls}>GitHub URL</label>
        <input className={inputCls} value={form.githubUrl} onChange={set("githubUrl")} placeholder="https://github.com/..." />
      </div>
      <div>
        <label className={labelCls}>LinkedIn URL</label>
        <input className={inputCls} value={form.linkedinUrl} onChange={set("linkedinUrl")} placeholder="https://linkedin.com/in/..." />
      </div>
      <div>
        <label className={labelCls}>Email (shown publicly)</label>
        <input className={inputCls} type="email" value={form.publicEmail} onChange={set("publicEmail")} />
      </div>
      <div>
        <label className={labelCls}>Contact Form — Send To Email</label>
        <input className={inputCls} type="email" value={form.contactEmail} onChange={set("contactEmail")} />
      </div>
      <div>
        <label className={labelCls}>Hobbies (comma-separated: emoji label, ...)</label>
        <input className={inputCls} value={form.hobbies} onChange={set("hobbies")} placeholder="🏃 Runner, 🎹 Piano Player..." />
      </div>
      <button
        type="submit"
        className="px-8 py-3 rounded-xl font-semibold bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white transition-all duration-200 shadow-lg shadow-purple-900/30"
      >
        {saved ? "✓ Saved!" : "Save Changes"}
      </button>
    </form>
  );
}
