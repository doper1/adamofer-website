const experiences = [
  {
    role: "Senior DevOps Engineer",
    company: "Tech Company",
    period: "2023 – Present",
    description: "Leading cloud infrastructure initiatives, designing CI/CD pipelines, and championing DevOps culture across engineering teams.",
    highlights: ["Reduced deployment time by 60%", "Managed 50+ microservices on Kubernetes", "Led team of 4 engineers"],
  },
  {
    role: "DevOps Engineer",
    company: "Software Startup",
    period: "2021 – 2023",
    description: "Built and maintained AWS infrastructure using Terraform and Ansible. Implemented monitoring solutions and automated operational tasks.",
    highlights: ["99.9% uptime SLA", "Full IaC migration to Terraform", "Deployed ELK observability stack"],
  },
  {
    role: "Backend Developer",
    company: "Development Agency",
    period: "2019 – 2021",
    description: "Developed RESTful APIs and backend services in Python and Node.js. Contributed to system design decisions and database architecture.",
    highlights: ["Shipped 10+ production APIs", "Python & Node.js", "PostgreSQL & Redis"],
  },
  {
    role: "Junior Developer",
    company: "First Employer",
    period: "2018 – 2019",
    description: "Started professional career writing scripts, automating workflows, and supporting internal tools. Foundation in Linux and networking.",
    highlights: ["Linux administration", "Bash & Python scripting", "Networking fundamentals"],
  },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-16 md:py-24 px-4 md:px-8 relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-purple-400 text-sm uppercase tracking-[0.3em] font-medium mb-3">My Journey</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">Experience</h2>
          <div className="mt-4 w-16 h-1 bg-gradient-to-r from-purple-500 to-violet-500 mx-auto rounded-full" />
        </div>

        <div className="space-y-8">
          {experiences.map((exp, i) => (
            <div key={exp.role} className={`flex gap-6 items-start ${i % 2 === 0 ? "md:flex-row flex-col" : "md:flex-row-reverse flex-col"}`}>
              <div className={`flex-1 bg-white/5 border border-white/10 rounded-2xl p-5 md:p-6 hover:border-purple-500/40 hover:bg-white/[0.07] transition-all duration-300 w-full ${i % 2 === 0 ? "md:mr-8" : "md:ml-8"}`}>
                <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-white">{exp.role}</h3>
                    <p className="text-purple-400 text-sm font-medium">{exp.company}</p>
                  </div>
                  <span className="text-xs text-gray-500 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                    {exp.period}
                  </span>
                </div>

                <p className="text-gray-500 text-sm leading-relaxed mb-4">{exp.description}</p>

                <div className="flex flex-wrap gap-2">
                  {exp.highlights.map((h) => (
                    <span key={h} className="text-xs text-gray-400 flex items-center gap-1">
                      <span className="text-purple-500">▸</span> {h}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}