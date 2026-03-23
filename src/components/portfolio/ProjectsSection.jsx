import { getProjects } from "@/app/actions";

export default async function ProjectsSection() {
  let projectList = [];
  try {
    const result = await getProjects();
    if (result.success) {
      projectList = result.data.map((project) => ({
        ...project,
        tags: project.tags ? project.tags.map((t) => t.tag) : [],
      }));
    }
  } catch (error) {
    console.error("Failed to load projects:", error);
  }

  if (projectList.length === 0) return null;

  return (
    <section id="projects" className="py-12 md:py-24 px-4 md:px-8 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-purple-400 text-xs md:text-sm uppercase tracking-[0.2em] md:tracking-[0.3em] font-medium mb-3">What I've Built</p>
          <h2 className="text-2xl md:text-5xl font-bold text-white">Projects</h2>
          <div className="mt-4 w-12 md:w-16 h-1 bg-gradient-to-r from-purple-500 to-violet-500 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {projectList.map((p) => (
            <div
              key={p.id}
              className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-900/20"
            >
              {/* Top gradient bar */}
              <div className={`h-1 w-full bg-gradient-to-r ${p.gradient}`} />

              <div className="p-3 md:p-6">
                <div className="flex items-start justify-between mb-3 md:mb-4">
                  <span className="text-xl md:text-3xl">{p.icon}</span>
                  <a
                    href={p.link}
                    className="text-gray-600 hover:text-purple-400 transition-colors text-lg"
                    title="View project"
                  >
                    ↗
                  </a>
                </div>

                <h3 className="text-sm md:text-lg font-bold text-white mb-1.5 md:mb-2 group-hover:text-purple-300 transition-colors line-clamp-1">
                  {p.title}
                </h3>
                <p className="text-gray-500 text-[11px] md:text-sm leading-relaxed mb-4 md:mb-5 line-clamp-2">{p.description}</p>

                <div className="flex flex-wrap gap-1.5 md:gap-2">
                  {p.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="px-2 py-0.5 rounded-md text-[10px] md:text-xs bg-purple-500/10 text-purple-300 border border-purple-500/20">
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
