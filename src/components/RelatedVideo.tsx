import { useState } from "react";
import { Play } from "lucide-react";

interface RelatedVideoProps {
  url?: string;
  thumbnail?: string;
  title?: string;
  videoId?: string;
}

const DEFAULT_URL = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
const DEFAULT_THUMB = "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg";

const RelatedVideo = ({
  url = DEFAULT_URL,
  thumbnail = DEFAULT_THUMB,
  title = "Watch on YouTube",
  videoId,
}: RelatedVideoProps) => {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="container mx-auto px-4 pb-12">
      <h2 className="text-2xl md:text-3xl font-bold text-mhts-charcoal mb-6">
        Related Video
    <section className="container mx-auto px-4 pb-12">
      <h2 className="text-2xl md:text-3xl font-bold text-mhts-charcoal mb-6 text-center">
        Related Video
      </h2>
      <div className="max-w-3xl mx-auto rounded-lg overflow-hidden border border-border shadow-sm">

        {videoId && playing ? (
          <div className="relative aspect-video bg-mhts-charcoal">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
              title={title}
              className="absolute inset-0 w-full h-full"
              frameBorder={0}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        ) : videoId ? (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group block w-full text-left"
            aria-label={`Play video: ${title}`}
          >
            <div className="relative aspect-video bg-mhts-light">
              <img
                src={thumbnail}
                alt={title}
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
          </button>
        ) : (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
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
          </a>
        )}
        <div className="p-5 bg-background">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
            Watch on YouTube
          </p>
          <p className="font-semibold text-mhts-charcoal">{title}</p>
        </div>
      </div>
    </section>
  );
};

export default RelatedVideo;
