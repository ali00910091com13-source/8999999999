import { useEffect, useRef, useState, type ReactNode } from "react";
import type { Progress } from "../data/questions";

const FA = "۰۱۲۳۴۵۶۷۸۹";
export const fa = (v: string | number): string => String(v).replace(/\d/g, (d) => FA[+d]);

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------------- progress (localStorage) ---------------- */

const KEY = "hashtzoloi-progress-v1";
const DEFAULT_PROGRESS: Progress = { xp: 0, answered: 0, correct: 0, bestStreak: 0, speedBest: 0, completed: [] };

function load(): Progress {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return { ...DEFAULT_PROGRESS, ...JSON.parse(raw) };
  } catch {
    /* ignore */
  }
  return { ...DEFAULT_PROGRESS };
}

export type RecordPayload = {
  answered: number;
  correct: number;
  streak: number;
  xpEarned: number;
  topicId?: string;
  completedNow?: boolean;
  speed?: number;
};

export function useProgress() {
  const [progress, setProgress] = useState<Progress>(load);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(progress));
    } catch {
      /* ignore */
    }
  }, [progress]);

  const record = (p: RecordPayload) =>
    setProgress((prev) => ({
      xp: prev.xp + p.xpEarned,
      answered: prev.answered + p.answered,
      correct: prev.correct + p.correct,
      bestStreak: Math.max(prev.bestStreak, p.streak),
      speedBest: p.speed !== undefined ? Math.max(prev.speedBest, p.speed) : prev.speedBest,
      completed:
        p.topicId && p.completedNow && !prev.completed.includes(p.topicId)
          ? [...prev.completed, p.topicId]
          : prev.completed,
    }));

  const reset = () => setProgress({ ...DEFAULT_PROGRESS, completed: [] });

  return { progress, record, reset };
}

/* ---------------- scroll reveal ---------------- */

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reducedMotion()) {
      el.classList.add("is-in");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          el.classList.add("is-in");
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

/* ---------------- animated counter ---------------- */

export function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reducedMotion()) {
      setVal(to);
      return;
    }
    let raf = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const dur = 1300;
        const tick = (t: number) => {
          const k = Math.min(1, (t - t0) / dur);
          setVal(Math.round(to * (1 - Math.pow(1 - k, 3))));
          if (k < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to]);

  return (
    <span ref={ref}>
      {fa(val)}
      {suffix}
    </span>
  );
}

/* ---------------- section heading ---------------- */

export function SectionHead({
  kicker,
  title,
  desc,
  dark = false,
}: {
  kicker: string;
  title: ReactNode;
  desc?: string;
  dark?: boolean;
}) {
  return (
    <Reveal className="mb-10 max-w-2xl">
      <span
        className={`inline-flex items-center gap-2 rounded-full border-2 px-4 py-1 text-sm font-bold ${
          dark ? "border-paper/25 bg-paper/5 text-sun" : "border-ink/15 bg-white text-blue"
        }`}
      >
        <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
          <path d="M8 0l1.8 5.4L15.4 7l-5.6 1.6L8 14 6.2 8.6.6 7l5.6-1.6z" />
        </svg>
        {kicker}
      </span>
      <h2
        className={`mt-4 font-display text-4xl leading-tight md:text-5xl ${dark ? "text-paper" : "text-ink"}`}
      >
        {title}
      </h2>
      {desc && <p className={`mt-3 text-lg leading-8 ${dark ? "text-paper/70" : "text-ink-2"}`}>{desc}</p>}
    </Reveal>
  );
}
