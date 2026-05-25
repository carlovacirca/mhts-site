import { Play } from "lucide-react";

interface RelatedVideoProps {
  url?: string;
  thumbnail?: string;
  title?: string;
}

const DEFAULT_URL = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
const DEFAULT_THUMB = "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg";

const RelatedVideo = ({
  url = DEFAULT_URL,
  thumbnail = DEFAULT_THUMB,
  title = "Watch on YouTube",
}: RelatedVideoProps) => {
  return (
    <section className="container mx-auto px-4 pb-12">
      <h2 className="text-2xl md:text-3xl font-bold text-mhts-charcoal mb-6">
        Related Video
      </h2>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="group block max-w-3xl rounded-lg overflow-hidden border border-border shadow-sm hover:shadow-lg transition-shadow"
      >
        <div className="relative aspect-video bg-mhts-light">
          <img
            src={thumbnail}
            alt="Watch the related video on YouTube"
            className="w-full h-full object-cover"
            loading="lazy"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
          <div className="absolute inset-0 bg-mhts-charcoal/30 group-hover:bg-mhts-charcoal/20 transition-colors flex items-center justify-center">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-mhts-white/95 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Play className="w-8 h-8 md:w-10 md:h-10 text-mhts-charcoal fill-mhts-charcoal ml-1" />
            </div>
          </div>
        </div>
        <div className="p-5 bg-background">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
            Watch on YouTube
          </p>
          <p className="font-semibold text-mhts-charcoal">{title}</p>
        </div>
      </a>
    </section>
  );
};

export default RelatedVideo;
