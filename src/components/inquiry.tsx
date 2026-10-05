"use client";

import { FormEvent, useState } from "react";
import { useCondo } from "@/components/condo-context";

const inputClass =
  "w-full border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-sea";

export function Inquiry() {
  const { condo, setCondo } = useCondo();
  const [sent, setSent] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <section id="inquiry" className="scroll-mt-20 bg-foam">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:grid-cols-[0.9fr_1.1fr] md:px-8 md:py-28">
        <div>
          <p className="text-[11px] uppercase tracking-[0.32em] text-sea">
            Reservations
          </p>
          <h2 className="mt-4 font-display text-4xl font-light leading-tight md:text-5xl">
            Find your perfect getaway spot
          </h2>
          <p className="mt-4 text-lg text-mist">
            Enjoy tropical South Padre Island.
          </p>
          <p className="mt-4 leading-relaxed text-mist">
            Share your dates and which condo you have in mind, then call the
            front desk to confirm availability.
          </p>
          <div className="mt-8 space-y-2 text-sm text-ink">
            <p>
              <a href="tel:956-761-1660" className="hover:text-sea">
                956-761-1660
              </a>
            </p>
            <p>
              1010 Padre Blvd.
              <br />
              South Padre Island, Texas
            </p>
          </div>
        </div>

        {sent ? (
          <div className="flex flex-col justify-center border border-line bg-sand px-8 py-12">
            <p className="text-[11px] uppercase tracking-[0.32em] text-sea">
              Inquiry received
            </p>
            <h3 className="mt-4 font-display text-4xl font-light">
              Thanks for the details.
            </h3>
            <p className="mt-4 leading-relaxed text-mist">
              Call 956-761-1660 and the Sunchase staff can confirm these dates
              and the condo you have in mind.
            </p>
            <button
              type="button"
              className="mt-8 self-start text-[12px] uppercase tracking-[0.18em] text-sea"
              onClick={() => setSent(false)}
            >
              Send another inquiry
            </button>
          </div>
        ) : (
          <form
            onSubmit={onSubmit}
            className="grid gap-4 border border-line bg-sand p-6 md:p-8"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm">
                <span className="mb-2 block text-[11px] uppercase tracking-[0.16em] text-mist">
                  Name
                </span>
                <input required name="name" className={inputClass} />
              </label>
              <label className="block text-sm">
                <span className="mb-2 block text-[11px] uppercase tracking-[0.16em] text-mist">
                  Email
                </span>
                <input required type="email" name="email" className={inputClass} />
              </label>
            </div>
            <label className="block text-sm">
              <span className="mb-2 block text-[11px] uppercase tracking-[0.16em] text-mist">
                Phone
              </span>
              <input required type="tel" name="phone" className={inputClass} />
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm">
                <span className="mb-2 block text-[11px] uppercase tracking-[0.16em] text-mist">
                  Arrival
                </span>
                <input required type="date" name="arrival" className={inputClass} />
              </label>
              <label className="block text-sm">
                <span className="mb-2 block text-[11px] uppercase tracking-[0.16em] text-mist">
                  Departure
                </span>
                <input required type="date" name="departure" className={inputClass} />
              </label>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm">
                <span className="mb-2 block text-[11px] uppercase tracking-[0.16em] text-mist">
                  Condo
                </span>
                <select
                  name="condo"
                  value={condo}
                  onChange={(event) => setCondo(event.target.value)}
                  className={inputClass}
                  required
                >
                  <option value="">Select a condo</option>
                  <option>Two bedroom condos</option>
                  <option>Three bedroom condos</option>
                  <option>Four bedroom condo</option>
                  <option>Not sure yet</option>
                </select>
              </label>
              <label className="block text-sm">
                <span className="mb-2 block text-[11px] uppercase tracking-[0.16em] text-mist">
                  Guests
                </span>
                <input
                  required
                  type="number"
                  min={1}
                  name="guests"
                  className={inputClass}
                />
              </label>
            </div>
            <label className="block text-sm">
              <span className="mb-2 block text-[11px] uppercase tracking-[0.16em] text-mist">
                Notes
              </span>
              <textarea name="notes" rows={4} className={inputClass} />
            </label>
            <button
              type="submit"
              className="mt-2 bg-sea px-6 py-3.5 text-[11px] font-medium uppercase tracking-[0.18em] text-white transition hover:bg-ink"
            >
              Submit booking inquiry
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
