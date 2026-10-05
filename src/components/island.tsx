import Image from "next/image";
import { activities } from "@/lib/content";

export function Island() {
  return (
    <section id="island" className="scroll-mt-20 bg-foam">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <div className="max-w-2xl">
          <p className="text-[11px] uppercase tracking-[0.32em] text-sea">
            Nearby
          </p>
          <h2 className="mt-4 font-display text-4xl font-light leading-tight md:text-5xl">
            Experience South Padre Island like a local
          </h2>
          <p className="mt-4 text-base leading-relaxed text-mist md:text-lg">
            A few days, a week, a month — find food, activities, and events on
            South Padre Island that you’ll love. Check out our nearby
            activities and find the perfect adventure for your group.
          </p>
        </div>

        <div
          id="activities"
          className="mt-12 grid gap-4 md:grid-cols-3"
        >
          {activities.map((place) => (
            <article key={place.title} className="group relative min-h-80 overflow-hidden">
              <Image
                src={place.image}
                alt={place.alt}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent" />
              <h3 className="absolute inset-x-0 bottom-0 p-6 font-display text-3xl font-light leading-tight text-white">
                {place.title}
              </h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
