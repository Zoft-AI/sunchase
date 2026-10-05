import Image from "next/image";

const photos = [
  {
    src: "/images/group-2.jpeg",
    alt: "Guests gathered outside at Sunchase",
  },
  {
    src: "/images/group-3.jpeg",
    alt: "Friends and family on the grounds",
  },
  {
    src: "/images/group-1.jpg",
    alt: "A celebration at the beachfront condos",
  },
  {
    src: "/images/group-4.jpeg",
    alt: "Time together during a South Padre stay",
  },
];

export function Events() {
  return (
    <section id="events" className="scroll-mt-20 bg-foam">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 md:grid-cols-2 md:px-8 md:py-28">
        <div>
          <p className="text-[11px] uppercase tracking-[0.32em] text-sea">
            Groups & events
          </p>
          <h2 className="mt-4 font-display text-4xl font-light leading-tight md:text-5xl">
            Celebrate with a group or a special event
          </h2>
          <p className="mt-5 text-base leading-relaxed text-mist md:text-lg">
            From family reunions, bridal parties and even friendly group
            celebrations, Sunchase Beachfront Condos is the perfect location
            for your celebration.
          </p>
          <p className="mt-4 text-base leading-relaxed text-mist md:text-lg">
            Our gated, 2-story complex is conveniently located in the middle of
            the island, with easy walking distance to a variety of restaurants
            and shopping centers.
          </p>
          <a
            href="#inquiry"
            className="mt-8 inline-flex bg-sea px-6 py-3.5 text-[11px] font-medium uppercase tracking-[0.18em] text-white transition hover:bg-ink"
          >
            Plan a group stay
          </a>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {photos.map((photo, index) => (
            <div
              key={photo.src}
              className={`relative overflow-hidden ${
                index === 0 ? "col-span-2 aspect-[16/10]" : "aspect-[4/5]"
              }`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 768px) 25vw, 50vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
