"use client";
import { useState } from "react";

const INITIAL = [
  { id: 1, title: "AWS Certified Solutions Architect", issuer: "Amazon Web Services", date: "2024", level: "Associate", icon: "☁️", color: "from-orange-500 to-amber-600" },
  { id: 2, title: "Certified Kubernetes Administrator", issuer: "Cloud Native Computing Foundation", date: "2024", level: "Professional", icon: "⚙️", color: "from-blue-500 to-cyan-600" },
  { id: 3, title: "AWS Certified DevOps Engineer", issuer: "Amazon Web Services", date: "2023", level: "Professional", icon: "🔧", color: "from-orange-600 to-red-600" },
  { id: 4, title: "Terraform Associate", issuer: "HashiCorp", date: "2023", level: "Associate", icon: "🏗️", color: "from-purple-500 to-violet-600" },
];

const BLANK = { title: "", issuer: "", date: "", level: "Associate", icon: "🏅", color: "from-purple-500 to-violet-600" };
const inputCls = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all text-sm";
const labelCls = "block text-xs text-gray-400 mb-1 font-medium";

export default function CertificatesTab() {
  const [items, setItems] = useState(INITIAL);
  const [editing, setEditing] = useState(null); // null | id | "new"
  const [form, setForm] = useState(BLANK);

  const openEdit = (item) => { setEditing(item.id); setForm(item); };
  const openNew = () => { setEditing("new"); setForm(BLANK); };
  const cancel = () => { setEditing(null); setForm(BLANK); };

  const save = () => {
    if (editing === "new") {
      setItems([...items, { ...form, id: Date.now() }]);
    } else {
      setItems(items.map((i) => (i.id === editing ? { ...form, id: editing } : i)));
    }
    cancel();
  };

  const remove = (id) => setItems(items.filter((i) => i.id !== id));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-gray-400 text-sm">{items.length} certificates</p>
        <button onClick={openNew} className="px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white transition-all shadow-lg shadow-purple-900/30">
          + Add New
        </button>
      </div>

      {editing && (
        <div className="bg-white/5 border border-purple-500/30 rounded-2xl p-4 md:p-6 space-y-4">
          <h3 className="text-white font-semibold">{editing === "new" ? "Add Certificate" : "Edit Certificate"}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="col-span-1 sm:col-span-2">
              <label className={labelCls}>Title</label>
              <input className={inputCls} value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="AWS Certified..." />
            </div>
            <div>
              <label className={labelCls}>Issuer</label>
              <input className={inputCls} value={form.issuer} onChange={e => setForm({...form, issuer: e.target.value})} placeholder="Amazon Web Services" />
            </div>
            <div>
              <label className={labelCls}>Date</label>
              <input className={inputCls} value={form.date} onChange={e => setForm({...form, date: e.target.value})} placeholder="2024" />
            </div>
            <div>
              <label className={labelCls}>Level</label>
              <select className={inputCls} value={form.level} onChange={e => setForm({...form, level: e.target.value})}>
                <option>Associate</option><option>Professional</option><option>Specialty</option><option>Foundational</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Icon (emoji)</label>
              <input className={inputCls} value={form.icon} onChange={e => setForm({...form, icon: e.target.value})} />
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={save} className="px-5 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium transition-colors">Save</button>
            <button onClick={cancel} className="px-5 py-2 rounded-lg border border-white/10 text-gray-400 hover:text-white text-sm transition-colors">Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {items.map((cert) => (
          <div key={cert.id} className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl px-5 py-4 hover:border-purple-500/30 transition-colors group">
            <span className="text-2xl">{cert.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-sm">{cert.title}</p>
              <p className="text-gray-500 text-xs mt-0.5">{cert.issuer} · {cert.date} · {cert.level}</p>
            </div>
            <div className="flex gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
              <button onClick={() => openEdit(cert)} className="px-3 py-1.5 rounded-lg border border-white/15 text-gray-300 hover:text-white text-xs transition-colors">Edit</button>
              <button onClick={() => remove(cert.id)} className="px-3 py-1.5 rounded-lg border border-red-500/30 text-red-400 hover:text-red-300 text-xs transition-colors">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
