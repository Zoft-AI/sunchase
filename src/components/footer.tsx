import Image from "next/image";

const about = [
  { href: "#top", label: "Home" },
  { href: "#about", label: "About Sunchase" },
  { href: "#amenities", label: "Amenities" },
  { href: "#gallery", label: "Photo Tour" },
  { href: "#activities", label: "Activities" },
  { href: "#inquiry", label: "Contact" },
];

const information = [
  { href: "#location", label: "Map & Location" },
  { href: "#island", label: "Explore South Padre Island" },
  { href: "#events", label: "Groups & Events" },
  { href: "#reviews", label: "Reviews" },
];

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div
        id="location"
        className="scroll-mt-20 mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-[1.1fr_0.9fr] md:px-8"
      >
        <div className="relative min-h-72 overflow-hidden">
          <iframe
            title="Map of Sunchase Beachfront Condos"
            src="https://maps.google.com/maps?q=1010+Padre+Blvd,+South+Padre+Island,+Texas&z=15&output=embed"
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-[11px] uppercase tracking-[0.32em] text-white/50">
            Map & location
          </p>
          <h2 className="mt-4 font-display text-4xl font-light">
            In the middle of the island
          </h2>
          <p className="mt-4 leading-relaxed text-white/70">
            1010 Padre Blvd.
            <br />
            South Padre Island, Texas
          </p>
          <a
            href="tel:956-761-1660"
            className="mt-4 text-lg text-white hover:text-white/80"
          >
            956-761-1660
          </a>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-4 md:px-8">
          <div>
            <Image
              src="/images/logo.svg"
              alt="Sunchase Beachfront"
              width={170}
              height={44}
              unoptimized
              className="h-10 w-auto brightness-0 invert"
            />
          </div>
          <div>
            <h3 className="text-[11px] uppercase tracking-[0.22em] text-white/50">
              About
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-white/80">
              {about.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-[11px] uppercase tracking-[0.22em] text-white/50">
              Information
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-white/80">
              {information.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-[11px] uppercase tracking-[0.22em] text-white/50">
              Contact our staff
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-white/80">
              <a href="tel:956-761-1660" className="hover:text-white">
                956-761-1660
              </a>
              <br />
              1010 Padre Blvd.
              <br />
              South Padre Island, Texas
            </p>
            <div className="mt-4 flex gap-4 text-sm text-white/80">
              <a
                href="https://www.facebook.com/people/Sunchase-Beachfront-Condos/61565009371519/"
                className="hover:text-white"
                target="_blank"
                rel="noreferrer"
              >
                Facebook
              </a>
              <a
                href="https://www.instagram.com/sunchasebeachfrontspi/"
                className="hover:text-white"
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
              <a
                href="https://web.resortdata.cloud/owner?resort=2q"
                className="hover:text-white"
                target="_blank"
                rel="noreferrer"
              >
                Owner login
              </a>
            </div>
          </div>
        </div>
        <p className="border-t border-white/10 px-5 py-6 text-center text-xs text-white/50 md:px-8">
          © {new Date().getFullYear()} Sunchase Beachfront Condos. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
