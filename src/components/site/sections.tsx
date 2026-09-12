"use client";

import { useState } from "react";
import { useLocale } from "@/i18n/locale-provider";
import { useRowad } from "@/content/schema-ext";
import {
  MARQUES,
  ORIGINS,
  LISTINGS,
  BRANCHES,
  SHOWROOM_FRAMES,
  PROFILE,
  SLOGAN,
  type Origin,
} from "@/content/media";
import { RoadType } from "@/components/webgl/road-type";
import { Roll, GoRule } from "@/components/motion/roll";

/* -------------------------------------------------------------------------- */

export function Nav() {
  const c = useRowad();
  const { locale, toggleLocale } = useLocale();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-paper-3 bg-paper/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[92rem] items-center gap-5 px-5 sm:px-8">
        <a href="#top" className="flex shrink-0 items-center gap-2.5" aria-label={c.brand.name}>
          <img src="/mark.svg" alt="" className="h-7 w-7" />
          <span className="font-display text-[1rem] font-bold leading-none text-ink">
            {c.brand.name}
          </span>
        </a>

        <nav className="ms-auto hidden items-center gap-7 md:flex">
          {c.nav.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative py-2 text-[0.88rem] text-slate transition-colors hover:text-ink"
            >
              {l.label}
              <span className="absolute inset-x-0 bottom-1 h-[2px] origin-center scale-x-0 bg-signal transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <a
          href={PROFILE.whatsappHref}
          className="ms-auto hidden shrink-0 items-center gap-2 bg-ink px-4 py-2 text-[0.8rem] font-medium text-paper transition-colors hover:bg-signal md:flex"
        >
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 shrink-0 rounded-full bg-go"
            style={{ animation: "idle-pulse 2.4s ease-in-out infinite" }}
          />
          {c.hero.primaryCta}
        </a>

        <button
          onClick={toggleLocale}
          className="shrink-0 border border-ink/25 px-3.5 py-1.5 text-[0.72rem] font-medium text-slate transition-colors hover:border-signal hover:text-ink"
          aria-label={c.a11y.toggleLanguage}
        >
          {locale === "ar" ? "EN" : "ع"}
        </button>

        <button
          onClick={() => setOpen((v) => !v)}
          className="border border-ink/25 p-2 md:hidden"
          aria-expanded={open}
          aria-label={open ? c.a11y.closeMenu : c.a11y.openMenu}
        >
          <span className="block h-px w-4 bg-ink" />
          <span className="mt-1 block h-px w-4 bg-ink" />
        </button>
      </div>

      {open && (
        <nav className="border-t border-paper-3 px-5 pb-4 md:hidden">
          {c.nav.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block border-b border-paper-3 py-3 text-[0.95rem] text-ink last:border-0"
            >
              {l.label}
            </a>
          ))}
          <a
            href={PROFILE.whatsappHref}
            className="mt-3 block bg-ink px-4 py-2.5 text-center text-[0.85rem] font-medium text-paper"
          >
            {c.hero.primaryCta}
          </a>
        </nav>
      )}
    </header>
  );
}

/* -------------------------------------------------------------------------- */

export function Hero() {
  const c = useRowad();

  return (
    <section id="top" className="relative flex min-h-svh w-full flex-col overflow-hidden pt-16">
      {/* The copy sits on clean paper; the road is a band beneath it. Running
          the road full-bleed behind the headline left two-thirds of the frame
          as empty sky and put lane markings under the text. */}
      <div className="mx-auto flex w-full max-w-[92rem] flex-1 flex-col justify-center px-5 py-12 sm:px-8">
        <Roll as="div" className="max-w-[46rem]">
          <p className="label text-signal">{c.hero.eyebrow}</p>

          <h1 className="mt-4 font-display text-hero font-extrabold text-ink">{c.hero.headline}</h1>

          <GoRule className="mt-6 max-w-[18rem]" />

          <p className="mt-6 max-w-[38rem] text-lead leading-relaxed text-slate">{c.hero.sub}</p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href={PROFILE.whatsappHref}
              className="inline-flex items-center gap-2.5 bg-ink px-7 py-3.5 text-[0.88rem] font-semibold text-paper transition-colors hover:bg-signal"
            >
              {c.hero.primaryCta}
            </a>
            <a
              href="#board"
              className="inline-flex items-center gap-2 border border-ink/30 px-7 py-3.5 text-[0.88rem] font-semibold text-ink transition-colors hover:border-signal hover:text-signal"
            >
              {c.hero.secondaryCta}
            </a>
          </div>

          <p className="mt-6 flex flex-wrap items-center gap-3 text-[0.78rem] text-slate">
            <span className="go-chip px-2.5 py-1 font-semibold">{c.hero.statusNow}</span>
            <span>{c.hero.boardHint}</span>
          </p>
        </Roll>
      </div>

      {/* The slogan, laid on the road it is about. */}
      <div className="relative h-[46svh] min-h-[16rem] w-full shrink-0">
        <RoadType
          a={SLOGAN.a}
          b={SLOGAN.b}
          alt={`${c.hero.sloganA} ${c.hero.sloganB}`}
          className="absolute inset-0 h-full w-full"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-paper to-transparent"
        />
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

export function Origins() {
  const c = useRowad();

  return (
    <section id="origins" className="relative bg-paper-2 py-24 sm:py-32">
      <Roll as="div" className="mx-auto max-w-[80rem] px-5 sm:px-8">
        <div className="max-w-[46rem]">
          <p className="label text-signal">{c.origins.eyebrow}</p>
          <h2 className="mt-4 font-display text-display font-extrabold text-ink">
            {c.origins.heading}
          </h2>
          <GoRule className="mt-5 max-w-[7rem]" />
          <p className="mt-6 text-lead leading-relaxed text-slate">{c.origins.intro}</p>
        </div>

        <blockquote className="mt-10 border-s-4 border-signal ps-5">
          <p className="font-display text-[clamp(1.15rem,2.4vw,1.8rem)] font-bold leading-snug text-ink">
            “{c.origins.quote}”
          </p>
        </blockquote>

        <div className="mt-14 grid gap-px overflow-hidden border border-paper-3 bg-paper-3 sm:grid-cols-2 lg:grid-cols-3">
          {ORIGINS.map((o: Origin, i) => {
            const items = MARQUES.filter((m) => m.origin === o);
            return (
              <div
                key={o}
                // Five origins in a three-column grid leaves a hole; the
                // last cell takes the remaining width instead.
                className={`bg-paper-2 p-7 ${i === ORIGINS.length - 1 ? "sm:col-span-2 lg:col-span-1" : ""}`}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-[1.35rem] font-bold text-ink">
                    {c.origins.labels[o]}
                  </h3>
                  <span className="tnum text-[0.8rem] text-slate">
                    {items.length} {c.origins.countLabel}
                  </span>
                </div>
                <ul className="mt-4 flex flex-wrap gap-x-2 gap-y-2">
                  {items.map((m) => (
                    <li
                      key={m.name}
                      className="latin border border-paper-3 bg-paper px-2.5 py-1 text-[0.85rem] text-ink"
                    >
                      {m.name}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </Roll>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

export function Board() {
  const c = useRowad();

  return (
    <section id="board" className="relative bg-paper py-24 sm:py-32">
      <Roll as="div" className="mx-auto max-w-[86rem] px-5 sm:px-8">
        <div className="max-w-[46rem]">
          <p className="label text-signal">{c.board.eyebrow}</p>
          <h2 className="mt-4 font-display text-display font-extrabold text-ink">
            {c.board.heading}
          </h2>
          <GoRule className="mt-5 max-w-[7rem]" />
          <p className="mt-6 text-lead leading-relaxed text-slate">{c.board.intro}</p>
        </div>

        <div className="mt-14 border-t-2 border-ink">
          {LISTINGS.map((l) => (
            <article
              key={l.id}
              className="grid gap-5 border-b border-paper-3 py-7 lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)_auto] lg:items-center lg:gap-8"
            >
              <div>
                <p className="label text-slate">{l.marque}</p>
                <h3 className="latin mt-1 font-display text-[clamp(1.4rem,2.6vw,2rem)] font-bold leading-none text-ink">
                  {l.model}
                  {l.year && <span className="tnum ms-2 text-slate-2">{l.year}</span>}
                </h3>
              </div>

              <div>
                <p
                  className="text-[1rem] leading-relaxed text-ink"
                  dir={l.wrote === "ar" ? "rtl" : "ltr"}
                >
                  “{l.line}”
                </p>
                <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.74rem] text-slate">
                  <span>{l.wrote === "ar" ? c.board.wroteAr : c.board.wroteEn}</span>
                  <a
                    href={l.postUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-paper-3 underline-offset-4 transition-colors hover:text-signal"
                  >
                    {c.board.viewPost}
                  </a>
                  {!l.photo && <span className="text-slate">· {c.board.noPhoto}</span>}
                </p>
              </div>

              <div className="flex items-center gap-3 lg:justify-end">
                <span className="go-chip px-2.5 py-1 text-[0.78rem] font-semibold">
                  {c.board.statusNow}
                </span>
              </div>
            </article>
          ))}
        </div>
      </Roll>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

export function Branches() {
  const c = useRowad();

  return (
    <section id="branches" className="on-dark relative bg-ink py-24 text-paper sm:py-32">
      <div className="mx-auto max-w-[86rem] px-5 sm:px-8">
        <Roll as="div" className="max-w-[46rem]">
          <p className="label text-signal-hi">{c.branches.eyebrow}</p>
          <h2 className="mt-4 font-display text-display font-extrabold text-paper">
            {c.branches.heading}
          </h2>
          <div className="mt-5 h-[2px] max-w-[7rem] bg-signal-hi" />
          <p className="mt-6 text-lead leading-relaxed text-paper-3">{c.branches.intro}</p>
        </Roll>

        <div className="mt-14 grid gap-px overflow-hidden border border-white/15 bg-white/15 lg:grid-cols-3">
          {BRANCHES.map((b, i) => (
            <Roll key={b.id} as="div" className="bg-ink p-7 sm:p-8">
              <p className="label text-signal-hi">{c.branches.cityLabels[b.city]}</p>
              <h3 className="mt-2 font-display text-[1.4rem] font-bold text-paper">
                {c.branches.names[b.id]}
              </h3>
              <p className="mt-3 text-[0.92rem] leading-relaxed text-paper-3">
                {c.branches.addresses[b.id]}
              </p>

              <p className="label mt-6 text-paper-3">{c.branches.phonesLabel}</p>
              <ul className="mt-2 space-y-1">
                {b.phones.map((p) => (
                  <li key={p}>
                    <a
                      href={`tel:+2${p}`}
                      className="latin tnum text-[0.95rem] text-paper transition-colors hover:text-signal-hi"
                    >
                      {p}
                    </a>
                  </li>
                ))}
              </ul>

              <a
                href={b.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block border border-white/30 px-5 py-2.5 text-[0.8rem] font-semibold text-paper transition-colors hover:border-signal-hi hover:text-signal-hi"
              >
                {c.branches.mapCta}
              </a>
            </Roll>
          ))}
        </div>

        <Roll as="p" className="mt-8 text-[0.9rem] text-paper-3">
          {c.branches.whatsappLabel}:{" "}
          <a
            href={PROFILE.whatsappHref}
            className="latin tnum text-paper underline decoration-white/30 underline-offset-4 transition-colors hover:text-signal-hi"
          >
            {PROFILE.whatsapp}
          </a>
        </Roll>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

export function Room() {
  const c = useRowad();

  return (
    <section id="room" className="relative bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-[86rem] px-5 sm:px-8">
        <Roll as="div" className="max-w-[46rem]">
          <p className="label text-signal">{c.room.eyebrow}</p>
          <h2 className="mt-4 font-display text-display font-extrabold text-ink">
            {c.room.heading}
          </h2>
          <GoRule className="mt-5 max-w-[7rem]" />
        </Roll>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:gap-14">
          <Roll as="div">
            <div className="grid gap-3 sm:grid-cols-2">
              {SHOWROOM_FRAMES.map((src, i) => (
                <figure key={src} className="relative aspect-[3/2] overflow-hidden bg-paper-2">
                  <img
                    src={src}
                    alt={c.room.frameAlts[i]}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </figure>
              ))}
            </div>
            <p className="mt-3 text-[0.78rem] text-slate">{c.room.creativeNote}</p>

            <div className="mt-6 grid grid-cols-2 gap-4 sm:max-w-sm">
              <div>
                <p className="tnum font-display text-[clamp(1.6rem,2.8vw,2.2rem)] font-extrabold leading-none text-ink">
                  {PROFILE.followers}
                </p>
                <p className="label mt-1 text-slate">{c.room.followersLabel}</p>
              </div>
              <div>
                <p className="tnum font-display text-[clamp(1.6rem,2.8vw,2.2rem)] font-extrabold leading-none text-ink">
                  {PROFILE.posts}
                </p>
                <p className="label mt-1 text-slate">{c.room.postsLabel}</p>
              </div>
            </div>
          </Roll>

          <Roll as="div">
            <div className="space-y-4 text-[0.98rem] leading-relaxed text-slate">
              {c.room.body.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
              {c.about.body.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={PROFILE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-ink px-6 py-3.5 text-[0.85rem] font-semibold text-paper transition-colors hover:bg-signal"
              >
                Instagram
              </a>
              <a
                href={PROFILE.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-ink/30 px-6 py-3.5 text-[0.85rem] font-semibold text-ink transition-colors hover:border-signal hover:text-signal"
              >
                Facebook
              </a>
              <a
                href={PROFILE.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-ink/30 px-6 py-3.5 text-[0.85rem] font-semibold text-ink transition-colors hover:border-signal hover:text-signal"
              >
                TikTok
              </a>
            </div>
          </Roll>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

export function Footer() {
  const c = useRowad();

  return (
    <footer className="on-dark bg-ink text-paper">
      <span aria-hidden="true" className="block h-[3px] w-full bg-signal-hi" />
      <div className="mx-auto max-w-[86rem] px-5 py-12 sm:px-8 sm:py-14">
        <div className="grid gap-10 md:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] md:gap-16">
          <div>
            <div className="flex items-center gap-2.5">
              <img src="/mark.svg" alt="" className="h-6 w-6" />
              <span className="font-display text-[1rem] font-bold text-paper">{c.brand.name}</span>
            </div>
            <p className="mt-5 font-display text-[1.05rem] font-bold text-signal-hi">
              {c.brand.tagline}
            </p>
            <p className="mt-5 text-[0.86rem] leading-relaxed text-paper-3">{c.contact.address}</p>
          </div>
          <div className="space-y-6">
            <nav className="flex flex-wrap gap-x-7 gap-y-3">
              {c.nav.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="label text-paper-3 transition-colors hover:text-signal-hi"
                >
                  {l.label}
                </a>
              ))}
              <a
                href={PROFILE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="label text-paper-3 transition-colors hover:text-signal-hi"
              >
                Instagram
              </a>
            </nav>
            <div className="max-w-2xl space-y-3 border-t border-white/15 pt-6">
              <p className="label text-paper-3">{c.footer.rights}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
