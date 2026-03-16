"use client";
import { useState } from "react";

const INITIAL = [
  { id: 1, category: "DevOps & Cloud", icon: "☁️", items: ["Docker", "Kubernetes", "Terraform", "AWS", "CI/CD", "Ansible", "Jenkins", "Helm"] },
  { id: 2, category: "Programming", icon: "💻", items: ["Python", "JavaScript", "TypeScript", "Bash", "Go", "Node.js", "React", "REST APIs"] },
  { id: 3, category: "Infrastructure", icon: "🔧", items: ["Linux", "Nginx", "Redis", "PostgreSQL", "Monitoring", "Logging", "Networking", "Security"] },
];

const inputCls = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all text-sm";
const labelCls = "block text-xs text-gray-400 mb-1 font-medium";
const BLANK = { category: "", icon: "🛠️", items: [] };

export default function SkillsTab() {
  const [groups, setGroups] = useState(INITIAL);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(BLANK);
  const [newSkill, setNewSkill] = useState("");

  const openEdit = (g) => { setEditing(g.id); setForm({ ...g }); };
  const openNew = () => { setEditing("new"); setForm(BLANK); };
  const cancel = () => { setEditing(null); setForm(BLANK); setNewSkill(""); };

  const addSkill = () => {
    if (!newSkill.trim()) return;
    setForm({ ...form, items: [...form.items, newSkill.trim()] });
    setNewSkill("");
  };
  const removeSkill = (idx) => setForm({ ...form, items: form.items.filter((_, i) => i !== idx) });

  const save = () => {
    if (editing === "new") setGroups([...groups, { ...form, id: Date.now() }]);
    else setGroups(groups.map((g) => (g.id === editing ? { ...form, id: editing } : g)));
    cancel();
  };
  const remove = (id) => setGroups(groups.filter((g) => g.id !== id));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-gray-400 text-sm">{groups.length} skill groups</p>
        <button onClick={openNew} className="px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white transition-all shadow-lg shadow-purple-900/30">
          + Add Group
        </button>
      </div>

      {editing && (
        <div className="bg-white/5 border border-purple-500/30 rounded-2xl p-4 md:p-6 space-y-4">
          <h3 className="text-white font-semibold">{editing === "new" ? "Add Skill Group" : "Edit Skill Group"}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Category Name</label>
              <input className={inputCls} value={form.category} onChange={e => setForm({...form, category: e.target.value})} placeholder="DevOps & Cloud" />
            </div>
            <div>
              <label className={labelCls}>Icon (emoji)</label>
              <input className={inputCls} value={form.icon} onChange={e => setForm({...form, icon: e.target.value})} />
            </div>
          </div>
          <div>
            <label className={labelCls}>Skills</label>
            <div className="flex flex-wrap gap-2 mb-3">
              {form.items.map((s, i) => (
                <span key={i} className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/20 text-purple-300 text-xs">
                  {s}
                  <button onClick={() => removeSkill(i)} className="text-gray-500 hover:text-red-400 transition-colors leading-none">×</button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input className={inputCls} value={newSkill} onChange={e => setNewSkill(e.target.value)} onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addSkill())} placeholder="Add skill and press Enter..." />
              <button onClick={addSkill} type="button" className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-sm transition-colors whitespace-nowrap">Add</button>
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={save} className="px-5 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium transition-colors">Save</button>
            <button onClick={cancel} className="px-5 py-2 rounded-lg border border-white/10 text-gray-400 hover:text-white text-sm transition-colors">Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {groups.map((g) => (
          <div key={g.id} className="bg-white/5 border border-white/10 rounded-xl px-5 py-4 hover:border-purple-500/30 transition-colors group">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">{g.icon}</span>
              <p className="text-white font-semibold text-sm flex-1">{g.category}</p>
              <div className="flex gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                <button onClick={() => openEdit(g)} className="px-3 py-1.5 rounded-lg border border-white/15 text-gray-300 hover:text-white text-xs transition-colors">Edit</button>
                <button onClick={() => remove(g.id)} className="px-3 py-1.5 rounded-lg border border-red-500/30 text-red-400 hover:text-red-300 text-xs transition-colors">Delete</button>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {g.items.map((s) => (
                <span key={s} className="px-2.5 py-1 rounded-full text-xs bg-purple-500/10 border border-purple-500/20 text-purple-300">{s}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
