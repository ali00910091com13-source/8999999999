import { useState } from "react";
import { FACTS, FORMULAS, RIDDLES } from "../data/questions";
import { fa, Reveal, SectionHead } from "../lib/helpers";
import { IconArrowL, IconBrain, IconEye, IconShuffle, IconSpark } from "./Icons";

export default function FunZone() {
  const [factIdx, setFactIdx] = useState(0);
  const [riddleIdx, setRiddleIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [flipped, setFlipped] = useState<Set<number>>(new Set());

  const nextFact = () => {
    let n = factIdx;
    while (n === factIdx && FACTS.length > 1) n = Math.floor(Math.random() * FACTS.length);
    setFactIdx(n);
  };

  const stepRiddle = (d: 1 | -1) => {
    setRevealed(false);
    setRiddleIdx((riddleIdx + d + RIDDLES.length) % RIDDLES.length);
  };

  const toggleFlip = (i: number) =>
    setFlipped((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <section id="fun" className="relative scroll-mt-24 overflow-hidden py-20 md:py-24">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <span className="floaty absolute right-[8%] top-16 font-display text-6xl text-sun/30" style={{ "--r": "10deg" } as React.CSSProperties}>؟</span>
        <span className="floaty absolute left-[6%] top-40 font-display text-5xl text-blue/15" style={{ "--r": "-8deg", "--delay": ".6s" } as React.CSSProperties}>!</span>
      </div>

      <div className="relative mx-auto max-w-7xl px-4">
        <SectionHead
          kicker="ایستگاهِ باحال"
          title={
            <>
              مغزت رو <span className="marker">قلقلک</span> بده!
            </>
          }
          desc="فرمول‌های جادویی که با یه کلیک برمی‌گردن، دانستنی‌هایی که به دوستات می‌گی و چیستان‌هایی که همه رو گیر می‌ندازن."
        />

        <div className="grid gap-10 lg:grid-cols-12">
          {/* sticky fun column */}
          <div className="lg:col-span-5">
            <div className="space-y-8 lg:sticky lg:top-28">
              <Reveal>
                <div className="tilt relative rounded-xl border-2 border-ink/10 bg-white p-6 shadow-[6px_8px_0_rgba(15,29,69,0.08)]" style={{ "--rot": "-1deg" } as React.CSSProperties}>
                  <span className="absolute -top-3 right-1/2 h-6 w-24 -translate-x-1/2 rotate-2 border border-teal/40 bg-teal/50" aria-hidden />
                  <div className="flex items-center gap-3">
                    <span className="grid h-12 w-12 place-items-center rounded-lg bg-blue/10 text-blue-deep">
                      <IconBrain className="h-7 w-7" />
                    </span>
                    <div>
                      <h3 className="font-display text-2xl text-ink">آیا می‌دانستی؟</h3>
                      <p className="text-xs font-bold text-ink-2">دانستنی شمارهٔ {fa(factIdx + 1)} از {fa(FACTS.length)}</p>
                    </div>
                  </div>
                  <p key={factIdx} className="animate-slide-up mt-4 min-h-28 font-display text-[21px] leading-10 text-ink">
                    {FACTS[factIdx]}
                  </p>
                  <button
                    onClick={nextFact}
                    className="btn-arcade mt-4 inline-flex items-center gap-2 rounded-lg bg-blue px-5 py-2.5 font-bold text-paper"
                    style={{ "--shadow-c": "#1c44b8" } as React.CSSProperties}
                  >
                    <IconShuffle className="h-4 w-4" />
                    یه تای دیگه!
                  </button>
                </div>
              </Reveal>

              <Reveal delay={120}>
                <div className="tilt relative rounded-md border-2 border-[#e0a800]/40 bg-sun p-6 shadow-[6px_8px_0_rgba(224,168,0,0.25)]" style={{ "--rot": "1.4deg" } as React.CSSProperties}>
                  <span className="absolute -top-3 left-8 h-6 w-20 -rotate-3 border border-ink/10 bg-paper/70" aria-hidden />
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-2xl text-ink">چیستانِ باحال!</h3>
                    <div className="flex gap-1">
                      <button onClick={() => stepRiddle(-1)} aria-label="چیستان قبلی" className="grid h-8 w-8 place-items-center rounded-md bg-ink/10 text-ink transition hover:bg-ink/20">
                        <IconArrowL className="h-4 w-4 rotate-180" />
                      </button>
                      <button onClick={() => stepRiddle(1)} aria-label="چیستان بعدی" className="grid h-8 w-8 place-items-center rounded-md bg-ink/10 text-ink transition hover:bg-ink/20">
                        <IconArrowL className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <p key={riddleIdx} className="animate-slide-up mt-3 min-h-16 text-lg font-bold leading-9 text-ink">
                    {RIDDLES[riddleIdx].text}
                  </p>
                  {revealed ? (
                    <button onClick={() => setRevealed(false)} className="animate-slide-up mt-3 inline-flex items-center gap-2 rounded-lg bg-ink px-5 py-2.5 font-bold text-sun">
                      <IconEye className="h-4 w-4" />
                      {RIDDLES[riddleIdx].answer} — قایمش کن!
                    </button>
                  ) : (
                    <button
                      onClick={() => setRevealed(true)}
                      className="btn-arcade mt-3 rounded-lg bg-ink px-5 py-2.5 font-bold text-sun"
                    >
                      جواب رو بگو!
                    </button>
                  )}
                </div>
              </Reveal>
            </div>
          </div>

          {/* formula deck */}
          <div className="lg:col-span-7">
            <Reveal delay={80}>
              <div className="mb-5 flex items-center gap-2 text-sm font-bold text-ink-2">
                <IconSpark className="h-4 w-4 text-sun" />
                جعبهٔ فرمول‌ها — روش نگه دار (یا کلیک کن) تا برگرده و مثال رو ببینی!
              </div>
            </Reveal>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {FORMULAS.map((f, i) => (
                <Reveal key={f.name} delay={(i % 3) * 90}>
                  <button
                    className={`flip block h-44 w-full cursor-pointer text-start ${flipped.has(i) ? "flipped" : ""}`}
                    onClick={() => toggleFlip(i)}
                    aria-label={`کارت فرمول ${f.name}`}
                  >
                    <span className="flip-inner block h-full w-full">
                      <span className="flip-face flex flex-col justify-between rounded-xl border-2 border-ink/10 bg-white p-5 shadow-[4px_5px_0_rgba(15,29,69,0.07)]">
                        <span className={`self-start rounded-full px-3 py-1 text-[11px] font-black ${f.subject === "math" ? "bg-blue/10 text-blue-deep" : "bg-teal/10 text-teal"}`}>
                          {f.subject === "math" ? "ریاضی" : "علوم"}
                        </span>
                        <span className="font-display text-[22px] leading-8 text-ink">{f.name}</span>
                        <span className="flex items-center gap-1.5 text-xs font-bold text-ink-2">
                          <IconSpark className="h-3 w-3 text-sun" />
                          برگردون تا فرمول رو ببینی
                        </span>
                      </span>
                      <span className="flip-back flip-face flex flex-col justify-center rounded-xl border-2 border-ink bg-ink p-5 shadow-[4px_5px_0_rgba(47,107,255,0.4)]">
                        <span className="font-display text-[22px] leading-9 text-sun">{f.formula}</span>
                        <span className="mt-2 text-sm leading-6 text-paper/70">{f.example}</span>
                      </span>
                    </span>
                  </button>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
