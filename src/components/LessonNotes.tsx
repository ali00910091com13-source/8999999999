import { LESSONS } from "../data/lessons";
import { TOPICS } from "../data/questions";
import { fa, Reveal, SectionHead } from "../lib/helpers";
import { IconArrowL, IconBrain, IconPencil, IconSpark, TOPIC_ICONS } from "./Icons";

type Props = {
  lessonId: string;
  onSelect: (id: string) => void;
  onQuiz: (topicId: string) => void;
};

export default function LessonNotes({ lessonId, onSelect, onQuiz }: Props) {
  const lesson = LESSONS.find((l) => l.id === lessonId) ?? LESSONS[0];
  const mathLessons = LESSONS.filter((l) => l.subject === "math");
  const scienceLessons = LESSONS.filter((l) => l.subject === "science");
  const hasQuiz = TOPICS.some((t) => t.id === lesson.id);
  const idx = LESSONS.findIndex((l) => l.id === lesson.id);

  const Chip = ({ id, num, title, active }: { id: string; num: number; title: string; active: boolean }) => (
    <button
      onClick={() => onSelect(id)}
      className={`flex shrink-0 items-center gap-2 rounded-full border-2 px-3.5 py-1.5 text-[13px] font-bold transition-all duration-200 lg:flex-none lg:justify-between lg:rounded-lg lg:px-3 lg:py-2 lg:text-[13.5px] ${
        active
          ? "border-ink bg-ink text-paper shadow-[3px_3px_0_rgba(47,107,255,0.5)]"
          : "border-ink/10 bg-white text-ink-2 hover:-translate-y-0.5 hover:border-blue/50 hover:text-blue-deep"
      }`}
    >
      <span
        className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-[11px] font-black ${
          active ? "bg-sun text-ink" : "bg-paper"
        }`}
      >
        {fa(num)}
      </span>
      <span className="whitespace-nowrap lg:truncate">{title}</span>
    </button>
  );

  return (
    <section id="lessons" className="relative scroll-mt-24 overflow-hidden py-20 md:py-24">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <span className="absolute -right-10 top-24 select-none font-display text-[260px] leading-none text-blue/5">جزوه</span>
      </div>

      <div className="relative mx-auto max-w-7xl px-4">
        <SectionHead
          kicker="درسنامهٔ کامل"
          title={
            <>
              جزوه‌ات رو <span className="marker">این‌جا</span> بگیر!
            </>
          }
          desc={`خلاصهٔ درس‌به‌درسِ هر ${fa(LESSONS.length)} فصل کتاب — با نکتهٔ طلایی و مثال حل‌شده. فصل رو انتخاب کن و ورق بزن!`}
        />

        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* ---------- chapter list (mobile: horizontal scroller / desktop: sticky sidebar) ---------- */}
          <div className="mb-8 lg:col-span-4 lg:mb-0 xl:col-span-3">
            <div className="flex gap-2 overflow-x-auto pb-3 lg:hidden">
              {LESSONS.map((l) => (
                <Chip key={l.id} id={l.id} num={l.num} title={`${l.subject === "math" ? "ریاضی" : "علوم"} ${l.title}`} active={l.id === lesson.id} />
              ))}
            </div>

            <div className="hidden rounded-xl border-2 border-ink/10 bg-white p-4 shadow-[5px_6px_0_rgba(15,29,69,0.07)] lg:sticky lg:top-24 lg:block lg:max-h-[calc(100vh-7.5rem)] lg:overflow-y-auto">
              <p className="mb-2 flex items-center gap-2 px-1 font-display text-xl text-blue-deep">
                <IconPencil className="h-5 w-5" />
                ریاضی • {fa(mathLessons.length)} فصل
              </p>
              <div className="space-y-1">
                {mathLessons.map((l) => (
                  <Chip key={l.id} id={l.id} num={l.num} title={l.title} active={l.id === lesson.id} />
                ))}
              </div>
              <p className="mb-2 mt-5 flex items-center gap-2 px-1 font-display text-xl text-teal">
                <IconBrain className="h-5 w-5" />
                علوم • {fa(scienceLessons.length)} فصل
              </p>
              <div className="space-y-1">
                {scienceLessons.map((l) => (
                  <Chip key={l.id} id={l.id} num={l.num} title={l.title} active={l.id === lesson.id} />
                ))}
              </div>
            </div>
          </div>

          {/* ---------- lesson paper ---------- */}
          <div className="lg:col-span-8 xl:col-span-9">
            <Reveal>
              <article key={lesson.id} className="animate-slide-up relative rounded-xl border-2 border-ink/10 bg-white shadow-[7px_9px_0_rgba(15,29,69,0.09)]">
                {/* header */}
                <div className={`flex flex-wrap items-center gap-4 rounded-t-[10px] border-b-2 border-ink/10 px-6 py-5 md:px-8 ${lesson.subject === "math" ? "bg-blue/8" : "bg-teal/8"}`}>
                  <span className={`grid h-14 w-14 place-items-center rounded-lg text-white ${lesson.subject === "math" ? "bg-blue" : "bg-teal"}`}>
                    <IconPencil className="h-7 w-7" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-black text-ink-2">
                      {lesson.subject === "math" ? "ریاضی هشتم" : "علوم هشتم"} • فصل {fa(lesson.num)}
                    </p>
                    <h3 className="font-display text-3xl leading-tight text-ink md:text-4xl">{lesson.title}</h3>
                  </div>
                  {hasQuiz && (
                    <button
                      onClick={() => onQuiz(lesson.id)}
                      className="btn-arcade shrink-0 rounded-lg bg-ink px-4 py-2.5 text-sm font-bold text-sun"
                    >
                      تست این فصل
                    </button>
                  )}
                </div>

                <div className="px-6 py-6 md:px-8 md:py-7">
                  <p className="border-s-4 border-sun bg-sun/10 px-4 py-3 font-semibold leading-8 text-ink">
                    {lesson.intro}
                  </p>

                  {lesson.sections.map((s, i) => {
                    const Icon = TOPIC_ICONS[["sigma", "atom", "grid"][i % 3]];
                    return (
                      <div key={s.h} className="mt-7">
                        <h4 className="flex items-center gap-2.5 font-display text-[22px] text-ink">
                          <span className={`grid h-8 w-8 place-items-center rounded-md text-white ${lesson.subject === "math" ? "bg-blue" : "bg-teal"}`}>
                            <Icon className="h-5 w-5" />
                          </span>
                          {s.h}
                        </h4>
                        <ul className="mt-3 space-y-2.5">
                          {s.p.map((line, j) => (
                            <li key={j} className="flex gap-3 leading-8 text-[15.5px] text-ink-2">
                              <span className={`mt-[13px] h-2 w-2 shrink-0 rounded-full ${lesson.subject === "math" ? "bg-blue" : "bg-teal"}`} />
                              <span>{line}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}

                  {/* golden tip */}
                  <div className="tilt relative mt-8 rounded-md border-2 border-[#e0a800]/40 bg-sun p-5 shadow-[5px_6px_0_rgba(224,168,0,0.22)]" style={{ "--rot": "-0.7deg" } as React.CSSProperties}>
                    <span className="absolute -top-3 right-8 h-6 w-20 -rotate-2 border border-ink/10 bg-paper/70" aria-hidden />
                    <p className="flex items-center gap-2 font-display text-xl text-ink">
                      <IconSpark className="h-5 w-5 text-[#8a5f00]" />
                      نکتهٔ طلایی
                    </p>
                    <p className="mt-2 leading-8 text-ink">{lesson.tip}</p>
                  </div>

                  {/* solved example */}
                  <div className="mt-8 rounded-lg border-2 border-dashed border-ink/25 bg-paper p-5 md:p-6">
                    <p className="font-display text-xl text-ink">
                      <span className={`ms-0 rounded-full px-3 py-1 text-sm text-white ${lesson.subject === "math" ? "bg-blue" : "bg-teal"}`}>
                        مثال حل‌شده
                      </span>
                    </p>
                    <p className="mt-3 text-[16px] font-bold leading-8 text-ink">{lesson.example.q}</p>
                    <ol className="mt-3 space-y-2">
                      {lesson.example.a.map((step, i) => (
                        <li key={i} className="flex gap-3 leading-8 text-ink-2">
                          <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-sm font-black text-white ${lesson.subject === "math" ? "bg-blue" : "bg-teal"}`}>
                            {fa(i + 1)}
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* prev / next */}
                  <div className="mt-8 flex items-center justify-between gap-3 border-t border-dashed border-ink/15 pt-5">
                    <button
                      onClick={() => onSelect(LESSONS[(idx - 1 + LESSONS.length) % LESSONS.length].id)}
                      className="inline-flex items-center gap-2 rounded-lg border-2 border-ink/10 px-4 py-2 text-sm font-bold text-ink-2 transition hover:border-blue hover:text-blue-deep"
                    >
                      <IconArrowL className="h-4 w-4 rotate-180" />
                      فصل قبلی
                    </button>
                    <span className="text-xs font-bold text-ink-2">
                      {fa(idx + 1)} از {fa(LESSONS.length)}
                    </span>
                    <button
                      onClick={() => onSelect(LESSONS[(idx + 1) % LESSONS.length].id)}
                      className="inline-flex items-center gap-2 rounded-lg bg-ink px-4 py-2 text-sm font-bold text-paper transition hover:bg-blue"
                    >
                      فصل بعدی
                      <IconArrowL className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </article>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
