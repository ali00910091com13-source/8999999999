import { useMemo, useState } from "react";
import { EXAMS, type ExamQ } from "../data/exams";
import { fa, Reveal, SectionHead, type RecordPayload } from "../lib/helpers";
import { IconCheck, IconEye, IconPencil, IconRefresh } from "./Icons";

type Props = { onRecord: (p: RecordPayload) => void };

function ExamCard({ item, n, onSelf }: { item: ExamQ; n: number; onSelf: (id: string) => void }) {
  const [showA, setShowA] = useState(false);
  const [self, setSelf] = useState(false);

  const markSelf = () => {
    if (self) return;
    setSelf(true);
    onSelf(item.id);
  };

  return (
    <article className="tilt group rounded-xl border-2 border-ink/10 bg-white p-5 shadow-[5px_6px_0_rgba(15,29,69,0.07)] md:p-6" style={{ "--rot": n % 2 === 0 ? "0.4deg" : "-0.4deg" } as React.CSSProperties}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-ink font-display text-lg text-paper">
            {fa(n)}
          </span>
          <div>
            <p className="text-xs font-black text-ink-2">{item.chapter}</p>
            <p className="mt-1.5 text-[16px] font-bold leading-8 text-ink">{item.q}</p>
          </div>
        </div>
        <span className="shrink-0 rounded-full bg-sun/25 px-3 py-1 text-xs font-black text-[#8a5f00]">
          {fa(item.score)} نمره
        </span>
      </div>

      {/* answer lines */}
      <div className="mt-4 space-y-3" aria-hidden>
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex items-end gap-2">
            <span className="mb-1 text-[11px] font-bold text-ink/25">پاسخ:</span>
            <span className="h-px flex-1 border-b-2 border-dotted border-ink/20" />
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2.5">
        <button
          onClick={() => setShowA((s) => !s)}
          className={`btn-arcade inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold ${
            showA ? "border-2 border-ink/15 bg-paper text-ink-2" : "bg-blue text-paper"
          }`}
          style={{ "--shadow-c": showA ? "#c9d6ee" : "#1c44b8" } as React.CSSProperties}
        >
          <IconEye className="h-4 w-4" />
          {showA ? "بستن پاسخ" : "پاسخ تشریحی"}
        </button>
        <button
          onClick={markSelf}
          disabled={self}
          className={`inline-flex items-center gap-2 rounded-lg border-2 px-4 py-2 text-sm font-bold transition-all duration-200 ${
            self
              ? "animate-pop border-teal bg-teal/15 text-teal"
              : "border-ink/12 text-ink-2 hover:-translate-y-0.5 hover:border-teal hover:text-teal"
          }`}
        >
          <IconCheck className="h-4 w-4" />
          {self ? "آفرین! +۵ XP گرفتی" : "خودم کامل نوشتم"}
        </button>
      </div>

      {showA && (
        <div className="animate-slide-up mt-4 rounded-lg border-2 border-teal/40 bg-teal/8 p-4">
          <p className="font-display text-lg text-teal">پاسخ تشریحی:</p>
          <ol className="mt-2 space-y-1.5">
            {item.a.map((step, i) => (
              <li key={i} className="flex gap-2.5 text-[15px] leading-7 text-ink">
                <span className="mt-0.5 shrink-0 font-black text-teal">{fa(i + 1)})</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </article>
  );
}

export default function WrittenExam({ onRecord }: Props) {
  const [subject, setSubject] = useState<"math" | "science">("math");
  const [shown, setShown] = useState(6);
  const [resetKey, setResetKey] = useState(0);

  const list = useMemo(() => EXAMS.filter((e) => e.subject === subject), [subject]);
  const visible = list.slice(0, shown);
  const totalScore = Math.round(list.reduce((s, e) => s + e.score, 0) * 10) / 10;

  const selfCheck = (id: string) => onRecord({ answered: 1, correct: 1, streak: 1, xpEarned: 5 });

  const switchSubject = (s: "math" | "science") => {
    setSubject(s);
    setShown(6);
    setResetKey((k) => k + 1);
  };

  return (
    <section id="exam" className="relative scroll-mt-24 overflow-hidden bg-[#e9f0fb] py-20 md:py-24">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <span className="absolute left-6 top-16 select-none font-display text-7xl text-blue/10">الف</span>
        <span className="absolute right-10 bottom-20 select-none font-display text-7xl text-coral/10">ب</span>
        <span className="absolute left-1/2 top-1/2 select-none font-display text-[180px] leading-none text-ink/4">۲۰</span>
      </div>

      <div className="relative mx-auto max-w-5xl px-4">
        <SectionHead
          kicker="نمونه سوال امتحانی"
          title={
            <>
              آزمون <span className="squiggle">تشریحی</span>؛ مثل برگهٔ امتحان!
            </>
          }
          desc={`اول خودت روی کاغذ کامل بنویس، بعد «پاسخ تشریحی» رو باز کن و مقایسه کن. اگه کامل نوشته بودی، دکمهٔ «خودم کامل نوشتم» رو بزن و ${fa(5)} XP بگیر!`}
        />

        {/* exam paper header */}
        <Reveal>
          <div className="rounded-t-xl border-2 border-b-0 border-ink/15 bg-white px-6 py-5 shadow-[6px_0_0_rgba(15,29,69,0.05)]">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-lg bg-ink text-sun">
                  <IconPencil className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="font-display text-2xl text-ink">
                    {subject === "math" ? "برگهٔ امتحان ریاضی هشتم" : "برگهٔ امتحان علوم هشتم"}
                  </h3>
                  <p className="text-[13px] font-bold text-ink-2">
                    {fa(list.length)} سوال • مجموع {fa(totalScore)} نمره • نام و نام خانوادگی: ................
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex rounded-lg border-2 border-ink/12 p-1">
                  {(["math", "science"] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => switchSubject(s)}
                      className={`rounded-md px-4 py-1.5 text-sm font-bold transition-all duration-200 ${
                        subject === s ? "bg-ink text-paper shadow" : "text-ink-2 hover:text-ink"
                      }`}
                    >
                      {s === "math" ? `ریاضی (${fa(EXAMS.filter((e) => e.subject === "math").length)})` : `علوم (${fa(EXAMS.filter((e) => e.subject === "science").length)})`}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => window.print()}
                  className="rounded-lg border-2 border-ink/12 px-3 py-1.5 text-sm font-bold text-ink-2 transition hover:border-blue hover:text-blue-deep"
                  title="چاپ برگهٔ امتحان"
                >
                  چاپ
                </button>
              </div>
            </div>
          </div>
        </Reveal>

        {/* questions */}
        <div key={`${subject}-${resetKey}`} className="space-y-5 border-x-2 border-ink/15 bg-paper/40 p-5 shadow-inner md:p-7">
          {visible.map((item, i) => (
            <Reveal key={item.id} delay={Math.min(i, 3) * 60}>
              <ExamCard item={item} n={i + 1} onSelf={selfCheck} />
            </Reveal>
          ))}

          <div className="flex justify-center pt-2">
            {shown < list.length ? (
              <button
                onClick={() => setShown((s) => s + 6)}
                className="btn-arcade rounded-lg bg-ink px-8 py-3.5 font-bold text-paper"
              >
                سوال‌های بیشتر ({fa(list.length - shown)} تای دیگه)
              </button>
            ) : (
              <button
                onClick={() => setShown(6)}
                className="inline-flex items-center gap-2 rounded-lg border-2 border-ink/15 bg-white px-6 py-3 text-sm font-bold text-ink-2 transition hover:border-blue hover:text-blue-deep"
              >
                <IconRefresh className="h-4 w-4" />
                جمع‌کردن برگه
              </button>
            )}
          </div>
        </div>

        <Reveal delay={100}>
          <p className="mt-6 text-center text-sm font-semibold text-ink-2">
            معلم‌ها و پدر و مادرها: دکمهٔ «چاپ» برگه رو تمیز چاپ می‌کنه — خونه امتحان بگیرین!
          </p>
        </Reveal>
      </div>
    </section>
  );
}
