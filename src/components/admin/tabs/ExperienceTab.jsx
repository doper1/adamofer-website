"use client";
import { useState, useEffect } from "react";
import {
  getExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
} from "@/app/actions";

const BLANK = { role: "", company: "", period: "", description: "", highlights: [] };
const inputCls = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all text-sm";
const labelCls = "block text-xs text-gray-400 mb-1 font-medium";

export default function ExperienceTab() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(BLANK);
  const [newHL, setNewHL] = useState("");

  const fetchData = async () => {
    setLoading(true);
    const res = await getExperiences();
    if (res.success) {
      setItems(res.data.map((exp) => ({
        ...exp,
        highlights: exp.highlights.map((h) => h.highlight),
      })));
    }
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const openEdit = (item) => { setEditing(item.id); setForm({ ...item }); };
  const openNew = () => { setEditing("new"); setForm(BLANK); };
  const cancel = () => { setEditing(null); setForm(BLANK); setNewHL(""); };

  const addHL = () => { if (!newHL.trim()) return; setForm({ ...form, highlights: [...form.highlights, newHL.trim()] }); setNewHL(""); };
  const removeHL = (i) => setForm({ ...form, highlights: form.highlights.filter((_, idx) => idx !== i) });

  const save = async () => {
    setLoading(true);
    const data = {
      role: form.role,
      company: form.company,
      period: form.period,
      description: form.description,
      displayOrder: form.displayOrder,
      highlights: form.highlights.map((highlight) => ({ highlight })),
    };
    if (editing === "new") {
      await createExperience(data);
    } else {
      await updateExperience(editing, data);
    }
    cancel();
    await fetchData();
  };

  const remove = async (id) => {
    setLoading(true);
    await deleteExperience(id);
    await fetchData();
  };

  if (loading && items.length === 0) {
    return <div className="text-center py-12 text-gray-400">Loading experience...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-gray-400 text-sm">{items.length} positions</p>
        <button onClick={openNew} className="px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white transition-all shadow-lg shadow-purple-900/30">
          + Add New
        </button>
      </div>

      {editing && (
        <div className="bg-white/5 border border-purple-500/30 rounded-2xl p-4 md:p-6 space-y-4">
          <h3 className="text-white font-semibold">{editing === "new" ? "Add Experience" : "Edit Experience"}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Role / Title</label>
              <input className={inputCls} value={form.role} onChange={e => setForm({...form, role: e.target.value})} placeholder="Senior DevOps Engineer" />
            </div>
            <div>
              <label className={labelCls}>Company</label>
              <input className={inputCls} value={form.company} onChange={e => setForm({...form, company: e.target.value})} placeholder="Company Name" />
            </div>
            <div className="col-span-1 sm:col-span-2">
              <label className={labelCls}>Period</label>
              <input className={inputCls} value={form.period} onChange={e => setForm({...form, period: e.target.value})} placeholder="2023 – Present" />
            </div>
          </div>
          <div>
            <label className={labelCls}>Description</label>
            <textarea className={`${inputCls} resize-none`} rows={3} value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
          </div>
          <div>
            <label className={labelCls}>Highlights</label>
            <div className="flex flex-col gap-1.5 mb-2">
              {form.highlights.map((h, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-gray-300">
                  <span className="text-purple-500">▸</span> {h}
                  <button onClick={() => removeHL(i)} className="ml-auto text-gray-600 hover:text-red-400 text-xs transition-colors">×</button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input className={inputCls} value={newHL} onChange={e => setNewHL(e.target.value)} onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addHL())} placeholder="Add highlight..." />
              <button onClick={addHL} type="button" className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-sm transition-colors whitespace-nowrap">Add</button>
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={save} className="px-5 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium transition-colors">Save</button>
            <button onClick={cancel} className="px-5 py-2 rounded-lg border border-white/10 text-gray-400 hover:text-white text-sm transition-colors">Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {items.map((exp) => (
          <div key={exp.id} className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-xl px-5 py-4 hover:border-purple-500/30 transition-colors group">
            <div className="w-2 h-2 rounded-full bg-purple-500 mt-1.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-white font-semibold text-sm">{exp.role}</p>
                  <p className="text-purple-400 text-xs">{exp.company} · {exp.period}</p>
                </div>
                <div className="flex gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity flex-shrink-0">
                  <button onClick={() => openEdit(exp)} className="px-3 py-1.5 rounded-lg border border-white/15 text-gray-300 hover:text-white text-xs transition-colors">Edit</button>
                  <button onClick={() => remove(exp.id)} className="px-3 py-1.5 rounded-lg border border-red-500/30 text-red-400 hover:text-red-300 text-xs transition-colors">Delete</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
