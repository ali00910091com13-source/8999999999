import { useState } from "react";
import { GLOSSARY, SCIENTISTS, TRUEFALSE } from "../data/lessons";
import { fa, Reveal, SectionHead } from "../lib/helpers";
import { IconArrowL, IconCheck, IconCross, IconSpark, IconStar, IconTrophy } from "./Icons";

function TruthGame() {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const item = TRUEFALSE[i];

  const pick = (v: boolean) => {
    if (picked !== null || done) return;
    setPicked(v);
    if (v === item.answer) setScore((s) => s + 1);
    window.setTimeout(() => {
      if (i + 1 >= TRUEFALSE.length) setDone(true);
      else {
        setI(i + 1);
        setPicked(null);
      }
    }, 1600);
  };

  const restart = () => {
    setI(0);
    setPicked(null);
    setScore(0);
    setDone(false);
  };

  if (done) {
    const verdict = score >= 10 ? "افسانه‌ای! مغزت فولادیه!" : score >= 7 ? "ایول! گیرنده‌هات قویه!" : score >= 4 ? "خوب بود؛ یه دور دیگه بزن!" : "اشکالی نداره؛ حالا همه‌شون رو یاد گرفتی!";
    return (
      <div className="animate-slide-up flex h-full flex-col items-center justify-center rounded-xl border-2 border-ink/10 bg-white p-8 text-center shadow-[6px_8px_0_rgba(15,29,69,0.08)]">
        <IconTrophy className={`h-14 w-14 ${score >= 7 ? "text-sun" : "text-ink/25"}`} />
        <p className="mt-3 font-display text-4xl text-ink">
          {fa(score)} از {fa(TRUEFALSE.length)}
        </p>
        <p className="mt-2 text-lg font-semibold text-ink-2">{verdict}</p>
        <button onClick={restart} className="btn-arcade mt-6 inline-flex items-center gap-2 rounded-lg bg-ink px-6 py-3 font-bold text-paper">
          دوباره بازی کن
          <IconArrowL className="h-4 w-4 rotate-180" />
        </button>
      </div>
    );
  }

  const show = picked !== null;
  const correctPick = picked === item.answer;

  return (
    <div className="flex h-full flex-col rounded-xl border-2 border-ink/10 bg-white p-6 shadow-[6px_8px_0_rgba(15,29,69,0.08)] md:p-7">
      <div className="flex items-center justify-between gap-3">
        <p className="font-display text-2xl text-ink">غلط‌گیر!</p>
        <span key={score} className="animate-pop inline-flex items-center gap-1.5 rounded-full border-2 border-sun/60 bg-sun/20 px-3 py-1 text-sm font-black text-[#8a5f00]">
          <IconStar filled className="h-4 w-4" />
          {fa(score)} درست
        </span>
      </div>

      <div className="mt-3 flex gap-1.5" aria-hidden>
        {TRUEFALSE.map((_, k) => (
          <span key={k} className={`h-1.5 flex-1 rounded-full ${k <= i ? "bg-coral" : "bg-ink/10"}`} />
        ))}
      </div>
      <p className="mt-2 text-xs font-bold text-ink-2">گزارهٔ {fa(i + 1)} از {fa(TRUEFALSE.length)}</p>

      <p key={i} className="animate-slide-up my-5 flex-1 rounded-lg border-2 border-dashed border-ink/20 bg-paper px-5 py-4 font-display text-[22px] leading-10 text-ink">
        «{item.claim}»
      </p>

      {!show ? (
        <div className="grid grid-cols-2 gap-3">
          <button onClick={() => pick(true)} className="btn-arcade rounded-lg bg-teal py-3.5 font-display text-xl text-white">
            درسته!
          </button>
          <button onClick={() => pick(false)} className="btn-arcade rounded-lg bg-coral py-3.5 font-display text-xl text-white" style={{ "--shadow-c": "#c22c44" } as React.CSSProperties}>
            غلطه!
          </button>
        </div>
      ) : (
        <div className={`animate-slide-up rounded-lg border-2 p-4 ${correctPick ? "border-teal/50 bg-teal/10" : "border-coral/50 bg-coral/10"}`}>
          <p className={`flex items-center gap-2 font-display text-xl ${correctPick ? "text-teal" : "text-coral"}`}>
            {correctPick ? <IconCheck className="h-5 w-5" /> : <IconCross className="h-5 w-5" />}
            {correctPick ? "درست گفتی!" : item.answer ? "نه! این گزاره درست بود." : "نه! این گزاره غلط بود."}
          </p>
          <p className="mt-1.5 text-[15px] leading-7 text-ink">{item.why}</p>
        </div>
      )}
    </div>
  );
}

export default function Knowledge() {
  const [term, setTerm] = useState<string | null>(null);

  return (
    <section id="knowledge" className="relative scroll-mt-24 overflow-hidden bg-board py-20 text-paper md:py-24">
      <div className="chalk-grid absolute inset-0" aria-hidden />
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <span className="absolute right-8 top-12 select-none font-display text-6xl text-sun/15">؟!</span>
        <span className="absolute bottom-16 left-10 select-none font-display text-4xl text-paper/10">کتابخانه</span>
      </div>

      <div className="relative mx-auto max-w-7xl px-4">
        <SectionHead
          dark
          kicker="گنجینهٔ هشتم"
          title={
            <>
              دانشمندان، واژه‌ها و <span className="marker">غلط‌گیر</span>
            </>
          }
          desc="شش دانشمند بزرگ که باید بشناسی، واژه‌نامهٔ کلیدی درس‌ها و یک بازی برای شکار گزاره‌های گول‌زننده!"
        />

        <div className="grid gap-10 lg:grid-cols-12">
          {/* scientists */}
          <div className="lg:col-span-7">
            <Reveal>
              <h3 className="mb-4 flex items-center gap-2 font-display text-2xl text-sun">
                <IconSpark className="h-5 w-5" />
                قهرمان‌های علم
              </h3>
            </Reveal>
            <div className="grid gap-4 sm:grid-cols-2">
              {SCIENTISTS.map((s, i) => (
                <Reveal key={s.name} delay={(i % 2) * 90}>
                  <div className="tilt group h-full rounded-xl border border-paper/12 bg-paper/5 p-5 transition-colors hover:border-sun/50" style={{ "--rot": i % 2 === 0 ? "-0.6deg" : "0.6deg" } as React.CSSProperties}>
                    <div className="flex items-center gap-3.5">
                      <span
                        className="grid h-14 w-14 shrink-0 place-items-center rounded-full border-4 border-paper/15 font-display text-2xl text-paper transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"
                        style={{ background: s.color }}
                      >
                        {s.initial}
                      </span>
                      <div>
                        <h4 className="font-display text-[21px] leading-7 text-paper">{s.name}</h4>
                        <p className="text-xs font-bold text-paper/50">{s.field}</p>
                      </div>
                    </div>
                    <p className="mt-3 text-[14.5px] leading-7 text-paper/70">{s.achievement}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* glossary */}
            <Reveal delay={120}>
              <h3 className="mb-1 mt-10 flex items-center gap-2 font-display text-2xl text-sun">
                <IconSpark className="h-5 w-5" />
                واژه‌نامهٔ جیبی
              </h3>
              <p className="mb-4 text-sm font-semibold text-paper/55">روی هر واژه بزن تا تعریفش باز بشه!</p>
            </Reveal>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {GLOSSARY.map((g, i) => (
                <Reveal key={g.term} delay={(i % 3) * 50}>
                  <button
                    onClick={() => setTerm(term === g.term ? null : g.term)}
                    className={`w-full rounded-lg border px-3 py-2.5 text-start transition-all duration-200 ${
                      term === g.term
                        ? "border-sun bg-sun/15 text-sun shadow-[0_0_20px_rgba(255,198,58,0.15)]"
                        : "border-paper/12 bg-paper/5 text-paper/75 hover:-translate-y-0.5 hover:border-paper/35"
                    }`}
                  >
                    <span className="block text-[14.5px] font-black">{g.term}</span>
                    {term === g.term && (
                      <span className="animate-slide-up mt-1 block text-[12.5px] font-semibold leading-6 text-paper/75">{g.def}</span>
                    )}
                  </button>
                </Reveal>
              ))}
            </div>
          </div>

          {/* truth game */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Reveal delay={100}>
                <TruthGame />
              </Reveal>
              <Reveal delay={200}>
                <div className="tilt mt-6 rounded-md border-2 border-paper/20 bg-paper/5 p-5 text-center" style={{ "--rot": "0.8deg" } as React.CSSProperties}>
                  <p className="font-display text-xl text-paper">چالش بذار برای دوستات!</p>
                  <p className="mt-1 text-sm leading-7 text-paper/60">
                    گزاره‌های «غلط‌گیر» رو از دوستت بپرس؛ کی می‌تونه همهٔ {fa(TRUEFALSE.length)} تا رو درست بگه؟
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
