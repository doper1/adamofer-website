"use client";
import { useState } from "react";
import { submitContactForm } from "@/app/actions";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null); // "sending" | "sent" | "error"

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    await submitContactForm(form);
    setStatus("sent");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-12 md:py-24 px-4 md:px-8 relative overflow-hidden">
      {/* Background blob */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-purple-700/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">
        <div className="text-center mb-10 md:mb-14">
          <p className="text-purple-400 text-xs md:text-sm uppercase tracking-[0.2em] md:tracking-[0.3em] font-medium mb-3">Let's Talk</p>
          <h2 className="text-2xl md:text-5xl font-bold text-white">Get In Touch</h2>
          <div className="mt-4 w-12 md:w-16 h-1 bg-gradient-to-r from-purple-500 to-violet-500 mx-auto rounded-full" />
          <p className="text-gray-500 mt-6 text-base leading-relaxed">
            Interested in working together or just want to say hi? Drop me a message — I read everything.
          </p>
        </div>

        {status === "sent" ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">✅</div>
            <h3 className="text-2xl font-bold text-white mb-2">Message sent!</h3>
            <p className="text-gray-500">I'll get back to you as soon as possible.</p>
            <button onClick={() => setStatus(null)} className="mt-6 text-purple-400 hover:text-purple-300 text-sm underline">Send another</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-3xl p-5 md:p-10 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-gray-400 mb-2 font-medium">Your Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="John Doe"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all text-sm"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2 font-medium">Email Address</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="john@example.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2 font-medium">Message</label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell me about your project or opportunity..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all text-sm resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full py-4 rounded-xl font-semibold text-base bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 disabled:opacity-60 disabled:cursor-not-allowed text-white transition-all duration-300 shadow-xl shadow-purple-900/30 hover:shadow-purple-800/50 hover:-translate-y-0.5"
            >
              {status === "sending" ? "Sending..." : "Send Message →"}
            </button>
          </form>
        )}

        {/* Social links */}
        <div className="flex justify-center gap-6 mt-10">
          {[
            { label: "GitHub", href: "#", icon: "🐙" },
            { label: "LinkedIn", href: "#", icon: "💼" },
            { label: "Email", href: "mailto:adam@example.com", icon: "✉️" },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              className="flex items-center gap-2 text-gray-500 hover:text-purple-400 transition-colors text-sm"
            >
              <span>{s.icon}</span> {s.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}