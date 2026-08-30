import { useEffect, useMemo, useRef, useState } from "react";
import type { Topic } from "../data/questions";
import { fa, reducedMotion, type RecordPayload } from "../lib/helpers";
import {
  IconArrowL,
  IconBolt,
  IconCheck,
  IconCross,
  IconEye,
  IconFlame,
  IconRefresh,
  IconShuffle,
  IconStar,
  IconTimer,
  TOPIC_ICONS,
} from "./Icons";

export type Mode = "normal" | "speed";
export type Session = { topic: Topic; mode: Mode };

const PRAISE = ["ایول! درست زدی!", "دمت گرم!", "معرکه بود!", "آفرین! مغزت داره می‌درخشه!", "همینه! ادامه بده!"];
const OOPS = ["اوپس! نزدیک بود!", "اشکالی نداره، حالا یادش گرفتی!", "دفعهٔ بعد حتماً می‌زنی!", "نکته‌شو بگیر و برو جلو!"];
const COLORS = ["#ffc63a", "#ff5d73", "#12b5a0", "#2f6bff", "#41a9e8"];
const LETTERS = ["الف", "ب", "ج", "د"];

function Burst() {
  const pieces = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => {
        const a = (i / 16) * Math.PI * 2;
        const d = 50 + Math.random() * 58;
        return {
          tx: Math.cos(a) * d,
          ty: Math.sin(a) * d,
          rot: Math.random() * 560 - 280,
          c: COLORS[i % COLORS.length],
          delay: Math.random() * 0.07,
        };
      }),
    []
  );
  return (
    <span className="pointer-events-none absolute inset-0 z-10" aria-hidden>
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

function Rain() {
  const pieces = useMemo(
    () =>
      Array.from({ length: 46 }, (_, i) => ({
        left: Math.random() * 100,
        c: COLORS[i % COLORS.length],
        dur: 1.9 + Math.random() * 1.6,
        delay: Math.random() * 0.9,
        rot: Math.random() * 360,
      })),
    []
  );
  return (
    <span className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {pieces.map((p, i) => (
        <span
          key={i}
          className="confetti-rain"
          style={
            {
              left: `${p.left}%`,
              background: p.c,
              transform: `rotate(${p.rot}deg)`,
              "--dur": `${p.dur}s`,
              "--delay": `${p.delay}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </span>
  );
}

type Props = {
  session: Session | null;
  onAgain: () => void;
  onNext: () => void;
  onBrowse: () => void;
  onSpeed: () => void;
  onRecord: (p: RecordPayload) => void;
};

export default function QuizArena({ session, onAgain, onNext, onBrowse, onSpeed, onRecord }: Props) {
  return (
    <section id="quiz" className="relative scroll-mt-24 overflow-hidden bg-board py-20 text-paper md:py-24">
      <div className="chalk-grid absolute inset-0" aria-hidden />
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <svg className="absolute right-6 top-16 h-16 w-16 rotate-12 text-paper/10" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l2 6 6 2-6 2-2 6-2-6-6-2 6-2z" />
        </svg>
        <svg className="absolute bottom-16 left-8 h-20 w-20 -rotate-6 text-paper/10" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="7 6">
          <circle cx="50" cy="50" r="42" />
        </svg>
        <span className="absolute left-1/3 top-10 font-display text-4xl text-paper/10">a² + b² = c²</span>
        <span className="absolute bottom-10 right-1/4 font-display text-3xl text-paper/10">E = انرژی!</span>
      </div>

      <div className="relative mx-auto max-w-4xl px-4">
        <div className="mb-12 max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border-2 border-paper/20 bg-paper/5 px-4 py-1 text-sm font-bold text-sun">
            <IconBolt className="h-3.5 w-3.5" />
            سالن تمرین
          </span>
          <h2 className="mt-4 font-display text-4xl leading-tight md:text-5xl">
            تخته سیاه آماده‌ست؛ <span className="text-sun">گچ</span> دستِ توست!
          </h2>
          <p className="mt-3 text-lg leading-8 text-paper/65">
            جواب بده، بازخورد فوری بگیر و XP جمع کن. با نمرهٔ ۶۰٪ به بالا، فصل فتح می‌شه و مدال می‌گیری!
          </p>
        </div>

        {session ? (
          <Game key={`${session.topic.id}-${session.mode}`} session={session} onAgain={onAgain} onNext={onNext} onBrowse={onBrowse} onRecord={onRecord} />
        ) : (
          <div className="rounded-xl border-2 border-dashed border-paper/25 bg-paper/5 p-10 text-center md:p-14">
            <IconEye className="mx-auto h-12 w-12 text-paper/40" />
            <h3 className="mt-4 font-display text-3xl">هنوز فصلی انتخاب نکردی!</h3>
            <p className="mx-auto mt-2 max-w-md leading-8 text-paper/65">
              از قفسهٔ فصل‌ها یکی رو بردار تا سوال‌هاش اینجا ظاهر بشن، یا مستقیم برو سراغ دوئل با زمان.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-4">
              <a href="#topics" className="btn-arcade rounded-lg bg-sun px-6 py-3 font-bold text-ink" style={{ "--shadow-c": "#b57e00" } as React.CSSProperties}>
                انتخاب فصل
              </a>
              <button onClick={onSpeed} className="btn-arcade rounded-lg border-2 border-paper/40 bg-transparent px-6 py-3 font-bold text-paper" style={{ "--shadow-c": "#4a5a86" } as React.CSSProperties}>
                دوئل با زمان
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function Game({
  session,
  onAgain,
  onNext,
  onBrowse,
  onRecord,
}: Omit<Props, "session" | "onSpeed"> & { session: Session }) {
  const { topic, mode } = session;
  const questions = topic.questions;
  const total = questions.length;

  const [phase, setPhase] = useState<"ready" | "play" | "done">("ready");
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [msg, setMsg] = useState("");
  const [correct, setCorrect] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [xp, setXp] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [burstKey, setBurstKey] = useState(0);

  const idxRef = useRef(0);
  const correctRef = useRef(0);
  const wrongsRef = useRef(0);
  const streakRef = useRef(0);
  const maxStreakRef = useRef(0);
  const xpRef = useRef(0);
  const phaseRef = useRef<"ready" | "play" | "done">("ready");
  const advTimer = useRef<number | null>(null);

  const q = questions[idx];
  const Icon = TOPIC_ICONS[topic.icon];

  useEffect(() => {
    return () => {
      if (advTimer.current) window.clearTimeout(advTimer.current);
    };
  }, []);

  useEffect(() => {
    if (mode !== "speed" || phase !== "play") return;
    const t = window.setInterval(() => setTimeLeft((s) => s - 1), 1000);
    return () => window.clearInterval(t);
  }, [mode, phase]);

  useEffect(() => {
    if (mode === "speed" && phase === "play" && timeLeft <= 0) finish();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, mode, phase]);

  const start = () => {
    phaseRef.current = "play";
    setPhase("play");
    if (reducedMotion()) return;
  };

  const finish = () => {
    if (phaseRef.current === "done") return;
    phaseRef.current = "done";
    if (advTimer.current) window.clearTimeout(advTimer.current);
    setPhase("done");
    onRecord({
      answered: correctRef.current + wrongsRef.current,
      correct: correctRef.current,
      streak: maxStreakRef.current,
      xpEarned: xpRef.current,
      topicId: mode === "normal" ? topic.id : undefined,
      completedNow: mode === "normal" && total > 0 && correctRef.current / total >= 0.6,
      speed: mode === "speed" ? correctRef.current : undefined,
    });
  };

  const advance = () => {
    if (phaseRef.current !== "play") return;
    if (idxRef.current + 1 >= total) {
      finish();
      return;
    }
    idxRef.current += 1;
    setIdx(idxRef.current);
    setPicked(null);
  };

  const pick = (i: number) => {
    if (picked !== null || phaseRef.current !== "play") return;
    setPicked(i);
    const ok = i === q.correct;
    if (ok) {
      const ns = streakRef.current + 1;
      const gain = 10 + Math.min(ns, 5) * 2;
      correctRef.current += 1;
      xpRef.current += gain;
      streakRef.current = ns;
      if (ns > maxStreakRef.current) maxStreakRef.current = ns;
      setCorrect(correctRef.current);
      setStreak(ns);
      setMaxStreak(maxStreakRef.current);
      setXp(xpRef.current);
      setMsg(PRAISE[Math.floor(Math.random() * PRAISE.length)]);
      setBurstKey((b) => b + 1);
    } else {
      wrongsRef.current += 1;
      streakRef.current = 0;
      setStreak(0);
      setMsg(OOPS[Math.floor(Math.random() * OOPS.length)]);
    }
    if (mode === "speed") {
      advTimer.current = window.setTimeout(() => advance(), 750);
    }
  };

  /* ---------- ready ---------- */
  if (phase === "ready") {
    return (
      <div className="animate-slide-up mx-auto max-w-2xl rounded-xl border-2 border-paper/15 bg-paper p-8 text-center text-ink shadow-[0_20px_60px_rgba(0,0,0,0.35)] md:p-10">
        <span className="mx-auto grid h-20 w-20 place-items-center rounded-xl bg-blue/10 text-blue-deep">
          <Icon className="h-11 w-11" />
        </span>
        <p className="mt-4 text-sm font-bold text-ink-2">{topic.chapter}</p>
        <h3 className="mt-1 font-display text-4xl">{topic.title}</h3>
        <p className="mt-3 leading-8 text-ink-2">{topic.desc}</p>
        <div className="mt-5 flex flex-wrap justify-center gap-2 text-sm font-bold">
          <span className="rounded-full bg-paper px-4 py-1.5 text-ink-2 ring-1 ring-ink/10">
            {mode === "speed" ? `${fa(60)} ثانیه وقت داری` : `${fa(total)} سوال، بدون عجله`}
          </span>
          <span className="rounded-full bg-paper px-4 py-1.5 text-ink-2 ring-1 ring-ink/10">بازخورد فوری + توضیح</span>
          <span className="rounded-full bg-paper px-4 py-1.5 text-ink-2 ring-1 ring-ink/10">هر درست = XP</span>
        </div>
        <button
          onClick={start}
          className="btn-arcade mt-8 rounded-lg bg-ink px-10 py-4 text-xl font-black text-sun"
        >
          {mode === "speed" ? "شروع دوئل!" : "شروع کن!"}
        </button>
      </div>
    );
  }

  /* ---------- done ---------- */
  if (phase === "done") {
    const attempted = correct + wrongsRef.current;
    const ratio = total > 0 ? correct / total : 0;
    const stars =
      mode === "speed"
        ? correct >= 12
          ? 3
          : correct >= 8
            ? 2
            : correct >= 4
              ? 1
              : 0
        : ratio >= 0.9
          ? 3
          : ratio >= 0.6
            ? 2
            : ratio >= 0.34
              ? 1
              : 0;
    const passed = mode === "normal" && ratio >= 0.6;
    return (
      <div className="relative">
        {stars >= 2 && <Rain />}
        <div className="animate-slide-up mx-auto max-w-2xl rounded-xl border-2 border-paper/15 bg-paper p-8 text-center text-ink shadow-[0_20px_60px_rgba(0,0,0,0.35)] md:p-10">
          <div className="flex justify-center gap-2">
            {[1, 2, 3].map((s) => (
              <IconStar
                key={s}
                filled={s <= stars}
                className={`h-12 w-12 ${s <= stars ? "animate-pop text-sun" : "text-ink/15"}`}
              />
            ))}
          </div>
          <h3 className="mt-4 font-display text-5xl">
            {mode === "speed" ? `${fa(correct)} تا درست!` : `${fa(correct)} از ${fa(total)}`}
          </h3>
          <p className="mt-2 text-lg font-semibold text-ink-2">
            {mode === "speed"
              ? `در ۶۰ ثانیه؛ ${correct >= 8 ? "رکوردِ قهرمانی نزدیکه!" : "دوباره بزن، تندتر!"}`
              : passed
                ? "فصل فتح شد! مدالش رفت روی دیوار افتخار."
                : "نمرهٔ قبولی ۶۰٪ هست؛ یه بار دیگه امتحان کن!"}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm font-bold">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-sun/20 px-4 py-2 text-[#8a5f00]">
              <IconBolt className="h-4 w-4" />
              {fa(xp)} XP گرفتی
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-coral/10 px-4 py-2 text-coral">
              <IconFlame className="h-4 w-4" />
              بهترین زنجیره: {fa(maxStreak)}
            </span>
            {mode === "normal" && attempted > 0 && (
              <span className="rounded-full bg-teal/10 px-4 py-2 text-teal">دقت {fa(Math.round((correct / attempted) * 100))}٪</span>
            )}
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button onClick={onAgain} className="btn-arcade inline-flex items-center gap-2 rounded-lg bg-ink px-6 py-3 font-bold text-paper">
              <IconRefresh className="h-5 w-5" />
              دوباره همین
            </button>
            <button onClick={onNext} className="btn-arcade inline-flex items-center gap-2 rounded-lg bg-blue px-6 py-3 font-bold text-paper" style={{ "--shadow-c": "#1c44b8" } as React.CSSProperties}>
              <IconShuffle className="h-5 w-5" />
              فصل تصادفی
            </button>
            <button onClick={onBrowse} className="btn-arcade inline-flex items-center gap-2 rounded-lg border-2 border-ink/20 bg-white px-6 py-3 font-bold text-ink" style={{ "--shadow-c": "#c9d6ee" } as React.CSSProperties}>
              <IconEye className="h-5 w-5" />
              فصل‌ها
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ---------- play ---------- */
  const show = picked !== null;
  const isLast = idx + 1 >= total;

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        {mode === "normal" ? (
          <div className="flex-1 min-w-52">
            <div className="mb-2 flex items-center justify-between text-sm font-bold text-paper/70">
              <span>سوال {fa(idx + 1)} از {fa(total)}</span>
              <span>{topic.title}</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full border border-paper/20 bg-paper/10">
              <div
                className="h-full rounded-full bg-gradient-to-l from-sun to-coral transition-all duration-500"
                style={{ width: `${(idx / total) * 100}%` }}
              />
            </div>
          </div>
        ) : (
          <span
            className={`inline-flex items-center gap-2 rounded-full border-2 px-5 py-2 font-display text-2xl ${
              timeLeft <= 10 ? "animate-pulse-soft border-coral bg-coral/15 text-coral" : "border-paper/25 bg-paper/5 text-paper"
            }`}
          >
            <IconTimer className="h-6 w-6" />
            {fa(Math.max(0, timeLeft))}
          </span>
        )}

        <div className="flex items-center gap-2">
          {streak >= 2 && (
            <span key={streak} className="animate-pop inline-flex items-center gap-1.5 rounded-full border-2 border-coral/50 bg-coral/15 px-4 py-1.5 text-sm font-black text-coral">
              <IconFlame className="h-4 w-4" />
              {fa(streak)}×
            </span>
          )}
          <span key={xp} className="animate-pop inline-flex items-center gap-1.5 rounded-full border-2 border-sun/50 bg-sun/15 px-4 py-1.5 text-sm font-black text-sun">
            <IconBolt className="h-4 w-4" />
            {fa(xp)} XP
          </span>
        </div>
      </div>

      <div key={idx} className="animate-slide-up rounded-xl border-2 border-paper/10 bg-paper p-6 text-ink shadow-[0_20px_60px_rgba(0,0,0,0.35)] md:p-8">
        <p className="text-xs font-black uppercase tracking-wider text-ink-2">
          {topic.subject === "math" ? "ریاضی" : "علوم"} • {topic.chapter}
        </p>
        <h3 className="mt-2 font-display text-2xl leading-[1.6] md:text-[28px]">{q.text}</h3>

        <div className="mt-6 grid gap-3">
          {q.options.map((opt, i) => {
            const isPicked = picked === i;
            const isCorrect = i === q.correct;
            return (
              <button
                key={i}
                onClick={() => pick(i)}
                disabled={show}
                className={`relative flex items-center gap-3.5 rounded-lg border-2 px-4 py-3.5 text-start text-base font-bold transition-all duration-200 ${
                  show && isCorrect
                    ? "border-teal bg-teal/10"
                    : show && isPicked
                      ? "animate-shake border-coral bg-coral/10"
                      : show
                        ? "border-ink/10 opacity-45"
                        : "border-ink/12 bg-white hover:-translate-y-0.5 hover:border-blue hover:shadow-[4px_4px_0_rgba(47,107,255,0.25)]"
                }`}
              >
                <span
                  className={`grid h-9 w-9 shrink-0 place-items-center rounded-md text-sm font-black ${
                    show && isCorrect ? "bg-teal text-white" : show && isPicked ? "bg-coral text-white" : "bg-paper text-ink-2"
                  }`}
                >
                  {LETTERS[i]}
                </span>
                <span className="text-[17px]">{opt}</span>
                {show && isCorrect && <IconCheck className="ms-auto h-6 w-6 shrink-0 text-teal" />}
                {show && isPicked && !isCorrect && <IconCross className="ms-auto h-6 w-6 shrink-0 text-coral" />}
                {show && isPicked && isCorrect && <Burst key={burstKey} />}
              </button>
            );
          })}
        </div>

        {show && (
          <div className={`animate-slide-up mt-5 rounded-lg border-2 p-4 ${picked === q.correct ? "border-teal/40 bg-teal/10" : "border-coral/40 bg-coral/10"}`}>
            <p className={`font-display text-xl ${picked === q.correct ? "text-teal" : "text-coral"}`}>{msg}</p>
            {(mode === "normal" || picked !== q.correct) && (
              <p className="mt-1.5 text-[15px] leading-7 text-ink">
                <span className="font-black">چرا؟ </span>
                {q.explain}
              </p>
            )}
            {mode === "normal" && (
              <button
                onClick={advance}
                className="btn-arcade mt-4 inline-flex items-center gap-2 rounded-lg bg-ink px-6 py-2.5 font-bold text-paper"
              >
                {isLast ? "دیدن نتیجه" : "سوال بعدی"}
                <IconArrowL className="h-4 w-4" />
              </button>
            )}
          </div>
        )}
      </div>

      {mode === "speed" && (
        <p className="mt-4 text-center text-sm font-semibold text-paper/50">درست: {fa(correct)} • بعد از هر جواب، خودکار رد می‌شی!</p>
      )}
    </div>
  );
}
