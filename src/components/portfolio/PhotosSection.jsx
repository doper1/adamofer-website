const photos = [
  {
    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    caption: "Adam Ofer",
    label: "Profile",
  },
  {
    url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80",
    caption: "In the zone — coding",
    label: "Work",
  },
  {
    url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80",
    caption: "Marathon training",
    label: "Running",
  },
  {
    url: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=600&q=80",
    caption: "Piano — a different kind of flow",
    label: "Piano",
  },
];

export default function PhotosSection() {
  return (
    <section id="photos" className="py-16 md:py-24 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-purple-400 text-sm uppercase tracking-[0.3em] font-medium mb-3">Beyond the Screen</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">A Glimpse of Me</h2>
          <div className="mt-4 w-16 h-1 bg-gradient-to-r from-purple-500 to-violet-500 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {photos.map((photo, i) => (
            <div
              key={photo.label}
              className={`group relative overflow-hidden rounded-2xl ${i === 0 ? "md:row-span-2 col-span-2 md:col-span-1" : i === 3 ? "col-span-2 md:col-span-1" : ""}`}
              style={{ aspectRatio: i === 0 ? "1/1" : "1/1", minHeight: "auto" }}
            >
              <img
                src={photo.url}
                alt={photo.caption}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  const sibling = target.nextSibling; // This is the overlay div
                  if (sibling instanceof HTMLElement) sibling.style.display = 'flex'; // Show the overlay as a fallback
                }}
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <p className="text-white text-sm font-medium mt-0.5">{photo.caption}</p>
              </div>
              {/* Label badge always visible */}
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-black/60 backdrop-blur-sm border border-white/10 text-gray-300">
                  {photo.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Hobbies callout */}
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          {[
            { emoji: "🏃", label: "Marathon Runner" },
            { emoji: "🎹", label: "Piano Player" },
            { emoji: "☁️", label: "Cloud Architect" },
            { emoji: "🇮🇱", label: "Based in Israel" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-gray-400 text-sm">
              <span className="text-lg">{item.emoji}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}