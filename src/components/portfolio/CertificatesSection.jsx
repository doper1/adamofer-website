const certificates = [
  {
    title: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    date: "2024",
    level: "Associate",
    icon: "☁️",
    color: "from-orange-500 to-amber-600",
    badge: "https://images.credly.com/size/340x340/images/0e284c3f-5164-4b21-8660-0d84737941bc/image.png",
    credlyUrl: "#",
  },
  {
    title: "Certified Kubernetes Administrator",
    issuer: "Cloud Native Computing Foundation",
    date: "2024",
    level: "Professional",
    icon: "⚙️",
    color: "from-blue-500 to-cyan-600",
    badge: "https://images.credly.com/size/340x340/images/8b8ed108-e77d-4396-ac59-2504583b9d54/cka_from_cncfsite__281_29.png",
    credlyUrl: "#",
  },
  {
    title: "AWS Certified DevOps Engineer",
    issuer: "Amazon Web Services",
    date: "2023",
    level: "Professional",
    icon: "🔧",
    color: "from-orange-600 to-red-600",
    badge: "https://images.credly.com/size/340x340/images/bd31ef42-d460-493e-8503-39592aaf0458/image.png",
    credlyUrl: "#",
  },
  {
    title: "Terraform Associate",
    issuer: "HashiCorp",
    date: "2023",
    level: "Associate",
    icon: "🏗️",
    color: "from-purple-500 to-violet-600",
    badge: null,
    credlyUrl: "#",
  },
];

export default function CertificatesSection() {
  return (
    <section id="certificates" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-purple-400 text-sm uppercase tracking-[0.3em] font-medium mb-3">Verified Skills</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">Certifications</h2>
          <div className="mt-4 w-16 h-1 bg-gradient-to-r from-purple-500 to-violet-500 mx-auto rounded-full" />
          <p className="text-gray-500 mt-5 text-base max-w-xl mx-auto">
            Industry-recognized credentials validating my expertise in cloud infrastructure and DevOps.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certificates.map((cert) => (
            <a
              key={cert.title}
              href={cert.credlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-purple-500/40 hover:bg-white/[0.07] transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-900/20 flex flex-col items-center text-center cursor-pointer"
            >
              {/* Top gradient accent */}
              <div className={`absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-gradient-to-r ${cert.color}`} />

              {/* Badge or icon */}
              <div className="mt-2 mb-5 w-20 h-20 flex items-center justify-center">
                {cert.badge ? (
                  <img
                    src={cert.badge}
                    alt={cert.title}
                    className="w-full h-full object-contain drop-shadow-lg transition-transform duration-300 group-hover:scale-110"
                    onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                  />
                ) : null}
                <div
                  className={`text-4xl w-20 h-20 rounded-full bg-gradient-to-br ${cert.color} flex items-center justify-center ${cert.badge ? 'hidden' : 'flex'}`}
                  style={{ display: cert.badge ? 'none' : 'flex' }}
                >
                  {cert.icon}
                </div>
              </div>

              <span className={`text-xs font-semibold px-3 py-1 rounded-full bg-gradient-to-r ${cert.color} text-white mb-3`}>
                {cert.level}
              </span>

              <h3 className="text-sm font-bold text-white leading-snug mb-2 group-hover:text-purple-300 transition-colors">
                {cert.title}
              </h3>

              <p className="text-gray-600 text-xs">{cert.issuer}</p>

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