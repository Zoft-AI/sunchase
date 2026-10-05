import { reviews } from "@/lib/content";

function Stars() {
  return (
    <p className="tracking-[0.2em] text-gold" aria-label="5 stars">
      ★★★★★
    </p>
  );
}

export function Reviews() {
  return (
    <section id="reviews" className="scroll-mt-20 bg-sand">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <div className="max-w-xl">
          <p className="text-[11px] uppercase tracking-[0.32em] text-sea">
            Guest reviews
          </p>
          <h2 className="mt-4 font-display text-4xl font-light leading-tight md:text-5xl">
            Rated for 5-star relaxation
          </h2>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {reviews.map((review, index) => (
            <figure
              key={review.name}
              className={`border border-line bg-foam p-7 ${
                index === 0 ? "md:col-span-2" : ""
              }`}
            >
              <Stars />
              <blockquote className="mt-4 text-base leading-relaxed text-ink/90">
                “{review.quote}”
              </blockquote>
              <figcaption className="mt-6 font-display text-xl font-light">
                {review.name}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
