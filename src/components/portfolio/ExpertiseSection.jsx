const skills = [
  {
    category: "DevOps & Cloud",
    icon: "☁️",
    items: ["Docker", "Kubernetes", "Terraform", "AWS", "CI/CD", "Ansible", "Jenkins", "Helm"],
    color: "from-purple-500 to-violet-600",
  },
  {
    category: "Programming",
    icon: "💻",
    items: ["Python", "JavaScript", "TypeScript", "Bash", "Go", "Node.js", "React", "REST APIs"],
    color: "from-violet-500 to-fuchsia-600",
  },
  {
    category: "Infrastructure",
    icon: "🔧",
    items: ["Linux", "Nginx", "Redis", "PostgreSQL", "Monitoring", "Logging", "Networking", "Security"],
    color: "from-fuchsia-500 to-purple-600",
  },
];

export default function ExpertiseSection() {
  return (
    <section id="expertise" className="py-12 md:py-24 px-4 md:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-purple-400 text-xs md:text-sm uppercase tracking-[0.2em] md:tracking-[0.3em] font-medium mb-3">What I Do</p>
          <h2 className="text-2xl md:text-5xl font-bold text-white">Expertise</h2>
          <div className="mt-4 w-12 md:w-16 h-1 bg-gradient-to-r from-purple-500 to-violet-500 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {skills.map((s, i) => (
            <div
              key={s.category}
              className={`group relative bg-white/5 border border-white/10 rounded-2xl p-3 md:p-7 hover:border-purple-500/40 hover:bg-white/[0.07] transition-all duration-300 overflow-hidden ${i === 2 ? 'col-span-2 md:col-span-1' : ''}`}
            >
              {/* Glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 to-violet-600/0 group-hover:from-purple-600/10 group-hover:to-violet-600/5 transition-all duration-500 rounded-2xl" />

              <div className="relative z-10">
                <div className="text-2xl md:text-3xl mb-3 md:mb-4">{s.icon}</div>
                <h3 className="text-base md:text-lg font-bold text-white mb-4 md:mb-5">{s.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {s.items.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-purple-500/10 border border-purple-500/20 text-purple-300 hover:bg-purple-500/20 transition-colors"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {[
            { value: "5+", label: "Years Experience" },
            { value: "10+", label: "Technologies" },
            { value: "100%", label: "Dedication" },
          ].map((stat) => (
            <div key={stat.label} className="text-center p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-gray-500 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}