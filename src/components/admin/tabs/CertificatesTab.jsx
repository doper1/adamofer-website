"use client";
import { useState, useEffect, useRef } from "react";
import {
  getCertificates,
  createCertificate,
  updateCertificate,
  deleteCertificate,
} from "@/app/actions";

const BLANK = { title: "", issuer: "", date: "", color: "from-purple-500 to-violet-600", credentialUrl: "", badgeUrl: "" };
const inputCls = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all text-sm";
const labelCls = "block text-xs text-gray-400 mb-1 font-medium";

export default function CertificatesTab() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(BLANK);
  const fileRef = useRef(null);

  const fetchData = async () => {
    setLoading(true);
    const res = await getCertificates();
    if (res.success) setItems(res.data);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const openEdit = (item) => { setEditing(item.id); setForm(item); };
  const openNew = () => { setEditing("new"); setForm(BLANK); };
  const cancel = () => { setEditing(null); setForm(BLANK); if (fileRef.current) fileRef.current.value = ""; };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setForm((f) => ({ ...f, badgeUrl: /** @type {string} */ (reader.result) }));
    reader.readAsDataURL(file);
  };

  const save = async () => {
    setLoading(true);
    const data = {
      title: form.title,
      issuer: form.issuer,
      date: form.date,
      color: form.color,
      credentialUrl: form.credentialUrl,
      badgeUrl: form.badgeUrl,
      displayOrder: form.displayOrder,
    };
    if (editing === "new") {
      await createCertificate(data);
    } else {
      await updateCertificate(editing, data);
    }
    cancel();
    await fetchData();
  };

  const remove = async (id) => {
    setLoading(true);
    await deleteCertificate(id);
    await fetchData();
  };

  if (loading && items.length === 0) {
    return <div className="text-center py-12 text-gray-400">Loading certificates...</div>;
  }

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
            <div className="col-span-1 sm:col-span-2">
              <label className={labelCls}>Credential URL</label>
              <input className={inputCls} value={form.credentialUrl || ""} onChange={e => setForm({...form, credentialUrl: e.target.value})} placeholder="https://www.credly.com/badges/..." />
            </div>
            <div className="col-span-1 sm:col-span-2">
              <label className={labelCls}>Badge Image (optional)</label>
              <div className="flex items-center gap-4">
                <label className="cursor-pointer px-4 py-2 rounded-lg border border-white/10 text-gray-300 hover:text-white hover:border-purple-500/50 text-xs transition-colors">
                  Choose File
                  <input ref={fileRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
                {form.badgeUrl && (
                  <div className="flex items-center gap-2">
                    <img src={form.badgeUrl} alt="Badge preview" className="w-10 h-10 object-contain rounded" />
                    <button onClick={() => { setForm({...form, badgeUrl: ""}); if (fileRef.current) fileRef.current.value = ""; }} className="text-red-400 hover:text-red-300 text-xs">Remove</button>
                  </div>
                )}
                {!form.badgeUrl && <span className="text-gray-600 text-xs">No image selected</span>}
              </div>
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
            {cert.badgeUrl ? (
              <img src={cert.badgeUrl} alt={cert.title} className="w-8 h-8 object-contain rounded" />
            ) : (
              <span className="text-2xl">📜</span>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-sm">{cert.title}</p>
              <p className="text-gray-500 text-xs mt-0.5">{cert.issuer} · {cert.date}</p>
              {cert.credentialUrl && cert.credentialUrl !== "#" && (
                <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 text-xs mt-0.5 inline-block">View credential ↗</a>
              )}
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
