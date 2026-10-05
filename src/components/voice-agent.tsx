"use client";

import { FormEvent, useState } from "react";
const COUNTRY_CODES = [
  { iso: "US", code: "+1" },
  { iso: "MX", code: "+52" },
  { iso: "GB", code: "+44" },
  { iso: "IN", code: "+91" },
];

type Errors = { name?: string; phone?: string };

export function VoiceAgent() {
  const [name, setName] = useState("");
  const [countryCode, setCountryCode] = useState("+1");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next: Errors = {};
    if (!name.trim()) next.name = "Enter your name";
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 7) next.phone = "Enter a valid phone number";
    setErrors(next);
    setFormError("");
    if (next.name || next.phone || submitting) return;
    setSubmitting(true);
    try {
      const response = await fetch("/api/call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone,
          countryCode,
          notes,
        }),
      });
      const body = (await response.json()) as { error?: string };
      if (!response.ok) {
        setFormError(body.error || "We could not start the call. Try again in a moment.");
        return;
      }
      setSubmitted(true);
    } catch {
      setFormError("We could not start the call. Try again in a moment.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="voice" className="scroll-mt-20 bg-[#062C3A] text-[#F8FAFC]">
      <div
        className="relative overflow-hidden"
        style={{
          backgroundImage:
            "radial-gradient(circle, color-mix(in srgb, #F8FAFC 22%, transparent) 1.1px, transparent 1.25px)",
          backgroundSize: "16px 16px",
        }}
      >
        <div className="mx-auto grid max-w-5xl items-start gap-8 px-5 py-16 md:grid-cols-[minmax(0,1.05fr)_minmax(260px,360px)] md:gap-12 md:px-8 md:py-24">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center bg-[#2DD4BF]/20 text-lg font-semibold text-[#2DD4BF]">
                S
              </span>
              <h2 className="font-display text-3xl font-light leading-tight md:text-4xl">
                Talk with Sunchase
              </h2>
            </div>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[#C4C4CC]">
              Leave your number and our voice assistant will call you about
              condo availability, dates, and the island.
            </p>
            <p className="mt-3 max-w-md text-base font-semibold">
              A real person can still pick up at 956-761-1660.
            </p>
          </div>

          <div className="rounded-2xl bg-[#111827] p-5 shadow-lg">
            {submitted ? (
              <div className="space-y-2 py-8 text-center">
                <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#2DD4BF]/20">
                  <PhoneIcon />
                </div>
                <p className="text-base font-semibold text-white">We are calling you now</p>
                <p className="text-sm text-[#C4C4CC]">
                  Answer your phone. This usually takes a few seconds.
                </p>
                <button
                  type="button"
                  className="mt-4 text-xs uppercase tracking-[0.16em] text-[#2DD4BF]"
                  onClick={() => setSubmitted(false)}
                >
                  Use a different number
                </button>
              </div>
            ) : (
              <form className="space-y-3.5" onSubmit={onSubmit} noValidate>
                <label className="block">
                  <span className="mb-1.5 block text-[11px] font-medium uppercase tracking-wide text-white">
                    Name
                  </span>
                  <input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    autoComplete="name"
                    placeholder="Your name"
                    className="h-10 w-full rounded-sm border border-black/10 bg-[#F4F4F5] px-3 text-sm text-[#111] outline-none placeholder:text-[#71717A]"
                  />
                  {errors.name ? (
                    <span className="mt-1 block text-xs text-[#fecaca]">
                      {errors.name}
                    </span>
                  ) : null}
                </label>

                <div>
                  <span className="mb-1.5 block text-[11px] font-medium uppercase tracking-wide text-white">
                    Phone number
                  </span>
                  <div className="flex gap-2">
                    <select
                      aria-label="Country code"
                      value={countryCode}
                      onChange={(event) => setCountryCode(event.target.value)}
                      className="h-10 w-[5.75rem] shrink-0 rounded-sm border border-black/10 bg-[#F4F4F5] px-2 text-sm text-[#111] outline-none"
                    >
                      {COUNTRY_CODES.map((item) => (
                        <option key={`${item.iso}-${item.code}`} value={item.code}>
                          {item.iso} {item.code}
                        </option>
                      ))}
                    </select>
                    <input
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder="Phone number"
                      className="h-10 min-w-0 flex-1 rounded-sm border border-black/10 bg-[#F4F4F5] px-3 text-sm text-[#111] outline-none placeholder:text-[#71717A]"
                    />
                  </div>
                  {errors.phone ? (
                    <span className="mt-1 block text-xs text-[#fecaca]">
                      {errors.phone}
                    </span>
                  ) : null}
                </div>

                <label className="block">
                  <span className="mb-1.5 block text-[11px] font-medium uppercase tracking-wide text-white">
                    Notes (optional)
                  </span>
                  <textarea
                    value={notes}
                    onChange={(event) => setNotes(event.target.value)}
                    rows={2}
                    placeholder="Anything we should know"
                    className="min-h-16 w-full resize-none rounded-sm border border-black/10 bg-[#F4F4F5] px-3 py-2 text-sm text-[#111] outline-none placeholder:text-[#71717A]"
                  />
                </label>

                {formError ? (
                  <p className="text-xs text-[#fecaca]">{formError}</p>
                ) : null}
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-[#0D9488] to-[#0284C7] text-sm font-semibold text-white disabled:opacity-70"
                >
                  <PhoneIcon />
                  {submitting ? "Calling…" : "Call me"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
      <path
        d="M7 3.5h2.2l1.2 3-1.6 1a12 12 0 0 0 5.7 5.7l1-1.6 3 1.2V18a2 2 0 0 1-2.2 2A15.5 15.5 0 0 1 4 6.7 2 2 0 0 1 6 4.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}
