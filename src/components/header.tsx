"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const links = [
  { href: "#about", label: "About" },
  { href: "#condos", label: "Condos" },
  { href: "#amenities", label: "Amenities" },
  { href: "#island", label: "The Island" },
  { href: "#events", label: "Events" },
  { href: "#reviews", label: "Reviews" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const solid = scrolled || open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[80] transition-colors duration-300 ${
        solid
          ? "border-b border-line bg-foam/95 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5 md:px-8">
        <a href="#top" className="shrink-0" aria-label="Sunchase home">
          <Image
            src="/images/logo.svg"
            alt="Sunchase Beachfront"
            width={170}
            height={44}
            priority
            unoptimized
            className={`h-10 w-auto md:h-11 ${solid ? "" : "brightness-0 invert"}`}
          />
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-[13px] tracking-wide transition hover:text-tide ${
                solid ? "text-ink" : "text-white"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="#voice"
            className={`hidden px-4 py-2.5 text-[11px] font-medium uppercase tracking-[0.18em] transition sm:inline-flex ${
              solid
                ? "border border-sea text-sea hover:bg-sea hover:text-white"
                : "border border-white/80 text-white hover:bg-white hover:text-ink"
            }`}
          >
            Get in touch
          </a>
          <a
            href="#inquiry"
            className={`hidden px-4 py-2.5 text-[11px] font-medium uppercase tracking-[0.18em] transition md:inline-flex ${
              solid
                ? "bg-sea text-white hover:bg-ink"
                : "border border-white/80 text-white hover:bg-white hover:text-ink"
            }`}
          >
            Booking inquiry
          </a>
          <button
            type="button"
            className={`inline-flex h-10 w-10 items-center justify-center lg:hidden ${
              solid ? "text-ink" : "text-white"
            }`}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? "Close" : "Menu"}</span>
            <span className="flex w-5 flex-col gap-1.5">
              <span
                className={`h-px w-full bg-current transition ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
              />
              <span
                className={`h-px w-full bg-current transition ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          className="border-t border-line bg-foam px-5 py-4 lg:hidden"
          aria-label="Mobile"
        >
          <ul className="flex flex-col">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block border-b border-line/80 py-3 text-sm text-ink"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="mt-4 flex flex-col gap-2">
              <a
                href="#voice"
                className="inline-flex border border-sea px-4 py-3 text-[11px] font-medium uppercase tracking-[0.18em] text-sea"
                onClick={() => setOpen(false)}
              >
                Get in touch
              </a>
              <a
                href="#inquiry"
                className="inline-flex bg-sea px-4 py-3 text-[11px] font-medium uppercase tracking-[0.18em] text-white"
                onClick={() => setOpen(false)}
              >
                Booking inquiry
              </a>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
