"use client";
import { useState, useEffect } from "react";
import { getSiteConfig, updateSiteConfig } from "@/app/actions";

const FIELDS = [
  { key: "name", label: "Name", type: "text" },
  { key: "subtitle", label: "Subtitle", type: "text" },
  { key: "description", label: "Description", type: "textarea" },
  { key: "github_url", label: "GitHub URL", type: "text" },
  { key: "linkedin_url", label: "LinkedIn URL", type: "text" },
  { key: "public_email", label: "Public Email", type: "text" },
  { key: "contact_email", label: "Contact Email", type: "text" },
  { key: "hobbies", label: "Hobbies", type: "textarea" },
];

export default function SiteConfigTab() {
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    getSiteConfig().then((res) => {
      if (res.success) setForm(res.data || {});
      setLoading(false);
    });
  }, []);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setStatus(null);
  };

  const handleSave = async () => {
    setSaving(true);
    setStatus(null);
    try {
      const res = await updateSiteConfig(form);
      setStatus(res.success ? "saved" : "error");
    } catch {
      setStatus("error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-purple-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl space-y-5">
      {FIELDS.map(({ key, label, type }) => (
        <div key={key} className="flex flex-col gap-1.5">
          <label className="text-sm text-gray-400">{label}</label>
          {type === "textarea" ? (
            <textarea
              rows={3}
              value={form[key] || ""}
              onChange={(e) => handleChange(key, e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm resize-none focus:outline-none focus:border-purple-500"
            />
          ) : (
            <input
              type="text"
              value={form[key] || ""}
              onChange={(e) => handleChange(key, e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-500"
            />
          )}
        </div>
      ))}

      <div className="flex items-center gap-4 pt-2">
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white text-sm font-medium rounded-lg transition-colors"
        >
          {saving ? "Saving..." : "Save"}
        </button>
        {status === "saved" && <span className="text-green-400 text-sm">Saved successfully</span>}
        {status === "error" && <span className="text-red-400 text-sm">Failed to save</span>}
      </div>
    </div>
  );
}
