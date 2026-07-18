import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import confetti from "canvas-confetti";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ICAD FIFA World Cup 2026 — Winners Reveal" },
      {
        name: "description",
        content:
          "Cinematic reveal of the ICAD FIFA World Cup 2026 Prediction Contest champions. Trophies, packs, and glory.",
      },
      { property: "og:title", content: "ICAD FIFA World Cup 2026 — Winners Reveal" },
      { property: "og:description", content: "Score a goal. Lift the trophy. Meet the champions." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type Winner = {
  name: string;
  department: string;
  points: number;
  accuracy: number;
  photo: string;
  medal: "gold" | "silver" | "bronze" | "boot" | "star" | "clover";
  label: string;
};

const WINNERS: Record<string, Winner> = {
  fourth: {
    name: "Faisal",
    department: "Marketing",
    points: 205,
    accuracy: 79,
    photo: "/winners/topscorer.jpg",
    medal: "boot",
    label: "Fourth Place",
  },
  third: {
    name: "Abdullah",
    department: "Design",
    points: 219,
    accuracy: 83,
    photo: "/winners/third.jpg",
    medal: "bronze",
    label: "Third Place",
  },
  runnerup: {
    name: "Muhammed Shahul",
    department: "Operations",
    points: 231,
    accuracy: 87,
    photo: "/winners/runnerup.jpg",
    medal: "silver",
    label: "Runner-Up",
  },
  champion: {
    name: "Ahmed Ali",
    department: "Engineering",
    points: 248,
    accuracy: 92,
    photo: "/winners/champion.jpg",
    medal: "gold",
    label: "Champion",
  },
};

const HALL = [
  { key: "Champion", w: WINNERS.champion, color: "from-yellow-300 to-amber-600" },
  { key: "Runner-Up", w: WINNERS.runnerup, color: "from-slate-200 to-slate-500" },
  { key: "Third Place", w: WINNERS.third, color: "from-orange-300 to-orange-700" },
  {
    key: "Golden Boot",
    w: { ...WINNERS.fourth, label: "Golden Boot" },
    color: "from-amber-300 to-yellow-700",
  },
  {
    key: "Best Predictor",
    w: {
      name: "Yusuf",
      department: "Finance",
      points: 198,
      accuracy: 77,
      photo: "/winners/bestpredictor.jpg",
      medal: "star" as const,
      label: "Best Predictor",
    },
    color: "from-emerald-300 to-emerald-700",
  },
  {
    key: "Lucky Draw",
    w: {
      name: "Rashid",
      department: "HR",
      points: 150,
      accuracy: 65,
      photo: "/winners/luckydraw.jpg",
      medal: "clover" as const,
      label: "Lucky Draw",
    },
    color: "from-sky-300 to-blue-700",
  },
];

function Index() {
  return (
    <main className="relative bg-stadium min-h-screen text-foreground">
      <Hero />
      <RevealSection />
      <ChampionReveal />
      <HallOfFame />
      <StatsSection />
      <TimelineSection />
      <Gallery />
      <Celebration />
      <Credits />
      <Footer />
    </main>
  );
}

/* ============== HERO ============== */
function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      <StadiumBackdrop />
      <GoldRays />
      <div className="pointer-events-none absolute inset-0 animate-lightning bg-white/10" />
      <div className="relative z-10">
        <p className="mb-4 tracking-[0.4em] text-gold uppercase text-sm">ICAD Presents</p>
        <h1
          className="text-gradient-gold font-display leading-[0.85]"
          style={{ fontSize: "clamp(3rem, 12vw, 10rem)" }}
        >
          FIFA World Cup
          <br />
          2026
        </h1>
        <p className="mt-4 text-xl md:text-2xl font-heading font-semibold tracking-widest text-white/80">
          THE WINNERS REVEAL
        </p>
        <div className="mt-10 flex items-center justify-center gap-3">
          <Trophy className="h-24 w-24 md:h-32 md:w-32 animate-glow-pulse" />
        </div>
        <a
          href="#reveal"
          className="mt-10 inline-block rounded-full bg-gradient-to-r from-yellow-400 to-amber-600 px-10 py-4 font-heading font-bold uppercase tracking-widest text-black shadow-2xl transition hover:scale-105"
        >
          Begin The Reveal
        </a>
      </div>
      <FloatingBalls />
    </section>
  );
}

function StadiumBackdrop() {
  return (
    <>
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-pitch-stripes opacity-40 [mask-image:linear-gradient(to_top,black,transparent)]" />
      <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_20%_10%,white_1px,transparent_1px),radial-gradient(circle_at_80%_20%,white_1px,transparent_1px)] [background-size:40px_40px,60px_60px]" />
      <Spotlights />
    </>
  );
}

function Spotlights() {
  return (
    <>
      <div className="pointer-events-none absolute -top-40 left-1/4 h-[120vh] w-[30vw] origin-top rotate-12 bg-gradient-to-b from-yellow-200/25 to-transparent blur-2xl animate-spotlight" />
      <div className="pointer-events-none absolute -top-40 right-1/4 h-[120vh] w-[30vw] origin-top -rotate-12 bg-gradient-to-b from-white/20 to-transparent blur-2xl animate-spotlight" />
    </>
  );
}

function GoldRays() {
  return (
    <div className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[140vmax] w-[140vmax] -translate-x-1/2 -translate-y-1/2 animate-gold-rays opacity-30 [background:conic-gradient(from_0deg,transparent_0deg,rgba(255,200,60,0.4)_10deg,transparent_20deg,transparent_40deg,rgba(255,200,60,0.3)_50deg,transparent_60deg)] [mask-image:radial-gradient(circle,black,transparent_60%)]" />
  );
}

function FloatingBalls() {
  const balls = Array.from({ length: 8 });
  return (
    <>
      {balls.map((_, i) => (
        <div
          key={i}
          className="pointer-events-none absolute animate-float-ball"
          style={{
            left: `${(i * 13 + 5) % 95}%`,
            top: `${(i * 23 + 10) % 85}%`,
            animationDelay: `${i * 0.6}s`,
            animationDuration: `${5 + (i % 3)}s`,
          }}
        >
          <FootballIcon className="h-8 w-8 opacity-30" />
        </div>
      ))}
    </>
  );
}

/* ============== REVEAL (Fourth → Third → Runner-Up) ============== */
const REVEAL_ORDER: Array<keyof typeof WINNERS> = ["fourth", "third", "runnerup"];

function RevealSection() {
  const [step, setStep] = useState(0);
  const [showTrophyExplosion, setShowTrophyExplosion] = useState(true);

  const current = step > 0 ? WINNERS[REVEAL_ORDER[step - 1]] : null;
  const dramaLevel = step;

  const fire = (intensity: number) => {
    const count = 60 + intensity * 60;
    confetti({
      particleCount: count,
      spread: 90 + intensity * 20,
      origin: { y: 0.6 },
      colors: ["#FFD700", "#FFA500", "#FF6B6B", "#4ECDC4", "#ffffff"],
    });
  };

  const advance = () => {
    if (step === 0) setShowTrophyExplosion(false);
    fire(step);
    setStep((s) => Math.min(s + 1, REVEAL_ORDER.length));
  };

  return (
    <section id="reveal" className="relative min-h-screen overflow-hidden py-24">
      <StadiumLED dramaLevel={dramaLevel} />
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <h2
          className="text-center font-display text-gradient-gold"
          style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
        >
          The Reveal
        </h2>
        <p className="mt-2 text-center text-lg text-white/70">
          Fourth, Third, Runner-Up — each more dramatic than the last.
        </p>

        {showTrophyExplosion && step === 0 && (
          <div className="mt-16 flex flex-col items-center">
            <div className="relative">
              <Trophy className="h-56 w-56 animate-glow-pulse" />
              <SmokePuffs />
            </div>
            <button
              onClick={advance}
              className="mt-10 rounded-full bg-white px-8 py-4 font-heading font-bold uppercase tracking-widest text-black shadow-xl transition hover:scale-105"
            >
              Explode The Trophy
            </button>
          </div>
        )}

        {!showTrophyExplosion && current && (
          <div className="mt-16 flex flex-col items-center">
            <div className="relative">
              <div
                className="pointer-events-none absolute inset-0 -z-10 animate-gold-rays opacity-70"
                style={{
                  background:
                    "conic-gradient(from 0deg, transparent, rgba(255,200,60,0.6), transparent 30deg, transparent 60deg, rgba(255,200,60,0.5), transparent 90deg)",
                }}
              />
              <WinnerCard winner={current} key={step} />
            </div>
            {step < REVEAL_ORDER.length ? (
              <button
                onClick={advance}
                className="mt-10 rounded-full bg-gradient-to-r from-yellow-400 to-amber-600 px-10 py-4 font-heading font-bold uppercase tracking-widest text-black shadow-2xl transition hover:scale-105"
              >
                Reveal Next
              </button>
            ) : (
              <a
                href="#champion"
                className="mt-10 rounded-full bg-crimson px-10 py-4 font-heading font-bold uppercase tracking-widest text-white shadow-2xl transition hover:scale-105"
                style={{ background: "linear-gradient(90deg,#b91c1c,#7c2d12)" }}
              >
                Prepare For The Champion
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

function StadiumLED({ dramaLevel }: { dramaLevel: number }) {
  return (
    <div className="absolute inset-x-0 top-0 mx-auto h-40 max-w-6xl">
      <div className="mx-6 h-full rounded-b-3xl border-x-4 border-b-4 border-neutral-800 bg-black/80 shadow-2xl">
        <div
          className="h-full w-full overflow-hidden rounded-b-3xl"
          style={{
            background:
              "repeating-linear-gradient(90deg, rgba(255,215,0,0.25) 0 2px, transparent 2px 6px), radial-gradient(ellipse at center, rgba(255,80,80,0.4), transparent 70%)",
          }}
        >
          <div className="flex h-full items-center justify-center">
            <p
              className="font-display tracking-widest text-white/90"
              style={{ fontSize: "clamp(1.5rem, 4vw, 3rem)" }}
            >
              {["● LIVE ●", "REVEAL #1", "REVEAL #2", "REVEAL #3"][dramaLevel]}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SmokePuffs() {
  return (
    <>
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="pointer-events-none absolute bottom-0 left-1/2 h-16 w-16 -translate-x-1/2 rounded-full bg-white/30 blur-2xl animate-smoke"
          style={{ animationDelay: `${i * 0.5}s`, left: `${30 + i * 8}%` }}
        />
      ))}
    </>
  );
}

/* ============== WINNER CARD (FIFA Ultimate Team style) ============== */
function WinnerCard({ winner }: { winner: Winner }) {
  return (
    <div className="animate-rise-in perspective-[1200px]">
      <div className="card-holo relative w-[320px] rounded-3xl p-6 md:w-[380px]">
        <div
          className="pointer-events-none absolute -inset-4 -z-10 rounded-[2rem] opacity-70 blur-xl animate-glow-pulse"
          style={{ background: "conic-gradient(from 0deg,#ffd700,#ff8c00,#ffd700)" }}
        />
        <div className="flex items-center justify-between">
          <div>
            <p className="font-display text-6xl text-gradient-gold leading-none">
              {winner.points}
            </p>
            <p className="mt-1 text-xs font-heading tracking-widest text-gold uppercase">
              {winner.label}
            </p>
          </div>
          <Medal type={winner.medal} />
        </div>

        <div className="mt-4 overflow-hidden rounded-2xl border border-gold/40">
          <img src={winner.photo} alt={winner.name} className="h-64 w-full object-cover" />
        </div>

        <div className="mt-4 text-center">
          <h3 className="font-display text-3xl uppercase tracking-wide text-white">
            {winner.name}
          </h3>
          <p className="mt-1 text-sm tracking-widest text-gold/90 uppercase">
            {winner.department}
          </p>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 text-center">
          <div className="rounded-lg border border-gold/30 bg-black/40 p-2">
            <p className="text-xs uppercase tracking-widest text-gold/80">Points</p>
            <p className="font-display text-2xl text-white">{winner.points}</p>
          </div>
          <div className="rounded-lg border border-gold/30 bg-black/40 p-2">
            <p className="text-xs uppercase tracking-widest text-gold/80">Accuracy</p>
            <p className="font-display text-2xl text-white">{winner.accuracy}%</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============== CHAMPION REVEAL ============== */
function ChampionReveal() {
  const [phase, setPhase] = useState<"idle" | "lights-off" | "countdown" | "explode" | "champion">(
    "idle",
  );
  const [count, setCount] = useState(3);

  const start = () => {
    setPhase("lights-off");
    setTimeout(() => setPhase("countdown"), 1500);
  };

  useEffect(() => {
    if (phase !== "countdown") return;
    setCount(3);
    const iv = setInterval(() => {
      setCount((c) => {
        if (c <= 1) {
          clearInterval(iv);
          setPhase("explode");
          setTimeout(() => {
            setPhase("champion");
            fireworks();
          }, 900);
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(iv);
  }, [phase]);

  const fireworks = () => {
    const end = Date.now() + 4000;
    const colors = ["#FFD700", "#FFA500", "#ffffff"];
    (function frame() {
      confetti({
        particleCount: 6,
        angle: 60,
        spread: 80,
        origin: { x: 0, y: 0.8 },
        colors,
      });
      confetti({
        particleCount: 6,
        angle: 120,
        spread: 80,
        origin: { x: 1, y: 0.8 },
        colors,
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  };

  return (
    <section
      id="champion"
      className={`relative min-h-screen overflow-hidden py-24 transition-colors duration-1000 ${
        phase === "lights-off" || phase === "countdown" ? "bg-black" : ""
      }`}
    >
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        {phase === "idle" && (
          <>
            <h2
              className="font-display text-gradient-gold"
              style={{ fontSize: "clamp(2.5rem, 8vw, 7rem)" }}
            >
              Champion Reveal
            </h2>
            <p className="mt-3 text-white/70">Lights off. Heartbeat. Spotlight. Drum roll.</p>
            <button
              onClick={start}
              className="mt-10 rounded-full bg-white px-10 py-4 font-heading font-bold uppercase tracking-widest text-black shadow-2xl transition hover:scale-105 animate-heartbeat"
            >
              Kill The Lights
            </button>
          </>
        )}

        {phase === "lights-off" && (
          <div className="flex min-h-[50vh] items-center justify-center">
            <div className="h-48 w-48 rounded-full bg-white/80 blur-3xl animate-heartbeat" />
          </div>
        )}

        {phase === "countdown" && (
          <div className="flex min-h-[50vh] flex-col items-center justify-center">
            <div className="pointer-events-none absolute left-1/2 top-0 h-[100vh] w-[40vw] -translate-x-1/2 bg-gradient-to-b from-yellow-200/50 to-transparent blur-3xl" />
            <p className="text-sm tracking-[0.5em] uppercase text-gold">Drum roll…</p>
            <p
              className="font-display text-gradient-gold animate-heartbeat"
              style={{ fontSize: "clamp(8rem, 25vw, 20rem)", lineHeight: 1 }}
            >
              {count}
            </p>
          </div>
        )}

        {phase === "explode" && (
          <div className="flex min-h-[50vh] items-center justify-center">
            <div className="relative">
              <FootballIcon className="h-40 w-40 animate-float-ball" />
              <div className="absolute inset-0 animate-glow-pulse rounded-full bg-yellow-300/50 blur-3xl" />
            </div>
          </div>
        )}

        {phase === "champion" && (
          <div className="flex flex-col items-center">
            <p
              className="font-display text-gradient-gold animate-glow-pulse"
              style={{ fontSize: "clamp(4rem, 14vw, 12rem)", lineHeight: 0.9 }}
            >
              CHAMPION
            </p>
            <div className="mt-8">
              <WinnerCard winner={WINNERS.champion} />
            </div>
            <Trophy className="mt-8 h-32 w-32 animate-glow-pulse" />
          </div>
        )}
      </div>
    </section>
  );
}

/* ============== HALL OF FAME ============== */
function HallOfFame() {
  return (
    <section className="relative py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <h2
          className="text-center font-display text-gradient-gold"
          style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
        >
          Hall of Fame
        </h2>
        <p className="mt-2 text-center text-white/70">The legends of ICAD World Cup 2026.</p>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {HALL.map((h, i) => (
            <ScrollReveal key={h.key} delay={i * 80}>
              <div className={`group relative rounded-3xl bg-gradient-to-br ${h.color} p-[2px]`}>
                <div className="rounded-3xl bg-black/80 p-5">
                  <div className="flex items-center justify-between">
                    <p className="font-heading text-xs uppercase tracking-widest text-white/70">
                      {h.key}
                    </p>
                    <Medal type={h.w.medal} small />
                  </div>
                  <div className="mt-3 overflow-hidden rounded-xl">
                    <img
                      src={h.w.photo}
                      alt={h.w.name}
                      className="h-56 w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="mt-4 font-display text-2xl uppercase text-white">{h.w.name}</h3>
                  <p className="text-sm uppercase tracking-widest text-gold/80">
                    {h.w.department}
                  </p>
                  <div className="mt-3 flex justify-between text-sm">
                    <span className="text-white/70">
                      Points: <span className="font-bold text-white">{h.w.points}</span>
                    </span>
                    <span className="text-white/70">
                      Acc: <span className="font-bold text-white">{h.w.accuracy}%</span>
                    </span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============== STATS ============== */
function StatsSection() {
  const stats = [
    { label: "Total Participants", value: 512 },
    { label: "Countries", value: 32 },
    { label: "Matches Predicted", value: 64 },
    { label: "Average Accuracy", value: 71, suffix: "%" },
    { label: "Highest Score", value: 248 },
  ];
  return (
    <section className="relative py-24 px-6">
      <div className="mx-auto max-w-7xl rounded-3xl border border-gold/30 bg-black/60 p-8 backdrop-blur">
        <h2
          className="text-center font-display text-gradient-gold"
          style={{ fontSize: "clamp(2rem, 6vw, 5rem)" }}
        >
          The Numbers
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-gold/20 bg-gradient-to-br from-yellow-500/10 to-transparent p-5 text-center"
            >
              <Counter to={s.value} suffix={s.suffix} />
              <p className="mt-2 text-xs uppercase tracking-widest text-gold/80">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLParagraphElement>(null);
  const started = useRef(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const dur = 1600;
          const step = (t: number) => {
            const p = Math.min(1, (t - start) / dur);
            setN(Math.floor(to * (1 - Math.pow(1 - p, 3))));
            if (p < 1) requestAnimationFrame(step);
            else setN(to);
          };
          requestAnimationFrame(step);
        }
      });
    });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [to]);
  return (
    <p ref={ref} className="font-display text-5xl text-white">
      {n}
      {suffix}
    </p>
  );
}

/* ============== TIMELINE ============== */
function TimelineSection() {
  const stages = ["Group Stage", "Round of 16", "Quarter Final", "Semi Final", "Final"];
  return (
    <section className="relative py-24 px-6">
      <div className="mx-auto max-w-4xl">
        <h2
          className="text-center font-display text-gradient-gold"
          style={{ fontSize: "clamp(2rem, 6vw, 5rem)" }}
        >
          Tournament Journey
        </h2>
        <div className="mt-14 flex flex-col items-center gap-6">
          {stages.map((s, i) => (
            <ScrollReveal key={s} delay={i * 100}>
              <div className="relative flex w-full max-w-xl flex-col items-center">
                <div className="bg-pitch-stripes relative w-full overflow-hidden rounded-2xl border-2 border-white/30 p-6 text-center shadow-2xl">
                  <div className="absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 bg-white/40" />
                  <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/40" />
                  <p className="relative font-display text-3xl uppercase text-white drop-shadow-lg">
                    {s}
                  </p>
                </div>
                {i < stages.length - 1 && (
                  <div className="my-2 h-8 w-1 bg-gradient-to-b from-gold to-transparent" />
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============== GALLERY ============== */
function Gallery() {
  const imgs = useMemo(
    () => [
      WINNERS.champion.photo,
      WINNERS.runnerup.photo,
      WINNERS.third.photo,
      WINNERS.fourth.photo,
      "/winners/bestpredictor.jpg",
      "/winners/luckydraw.jpg",
    ],
    [],
  );
  const strip = [...imgs, ...imgs];
  return (
    <section className="relative py-24">
      <h2
        className="text-center font-display text-gradient-gold"
        style={{ fontSize: "clamp(2rem, 6vw, 5rem)" }}
      >
        Football Gallery
      </h2>
      <p className="mt-2 text-center text-white/70">Moments from the ICAD stadium.</p>
      <div className="mt-10 overflow-hidden">
        <div
          className="flex gap-4 w-max"
          style={{ animation: "slide-left 30s linear infinite" }}
        >
          {strip.map((src, i) => (
            <div
              key={i}
              className="h-56 w-80 shrink-0 overflow-hidden rounded-2xl border border-gold/30"
            >
              <img src={src} alt="" className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </div>
      <style>{`@keyframes slide-left { to { transform: translateX(-50%); } }`}</style>
    </section>
  );
}

/* ============== CELEBRATION ============== */
function Celebration() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver((e) => {
      e.forEach((x) => {
        if (x.isIntersecting) {
          confetti({
            particleCount: 200,
            spread: 120,
            origin: { y: 0.5 },
            colors: ["#FFD700", "#FFA500", "#ffffff", "#4ECDC4"],
          });
        }
      });
    });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <section
      ref={ref}
      className="relative min-h-[60vh] overflow-hidden py-24 px-6 text-center"
    >
      <div className="pointer-events-none absolute inset-0">
        <Spotlights />
        <FloatingBalls />
      </div>
      <div className="relative z-10">
        <h2
          className="font-display text-gradient-gold"
          style={{ fontSize: "clamp(2rem, 8vw, 6rem)" }}
        >
          Celebration
        </h2>
        <p className="mt-4 text-white/70">
          Confetti rain. Fireworks. Crowd wave. Drone camera swooping across the pitch.
        </p>
        <div className="mt-10 flex justify-center gap-2 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="h-16 w-2 rounded-full bg-white/60"
              style={{
                animation: `wave 1.6s ease-in-out ${i * 0.06}s infinite`,
              }}
            />
          ))}
        </div>
        <style>{`@keyframes wave { 0%,100% { transform: scaleY(0.4);} 50%{ transform: scaleY(1.4);} }`}</style>
      </div>
    </section>
  );
}

/* ============== CREDITS ============== */
function Credits() {
  return (
    <section className="relative py-24 px-6">
      <div className="mx-auto max-w-4xl text-center">
        <h2
          className="font-display text-gradient-gold"
          style={{ fontSize: "clamp(2rem, 6vw, 5rem)" }}
        >
          Credits
        </h2>
        <p className="mt-6 text-lg text-white/80">Organized by</p>
        <p className="mt-1 font-display text-5xl text-white">ICAD</p>

        <p className="mt-10 text-sm uppercase tracking-widest text-gold">Special Thanks</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {["Committee", "Participants", "Sponsors"].map((t) => (
            <div
              key={t}
              className="rounded-2xl border border-gold/30 bg-black/60 p-6 font-heading text-lg text-white"
            >
              {t}
            </div>
          ))}
        </div>

        <div className="mt-14 flex justify-center gap-6">
          {["#dc2626", "#facc15", "#0ea5e9"].map((c, i) => (
            <div
              key={i}
              className="h-24 w-8 origin-top animate-scarf-wave rounded-b-full"
              style={{ background: c, animationDelay: `${i * 0.3}s` }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============== FOOTER ============== */
function Footer() {
  return (
    <footer className="relative overflow-hidden bg-pitch-stripes">
      <div className="absolute inset-x-0 top-0 h-2 bg-white/60" />
      <div className="absolute inset-0 animate-grass-wave opacity-30 [background-image:repeating-linear-gradient(90deg,rgba(0,0,0,0.2)_0_2px,transparent_2px_6px)]" />
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-14 text-center">
        <p className="font-display text-3xl uppercase text-white drop-shadow-lg">
          ICAD FIFA World Cup 2026
        </p>
        <div className="mt-6 flex justify-center gap-4">
          {["FB", "IG", "X", "YT"].map((s) => (
            <a
              key={s}
              href="#"
              className="grid h-12 w-12 place-items-center rounded-full border-2 border-white bg-white text-black font-bold shadow-xl"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 30% 30%, #fff 30%, #000 30% 32%, #fff 32% 40%, #000 40% 42%, #fff 42%)",
                color: "transparent",
              }}
              aria-label={s}
            >
              {s}
            </a>
          ))}
        </div>
        <p className="mt-6 text-xs uppercase tracking-widest text-white/80">
          © 2026 ICAD · Score a goal. Lift the trophy.
        </p>
      </div>
    </footer>
  );
}

/* ============== HELPERS ============== */
function ScrollReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setVisible(true);
        });
      },
      { threshold: 0.15 },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{
        transition: "opacity 700ms ease, transform 700ms ease",
        transitionDelay: `${delay}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
      }}
    >
      {children}
    </div>
  );
}

function Trophy({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 128 128" className={className} aria-hidden>
      <defs>
        <linearGradient id="tg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff3a0" />
          <stop offset="0.5" stopColor="#f5c518" />
          <stop offset="1" stopColor="#8a5a00" />
        </linearGradient>
      </defs>
      <path
        fill="url(#tg)"
        d="M40 10h48v20c0 18-10 30-24 30S40 48 40 30V10zm-18 4h14v18c0 8-3 14-8 16-6-2-8-10-8-18V18zm70 0h14v16c0 8-2 16-8 18-5-2-8-8-8-16V14zM56 68h16l-2 20h-12l-2-20zm-14 24h44l-4 12H46l-4-12zm-6 16h56v10H36v-10z"
      />
    </svg>
  );
}

function FootballIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <circle cx="32" cy="32" r="30" fill="white" stroke="black" strokeWidth="2" />
      <polygon
        points="32,18 42,26 38,38 26,38 22,26"
        fill="black"
      />
      <path
        d="M32 4 L32 18 M62 32 L42 26 M2 32 L22 26 M50 56 L38 38 M14 56 L26 38"
        stroke="black"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  );
}

function Medal({ type, small = false }: { type: Winner["medal"]; small?: boolean }) {
  const size = small ? "h-8 w-8" : "h-12 w-12";
  const color = {
    gold: "from-yellow-200 to-amber-600",
    silver: "from-slate-100 to-slate-500",
    bronze: "from-orange-300 to-orange-700",
    boot: "from-amber-200 to-yellow-800",
    star: "from-emerald-200 to-emerald-700",
    clover: "from-sky-200 to-blue-700",
  }[type];
  const label = {
    gold: "1",
    silver: "2",
    bronze: "3",
    boot: "★",
    star: "★",
    clover: "♣",
  }[type];
  return (
    <div
      className={`${size} grid place-items-center rounded-full bg-gradient-to-br ${color} font-display text-xl text-black shadow-lg ring-2 ring-white/40`}
    >
      {label}
    </div>
  );
}
