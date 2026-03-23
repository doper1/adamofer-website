"use client";
import { useState, useEffect } from "react";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "@/app/actions";

const BLANK = { title: "", description: "", tags: [], icon: "🚀", link: "#" };
const inputCls = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all text-sm";
const labelCls = "block text-xs text-gray-400 mb-1 font-medium";

export default function ProjectsTab() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(BLANK);
  const [newTag, setNewTag] = useState("");

  const fetchData = async () => {
    setLoading(true);
    const res = await getProjects();
    if (res.success) {
      setItems(res.data.map((p) => ({
        ...p,
        tags: p.tags.map((t) => t.tag),
      })));
    }
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const openEdit = (item) => { setEditing(item.id); setForm({ ...item }); };
  const openNew = () => { setEditing("new"); setForm(BLANK); };
  const cancel = () => { setEditing(null); setForm(BLANK); setNewTag(""); };

  const addTag = () => { if (!newTag.trim()) return; setForm({ ...form, tags: [...form.tags, newTag.trim()] }); setNewTag(""); };
  const removeTag = (i) => setForm({ ...form, tags: form.tags.filter((_, idx) => idx !== i) });

  const save = async () => {
    setLoading(true);
    const data = {
      title: form.title,
      description: form.description,
      icon: form.icon,
      link: form.link,
      gradient: form.gradient,
      displayOrder: form.displayOrder,
      tags: form.tags.map((tag) => ({ tag })),
    };
    if (editing === "new") {
      await createProject(data);
    } else {
      await updateProject(editing, data);
    }
    cancel();
    await fetchData();
  };

  const remove = async (id) => {
    setLoading(true);
    await deleteProject(id);
    await fetchData();
  };

  if (loading && items.length === 0) {
    return <div className="text-center py-12 text-gray-400">Loading projects...</div>;
  }

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
