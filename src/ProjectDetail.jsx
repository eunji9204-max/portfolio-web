import { createContext, useContext, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Copy,
  Layers,
  Lightbulb,
  MousePointerClick,
  Target,
} from "lucide-react";
import { PROJECT_DETAILS } from "./projects.js";

/**
 * 프로젝트 상세 페이지 공통 템플릿.
 * 컬러는 CSS 변수(--p, --p-deep, --p-bright, --p-tint)로 받아 프로젝트마다 자동으로 바뀜.
 */

const ScrollRoot = createContext(null);
const EASE = [0.22, 1, 0.36, 1];
const glow = (pct) => `color-mix(in srgb, var(--p) ${pct}%, transparent)`;

function Reveal({ children, delay = 0, y = 28, className = "" }) {
  const root = useContext(ScrollRoot);
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ root, once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

function SectionHead({ no, en, ko, desc }) {
  return (
    <Reveal className="mb-10 md:mb-14">
      <p className="flex items-center gap-3 text-[13px] font-semibold tracking-[0.2em] text-[var(--p)]">
        <span className="h-px w-8 bg-[var(--p)]" />
        {no} · {en}
      </p>
      <h2 className="mt-4 text-[30px] font-bold tracking-[-0.03em] text-ink md:text-[40px]">{ko}</h2>
      {desc && <p className="mt-3 max-w-[560px] text-[15px] leading-[1.7] text-ink-soft">{desc}</p>}
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/* 1. 웹시안                                                           */
/* ------------------------------------------------------------------ */

function Hotspot({ h, i }) {
  const [open, setOpen] = useState(false);
  const right = h.x > 60;
  const below = h.y < 70;
  return (
    <div
      className="absolute z-10"
      style={{ left: `${h.x}%`, top: `${h.y}%` }}
      onPointerEnter={() => setOpen(true)}
      onPointerLeave={() => setOpen(false)}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="relative -ml-4 -mt-4 grid size-8 place-items-center rounded-full bg-[var(--p)] text-[12px] font-bold text-white ring-4 ring-white/70 transition-transform hover:scale-110"
        style={{ boxShadow: `0 6px 16px -4px ${glow(80)}` }}
        aria-label={h.title}
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-[var(--p)] opacity-50" />
        <span className="relative">{i + 1}</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: below ? 8 : -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.22, ease: EASE }}
            className={`glass absolute w-[240px] rounded-2xl p-4 text-left ${right ? "right-0" : "left-0"} ${below ? "top-6" : "bottom-6"}`}
          >
            <p className="text-[14px] font-bold text-ink">{h.title}</p>
            <p className="mt-1.5 text-[12.5px] leading-[1.6] text-ink-soft">{h.desc}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function WebMockup({ d }) {
  const root = useContext(ScrollRoot);
  const ref = useRef(null);
  const reduce = useReducedMotion();

  // 스크롤에 따라 눕혀진 화면이 세워짐
  const { scrollYProgress } = useScroll({ container: root, target: ref, offset: ["start end", "center center"] });
  const rotateX = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [26, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [0.86, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0.3, 1]);

  // 마우스 기울기
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const tiltY = useSpring(useTransform(mx, (v) => v * 6), { stiffness: 120, damping: 18 });
  const tiltX = useSpring(useTransform(my, (v) => v * -4), { stiffness: 120, damping: 18 });

  return (
    <div
      ref={ref}
      className="[perspective:1600px]"
      onPointerMove={(e) => {
        if (reduce) return;
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
        my.set(((e.clientY - r.top) / r.height) * 2 - 1);
      }}
      onPointerLeave={() => {
        mx.set(0);
        my.set(0);
      }}
    >
      <motion.div style={{ rotateX, scale, opacity, transformOrigin: "center top" }}>
        <motion.div
          style={{ rotateX: tiltX, rotateY: tiltY }}
          className="overflow-hidden rounded-[18px] border border-white/80 bg-white shadow-[0_40px_80px_-30px_rgba(20,40,90,0.45),0_0_0_1px_rgba(255,255,255,0.6)]"
        >
          {/* 브라우저 프레임 */}
          <div className="flex items-center gap-3 border-b border-[#E5E7EB] bg-[#F7F8FA] px-4 py-3">
            <div className="flex gap-1.5">
              <span className="size-3 rounded-full bg-[#FF5F57]" />
              <span className="size-3 rounded-full bg-[#FEBC2E]" />
              <span className="size-3 rounded-full bg-[#28C840]" />
            </div>
            <div className="mx-auto flex w-full max-w-[420px] items-center justify-center rounded-md bg-white px-3 py-1 text-[11px] text-[#6B7280] ring-1 ring-[#E5E7EB]">
              {d.title.join(" ")} — Main
            </div>
            <span className="w-[54px]" />
          </div>
          <div className="relative">
            <img src={d.image} alt={`${d.title.join(" ")} 메인 화면 시안`} className="block w-full" />
            {d.hotspots.map((h, i) => (
              <Hotspot key={h.title} h={h} i={i} />
            ))}
          </div>
        </motion.div>
      </motion.div>
      <p className="mt-5 flex items-center justify-center gap-2 text-[13px] text-ink-soft">
        <MousePointerClick className="size-4 text-[var(--p)]" />
        번호에 마우스를 올려 주요 기능을 확인해 보세요
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 2. 컬러 가이드                                                       */
/* ------------------------------------------------------------------ */

const hexToRgb = (hex) => {
  const n = parseInt(hex.slice(1), 16);
  return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
};

/** 배경색 밝기에 따라 글자색 자동 선택 */
const isLight = (hex) => {
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  return 0.299 * r + 0.587 * g + 0.114 * b > 170;
};

function useCopy() {
  const [copied, setCopied] = useState(null);
  const timer = useRef();
  useEffect(() => () => clearTimeout(timer.current), []);
  const copy = async (hex) => {
    try {
      await navigator.clipboard.writeText(hex);
    } catch {
      /* 클립보드 권한이 없어도 토스트는 표시 */
    }
    setCopied(hex);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(null), 1600);
  };
  return [copied, copy];
}

function Swatch({ c, onCopy, big }) {
  return (
    <motion.button
      onClick={() => onCopy(c.hex)}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
      className="glass group flex w-full flex-col overflow-hidden rounded-[20px] p-2 text-left"
    >
      <div
        className={`relative flex items-start justify-between rounded-[14px] p-4 ${big ? "h-40" : "h-28"}`}
        style={{ background: c.hex, color: c.text || (isLight(c.hex) ? "#1F2937" : "#fff") }}
      >
        <span className="text-[12px] font-semibold opacity-90">{c.name}</span>
        <span className="flex items-center gap-1 rounded-full bg-white/25 px-2 py-1 text-[11px] font-medium opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
          <Copy className="size-3" /> Copy
        </span>
      </div>
      <div className="px-2 pb-2 pt-3">
        <p className="font-display text-[15px] font-semibold text-ink">{c.hex}</p>
        <p className="mt-0.5 text-[11.5px] text-ink-soft">RGB {hexToRgb(c.hex)}</p>
        <p className="mt-2 text-[12px] text-ink-soft">{c.usage}</p>
      </div>
    </motion.button>
  );
}

const STEPS = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"];

function ColorScale({ scale, onCopy }) {
  const [hover, setHover] = useState(5);
  return (
    <div className="flex h-24 overflow-hidden rounded-[18px] ring-1 ring-white/80" onPointerLeave={() => setHover(5)}>
      {scale.map((hex, i) => (
        <motion.button
          key={hex + i}
          onPointerEnter={() => setHover(i)}
          onClick={() => onCopy(hex)}
          animate={{ flexGrow: hover === i ? 3.2 : 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 28 }}
          className="relative flex basis-0 flex-col justify-end overflow-hidden p-2.5 text-left"
          style={{ background: hex, color: isLight(hex) ? "#1F2937" : "#fff" }}
        >
          <span className="text-[11px] font-semibold">{STEPS[i]}</span>
          <AnimatePresence>
            {hover === i && (
              <motion.span
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="whitespace-nowrap text-[12px] font-medium"
              >
                {hex}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      ))}
    </div>
  );
}

function ComponentPreview({ c }) {
  const [tab, setTab] = useState(c.tabs[0]);
  const root = useContext(ScrollRoot);
  const stateLabels = c.stateLabels || ["정상", "주의"];
  const stateStyle = [
    { background: "var(--p-tint)", color: "var(--p-deep)" },
    { background: "#FCF0E0", color: "#C26F0E" },
  ];
  const Btn = ({ b, filled }) => (
    <button
      className={`flex items-center gap-2 ${c.radius} px-5 py-3 text-[14px] font-semibold transition-all hover:-translate-y-0.5 active:translate-y-0 ${
        filled
          ? "bg-[var(--p)] text-white hover:bg-[var(--p-deep)]"
          : "border border-[var(--p)] bg-white text-[var(--p)] hover:bg-[var(--p-tint)]"
      } ${b.iconRight ? "flex-row-reverse" : ""}`}
      style={filled ? { boxShadow: `0 8px 18px -8px ${glow(85)}` } : undefined}
    >
      <b.icon className="size-4" /> {b.label}
    </button>
  );
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {/* 버튼 & 배지 */}
      <div className="glass rounded-[22px] p-6">
        <p className="text-[12px] font-semibold tracking-[0.15em] text-ink-soft">BUTTON · BADGE</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Btn b={c.primary} filled />
          <Btn b={c.outline} />
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          <span className="flex items-center gap-1.5 rounded-full bg-[var(--p-tint)] px-3 py-1 text-[12px] font-semibold text-[var(--p-deep)]">
            <span className="relative flex size-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-[var(--p)] opacity-60" />
              <span className="relative size-2 rounded-full bg-[var(--p)]" />
            </span>
            {c.live}
          </span>
          {c.badges.map((b) => (
            <span key={b.label} className="rounded-md px-2.5 py-1 text-[12px] font-semibold" style={{ background: b.tint, color: b.color }}>
              {b.label}
            </span>
          ))}
        </div>
      </div>

      {/* 탭 & 진행 바 */}
      <div className="glass rounded-[22px] p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-[12px] font-semibold tracking-[0.15em] text-ink-soft">TAB · PROGRESS</p>
          <div className="flex rounded-lg bg-white/70 p-1 ring-1 ring-[#E5E7EB]">
            {c.tabs.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`relative rounded-md px-3 py-1.5 text-[12px] font-semibold transition-colors ${tab === t ? "text-white" : "text-ink-soft hover:text-ink"}`}
              >
                {tab === t && (
                  <motion.span layoutId="detail-tab" className="absolute inset-0 rounded-md bg-[var(--p)]" transition={{ type: "spring", stiffness: 380, damping: 30 }} />
                )}
                <span className="relative">{t}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="mt-6 space-y-4">
          {c.bars.map((b, i) => (
            <div key={b.label} className="flex items-center gap-3 text-[13px]">
              <span className="w-[130px] shrink-0 text-ink">{b.label}</span>
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#E5E7EB]">
                <motion.div
                  className="h-full rounded-full bg-[var(--p-bright)]"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${b.value}%` }}
                  viewport={{ root, once: true }}
                  transition={{ duration: 1.2, ease: EASE, delay: 0.15 * i }}
                />
              </div>
              <span className="w-9 text-right font-medium text-ink">{b.value}%</span>
              <span className="rounded-md px-2 py-0.5 text-[11px] font-semibold" style={stateStyle[b.state]}>
                {stateLabels[b.state]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ColorGuide({ d }) {
  const [copied, copy] = useCopy();
  const { colors } = d;
  return (
    <>
      <Reveal>
        <h3 className="mb-4 text-[15px] font-bold text-ink">Primary</h3>
      </Reveal>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {colors.primary.map((c, i) => (
          <Reveal key={c.hex} delay={i * 0.07}>
            <Swatch c={c} onCopy={copy} big />
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-10">
        <h3 className="mb-4 text-[15px] font-bold text-ink">
          {colors.scaleName} <span className="ml-2 text-[12px] font-normal text-ink-soft">마우스를 올리고 클릭하면 복사</span>
        </h3>
        <ColorScale scale={colors.scale} onCopy={copy} />
      </Reveal>

      <div className="mt-10 grid gap-10 md:grid-cols-[1fr_1.2fr]">
        <div>
          <Reveal>
            <h3 className="mb-4 text-[15px] font-bold text-ink">Neutral</h3>
          </Reveal>
          <div className="grid grid-cols-2 gap-4">
            {colors.neutral.map((c, i) => (
              <Reveal key={c.hex} delay={i * 0.06}>
                <Swatch c={c} onCopy={copy} />
              </Reveal>
            ))}
          </div>
        </div>
        <div>
          <Reveal>
            <h3 className="mb-4 text-[15px] font-bold text-ink">Semantic · 상태 컬러</h3>
          </Reveal>
          <Reveal className="glass divide-y divide-white/70 rounded-[22px] px-5">
            {colors.semantic.map((s) => (
              <button
                key={s.name}
                onClick={() => copy(s.hex)}
                className="group flex w-full items-center gap-4 py-4 text-left transition-transform hover:translate-x-1"
              >
                <span className="size-10 shrink-0 rounded-xl" style={{ background: s.hex, boxShadow: `0 0 0 4px ${s.tint}` }} />
                <div className="flex-1">
                  <p className="text-[14px] font-semibold text-ink">{s.name}</p>
                  <p className="text-[12px] text-ink-soft">{s.label}</p>
                </div>
                <span className="font-display text-[13px] font-medium text-ink-soft group-hover:text-ink">{s.hex}</span>
                <Copy className="size-4 text-ink-soft opacity-0 transition-opacity group-hover:opacity-100" />
              </button>
            ))}
          </Reveal>
        </div>
      </div>

      {/* 타이포그래피 */}
      <Reveal className="mt-14">
        <h3 className="mb-4 text-[15px] font-bold text-ink">Typography · Pretendard</h3>
        <div className="glass divide-y divide-white/70 rounded-[22px] px-6">
          {d.type.map((t) => (
            <div key={t.name} className="group flex flex-col gap-2 py-5 md:flex-row md:items-center md:gap-8">
              <div className="w-[200px] shrink-0">
                <p className="text-[13px] font-semibold text-[var(--p)]">{t.name}</p>
                <p className="text-[12px] text-ink-soft">{t.spec}</p>
              </div>
              <p className={`text-[#1F2937] transition-transform duration-300 group-hover:translate-x-2 ${t.cls}`}>{t.sample}</p>
            </div>
          ))}
        </div>
      </Reveal>

      {/* 컴포넌트 */}
      <Reveal className="mt-14">
        <h3 className="mb-4 text-[15px] font-bold text-ink">
          UI Components <span className="ml-2 text-[12px] font-normal text-ink-soft">직접 눌러보세요</span>
        </h3>
        <ComponentPreview c={d.components} />
      </Reveal>

      {/* 복사 토스트 */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 12, x: "-50%" }}
            className="fixed bottom-8 left-1/2 z-[70] flex items-center gap-2.5 rounded-full bg-[#1F2937] px-5 py-3 text-[13px] font-medium text-white shadow-xl"
          >
            <span className="size-4 rounded-full ring-2 ring-white/40" style={{ background: copied }} />
            {copied} 복사됨
            <Check className="size-4 text-[var(--p-bright)]" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* 3. 프로젝트 설명                                                     */
/* ------------------------------------------------------------------ */

const CARD_ICONS = [Target, Lightbulb, Layers];

function Overview({ d }) {
  const { cards, point, features } = d.overview;
  return (
    <>
      <div className="grid gap-5 md:grid-cols-3">
        {cards.map((c, i) => {
          const Icon = CARD_ICONS[i];
          return (
            <Reveal key={c.tag} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="glass group h-full rounded-[22px] p-7"
              >
                <div className="flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-2xl bg-[var(--p-tint)] text-[var(--p)] transition-colors group-hover:bg-[var(--p)] group-hover:text-white">
                    <Icon className="size-5" />
                  </span>
                  <span className="text-[12px] font-semibold tracking-[0.15em] text-ink-soft">{c.tag.toUpperCase()}</span>
                </div>
                <h3 className="mt-6 text-[19px] font-bold tracking-[-0.02em] text-ink">{c.title}</h3>
                <p className="mt-3 text-[14px] leading-[1.75] text-ink-soft">{c.body}</p>
              </motion.div>
            </Reveal>
          );
        })}
      </div>

      <div className="mt-16 grid gap-10 md:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <h3 className="text-[24px] font-bold leading-[1.4] tracking-[-0.03em] text-ink">
            {point.title[0]}
            <br />
            <span className="text-[var(--p)]">{point.title[1]}</span>
          </h3>
          <p className="mt-5 text-[14.5px] leading-[1.8] text-ink-soft">{point.body}</p>
        </Reveal>
        <div className="space-y-3">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.06}>
              <div className="glass group flex items-start gap-4 rounded-[18px] p-5 transition-all hover:translate-x-1.5 hover:bg-white/70">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white text-[var(--p)] ring-1 ring-[#E5E7EB] transition-transform group-hover:rotate-[-8deg] group-hover:scale-110">
                  <f.icon className="size-5" />
                </span>
                <div>
                  <p className="text-[15px] font-bold text-ink">{f.title}</p>
                  <p className="mt-1 text-[13.5px] leading-[1.65] text-ink-soft">{f.desc}</p>
                </div>
                <ArrowUpRight className="ml-auto size-4 shrink-0 text-ink-soft opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* 페이지                                                              */
/* ------------------------------------------------------------------ */

export default function ProjectDetail({ slug, origin, onBack, onNavigate, onSettled }) {
  const d = PROJECT_DETAILS[slug];
  const next = d.next ? PROJECT_DETAILS[d.next] : null;
  const scrollRef = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ container: scrollRef });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  const heroImgY = useTransform(scrollYProgress, [0, 0.25], [0, -60]);

  // ESC로 닫기
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onBack();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onBack]);

  const ox = origin?.x ?? window.innerWidth / 2;
  const oy = origin?.y ?? window.innerHeight / 2;
  const themeVars = {
    "--p": d.theme.p,
    "--p-deep": d.theme.deep,
    "--p-bright": d.theme.bright,
    "--p-tint": d.theme.tint,
  };

  return (
    <motion.div
      ref={scrollRef}
      className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden bg-[#EEF2FB]"
      style={themeVars}
      // 클릭한 위치에서 원형으로 펼쳐지는 전환
      initial={reduce ? { opacity: 0 } : { clipPath: `circle(0px at ${ox}px ${oy}px)` }}
      // 전환이 끝나면 clip-path를 제거 (Chrome에서 clip-path 안의 backdrop-filter가 안 그려지는 문제 방지)
      animate={
        reduce
          ? { opacity: 1 }
          : { clipPath: `circle(150% at ${ox}px ${oy}px)`, transitionEnd: { clipPath: "none" } }
      }
      exit={
        reduce
          ? { opacity: 0 }
          : { clipPath: [`circle(150% at ${ox}px ${oy}px)`, `circle(0px at ${ox}px ${oy}px)`] }
      }
      transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={() => onSettled?.()} // 전환이 끝나면 뒤쪽 3D 렌더링 일시정지
    >
      <ScrollRoot.Provider value={scrollRef}>
        {/* 배경 블러 */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[1400px] overflow-hidden">
          <div className="absolute -left-40 top-20 size-[520px] rounded-full opacity-40 blur-[120px]" style={{ background: "var(--p-bright)" }} />
          <div className="absolute right-[-120px] top-[-80px] size-[560px] rounded-full bg-[#b9c8ff]/60 blur-[120px]" />
          <div className="absolute left-1/2 top-[700px] size-[600px] -translate-x-1/2 rounded-full opacity-70 blur-[140px]" style={{ background: "var(--p-tint)" }} />
        </div>

        {/* 진행 바 + 상단 바 */}
        <motion.div className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-[var(--p)]" style={{ scaleX: progress }} />
        <header className="sticky top-0 z-[55] px-4 pt-4 md:px-8">
          <div className="glass mx-auto flex max-w-[1200px] items-center justify-between rounded-full py-2 pl-2 pr-5">
            <button
              onClick={onBack}
              className="group flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold text-ink transition-colors hover:bg-white/70"
            >
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
              Portfolio
            </button>
            <p className="hidden text-[13px] font-medium text-ink md:block">{d.title.join(" ")}</p>
            <p className="font-display text-[13px] text-ink-soft">
              <span className="font-semibold text-ink">{d.no}</span> / {d.total}
            </p>
          </div>
        </header>

        <main className="relative mx-auto max-w-[1200px] px-5 pb-24 md:px-8">
          {/* Hero */}
          <section className="pt-16 md:pt-24">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.7, ease: EASE }}
              className="flex items-center gap-3 text-[13px] font-semibold text-ink"
            >
              <span className="rounded-full bg-[var(--p)] px-3 py-1 text-white">{d.no}</span>
              {d.category}
            </motion.p>
            <h1 className="mt-6 text-[44px] font-bold leading-[1.15] tracking-[-0.04em] text-ink md:text-[76px]">
              {d.title.map((w, i) => (
                <span key={w} className="mr-[0.25em] inline-block overflow-hidden pb-[0.08em] align-bottom">
                  <motion.span
                    className={`inline-block ${i === 1 ? "text-[var(--p)]" : ""}`}
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.9, ease: EASE }}
                  >
                    {w}
                  </motion.span>
                </span>
              ))}
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.7, ease: EASE }}
              className="mt-6 max-w-[640px] text-[17px] leading-[1.75] text-ink-soft md:text-[19px]"
            >
              {d.lead}
            </motion.p>

            <motion.dl
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.07, delayChildren: 0.85 } } }}
              className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4"
            >
              {d.meta.map((m) => (
                <motion.div
                  key={m.label}
                  variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } }}
                  className="glass rounded-[18px] px-5 py-4"
                >
                  <dt className="text-[11px] font-semibold tracking-[0.15em] text-ink-soft">{m.label.toUpperCase()}</dt>
                  <dd className="mt-1.5 text-[14px] font-semibold text-ink">{m.value}</dd>
                </motion.div>
              ))}
            </motion.dl>

            {/* 히어로 대표 이미지 (스크롤 패럴랙스) */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 1, ease: EASE }}
              className="relative mt-14 h-[220px] overflow-hidden rounded-[28px] md:h-[360px]"
              style={{ background: d.heroGradient }}
            >
              <motion.div style={{ y: heroImgY }} className="absolute right-[-6%] top-[14%] w-[78%]">
                <img
                  src={d.image}
                  alt=""
                  className="w-full rounded-xl shadow-[0_30px_60px_-20px_rgba(0,0,0,0.45)] [transform:perspective(1400px)_rotateY(-14deg)_rotateX(6deg)]"
                />
              </motion.div>
              <div className="absolute bottom-7 left-7 text-white md:bottom-10 md:left-10">
                <p className="text-[12px] font-medium tracking-[0.2em] opacity-80">{d.heroCopy.label}</p>
                <p className="mt-2 text-[22px] font-bold leading-[1.35] md:text-[30px]">
                  {d.heroCopy.text[0]}
                  <br />
                  {d.heroCopy.text[1]}
                </p>
              </div>
            </motion.div>
          </section>

          {/* 1. 웹시안 */}
          <section className="pt-28 md:pt-36">
            <SectionHead no="01" en="WEB DESIGN" ko={d.mockup.title} desc={d.mockup.desc} />
            <WebMockup d={d} />
          </section>

          {/* 2. 컬러 가이드 */}
          <section className="pt-28 md:pt-36">
            <SectionHead no="02" en="COLOR GUIDE" ko="컬러 & 디자인 시스템" desc="스와치를 클릭하면 HEX 코드가 복사됩니다." />
            <ColorGuide d={d} />
          </section>

          {/* 3. 설명 */}
          <section className="pt-28 md:pt-36">
            <SectionHead no="03" en="OVERVIEW" ko="프로젝트 설명" />
            <Overview d={d} />
          </section>

          {/* 다음 프로젝트 */}
          <Reveal className="pt-28">
            {next ? (
              <button
                onClick={(e) => onNavigate(d.next, { x: e.clientX, y: e.clientY })}
                className="glass group relative flex w-full flex-col items-start justify-between gap-6 overflow-hidden rounded-[28px] p-8 text-left md:flex-row md:items-center md:p-10"
                style={{ "--n": next.theme.p }}
              >
                {/* 다음 프로젝트 컬러가 호버 시 채워짐 */}
                <span className="absolute inset-0 origin-left scale-x-0 bg-[var(--n)] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
                <div className="relative">
                  <p className="text-[12px] font-semibold tracking-[0.2em] text-ink-soft transition-colors duration-500 group-hover:text-white/70">NEXT PROJECT</p>
                  <p className="mt-2 text-[24px] font-bold tracking-[-0.03em] text-ink transition-colors duration-500 group-hover:text-white md:text-[30px]">
                    {next.no} {next.title.join(" ")}
                  </p>
                  <p className="mt-1 text-[14px] text-ink-soft transition-colors duration-500 group-hover:text-white/80">{next.category}</p>
                </div>
                <span className="relative grid size-14 shrink-0 place-items-center rounded-full bg-[#1F2937] text-white transition-all duration-500 group-hover:bg-white group-hover:text-[var(--n)]">
                  <ArrowRight className="size-5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </button>
            ) : (
              <div className="glass flex flex-col items-start justify-between gap-6 rounded-[28px] p-8 md:flex-row md:items-center md:p-10">
                <div>
                  <p className="text-[12px] font-semibold tracking-[0.2em] text-ink-soft">NEXT PROJECT</p>
                  <p className="mt-2 text-[24px] font-bold tracking-[-0.03em] text-ink md:text-[30px]">05 Coming Soon</p>
                  <p className="mt-1 text-[14px] text-ink-soft">새로운 프로젝트를 준비하고 있습니다</p>
                </div>
                <button
                  onClick={onBack}
                  className="group flex items-center gap-3 rounded-full bg-[#1F2937] px-7 py-4 text-[14px] font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[var(--p)]"
                >
                  포트폴리오로 돌아가기
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            )}
          </Reveal>
        </main>
      </ScrollRoot.Provider>
    </motion.div>
  );
}
