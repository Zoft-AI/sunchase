"use client";

import Image from "next/image";
import { condos } from "@/lib/content";
import { useCondo } from "@/components/condo-context";

export function Condos() {
  const { chooseCondo } = useCondo();

  return (
    <section id="condos" className="scroll-mt-20 bg-foam">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <div className="max-w-2xl">
          <p className="text-[11px] uppercase tracking-[0.32em] text-sea">
            Stay with us
          </p>
          <h2 className="mt-4 font-display text-4xl font-light leading-tight md:text-5xl">
            Choose the condo that fits your group
          </h2>
          <p className="mt-4 text-base leading-relaxed text-mist md:text-lg">
            We offer two, three, and a four-bedroom condo right on the beach —
            each fully equipped with a patio or balcony opening up to the
            landscape grounds, pool and the gulf views.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {condos.map((condo) => (
            <article key={condo.id} className="group">
              <div className="relative aspect-[4/3] overflow-hidden bg-sand">
                <Image
                  src={condo.image}
                  alt={condo.alt}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
              <h3 className="mt-5 font-display text-2xl font-light">
                {condo.title}
              </h3>
              <button
                type="button"
                onClick={() => chooseCondo(condo.title)}
                className="mt-3 text-[12px] uppercase tracking-[0.18em] text-sea transition hover:text-ink"
              >
                Check availability
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
