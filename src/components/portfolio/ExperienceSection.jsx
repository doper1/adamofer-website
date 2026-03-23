import { getExperiences } from "@/app/actions";

export default async function ExperienceSection() {
  let experienceList = [];
  try {
    const result = await getExperiences();
    if (result.success) {
      experienceList = result.data.map((exp) => ({
        ...exp,
        highlights: exp.highlights ? exp.highlights.map((h) => h.highlight) : [],
      }));
    }
  } catch (error) {
    console.error("Failed to load experiences:", error);
  }

  if (experienceList.length === 0) return null;

  return (
    <section id="experience" className="py-12 md:py-24 px-4 md:px-8 relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-purple-400 text-xs md:text-sm uppercase tracking-[0.2em] md:tracking-[0.3em] font-medium mb-3">My Journey</p>
          <h2 className="text-2xl md:text-5xl font-bold text-white">Experience</h2>
          <div className="mt-4 w-12 md:w-16 h-1 bg-gradient-to-r from-purple-500 to-violet-500 mx-auto rounded-full" />
        </div>

        <div className="space-y-4 md:space-y-8">
          {experienceList.map((exp, i) => (
            <div key={exp.id} className={`flex gap-3 md:gap-6 items-start ${i % 2 === 0 ? "md:flex-row flex-col" : "md:flex-row-reverse flex-col"}`}>
              <div className={`flex-1 bg-white/5 border border-white/10 rounded-2xl p-4 md:p-6 hover:border-purple-500/40 hover:bg-white/[0.07] transition-all duration-300 w-full ${i % 2 === 0 ? "md:mr-8" : "md:ml-8"}`}>
                <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-base md:text-lg font-bold text-white">{exp.role}</h3>
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
