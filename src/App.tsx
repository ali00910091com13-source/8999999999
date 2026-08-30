import { useState } from "react";
import BadgeWall from "./components/BadgeWall";
import FunZone from "./components/FunZone";
import { IconBolt, IconLogo } from "./components/Icons";
import Knowledge from "./components/Knowledge";
import LessonNotes from "./components/LessonNotes";
import Masthead from "./components/Masthead";
import QuizArena, { type Session } from "./components/QuizArena";
import TopicGrid, { type Mode } from "./components/TopicGrid";
import WrittenExam from "./components/WrittenExam";
import { EXAMS } from "./data/exams";
import { LESSONS } from "./data/lessons";
import { makeSpeedTopic, TOPICS, type Question } from "./data/questions";
import { fa, shuffle, useProgress } from "./lib/helpers";

function scramble(q: Question): Question {
  const order = shuffle([0, 1, 2, 3]);
  return { ...q, options: order.map((i) => q.options[i]), correct: order.indexOf(q.correct) };
}

const NAV = [
  { href: "#topics", label: "فصل‌ها" },
  { href: "#quiz", label: "سالن تمرین" },
  { href: "#lessons", label: "درسنامه" },
  { href: "#exam", label: "آزمون تشریحی" },
  { href: "#knowledge", label: "گنجینه" },
  { href: "#fun", label: "باحال" },
  { href: "#badges", label: "افتخار" },
];

export default function App() {
  const { progress, record, reset } = useProgress();
  const [session, setSession] = useState<Session | null>(null);
  const [sessionKey, setSessionKey] = useState(0);
  const [lessonId, setLessonId] = useState(LESSONS[0].id);

  const startQuiz = (topicId: string, mode: Mode) => {
    if (mode === "speed" || topicId === "speed") {
      const sp = makeSpeedTopic(25);
      setSession({ topic: { ...sp, questions: sp.questions.map(scramble) }, mode: "speed" });
    } else {
      const t = TOPICS.find((x) => x.id === topicId);
      if (!t) return;
      setSession({ topic: { ...t, questions: shuffle(t.questions).map(scramble) }, mode: "normal" });
    }
    setSessionKey((k) => k + 1);
    window.setTimeout(() => document.getElementById("quiz")?.scrollIntoView(), 60);
  };

  const openLesson = (topicId: string) => {
    const lesson = LESSONS.find((l) => l.id === topicId);
    if (lesson) setLessonId(lesson.id);
    window.setTimeout(() => document.getElementById("lessons")?.scrollIntoView(), 60);
  };

  const nextRandom = () => {
    const pool = session && session.topic.id !== "speed" ? TOPICS.filter((t) => t.id !== session.topic.id) : TOPICS;
    const pick = pool[Math.floor(Math.random() * pool.length)];
    startQuiz(pick.id, "normal");
  };

  return (
    <div className="grid-paper min-h-screen">
      <div className="noise-veil" aria-hidden />

      {/* ---------- header ---------- */}
      <nav className="sticky top-0 z-50 border-b-2 border-ink/10 bg-paper/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">
          <a href="#" className="flex items-center gap-3">
            <IconLogo className="h-10 w-10 text-blue" />
            <span className="leading-none">
              <span className="block font-display text-[26px] text-ink">هشت‌ضلعی</span>
              <span className="hidden text-[11px] font-bold text-ink-2 sm:block">باشگاه تمرین پایهٔ هشتم</span>
            </span>
          </a>
          <div className="hidden items-center gap-0.5 lg:flex">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="rounded-lg px-3 py-2 text-[13.5px] font-bold text-ink-2 transition-colors hover:bg-white hover:text-blue"
              >
                {n.label}
              </a>
            ))}
          </div>
          <span
            key={progress.xp}
            className="animate-pop inline-flex items-center gap-2 rounded-full border-2 border-sun/60 bg-sun/20 px-4 py-2 text-sm font-black text-[#8a5f00]"
            title="مجموع امتیازهای تو"
          >
            <IconBolt className="h-4 w-4" />
            {fa(progress.xp)} XP
          </span>
        </div>
        <div className="flex gap-1 overflow-x-auto border-t border-ink/5 px-3 py-1.5 lg:hidden">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="whitespace-nowrap rounded-lg px-3 py-1.5 text-[13px] font-bold text-ink-2">
              {n.label}
            </a>
          ))}
        </div>
      </nav>

      {/* ---------- sections ---------- */}
      <Masthead onSpeed={() => startQuiz("speed", "speed")} />
      <TopicGrid onStart={startQuiz} onLesson={openLesson} />
      <QuizArena
        key={sessionKey}
        session={session}
        onAgain={() => session && startQuiz(session.topic.id === "speed" ? "speed" : session.topic.id, session.mode)}
        onNext={nextRandom}
        onBrowse={() => document.getElementById("topics")?.scrollIntoView()}
        onSpeed={() => startQuiz("speed", "speed")}
        onRecord={record}
      />
      <LessonNotes lessonId={lessonId} onSelect={setLessonId} onQuiz={(id) => startQuiz(id, "normal")} />
      <WrittenExam onRecord={record} />
      <Knowledge />
      <FunZone />
      <BadgeWall progress={progress} onReset={reset} />

      {/* ---------- footer ---------- */}
      <footer className="relative overflow-hidden border-t-4 border-sun bg-ink text-paper">
        <div className="chalk-grid absolute inset-0" aria-hidden />
        <span className="pointer-events-none absolute -left-6 top-1/2 -translate-y-1/2 select-none font-display text-[220px] leading-none text-paper/5" aria-hidden>
          π
        </span>
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <IconLogo className="h-11 w-11 text-sun" />
              <span className="font-display text-3xl">هشت‌ضلعی</span>
            </div>
            <p className="mt-4 max-w-xs leading-8 text-paper/60">
              باشگاه تمرین ریاضی و علوم پایهٔ هشتم — جایی که سوال‌ها شبیه بازی‌ان و اشتباه‌ها پلهٔ یادگیری‌ان.
            </p>
          </div>
          <div>
            <h4 className="font-display text-xl text-sun">کجا بریم؟</h4>
            <ul className="mt-4 space-y-2.5">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="font-semibold text-paper/70 transition-colors hover:text-sun">
                    ← {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display text-xl text-sun">یه مشت عدد</h4>
            <ul className="mt-4 space-y-2.5 text-paper/70">
              <li><span className="font-display text-lg text-paper">{fa(TOPICS.length * 6)}</span> سوال تستی تعاملی</li>
              <li><span className="font-display text-lg text-paper">{fa(EXAMS.length)}</span> سوال تشریحی امتحانی</li>
              <li><span className="font-display text-lg text-paper">{fa(LESSONS.length)}</span> درسنامهٔ کامل فصل‌به‌فصل</li>
              <li><span className="font-display text-lg text-paper">{fa(8)}</span> مدال برای فتح</li>
            </ul>
          </div>
        </div>
        <div className="relative border-t border-paper/10 py-5 text-center text-sm font-semibold text-paper/50">
          هشت‌ضلعی • ۱۴۰۴ — ساخته‌شده با <span className="text-coral">♥</span> و کمی π
        </div>
      </footer>
    </div>
  );
}
