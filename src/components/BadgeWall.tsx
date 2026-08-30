import { useState } from "react";
import { BADGES, type Progress } from "../data/questions";
import { CountUp, fa, Reveal, SectionHead } from "../lib/helpers";
import { IconBolt, IconFlame, IconStar, IconTimer, IconTrophy } from "./Icons";

export default function BadgeWall({ progress, onReset }: { progress: Progress; onReset: () => void }) {
  const [confirming, setConfirming] = useState(false);

  const accuracy = progress.answered > 0 ? Math.round((progress.correct / progress.answered) * 100) : 0;

  const stats: { label: string; value: number; suffix?: string; icon: React.ReactNode }[] = [
    { label: "امتیاز XP", value: progress.xp, icon: <IconBolt className="h-5 w-5 text-sun" /> },
    { label: "سوال پاسخ‌داده", value: progress.answered, icon: <IconStar className="h-5 w-5 text-sky" /> },
    { label: "جواب درست", value: progress.correct, icon: <IconTrophy className="h-5 w-5 text-teal" /> },
    { label: "دقت", value: accuracy, suffix: "٪", icon: <IconStar className="h-5 w-5 text-coral" filled /> },
    { label: "رکورد زنجیره", value: progress.bestStreak, icon: <IconFlame className="h-5 w-5 text-coral" /> },
    { label: "بهترین سرعت", value: progress.speedBest, icon: <IconTimer className="h-5 w-5 text-sun" /> },
  ];

  return (
    <section id="badges" className="relative scroll-mt-24 overflow-hidden bg-board py-20 text-paper md:py-24">
      <div className="chalk-grid absolute inset-0" aria-hidden />
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <span className="absolute left-10 top-14 font-display text-3xl text-paper/10">★ ★ ★</span>
        <span className="absolute bottom-14 right-12 font-display text-3xl text-paper/10">رکورد = تلاش</span>
      </div>

      <div className="relative mx-auto max-w-7xl px-4">
        <SectionHead
          dark
          kicker="کارنامهٔ قهرمانی"
          title={
            <>
              دیوارِ <span className="squiggle">افتخار</span>ِ تو
            </>
          }
          desc="هر جواب درست اینجا ثبت می‌شه و می‌مونه — حتی اگه مرورگرت رو ببندی. مدال‌ها رو یکی‌یکی باز کن!"
        />

        <Reveal>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {stats.map((s) => (
              <div key={s.label} className="rounded-xl border border-paper/12 bg-paper/5 px-4 py-4 text-center transition-colors hover:border-sun/40">
                <div className="flex justify-center">{s.icon}</div>
                <p className="mt-2 font-display text-3xl text-sun">
                  <CountUp key={s.value} to={s.value} suffix={s.suffix ?? ""} />
                </p>
                <p className="mt-1 text-xs font-bold text-paper/60">{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {BADGES.map((b, i) => {
            const { cur, target } = b.check(progress);
            const earned = cur >= target;
            return (
              <Reveal key={b.id} delay={(i % 4) * 80}>
                <div
                  className={`h-full rounded-xl border-2 p-5 text-center transition-all duration-300 ${
                    earned
                      ? "border-sun/70 bg-sun/10 shadow-[0_0_30px_rgba(255,198,58,0.15)]"
                      : "border-dashed border-paper/20 bg-paper/5 opacity-80"
                  }`}
                >
                  <div
                    className={`relative mx-auto grid h-20 w-20 place-items-center rounded-full border-4 ${
                      earned ? "border-sun bg-sun/20 text-sun" : "border-paper/20 bg-paper/5 text-paper/30"
                    }`}
                  >
                    {earned ? <IconTrophy className="h-9 w-9" /> : <IconStar className="h-9 w-9" />}
                    {earned && (
                      <span className="absolute -bottom-1 -left-1 grid h-7 w-7 place-items-center rounded-full bg-sun text-ink shadow">
                        <IconStar filled className="h-4 w-4" />
                      </span>
                    )}
                  </div>
                  <h3 className={`mt-3 font-display text-2xl ${earned ? "text-sun" : "text-paper/70"}`}>{b.title}</h3>
                  <p className="mt-1 min-h-10 text-[13px] leading-6 text-paper/55">{b.desc}</p>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-paper/10">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${earned ? "bg-sun" : "bg-paper/35"}`}
                      style={{ width: `${(cur / target) * 100}%` }}
                    />
                  </div>
                  <p className="mt-2 text-xs font-bold text-paper/50">
                    {earned ? "کسب شد! دمت گرم" : `${fa(cur)} از ${fa(target)}`}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={150}>
          <div className="mt-10 text-center">
            <button
              onClick={() => {
                if (confirming) {
                  onReset();
                  setConfirming(false);
                } else {
                  setConfirming(true);
                  window.setTimeout(() => setConfirming(false), 3000);
                }
              }}
              className={`rounded-lg border-2 px-5 py-2.5 text-sm font-bold transition-colors ${
                confirming
                  ? "border-coral bg-coral/15 text-coral"
                  : "border-paper/20 text-paper/50 hover:border-coral/50 hover:text-coral"
              }`}
            >
              {confirming ? "مطمئنی؟ دوباره بزن تا کارنامه پاک شه!" : "پاک‌کردن کارنامه"}
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
