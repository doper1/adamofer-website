const projects = [
  {
    title: "K8s Auto-Scaler",
    description: "Built a custom Kubernetes horizontal pod autoscaler with ML-based prediction to proactively scale workloads before traffic spikes.",
    tags: ["Kubernetes", "Python", "Prometheus", "Go"],
    gradient: "from-purple-600 to-violet-700",
    icon: "⚡",
    link: "#",
  },
  {
    title: "CI/CD Pipeline Framework",
    description: "Designed a reusable GitOps CI/CD framework using Jenkins and ArgoCD, cutting deployment time by 60% across 10+ microservices.",
    tags: ["Jenkins", "ArgoCD", "Docker", "Bash"],
    gradient: "from-violet-600 to-fuchsia-700",
    icon: "🔄",
    link: "#",
  },
  {
    title: "Infrastructure as Code Suite",
    description: "Provisioned entire cloud infrastructure on AWS using Terraform modules, supporting multi-environment deployments with zero downtime.",
    tags: ["Terraform", "AWS", "Ansible", "Python"],
    gradient: "from-fuchsia-600 to-purple-700",
    icon: "🏗️",
    link: "#",
  },
  {
    title: "Observability Platform",
    description: "Deployed a full-stack monitoring and alerting platform (Prometheus + Grafana + Loki) enabling real-time visibility across all services.",
    tags: ["Prometheus", "Grafana", "Loki", "Helm"],
    gradient: "from-purple-700 to-violet-600",
    icon: "📊",
    link: "#",
  },
  {
    title: "Full-Stack Web App",
    description: "Developed a production-ready web application with React frontend and Node.js backend, containerized and deployed on AWS ECS.",
    tags: ["React", "Node.js", "AWS ECS", "PostgreSQL"],
    gradient: "from-violet-700 to-fuchsia-600",
    icon: "🌐",
    link: "#",
  },
  {
    title: "Security Automation",
    description: "Automated vulnerability scanning and compliance checks across infrastructure using custom scripts and integrated security tooling.",
    tags: ["Python", "Bash", "Trivy", "Snyk"],
    gradient: "from-fuchsia-700 to-purple-600",
    icon: "🔐",
    link: "#",
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-24 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-purple-400 text-sm uppercase tracking-[0.3em] font-medium mb-3">What I've Built</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">Projects</h2>
          <div className="mt-4 w-16 h-1 bg-gradient-to-r from-purple-500 to-violet-500 mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <div
              key={p.title}
              className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-900/20"
            >
              {/* Top gradient bar */}
              <div className={`h-1 w-full bg-gradient-to-r ${p.gradient}`} />

              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl">{p.icon}</span>
                  <a
                    href={p.link}
                    className="text-gray-600 hover:text-purple-400 transition-colors text-lg"
                    title="View project"
                  >
                    ↗
                  </a>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                  {p.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-5">{p.description}</p>

                <div className="flex flex-wrap gap-2">
                  {p.tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-1 rounded-md text-xs bg-purple-500/10 text-purple-300 border border-purple-500/20">
                      {tag}
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