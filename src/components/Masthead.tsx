import { useMemo, useState } from "react";
import { TICKER, TOPICS } from "../data/questions";
import { fa, Reveal } from "../lib/helpers";
import { IconArrowL, IconCheck, IconCross, IconFlame, IconPencil, IconSpark, IconTimer } from "./Icons";

const COLORS = ["#ffc63a", "#ff5d73", "#12b5a0", "#2f6bff", "#41a9e8"];

function MiniBurst() {
  const pieces = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => {
        const a = (i / 14) * Math.PI * 2;
        const d = 42 + Math.random() * 46;
        return {
          tx: Math.cos(a) * d,
          ty: Math.sin(a) * d,
          rot: Math.random() * 520 - 260,
          c: COLORS[i % COLORS.length],
          delay: Math.random() * 0.06,
        };
      }),
    []
  );
  return (
    <span className="pointer-events-none absolute inset-0" aria-hidden>
      {pieces.map((p, i) => (
        <span
          key={i}
          className="confetti-piece"
          style={
            {
              background: p.c,
              "--tx": `${p.tx}px`,
              "--ty": `${p.ty}px`,
              "--rot": `${p.rot}deg`,
              "--delay": `${p.delay}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </span>
  );
}

const FLOATERS = [
  { ch: "π", cls: "text-blue/20 text-6xl", style: { top: "12%", right: "4%", "--r": "8deg", "--dur": "7s" } },
  { ch: "√", cls: "text-coral/25 text-5xl", style: { top: "58%", right: "2%", "--r": "-10deg", "--dur": "6s", "--delay": ".8s" } },
  { ch: "∞", cls: "text-teal/25 text-6xl", style: { top: "20%", left: "6%", "--r": "-6deg", "--dur": "8s", "--delay": ".4s" } },
  { ch: "÷", cls: "text-sun/40 text-5xl", style: { top: "70%", left: "3%", "--r": "12deg", "--dur": "6.5s", "--delay": "1.2s" } },
  { ch: "×", cls: "text-sky/25 text-5xl", style: { top: "6%", left: "38%", "--r": "5deg", "--dur": "7.5s", "--delay": ".2s" } },
  { ch: "٪", cls: "text-blue/15 text-4xl", style: { top: "80%", left: "40%", "--r": "-8deg", "--dur": "6s", "--delay": "1.6s" } },
] as const;

function QuickQuiz() {
  const samples = useMemo(
    () => [TOPICS[0], TOPICS[2], TOPICS[4], TOPICS[6], TOPICS[8], TOPICS[10], TOPICS[12]].map((t) => t.questions[0]),
    []
  );
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [streak, setStreak] = useState(0);
  const [done, setDone] = useState(false);

  const q = samples[idx];

  const pick = (i: number) => {
    if (picked !== null || done) return;
    setPicked(i);
    if (i === q.correct) setStreak((s) => s + 1);
    else setStreak(0);
    window.setTimeout(() => {
      if (idx + 1 >= samples.length) setDone(true);
      else {
        setIdx(idx + 1);
        setPicked(null);
      }
    }, 1150);
  };

  return (
    <div className="tilt relative rounded-xl border-2 border-ink/10 bg-white p-6 shadow-[8px_10px_0_rgba(15,29,69,0.10)] md:p-7" style={{ "--rot": "1.6deg" } as React.CSSProperties}>
      <span className="absolute -top-3.5 right-8 h-7 w-24 -rotate-3 border border-sun/50 bg-sun/70" aria-hidden />
      <span className="absolute -top-3.5 left-10 h-7 w-14 rotate-6 border border-sky/40 bg-sky/50" aria-hidden />

      <div className="flex items-center justify-between gap-3">
        <p className="font-display text-2xl text-ink">گرم‌کردنِ سریع!</p>
        <span
          key={streak}
          className={`animate-pop inline-flex items-center gap-1.5 rounded-full border-2 px-3 py-1 text-sm font-bold ${
            streak >= 2 ? "border-coral/40 bg-coral/10 text-coral" : "border-ink/10 bg-paper text-ink-2"
          }`}
        >
          <IconFlame className="h-4 w-4" />
          {fa(streak)} پیاپی
        </span>
      </div>

      {!done ? (
        <>
          <div className="mt-3 flex gap-1.5" aria-hidden>
            {samples.map((_, i) => (
              <span key={i} className={`h-1.5 flex-1 rounded-full ${i <= idx ? "bg-blue" : "bg-ink/10"}`} />
            ))}
          </div>
          <p className="mt-2 text-xs font-bold text-ink-2">سرمشق {fa(idx + 1)} از {fa(samples.length)}</p>
          <p key={idx} className="animate-slide-up mt-3 font-display text-xl leading-9 text-ink">{q.text}</p>
          <div className="mt-4 grid gap-2.5">
            {q.options.map((opt, i) => {
              const isPicked = picked === i;
              const isCorrect = i === q.correct;
              const show = picked !== null;
              return (
                <button
                  key={`${idx}-${i}`}
                  onClick={() => pick(i)}
                  className={`relative flex items-center gap-3 rounded-lg border-2 px-4 py-2.5 text-start text-[15px] font-semibold transition-all duration-200 ${
                    show && isCorrect
                      ? "border-teal bg-teal/10 text-ink"
                      : show && isPicked
                        ? "animate-shake border-coral bg-coral/10 text-ink"
                        : show
                          ? "border-ink/10 bg-white text-ink-2 opacity-50"
                          : "border-ink/10 bg-white text-ink hover:-translate-y-0.5 hover:border-blue"
                  }`}
                >
                  <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-md text-xs font-black ${show && isCorrect ? "bg-teal text-white" : show && isPicked ? "bg-coral text-white" : "bg-paper text-ink-2"}`}>
                    {["الف", "ب", "ج", "د"][i]}
                  </span>
                  {opt}
                  {show && isCorrect && <IconCheck className="ms-auto h-5 w-5 text-teal" />}
                  {show && isPicked && !isCorrect && <IconCross className="ms-auto h-5 w-5 text-coral" />}
                  {show && isPicked && isCorrect && <MiniBurst />}
                </button>
              );
            })}
          </div>
        </>
      ) : (
        <div className="animate-slide-up mt-6 text-center">
          <p className="font-display text-2xl text-ink">
            {streak >= 4 ? "ایول! دستت گرمه!" : "خوب بود! حالا بریم سراغ اصلِ مطلب!"}
          </p>
          <p className="mt-2 text-sm text-ink-2">۷۸ سوالِ دیگه اون تو منتظرته…</p>
          <a
            href="#quiz"
            className="btn-arcade mt-5 inline-flex items-center gap-2 rounded-lg bg-ink px-6 py-3 font-bold text-paper"
          >
            بریم سالن تمرین
            <IconArrowL className="h-5 w-5" />
          </a>
        </div>
      )}
    </div>
  );
}

export default function Masthead({ onSpeed }: { onSpeed: () => void }) {
  return (
    <header className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {FLOATERS.map((f, i) => (
          <span key={i} className={`floaty absolute select-none font-display ${f.cls}`} style={f.style as React.CSSProperties}>
            {f.ch}
          </span>
        ))}
        <svg className="absolute -left-24 top-24 h-[420px] w-[420px] text-blue/10" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2">
          <polygon points="30,4 70,4 96,30 96,70 70,96 30,96 4,70 4,30" strokeDasharray="5 4" />
        </svg>
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-14 md:pt-20 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border-2 border-ink/12 bg-white px-4 py-1.5 text-sm font-bold text-ink">
              <IconSpark className="h-3.5 w-3.5 text-sun" />
              باشگاه تمرین پایهٔ هشتم • ریاضی + علوم
            </span>
          </Reveal>
          <Reveal delay={90}>
            <h1 className="mt-6 font-display text-[44px] leading-[1.15] text-ink sm:text-6xl lg:text-[76px]">
              ریاضی و علومِ هشتم؛
              <br />
              این‌جا با <span className="marker">بازی</span> یاد می‌گیری!
            </h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-6 max-w-xl text-lg leading-9 text-ink-2">
              ۷۸ سوال تعاملی از ۱۳ فصل کتاب، دوئل ۶۰ ثانیه‌ای با زمان، کارت‌های فرمول،
              دانستنی‌های عجیب و چیستان. خبری از حفظ‌کردن نیست — فقط بزن و حال کن!
            </p>
          </Reveal>
          <Reveal delay={260}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href="#topics" className="btn-arcade inline-flex items-center gap-2.5 rounded-lg bg-ink px-7 py-3.5 text-lg font-bold text-sun">
                <IconPencil className="h-5 w-5" />
                فصل‌ها را ببین
              </a>
              <button
                onClick={onSpeed}
                className="btn-arcade inline-flex items-center gap-2.5 rounded-lg border-2 border-ink bg-white px-7 py-3.5 text-lg font-bold text-ink"
                style={{ "--shadow-c": "#0f1d45" } as React.CSSProperties}
              >
                <IconTimer className="h-5 w-5 text-coral" />
                دوئل با زمان
              </button>
            </div>
          </Reveal>
          <Reveal delay={330}>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
              {[
                ["۷۸", "سوال"],
                ["۱۳", "فصل"],
                ["۲", "حالت بازی"],
                ["۸", "مدال"],
              ].map(([n, l]) => (
                <div key={l} className="flex items-baseline gap-2">
                  <span className="font-display text-4xl text-blue">{n}</span>
                  <span className="text-sm font-semibold text-ink-2">{l}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="relative lg:col-span-5">
          <Reveal delay={200}>
            <QuickQuiz />
          </Reveal>
        </div>
      </div>

      <div className="marquee relative -mx-2 -rotate-1 overflow-hidden border-y-4 border-sun bg-ink py-3 text-paper" dir="ltr">
        <div className="marquee-track">
          {[0, 1].map((half) => (
            <div key={half} className="flex items-center" aria-hidden={half === 1}>
              {TICKER.map((t, i) => (
                <span key={i} className="flex items-center whitespace-nowrap font-display text-lg tracking-wide">
                  <span className="px-6" dir="rtl">{t}</span>
                  <IconSpark className="h-3.5 w-3.5 text-sun" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
