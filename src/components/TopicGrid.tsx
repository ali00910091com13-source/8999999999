import { useState } from "react";
import { TOPICS, type Topic } from "../data/questions";
import { fa, Reveal, SectionHead } from "../lib/helpers";
import { IconArrowL, IconTimer, TOPIC_ICONS } from "./Icons";

export type Mode = "normal" | "speed";

const ACC: Record<Topic["accent"], { border: string; blob: string; icon: string; chip: string }> = {
  blue: { border: "border-t-blue", blob: "bg-blue/10", icon: "text-blue-deep", chip: "bg-blue/10 text-blue-deep" },
  coral: { border: "border-t-coral", blob: "bg-coral/10", icon: "text-coral", chip: "bg-coral/10 text-coral" },
  teal: { border: "border-t-teal", blob: "bg-teal/10", icon: "text-teal", chip: "bg-teal/10 text-teal" },
  sun: { border: "border-t-sun", blob: "bg-sun/20", icon: "text-[#a06f00]", chip: "bg-sun/20 text-[#8a5f00]" },
  sky: { border: "border-t-sky", blob: "bg-sky/10", icon: "text-sky", chip: "bg-sky/10 text-sky" },
};

const DIFF: Record<number, string> = { 1: "ساده", 2: "متوسط", 3: "چالشی" };
const ROTS = ["-1.1deg", "0.9deg", "-0.4deg"];

export default function TopicGrid({ onStart }: { onStart: (topicId: string, mode: Mode) => void }) {
  const [filter, setFilter] = useState<"all" | "math" | "science">("all");
  const shown = TOPICS.filter((t) => filter === "all" || t.subject === filter);

  const tabs: { id: "all" | "math" | "science"; label: string; n: number }[] = [
    { id: "all", label: "همهٔ فصل‌ها", n: TOPICS.length },
    { id: "math", label: "ریاضی", n: TOPICS.filter((t) => t.subject === "math").length },
    { id: "science", label: "علوم", n: TOPICS.filter((t) => t.subject === "science").length },
  ];

  return (
    <section id="topics" className="relative scroll-mt-24 py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHead
          kicker="قفسهٔ فصل‌ها"
          title={
            <>
              فصلت را بردار، <span className="squiggle">تمرین را</span> شروع کن!
            </>
          }
          desc="هر فصل ۶ سوال تعاملی داره با توضیحِ «چرا؟» — اگه اشتباه بزنی هم یاد می‌گیری، برد-برد!"
        />

        <Reveal delay={80}>
          <div className="mb-10 flex flex-wrap gap-2">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setFilter(t.id)}
                className={`rounded-full border-2 px-5 py-2 text-sm font-bold transition-all duration-200 ${
                  filter === t.id
                    ? "border-ink bg-ink text-paper shadow-[3px_3px_0_rgba(47,107,255,0.5)]"
                    : "border-ink/15 bg-white text-ink-2 hover:-translate-y-0.5 hover:border-ink/40"
                }`}
              >
                {t.label}
                <span className={`ms-2 rounded-full px-2 py-0.5 text-xs ${filter === t.id ? "bg-paper/20" : "bg-paper"}`}>
                  {fa(t.n)}
                </span>
              </button>
            ))}
          </div>
        </Reveal>

        <div key={filter} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {shown.map((t, i) => {
            const Icon = TOPIC_ICONS[t.icon];
            const acc = ACC[t.accent];
            return (
              <Reveal key={t.id} delay={(i % 4) * 70}>
                <article
                  className={`tilt group flex h-full flex-col rounded-xl border-2 border-ink/10 ${acc.border} border-t-[6px] bg-white p-5 shadow-[5px_6px_0_rgba(15,29,69,0.07)]`}
                  style={{ "--rot": ROTS[i % 3] } as React.CSSProperties}
                >
                  <div className="flex items-start justify-between">
                    <span className={`grid h-13 w-13 place-items-center rounded-lg ${acc.blob} ${acc.icon} transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110`} style={{ height: 52, width: 52 }}>
                      <Icon className="h-7 w-7" />
                    </span>
                    <div className="flex items-center gap-1" title={`سختی: ${DIFF[t.difficulty]}`} aria-label={`سختی ${DIFF[t.difficulty]}`}>
                      {[1, 2, 3].map((d) => (
                        <span key={d} className={`h-2 w-2 rounded-full ${d <= t.difficulty ? "bg-coral" : "border border-ink/20"}`} />
                      ))}
                    </div>
                  </div>
                  <p className="mt-4 text-xs font-bold text-ink-2">{t.chapter}</p>
                  <h3 className="mt-1 font-display text-[22px] leading-8 text-ink">{t.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-7 text-ink-2">{t.desc}</p>
                  <div className="mt-4 flex items-center justify-between border-t border-dashed border-ink/15 pt-4">
                    <span className={`rounded-full px-3 py-1 text-xs font-bold ${acc.chip}`}>
                      {fa(t.questions.length)} سوال • {DIFF[t.difficulty]}
                    </span>
                    <button
                      onClick={() => onStart(t.id, "normal")}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-ink px-4 py-2 text-sm font-bold text-paper transition-all duration-200 hover:bg-blue hover:shadow-[3px_3px_0_rgba(47,107,255,0.45)] active:translate-y-0.5"
                    >
                      بزن بریم
                      <IconArrowL className="h-4 w-4" />
                    </button>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={120}>
          <div className="tilt mt-12 flex flex-col items-center justify-between gap-6 rounded-xl border-2 border-ink bg-ink p-7 text-paper shadow-[8px_8px_0_rgba(255,93,115,0.35)] md:flex-row md:p-9" style={{ "--rot": "-0.5deg" } as React.CSSProperties}>
            <div className="flex items-center gap-5">
              <span className="grid h-16 w-16 shrink-0 place-items-center rounded-xl bg-coral/20 text-coral">
                <IconTimer className="h-9 w-9 animate-wiggle" />
              </span>
              <div>
                <h3 className="font-display text-3xl text-sun">دوئل با زمان!</h3>
                <p className="mt-1 max-w-lg leading-8 text-paper/75">
                  ۶۰ ثانیه، سوال‌های قاطی از همهٔ ۱۳ فصل. هر جواب درست XP بیشتر — رکوردت رو بزن و قهرمان سرعت شو!
                </p>
              </div>
            </div>
            <button
              onClick={() => onStart("speed", "speed")}
              className="btn-arcade shrink-0 rounded-lg bg-sun px-8 py-4 text-lg font-black text-ink"
              style={{ "--shadow-c": "#b57e00" } as React.CSSProperties}
            >
              شروع دوئل ← ۶۰ ثانیه
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
