import { getCertificates } from "@/app/actions";

export default async function CertificatesSection() {
  let certificateList = [];
  try {
    const result = await getCertificates();
    if (result.success) {
      certificateList = result.data;
    }
  } catch (error) {
    console.error("Failed to load certificates:", error);
  }

  if (certificateList.length === 0) return null;

  return (
    <section id="certifications" className="py-12 md:py-24 px-4 md:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-purple-400 text-xs md:text-sm uppercase tracking-[0.2em] md:tracking-[0.3em] font-medium mb-3">Verified Skills</p>
          <h2 className="text-2xl md:text-5xl font-bold text-white">Certifications</h2>
          <div className="mt-4 w-12 md:w-16 h-1 bg-gradient-to-r from-purple-500 to-violet-500 mx-auto rounded-full" />
          <p className="text-gray-500 mt-5 text-base max-w-xl mx-auto">
            Industry-recognized credentials validating my expertise in cloud infrastructure and DevOps.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {certificateList.map((cert) => (
            <a
              key={cert.id}
              href={cert.credentialUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-white/5 border border-white/10 rounded-2xl p-3 md:p-6 hover:border-purple-500/40 hover:bg-white/[0.07] transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-900/20 flex flex-col items-center text-center cursor-pointer w-[calc(50%-0.5rem)] lg:w-[calc(25%-1.125rem)]"
            >

              {/* Badge image */}
              <div className="mt-1 mb-3 w-14 h-14 md:w-20 md:h-20 flex items-center justify-center">
                {cert.badgeUrl ? (
                  <img
                    src={cert.badgeUrl}
                    alt={cert.title}
                    className="w-full h-full object-contain drop-shadow-lg transition-transform duration-300 group-hover:scale-110"
                  />
                ) : (
                  <div
                    className={`w-14 h-14 md:w-20 md:h-20 rounded-full bg-gradient-to-br ${cert.color} flex items-center justify-center`}
                  >
                    <span className="text-white text-lg md:text-2xl font-bold">{cert.title?.[0] || "?"}</span>
                  </div>
                )}
              </div>

              <h3 className="text-xs md:text-sm font-bold text-white leading-snug mb-2 group-hover:text-purple-300 transition-colors">
                {cert.title}
              </h3>

              <p className="text-[10px] md:text-xs text-gray-600">{cert.issuer}</p>

              <div className="mt-4 flex items-center gap-1 text-gray-600 text-xs">
                <span>🗓</span> {cert.date}
              </div>

              <div className="mt-3 text-purple-500 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                View credential ↗
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
