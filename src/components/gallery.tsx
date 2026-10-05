import Image from "next/image";
import { gallery } from "@/lib/content";

export function Gallery() {
  return (
    <section id="gallery" className="scroll-mt-20 bg-sand">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <p className="text-[11px] uppercase tracking-[0.32em] text-sea">
              Photo tour
            </p>
            <h2 className="mt-4 font-display text-4xl font-light leading-tight md:text-5xl">
              Perfect for taking it easy
            </h2>
          </div>
          <p className="max-w-sm text-mist">
            Patios and balconies open onto the grounds, the pool, and gulf
            views — with the comforts you want for a few days or a few weeks.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4 md:grid-rows-2">
          {gallery.map((photo) => (
            <figure
              key={photo.src}
              className={`relative min-h-64 overflow-hidden ${photo.className}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
