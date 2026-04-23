import { getPhotos, getSiteConfig } from "@/app/actions";

export default async function PhotosSection() {
  let photoList = [];
  let hobbies = [];
  try {
    const [photosResult, configResult] = await Promise.all([
      getPhotos(),
      getSiteConfig(),
    ]);
    if (photosResult.success) {
      photoList = photosResult.data;
    }
    if (configResult.success && configResult.data.hobbies) {
      // Parse comma-separated "emoji label" format
      hobbies = configResult.data.hobbies
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
        .map((item) => {
          // Split on first space to separate emoji from label
          const spaceIdx = item.indexOf(" ");
          if (spaceIdx > 0) {
            return { emoji: item.slice(0, spaceIdx), label: item.slice(spaceIdx + 1) };
          }
          return { emoji: "", label: item };
        });
    }
  } catch (error) {
    console.error("Failed to load photos or config:", error);
  }

  if (photoList.length === 0 && hobbies.length === 0) return null;

  return (
    <section id="photos" className="py-12 md:py-24 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-purple-400 text-xs md:text-sm uppercase tracking-[0.2em] md:tracking-[0.3em] font-medium mb-3">Beyond the Screen</p>
          <h2 className="text-2xl md:text-5xl font-bold text-white">A Glimpse of Me</h2>
          <div className="mt-4 w-12 md:w-16 h-1 bg-gradient-to-r from-purple-500 to-violet-500 mx-auto rounded-full" />
        </div>

        {/* Hobbies callout */}
        {hobbies.length > 0 && (
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            {hobbies.map((item) => (
              <div key={item.label} className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-gray-400 text-sm">
                <span className="text-lg">{item.emoji}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        )}

        {photoList.length > 0 && (
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            {photoList.map((photo) => (
              <div
                key={photo.id}
                className="group relative overflow-hidden rounded-2xl w-[calc(50%-0.5rem)] md:w-[calc(25%-0.75rem)]"
                style={{ aspectRatio: "1/1" }}
              >
                <img
                  src={photo.url}
                  alt={photo.caption || ""}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-white text-sm font-medium mt-0.5">{photo.caption}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
