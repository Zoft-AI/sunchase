import Image from "next/image";

export function Oasis() {
  return (
    <section id="about" className="scroll-mt-20 bg-sand">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 md:grid-cols-2 md:gap-16 md:px-8 md:py-28">
        <div>
          <p className="text-[11px] uppercase tracking-[0.32em] text-sea">
            The location
          </p>
          <h2 className="mt-4 font-display text-4xl font-light leading-tight text-ink md:text-6xl">
            A beautiful tropical oasis
          </h2>
          <div className="mt-5 h-px w-16 bg-gold" />
          <p className="mt-6 text-base leading-relaxed text-mist md:text-lg">
            South Padre Island is a relaxing paradise just off the southern tip
            of Texas. Bordering the Laguna Madre Bay and the Gulf of Mexico,
            this barrier island is home to soft sands, amazing sunsets, and
            delicious food for every taste.
          </p>
          <p className="mt-4 text-base leading-relaxed text-mist md:text-lg">
            At Sunchase, you’ll stay in breezy beachfront condos at the heart
            of the island, an excellent location close to all the happening
            spots.
          </p>
          <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-line pt-8">
            <div>
              <dt className="font-display text-3xl font-light text-ink">2–4</dt>
              <dd className="mt-1 text-sm text-mist">Bedroom condos</dd>
            </div>
            <div>
              <dt className="font-display text-3xl font-light text-ink">Gulf</dt>
              <dd className="mt-1 text-sm text-mist">Beachfront setting</dd>
            </div>
          </dl>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src="/images/aerial.jpg"
            alt="Aerial view of Sunchase condos, the pool, palms, and the Gulf"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
