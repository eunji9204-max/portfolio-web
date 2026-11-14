import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useProgress } from "@react-three/drei";

const MIN_SHOW_MS = 900; // 너무 빨리 사라져 깜빡이는 것 방지

/* 3D 에셋 로딩 진행률을 보여주고, 완료되면 페이드아웃되는 로딩 화면 */
export default function Loader() {
  const { progress, active } = useProgress();
  const reduce = useReducedMotion();
  const [minElapsed, setMinElapsed] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMinElapsed(true), MIN_SHOW_MS);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (minElapsed && !active && progress >= 100) setDone(true);
  }, [minElapsed, active, progress]);

  // 에셋 로딩이 시작되지 않는 경우를 대비한 안전장치
  useEffect(() => {
    const t = setTimeout(() => setDone(true), 12000);
    return () => clearTimeout(t);
  }, []);

  // 로딩 중 스크롤 잠금
  useEffect(() => {
    if (done) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => { document.documentElement.style.overflow = prev; };
  }, [done]);

  const pct = Math.round(progress);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          role="status"
          aria-live="polite"
          aria-label={`로딩 중 ${pct}%`}
          className="fixed inset-0 z-[100] grid place-items-center bg-[#dfe6fb]"
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_45%,rgba(255,255,255,0.7),transparent)]" />

          <motion.div
            className="relative flex flex-col items-center"
            exit={{ y: -12, opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* 둥둥 떠 있는 우주인 */}
            <motion.img
              src={`${import.meta.env.BASE_URL}assets/loader-astronaut.png`}
              alt=""
              draggable={false}
              className="w-[72px] select-none drop-shadow-[0_14px_18px_rgba(36,71,255,0.22)]"
              animate={reduce ? undefined : { y: [0, -10, 0], rotate: [-3, 3, -3] }}
              transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
            />
            {/* 바닥 그림자: 떠오를 때 작아짐 */}
            <motion.span
              className="mt-3 h-[6px] w-12 rounded-full bg-[#2447ff]/15 blur-[3px]"
              animate={reduce ? undefined : { scaleX: [1, 0.75, 1], opacity: [0.9, 0.5, 0.9] }}
              transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
            />

            <p className="mt-5 text-[15px] font-medium tracking-[-0.02em] text-ink">
              조금만 기다려주세요.
            </p>

            {/* 진행 바 */}
            <div className="mt-7 h-[3px] w-40 overflow-hidden rounded-full bg-white/70">
              <motion.div
                className="h-full rounded-full bg-brand"
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>
            <span className="mt-3 font-display text-[12px] font-medium tabular-nums tracking-[0.2em] text-ink-soft">
              {String(pct).padStart(3, "0")}%
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
