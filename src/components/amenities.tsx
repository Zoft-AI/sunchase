import Image from "next/image";
import { amenities } from "@/lib/content";

export function Amenities() {
  return (
    <section id="amenities" className="scroll-mt-20 bg-ink text-foam">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <div className="max-w-2xl">
          <p className="text-[11px] uppercase tracking-[0.32em] text-white/60">
            Comforts
          </p>
          <h2 className="mt-4 font-display text-4xl font-light leading-tight md:text-5xl">
            Stay as long as you like with all the comforts you need
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/70 md:text-lg">
            All of our South Padre condos are designed with your comfort in
            mind.
          </p>
        </div>

        <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {amenities.map((item, index) => (
            <li
              key={item.title}
              className={`relative min-h-56 overflow-hidden ${
                index === 0 ? "sm:col-span-2 sm:min-h-72" : ""
              }`}
            >
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/15 to-transparent" />
              <p className="absolute inset-x-0 bottom-0 p-4 font-display text-xl font-light leading-tight sm:p-5 sm:text-2xl">
                {item.title}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
