"use client";
import { useState } from "react";

const INITIAL = [
  { id: 1, title: "K8s Auto-Scaler", description: "Built a custom Kubernetes horizontal pod autoscaler with ML-based prediction to proactively scale workloads before traffic spikes.", tags: ["Kubernetes", "Python", "Prometheus", "Go"], icon: "⚡", link: "#" },
  { id: 2, title: "CI/CD Pipeline Framework", description: "Designed a reusable GitOps CI/CD framework using Jenkins and ArgoCD, cutting deployment time by 60% across 10+ microservices.", tags: ["Jenkins", "ArgoCD", "Docker", "Bash"], icon: "🔄", link: "#" },
  { id: 3, title: "Infrastructure as Code Suite", description: "Provisioned entire cloud infrastructure on AWS using Terraform modules, supporting multi-environment deployments with zero downtime.", tags: ["Terraform", "AWS", "Ansible", "Python"], icon: "🏗️", link: "#" },
  { id: 4, title: "Observability Platform", description: "Deployed a full-stack monitoring and alerting platform (Prometheus + Grafana + Loki) enabling real-time visibility across all services.", tags: ["Prometheus", "Grafana", "Loki", "Helm"], icon: "📊", link: "#" },
  { id: 5, title: "Full-Stack Web App", description: "Developed a production-ready web application with React frontend and Node.js backend, containerized and deployed on AWS ECS.", tags: ["React", "Node.js", "AWS ECS", "PostgreSQL"], icon: "🌐", link: "#" },
  { id: 6, title: "Security Automation", description: "Automated vulnerability scanning and compliance checks across infrastructure using custom scripts and integrated security tooling.", tags: ["Python", "Bash", "Trivy", "Snyk"], icon: "🔐", link: "#" },
];

const BLANK = { title: "", description: "", tags: [], icon: "🚀", link: "#" };
const inputCls = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all text-sm";
const labelCls = "block text-xs text-gray-400 mb-1 font-medium";

export default function ProjectsTab() {
  const [items, setItems] = useState(INITIAL);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(BLANK);
  const [newTag, setNewTag] = useState("");

  const openEdit = (item) => { setEditing(item.id); setForm({ ...item }); };
  const openNew = () => { setEditing("new"); setForm(BLANK); };
  const cancel = () => { setEditing(null); setForm(BLANK); setNewTag(""); };

  const addTag = () => { if (!newTag.trim()) return; setForm({ ...form, tags: [...form.tags, newTag.trim()] }); setNewTag(""); };
  const removeTag = (i) => setForm({ ...form, tags: form.tags.filter((_, idx) => idx !== i) });

  const save = () => {
    if (editing === "new") setItems([...items, { ...form, id: Date.now() }]);
    else setItems(items.map((i) => (i.id === editing ? { ...form, id: editing } : i)));
    cancel();
  };
  const remove = (id) => setItems(items.filter((i) => i.id !== id));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-gray-400 text-sm">{items.length} projects</p>
        <button onClick={openNew} className="px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white transition-all shadow-lg shadow-purple-900/30">
          + Add New
        </button>
      </div>

      {editing && (
        <div className="bg-white/5 border border-purple-500/30 rounded-2xl p-4 md:p-6 space-y-4">
          <h3 className="text-white font-semibold">{editing === "new" ? "Add Project" : "Edit Project"}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="sm:col-span-3">
              <label className={labelCls}>Title</label>
              <input className={inputCls} value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="Project Name" />
            </div>
            <div>
              <label className={labelCls}>Icon</label>
              <input className={inputCls} value={form.icon} onChange={e => setForm({...form, icon: e.target.value})} />
            </div>
          </div>
          <div>
            <label className={labelCls}>Description</label>
            <textarea className={`${inputCls} resize-none`} rows={3} value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
          </div>
          <div>
            <label className={labelCls}>Link</label>
            <input className={inputCls} value={form.link} onChange={e => setForm({...form, link: e.target.value})} placeholder="https://github.com/..." />
          </div>
          <div>
            <label className={labelCls}>Tags</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {form.tags.map((t, i) => (
                <span key={i} className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/20 text-purple-300 text-xs">
                  {t}
                  <button onClick={() => removeTag(i)} className="text-gray-500 hover:text-red-400 transition-colors leading-none">×</button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input className={inputCls} value={newTag} onChange={e => setNewTag(e.target.value)} onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addTag())} placeholder="Add tag and press Enter..." />
              <button onClick={addTag} type="button" className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-sm transition-colors whitespace-nowrap">Add</button>
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={save} className="px-5 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium transition-colors">Save</button>
            <button onClick={cancel} className="px-5 py-2 rounded-lg border border-white/10 text-gray-400 hover:text-white text-sm transition-colors">Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {items.map((p) => (
          <div key={p.id} className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl px-5 py-4 hover:border-purple-500/30 transition-colors group">
            <span className="text-2xl">{p.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-sm">{p.title}</p>
              <p className="text-gray-500 text-xs mt-0.5 truncate">{p.tags.join(", ")}</p>
            </div>
            <div className="flex gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
              <button onClick={() => openEdit(p)} className="px-3 py-1.5 rounded-lg border border-white/15 text-gray-300 hover:text-white text-xs transition-colors">Edit</button>
              <button onClick={() => remove(p.id)} className="px-3 py-1.5 rounded-lg border border-red-500/30 text-red-400 hover:text-red-300 text-xs transition-colors">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
