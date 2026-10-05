import Image from "next/image";

export function Hero() {
  return (
    <section id="top" className="relative min-h-[100svh]">
      <Image
        src="/images/hero.jpg"
        alt="South Padre Island beach, with swimmers in the surf and the island skyline beyond"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/25 to-ink/60" />
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-4xl flex-col items-center justify-center px-6 pb-16 pt-28 text-center text-white">
        <p className="text-[11px] uppercase tracking-[0.42em] text-white/80">
          South Padre Island
        </p>
        <h1 className="mt-5 max-w-[16ch] font-display text-[clamp(2.8rem,10vw,6.75rem)] font-light leading-[0.95] tracking-tight">
          Experience
          <span className="mt-2 block italic">island life</span>
        </h1>
        <p className="mt-8 max-w-sm text-[11px] uppercase leading-6 tracking-[0.22em] text-white/85 sm:max-w-none sm:text-[12px] sm:tracking-[0.28em]">
          Calm waves · Year-round getaways · Sunny days
        </p>
        <a
          href="#condos"
          className="mt-10 border border-white px-8 py-3.5 text-[11px] font-medium uppercase tracking-[0.22em] transition hover:bg-white hover:text-ink"
        >
          Book now
        </a>
      </div>
      <a
        href="#about"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-[10px] uppercase tracking-[0.32em] text-white/80"
      >
        Scroll
      </a>
    </section>
  );
}
