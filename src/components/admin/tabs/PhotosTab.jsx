"use client";
import { useState, useEffect } from "react";
import { getPhotos, createPhoto, deletePhoto } from "@/app/actions";

const BLANK = { url: "", caption: "", category: "Work" };
const inputCls = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all text-sm";
const labelCls = "block text-xs text-gray-400 mb-1 font-medium";

export default function PhotosTab() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState(BLANK);

  const fetchData = async () => {
    setLoading(true);
    const res = await getPhotos();
    if (res.success) setPhotos(res.data);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const save = async () => {
    if (!form.url.trim()) return;
    setLoading(true);
    await createPhoto(form);
    setForm(BLANK);
    setAdding(false);
    await fetchData();
  };

  const remove = async (id) => {
    setLoading(true);
    await deletePhoto(id);
    await fetchData();
  };

  if (loading && photos.length === 0) {
    return <div className="text-center py-12 text-gray-400">Loading photos...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-gray-400 text-sm">{photos.length} photos</p>
        <button onClick={() => setAdding(true)} className="px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white transition-all shadow-lg shadow-purple-900/30">
          + Add Photo
        </button>
      </div>

      {adding && (
        <div className="bg-white/5 border border-purple-500/30 rounded-2xl p-4 md:p-6 space-y-4">
          <h3 className="text-white font-semibold">Add Photo</h3>
          <div>
            <label className={labelCls}>Image URL</label>
            <input className={inputCls} value={form.url} onChange={e => setForm({...form, url: e.target.value})} placeholder="https://..." />
          </div>
          {form.url && (
            <img src={form.url} alt="Preview" className="rounded-xl h-40 w-full object-cover border border-white/10" onError={e => e.currentTarget.style.display='none'} />
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Caption</label>
              <input className={inputCls} value={form.caption} onChange={e => setForm({...form, caption: e.target.value})} placeholder="Photo caption" />
            </div>
            <div>
              <label className={labelCls}>Category</label>
              <select className={inputCls} value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
                {["Work", "Travel", "Personal", "Tech", "Hobby"].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={save} className="px-5 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium transition-colors">Add Photo</button>
            <button onClick={() => { setAdding(false); setForm(BLANK); }} className="px-5 py-2 rounded-lg border border-white/10 text-gray-400 hover:text-white text-sm transition-colors">Cancel</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {photos.map((p) => (
          <div key={p.id} className="group relative rounded-2xl overflow-hidden border border-white/10 hover:border-purple-500/40 transition-all">
            <img src={p.url} alt={p.caption} className="w-full h-44 object-cover" onError={e => { e.currentTarget.src = ''; e.currentTarget.className = 'hidden'; }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity flex items-end p-3">
              <div className="flex-1">
                <p className="text-white text-xs font-medium">{p.caption}</p>
                <p className="text-gray-400 text-xs">{p.category}</p>
              </div>
              <button onClick={() => remove(p.id)} className="w-7 h-7 flex items-center justify-center rounded-full bg-red-500/80 text-white text-xs hover:bg-red-500 transition-colors">×</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
