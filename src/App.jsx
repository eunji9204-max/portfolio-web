import { Suspense, createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import ProjectDetail from "./ProjectDetail.jsx";
import { useLoaded } from "./Loader.jsx";
import { PROJECT_DETAILS } from "./projects.js";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import * as THREE from "three";
import {
  ArrowLeft,
  ArrowRight,
  Circle,
  Moon,
  Sun,
  Mail,
  Copy,
  Check,
} from "lucide-react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Float, Lightformer, useGLTF } from "@react-three/drei";

/* ------------------------------------------------------------------ */
/* 데이터                                                              */
/* ------------------------------------------------------------------ */

const EMAIL = "heart8520@naver.com";

const NAV = ["Portfolio", "About", "Skills", "Contact"];

const PROJECTS = [
  {
    no: "01",
    cat: "Public Service",
    title: "차세대 통합포털시스템",
    desc: "더 스마트한 업무 환경을 위한\n통합 포털 서비스",
    thumb: `${import.meta.env.BASE_URL}assets/project-portal.jpg`,
    slug: "portal", // 상세 페이지 연결
  },
  {
    no: "02",
    cat: "Government",
    title: "LMO 정보시스템",
    desc: "안전한 바이오,\n더 나은 미래를 위한 LMO 통합 플랫폼",
    thumb: `${import.meta.env.BASE_URL}assets/project-lmo.jpg`,
    slug: "lmo",
  },
  {
    no: "03",
    cat: "Energy Platform",
    title: "탄소관리 · 거래 플랫폼",
    desc: "지속 가능한 탄소중립을 위한\n통합 관리 시스템",
    thumb: `${import.meta.env.BASE_URL}assets/project-carbon.png`,
    slug: "carbon",
  },
  {
    no: "04",
    cat: "Smart City",
    title: "제주 태양광 통합\n모니터링 플랫폼",
    desc: "지속 가능한 에너지를 위한\n스마트 모니터링",
    thumb: `${import.meta.env.BASE_URL}assets/project-solar.png`,
    slug: "solar",
  },
  {
    no: "05",
    cat: "Coming Soon",
    title: "Next Project",
    desc: "새로운 프로젝트를\n준비하고 있습니다",
    thumb: null,
  },
];

/* ------------------------------------------------------------------ */
/* 브랜드 마크 (작은 아이콘용 SVG)                                      */
/* ------------------------------------------------------------------ */

function FigmaMark({ className = "" }) {
  return (
    <svg viewBox="0 0 38 57" className={className} aria-hidden>
      <path fill="#1ABCFE" d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" />
      <path fill="#0ACF83" d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" />
      <path fill="#FF7262" d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" />
      <path fill="#F24E1E" d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" />
      <path fill="#A259FF" d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" />
    </svg>
  );
}

function GptMark({ className = "", color = "currentColor" }) {
  // OpenAI 매듭 형태를 단순화한 마크
  return (
    <svg viewBox="-12 -12 24 24" className={className} aria-hidden>
      {[0, 60, 120, 180, 240, 300].map((r) => (
        <rect
          key={r}
          x="-2.6"
          y="-9.4"
          width="5.2"
          height="11"
          rx="2.6"
          fill="none"
          stroke={color}
          strokeWidth="1.7"
          transform={`rotate(${r}) translate(2.2 0)`}
        />
      ))}
    </svg>
  );
}

function ClaudeMark({ className = "", color = "currentColor" }) {
  return (
    <svg viewBox="-12 -12 24 24" className={className} aria-hidden>
      {Array.from({ length: 12 }).map((_, i) => (
        <line
          key={i}
          x1="0"
          y1="-2.4"
          x2="0"
          y2={i % 2 ? -8.6 : -10.4}
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          transform={`rotate(${i * 30 + (i % 3) * 4})`}
        />
      ))}
    </svg>
  );
}

/** 스킬 패널 / 푸터용 작은 아이콘 */
function ToolIcon({ k, size = 28 }) {
  const s = { width: size, height: size };
  switch (k) {
    case "figma":
      return (
        <span style={s} className="grid place-items-center rounded-[8px] bg-white/80 ring-1 ring-white">
          <FigmaMark className="h-[62%]" />
        </span>
      );
    case "gpt":
      return (
        <span style={s} className="grid place-items-center rounded-[8px] bg-gradient-to-br from-[#5fe0d0] to-[#1aa59a]">
          <GptMark className="h-[70%]" color="#fff" />
        </span>
      );
    case "claude":
      return (
        <span style={s} className="grid place-items-center rounded-[8px] bg-gradient-to-br from-[#ffd2c2] to-[#f19a80]">
          <ClaudeMark className="h-[72%]" color="#fff" />
        </span>
      );
    default:
      return null;
  }
}

/* ------------------------------------------------------------------ */
/* 3D 유리 아이콘 타일 (중앙 장면)                                      */
/* ------------------------------------------------------------------ */

const TILE_STYLES = {
  ps: { face: "linear-gradient(145deg,#1d3b8f,#0b1a55)", glow: "#4f8bff" },
  figma: { face: "linear-gradient(145deg,#c9d6ff,#93a8f0)", glow: "#8aa2ff" },
  ai: { face: "linear-gradient(145deg,#6b3a2a,#2a120c)", glow: "#ffa860" },
  gpt: { face: "linear-gradient(145deg,#7ee6d6,#1f9f95)", glow: "#4fe0cc" },
  claude: { face: "linear-gradient(145deg,#ffc6b2,#e98468)", glow: "#ff9d80" },
};

function TileContent({ k }) {
  switch (k) {
    case "ps":
      return <span className="font-display text-[2.7cqw] font-semibold text-[#4aa8ff]">Ps</span>;
    case "ai":
      return <span className="font-display text-[2.7cqw] font-semibold text-[#ffa43a]">Ai</span>;
    case "figma":
      return <FigmaMark className="h-[58%] drop-shadow-[0_4px_8px_rgba(0,0,0,0.2)]" />;
    case "gpt":
      return <GptMark className="h-[62%]" color="#fff" />;
    case "claude":
      return (
        <div className="flex flex-col items-center gap-[0.3cqw]">
          <ClaudeMark className="h-[2.6cqw] w-[2.6cqw]" color="#fff" />
          <span className="font-display text-[1.25cqw] font-medium text-white">Claude</span>
        </div>
      );
    default:
      return null;
  }
}

/** 마우스 위치(-1~1)를 깊이(depth)만큼 이동/기울기 값으로 변환 */
function useParallax(mouse, depth) {
  const x = useTransform(mouse.x, (v) => v * depth * 34);
  const y = useTransform(mouse.y, (v) => v * depth * 24);
  const rotateY = useTransform(mouse.x, (v) => v * 16);
  const rotateX = useTransform(mouse.y, (v) => v * -14);
  return { x, y, rotateX, rotateY };
}

function GlassTile({ k, className, rotate = 0, delay = 0, depth = 1, mouse }) {
  const p = useParallax(mouse, depth);
  return (
    // 바깥: 마우스 패럴랙스 + 커서를 바라보는 기울기
    <motion.div
      className={`absolute aspect-square ${className}`}
      style={{ x: p.x, y: p.y, rotateX: p.rotateX, rotateY: p.rotateY, transformPerspective: 700 }}
    >
      <GlassTileBody k={k} rotate={rotate} delay={delay} />
    </motion.div>
  );
}

function GlassTileBody({ k, rotate, delay: d }) {
  const reduce = useReducedMotion();
  const loaded = useLoaded();
  const delay = d + 0.55; // 우주인 등장 직후 하나씩 팝
  const st = TILE_STYLES[k];
  return (
    <motion.div
      className="absolute inset-0"
      initial={{ opacity: 0, scale: 0.85, y: 20 }}
      animate={
        !loaded
          ? { opacity: 0, scale: 0.85, y: 20 }
          : reduce
          ? { opacity: 1, scale: 1, y: 0 }
          : { opacity: 1, scale: 1, y: [0, -10, 0], rotate: [rotate, rotate + 2, rotate] }
      }
      transition={{
        opacity: { duration: 0.8, delay },
        scale: { type: "spring", stiffness: 260, damping: 16, delay },
        y: { duration: 5 + delay * 2, repeat: Infinity, ease: "easeInOut", delay },
        rotate: { duration: 6 + delay * 2, repeat: Infinity, ease: "easeInOut", delay },
      }}
      style={{ rotate }}
    >
      {/* 두꺼운 유리 테두리 */}
      <div
        className="absolute inset-0 rounded-[26%] border border-white/80"
        style={{
          background:
            "linear-gradient(145deg, rgba(255,255,255,0.75), rgba(200,214,255,0.25) 45%, rgba(255,255,255,0.55))",
          boxShadow: `0 24px 40px -18px ${st.glow}aa, 0 8px 18px -8px rgba(30,50,140,0.35), inset 0 2px 2px rgba(255,255,255,0.9), inset 0 -6px 14px rgba(120,140,230,0.35)`,
          backdropFilter: "blur(10px)",
        }}
      />
      {/* 안쪽 컬러 면 */}
      <div
        className="absolute inset-[11%] grid place-items-center overflow-hidden rounded-[22%]"
        style={{
          background: st.face,
          boxShadow:
            "inset 0 2px 6px rgba(255,255,255,0.45), inset 0 -8px 16px rgba(0,0,0,0.2)",
        }}
      >
        <TileContent k={k} />
        {/* 유리 반사광 */}
        <div className="pointer-events-none absolute -left-1/4 -top-1/2 h-full w-[150%] rotate-[-18deg] bg-gradient-to-b from-white/35 to-transparent" />
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* 3D 우주인                                                            */
/* ------------------------------------------------------------------ */

const MODEL_URL = `${import.meta.env.BASE_URL}assets/base_basic_pbr.glb`;

const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

function AstronautModel({ interaction, mouse }) {
  const { scene } = useGLTF(MODEL_URL);
  const look = useRef();
  const spin = useRef();

  useFrame((_, delta) => {
    if (!look.current || !spin.current) return;
    const it = interaction.current;

    // 1) 화면 전체 마우스 위치(-1~1)를 따라 몸/고개를 돌림
    const tx = mouse.x.get() * 0.6;
    const ty = mouse.y.get() * 0.16;
    look.current.rotation.y += (tx - look.current.rotation.y) * 0.06;
    look.current.rotation.x += (ty - look.current.rotation.x) * 0.06;

    // 2) 호버 시 살짝 커짐
    const s = it.hover ? 1.06 : 1;
    look.current.scale.setScalar(look.current.scale.x + (s - look.current.scale.x) * 0.12);

    // 3) 클릭 시 한 바퀴 회전 + 점프
    if (it.spinT >= 0) {
      it.spinT = Math.min(it.spinT + delta / 1.1, 1);
      const p = easeInOutCubic(it.spinT);
      spin.current.rotation.y = p * Math.PI * 2;
      spin.current.position.y = Math.sin(p * Math.PI) * 0.32;
      if (it.spinT >= 1) {
        it.spinT = -1;
        spin.current.rotation.y = 0;
        spin.current.position.y = 0;
      }
    }
  });

  return (
    <group ref={look}>
      <group ref={spin}>
        {/* GLB 원점이 발바닥 중앙(높이 약 1.71)이라 별도 정렬 불필요 */}
        <primitive object={scene} />
      </group>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* 3D 유리 버블 (마우스를 피해 밀려남)                                  */
/* ------------------------------------------------------------------ */

// [x, y, z, radius] — 카메라 기준 월드 좌표 (화면 가로 약 ±5.6, 세로 약 ±3.15)
// 텍스트(왼쪽)·카드(아래)를 가리지 않도록 우주인 주변에만 소수 배치
const BUBBLES = [
  [1.35, 2.9, -0.5, 0.14], [3.45, 0.4, 1.2, 0.2],
  [4.15, 2.3, 0, 0.26], [0.85, 1.2, 1.8, 0.08],
];

function Bubble({ home, r, seed }) {
  const ref = useRef();
  const vel = useRef(new THREE.Vector3());
  const tmp = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, delta) => {
    const m = ref.current;
    if (!m) return;
    const dt = Math.min(delta, 0.05);
    const t = state.clock.elapsedTime;
    const { viewport, pointer } = state;

    // 둥실둥실 떠다니는 기본 위치
    tmp.set(
      home[0] + Math.sin(t * 0.4 + seed) * 0.18,
      home[1] + Math.sin(t * 0.6 + seed * 2) * 0.22,
      home[2]
    );

    // 커서(월드 좌표)와 가까우면 밀어냄
    const cx = (pointer.x * viewport.width) / 2;
    const cy = (pointer.y * viewport.height) / 2;
    const dx = m.position.x - cx;
    const dy = m.position.y - cy;
    const dist = Math.hypot(dx, dy);
    const radius = 1.5 + r;
    if (dist < radius && dist > 0.0001) {
      const f = (1 - dist / radius) * 28;
      vel.current.x += (dx / dist) * f * dt;
      vel.current.y += (dy / dist) * f * dt;
    }

    // 스프링으로 원래 자리로 복귀
    vel.current.x += (tmp.x - m.position.x) * 6 * dt;
    vel.current.y += (tmp.y - m.position.y) * 6 * dt;
    vel.current.z += (tmp.z - m.position.z) * 6 * dt;
    vel.current.multiplyScalar(1 - 3.2 * dt);
    m.position.addScaledVector(vel.current, dt);
  });

  return (
    <mesh ref={ref} position={home}>
      <sphereGeometry args={[r, 48, 48]} />
      <meshPhysicalMaterial
        color="#cfdcff"
        transparent
        opacity={0.42}
        roughness={0.04}
        metalness={0.1}
        clearcoat={1}
        clearcoatRoughness={0.05}
        iridescence={0.6}
        iridescenceIOR={1.3}
        envMapIntensity={2.2}
      />
    </mesh>
  );
}

function BubbleScene() {
  return (
    <Canvas
      frameloop={useContext(NavCtx).paused ? "never" : "always"}
      dpr={[1, 1.75]}
      gl={{ alpha: true, antialias: true }}
      camera={{ position: [0, 0, 10], fov: 35 }}
      eventSource={document.getElementById("root")}
      eventPrefix="client"
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[4, 6, 6]} intensity={2} />
      {BUBBLES.map(([x, y, z, r], i) => (
        <Bubble key={i} home={[x, y, z]} r={r} seed={i * 1.7} />
      ))}
      <Environment resolution={128}>
        <Lightformer intensity={5} position={[0, 5, 5]} scale={[10, 3, 1]} />
        <Lightformer intensity={3} color="#9fb6ff" position={[-6, 0, 3]} scale={[3, 6, 1]} />
        <Lightformer intensity={3} color="#ffffff" position={[6, -2, 3]} scale={[3, 6, 1]} />
      </Environment>
    </Canvas>
  );
}

function CameraRig() {
  const camera = useThree((s) => s.camera);
  useEffect(() => {
    camera.lookAt(0, 1.155, 0); // 캔버스 위쪽 여백(점프 공간)만큼 시선을 올림
    camera.updateProjectionMatrix();
  }, [camera]);
  return null;
}

function AstronautScene({ interaction, mouse }) {
  return (
    <Canvas
      frameloop={useContext(NavCtx).paused ? "never" : "always"}
      dpr={[1, 2]}
      gl={{ alpha: true, antialias: true }}
      // fov 34.2 = 26°를 캔버스 높이 4/3배에 맞춘 값 (우주인 크기 유지)
      camera={{ position: [0, 1.2, 4.6], fov: 34.2 }}
    >
      <CameraRig />
      <ambientLight intensity={1.3} />
      <directionalLight position={[3, 5, 4]} intensity={2.4} color="#ffffff" />
      <directionalLight position={[-4, 2, -2]} intensity={0.8} color="#9db4ff" />
      <Suspense fallback={null}>
        <Float speed={1.6} rotationIntensity={0.15} floatIntensity={0.35} floatingRange={[0, 0.06]}>
          <AstronautModel interaction={interaction} mouse={mouse} />
        </Float>
        <ContactShadows position={[0, -0.01, 0]} opacity={0.35} scale={3} blur={2.6} far={1.2} color="#3a4fb8" />
        {/* 네트워크 요청 없는 로컬 환경광 */}
        <Environment resolution={256}>
          <Lightformer intensity={4} position={[0, 4, 3]} scale={[6, 2, 1]} />
          <Lightformer intensity={2.5} color="#bcd0ff" position={[-4, 1, 2]} scale={[2, 4, 1]} />
          <Lightformer intensity={2.5} color="#d8e2ff" position={[4, 1, 2]} scale={[2, 4, 1]} />
        </Environment>
      </Suspense>
    </Canvas>
  );
}

useGLTF.preload(MODEL_URL);

/* ------------------------------------------------------------------ */
/* 섹션 컴포넌트                                                        */
/* ------------------------------------------------------------------ */

/** 로고: 궤도 심볼(유리 질감) + 워드마크. 호버 시 궤도가 돌고 위성이 한 바퀴 */
function Logo() {
  return (
    <a href="#" aria-label="eun 홈" className="flex items-center">
      {/* 흰 배경 PNG라 multiply로 배경에 녹임 */}
      <img
        src={`${import.meta.env.BASE_URL}assets/logo-eun.png`}
        alt="eun"
        draggable={false}
        className="-ml-1 h-7 w-auto select-none mix-blend-multiply night:invert night:mix-blend-screen lg:-ml-[0.18cqw] lg:h-[1.6cqw]"
      />
    </a>
  );
}

function Header({ night, onToggleNight }) {
  const [active, setActive] = useState("Portfolio");
  return (
    <header className="relative z-20 flex items-center justify-between px-6 pt-6 lg:px-[4.8cqw] lg:pt-[1.3cqw]">
      <Logo />

      {/* 대메뉴 임시 숨김
      <nav className="hidden items-center gap-[1.2cqw] md:flex lg:absolute lg:left-[18.3cqw]">
        {NAV.map((item) => {
          const on = item === active;
          return (
            <button
              key={item}
              onClick={() => setActive(item)}
              className={`relative px-[0.9cqw] py-2 text-[14px] font-medium transition-colors lg:text-[0.8cqw] ${
                on ? "text-brand" : "text-ink hover:text-brand"
              }`}
            >
              {item}
              {on && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute inset-x-0 -bottom-[0.45cqw] h-[2px] rounded-full bg-brand"
                />
              )}
            </button>
          );
        })}
      </nav>
      */}

      <div className="flex items-center gap-2 lg:gap-[0.5cqw]">
      <a
        href={`mailto:${EMAIL}`}
        aria-label={`이메일 보내기 (${EMAIL})`}
        title={EMAIL}
        className="glass grid size-10 place-items-center rounded-full text-ink transition-transform hover:scale-105 active:scale-95 lg:size-[2.3cqw]"
      >
        <Mail className="size-[45%]" />
      </a>
      <button
        type="button"
        onClick={onToggleNight}
        aria-label={night ? "낮 테마로 전환" : "밤 테마로 전환"}
        aria-pressed={night}
        className="glass grid size-10 place-items-center rounded-full text-ink transition-transform hover:scale-105 active:scale-95 lg:size-[2.3cqw]"
      >
        {night ? <Sun className="size-[45%]" /> : <Moon className="size-[45%]" />}
      </button>
      </div>
    </header>
  );
}

// 메인 등장 연출 공통 이징/아이템
const EASE_OUT = [0.22, 1, 0.36, 1];
const RISE = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE_OUT } },
};

function Hero() {
  const loaded = useLoaded();
  return (
    <section className="relative z-10 px-6 pt-14 lg:px-[4.8cqw] lg:pt-[3.6cqw]">
      <motion.div
        initial="hidden"
        animate={loaded ? "show" : "hidden"}
        variants={{ show: { transition: { staggerChildren: 0.09, delayChildren: 0.2 } } }}
      >
        <motion.p variants={RISE} className="text-[11px] font-medium tracking-[0.32em] text-ink-soft lg:text-[0.7cqw]">
          UI / UX DESIGNER
        </motion.p>
        <motion.h1 variants={RISE} className="mt-4 font-display text-[56px] font-semibold leading-[0.98] tracking-[-0.035em] text-ink sm:text-[72px] lg:mt-[1cqw] lg:text-[4.9cqw]">
          Clarity
          <br />
          <span className="bg-gradient-to-r from-[#2f63ff] via-[#2447ff] to-[#2a2fe8] bg-clip-text night:from-[#9db4ff] night:via-[#6f8bff] night:to-[#a08cff] text-transparent">
            Over Complexity
          </span>
        </motion.h1>
        <motion.p variants={RISE} className="mt-6 text-[20px] font-medium tracking-[-0.02em] text-ink lg:mt-[1.1cqw] lg:text-[1.45cqw]">
          복잡한 기술도, 더 명확한 경험으로.
        </motion.p>
        <motion.p variants={RISE} className="mt-1 text-[14px] text-ink-soft lg:mt-[0.2cqw] lg:text-[1cqw]">
          사용자와 기술을 연결하는 디자이너
        </motion.p>

        {/* <a
          href="#projects"
          className="glass group mt-8 inline-flex items-center gap-3 rounded-full !border-[#9fb0ff]/70 px-6 py-3.5 text-[14px] font-semibold text-ink transition-all hover:-translate-y-0.5 hover:bg-white/70 hover:shadow-[0_14px_30px_-12px_rgba(36,71,255,0.45)] lg:mt-[1.6cqw] lg:gap-[1.1cqw] lg:px-[1.45cqw] lg:py-[0.85cqw] lg:text-[0.82cqw]"
        >
          Explore My Works
          <ArrowRight className="size-4 text-brand transition-transform group-hover:translate-x-1 lg:size-[1cqw]" />
        </a> */}
      </motion.div>
    </section>
  );
}

function ProjectThumb({ src, dark }) {
  return (
    <div
      className="absolute bottom-0 right-0 h-[88%] w-[46%] lg:w-[52%] overflow-hidden rounded-tl-[0.7cqw] border-l border-t border-white/80 shadow-[-10px_-6px_24px_-12px_rgba(30,50,140,0.35)] transition-transform duration-500 group-hover:scale-[1.04]"
      style={{ transformOrigin: "bottom right" }}
    >
      {src ? (
        <img src={src} alt="" className="h-full w-full object-cover object-left-top night:brightness-[0.88]" loading="lazy" />
      ) : (
        // 썸네일 placeholder
        <div className="relative h-full w-full bg-gradient-to-br from-[#eef3ff] via-[#d7e2ff] to-[#b9ccff]">
          <div className="absolute left-[10%] top-[12%] h-[8%] w-[45%] rounded bg-white/80" />
          <div className="absolute left-[10%] top-[26%] h-[5%] w-[65%] rounded bg-white/60" />
          <div className="absolute bottom-[10%] left-[10%] grid w-[80%] grid-cols-3 gap-[6%]">
            {[0, 1, 2].map((i) => (
              <div key={i} className="aspect-[4/3] rounded bg-white/70" />
            ))}
          </div>
          <span className="absolute right-[8%] top-[10%] text-[0.55cqw] font-medium text-brand/60">THUMBNAIL</span>
        </div>
      )}
      {dark && <div className="absolute inset-0 bg-black/0" />}
    </div>
  );
}

function ProjectCard({ p }) {
  const { open } = useContext(NavCtx);
  return (
    <motion.a
      href={p.slug ? `#/project/${p.slug}` : "#"}
      onClick={(e) => {
        e.preventDefault();
        if (p.slug) open(p.slug, { x: e.clientX, y: e.clientY });
      }}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="glass group relative block h-[220px] w-[320px] shrink-0 snap-start overflow-hidden rounded-[18px] lg:h-[12.5cqw] lg:w-[24cqw] lg:rounded-[1.1cqw]"
    >
      <div className="relative z-10 flex h-full w-[56%] flex-col lg:w-[50%] p-5 lg:p-[1.1cqw]">
        <p className="flex items-center gap-3 text-[11px] font-medium text-ink lg:gap-[0.9cqw] lg:text-[0.68cqw]">
          <span>{p.no}</span>
          <span className="text-ink-soft">{p.cat}</span>
        </p>
        <h3 className="mt-4 whitespace-pre-line text-[16px] font-bold leading-[1.3] tracking-[-0.03em] text-ink lg:mt-[1.05cqw] lg:text-[0.98cqw]">
          {p.title}
        </h3>
        <p className="mt-3 whitespace-pre-line text-[12px] leading-[1.4] text-ink-soft lg:mt-[0.75cqw] lg:text-[0.72cqw]">
          {p.desc}
        </p>
        <span className="mt-auto inline-flex items-center gap-1.5 text-[12px] font-semibold text-ink transition-colors group-hover:text-brand lg:text-[0.74cqw]">
          View Project
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1 lg:size-[0.85cqw]" />
        </span>
      </div>
      <ProjectThumb src={p.thumb} />
    </motion.a>
  );
}

function FeaturedProjects() {
  const scroller = useRef(null);
  const [index, setIndex] = useState(0);

  const step = () => {
    const el = scroller.current;
    const card = el?.querySelector("a");
    if (!card) return 0;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    return card.offsetWidth + gap;
  };

  const go = (dir) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: dir * step(), behavior: "smooth" });
  };

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const onScroll = () => {
      const s = step();
      if (!s) return;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
      setIndex(atEnd ? PROJECTS.length - 1 : Math.round(el.scrollLeft / s));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const pad = (n) => String(n).padStart(2, "0");

  return (
    <section id="projects" className="relative z-10 mt-10 lg:mt-[0.6cqw]">
      <div className="flex flex-wrap items-end justify-between gap-y-4 px-6 lg:px-[4.8cqw]">
        <div>
          <p className="flex items-center gap-3 text-[12px] font-medium text-ink lg:gap-[1cqw] lg:text-[0.7cqw]">
            <span className="h-px w-8 bg-ink/70 lg:w-[1.7cqw]" />
            Featured Projects
          </p>
          <h2 className="mt-2 text-[22px] font-bold leading-[1.3] tracking-[-0.03em] text-ink lg:mt-[0.4cqw] lg:text-[1.38cqw]">
            다양한 경험이 만드는 더 나은 사용자 경험
          </h2>
        </div>

        <div className="flex items-center gap-5 lg:gap-[1.6cqw]">
          <p className="font-display text-[16px] tracking-wide text-ink lg:text-[1cqw]">
            <span className="font-semibold">{pad(index + 1)}</span>
            <span className="mx-2 text-ink-soft">/</span>
            <span className="text-ink-soft">{pad(PROJECTS.length)}</span>
          </p>
          <div className="flex gap-2 lg:gap-[0.6cqw]">
            {[-1, 1].map((d) => (
              <button
                key={d}
                onClick={() => go(d)}
                aria-label={d < 0 ? "이전 프로젝트" : "다음 프로젝트"}
                className="glass grid size-11 place-items-center rounded-full text-ink transition-all hover:scale-105 hover:bg-white/80 active:scale-95 lg:size-[2.6cqw]"
              >
                {d < 0 ? (
                  <ArrowLeft className="size-5 lg:size-[1.2cqw]" />
                ) : (
                  <ArrowRight className="size-5 lg:size-[1.2cqw]" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div
        ref={scroller}
        className="no-scrollbar pointer-events-auto mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-6 px-6 pb-4 pt-2 lg:mt-[0.9cqw] lg:scroll-px-[4.8cqw] lg:gap-[1cqw] lg:px-[4.8cqw]"
      >
        {PROJECTS.map((p) => (
          <ProjectCard key={p.no} p={p} />
        ))}
        <div className="w-px shrink-0" />
      </div>
    </section>
  );
}

function Footer() {
  const [copied, setCopied] = useState(false);
  // 웹메일(네이버 등) 사용자는 mailto가 안 열리는 경우가 많아 복사 버튼 제공
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {}
  };
  return (
    <footer className="relative z-10 mt-6 flex flex-wrap items-center justify-between gap-4 px-6 pb-6 lg:mt-[1cqw] lg:flex-nowrap lg:px-[4.8cqw] lg:pb-[1.8cqw]">
      <div className="flex flex-wrap items-center gap-4 lg:gap-[1.2cqw]">
      <div className="flex items-center gap-3 text-[13px] font-medium text-ink lg:gap-[0.6cqw] lg:text-[0.76cqw]">
        <Circle className="size-4 text-brand lg:size-[0.95cqw]" strokeWidth={2} />
        Contact
        <span className="ml-3 hidden h-px w-[2.4cqw] bg-ink/20 lg:block" />
      </div>

      <div className="glass flex items-center rounded-full py-1.5 pl-5 pr-1.5 lg:py-[0.35cqw] lg:pl-[1.6cqw] lg:pr-[0.35cqw]">
        <a
          href={`mailto:${EMAIL}`}
          className="flex items-center gap-2 text-[13px] font-medium text-ink transition-colors hover:text-brand lg:gap-[0.6cqw] lg:text-[0.82cqw]"
        >
          <Mail className="size-4 text-brand lg:size-[1cqw]" />
          {EMAIL}
        </a>
        <span className="mx-3 h-4 w-px bg-ink/15 lg:mx-[1cqw] lg:h-[1cqw]" />
        <button
          type="button"
          onClick={copy}
          aria-label="이메일 주소 복사"
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-[12px] font-semibold text-ink transition-colors hover:bg-white/40 lg:gap-[0.4cqw] lg:px-[0.9cqw] lg:py-[0.55cqw] lg:text-[0.72cqw]"
        >
          {copied ? <Check className="size-3.5 text-brand lg:size-[0.85cqw]" /> : <Copy className="size-3.5 lg:size-[0.85cqw]" />}
          <span aria-live="polite">{copied ? "복사됨" : "복사"}</span>
        </button>
      </div>
      </div>

      <p className="text-[12px] text-ink-soft lg:text-[0.68cqw]">© 2026 EUNJI NAM. All Rights Reserved.</p>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/* 메인 장면 레이어 (배경 이미지 + 3D 우주인 + 유리 아이콘)              */
/* ------------------------------------------------------------------ */

/**
 * 배경 이미지(16:9)를 object-fit: cover 처럼 화면에 깔고,
 * 우주인/아이콘은 같은 좌표계(%)로 배치해 어떤 화면 비율에서도 받침대 위에 정확히 놓이게 함.
 */
/** 화면 전체 마우스 위치를 -1~1 범위의 부드러운(spring) 값으로 제공 */
function useMouse() {
  const reduce = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 60, damping: 18, mass: 0.6 });
  const y = useSpring(rawY, { stiffness: 60, damping: 18, mass: 0.6 });
  const px = useMotionValue(-9999); // 커서 실제 픽셀 위치 (조명용)
  const py = useMotionValue(-9999);

  useEffect(() => {
    const onMove = (e) => {
      px.set(e.clientX);
      py.set(e.clientY);
      if (reduce) return;
      rawX.set((e.clientX / window.innerWidth) * 2 - 1);
      rawY.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    const onLeave = () => {
      rawX.set(0);
      rawY.set(0);
    };
    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [reduce, rawX, rawY, px, py]);

  return { x, y, px, py };
}

function Stage({ mouse, night }) {
  const interaction = useRef({ hover: false, spinT: -1 });
  const [hover, setHover] = useState(false);
  const reduce = useReducedMotion();
  const loaded = useLoaded();

  // 레이어별 깊이: 배경은 반대로 조금, 앞쪽일수록 많이 움직임
  const bgX = useTransform(mouse.x, (v) => v * -22);
  const bgY = useTransform(mouse.y, (v) => v * -14);
  const sceneRotY = useTransform(mouse.x, (v) => v * 2.5);
  const sceneRotX = useTransform(mouse.y, (v) => v * -2);
  const astroX = useTransform(mouse.x, (v) => v * 10);
  const astroY = useTransform(mouse.y, (v) => v * 6);

  // 커서를 따라다니는 빛
  const glow = useMotionTemplate`radial-gradient(520px circle at ${mouse.px}px ${mouse.py}px, rgba(255,255,255,0.42), rgba(170,195,255,0.16) 40%, transparent 70%)`;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 [container-type:size]"
        style={{
          width: "max(100%, calc(100cqh * 16 / 9))",
          height: "max(100%, calc(100cqw * 9 / 16))",
          rotateX: sceneRotX,
          rotateY: sceneRotY,
          transformPerspective: 1800,
        }}
      >
        {/* 배경: 살짝 확대해 두고 마우스 반대 방향으로 이동 (가장자리 노출 방지) */}
        {/* 등장: 로더와 같은 색에서 살짝 줌아웃하며 드러남. 모바일은 이미지 대신 그라데이션(Home 배경) */}
        <motion.div
          className="absolute inset-0 hidden md:block"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={loaded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.08 }}
          transition={{ duration: 1.4, ease: EASE_OUT }}
        >
          <motion.img
            src={`${import.meta.env.BASE_URL}assets/bg.png`}
            alt=""
            loading="lazy"
            className="absolute inset-0 h-full w-full scale-[1.06] object-cover"
            style={{ x: bgX, y: bgY }}
          />
          {/* 밤 배경: 위에 겹쳐 크로스페이드 */}
          <motion.img
            src={`${import.meta.env.BASE_URL}assets/bg-night.png`}
            alt=""
            loading="lazy"
            // 밤 이미지는 더 가로로 길어서(1.95:1) 받침대가 오른쪽에 그려짐 → 크롭 위치로 낮 배경에 맞춤
            className="absolute inset-0 h-full w-full scale-[1.06] object-cover object-[70.4%_50%]"
            style={{ x: bgX, y: bgY }}
            initial={false}
            animate={{ opacity: night ? 1 : 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
        </motion.div>

        {/* 3D 유리 버블 */}
        <div className="absolute inset-0 hidden md:block">
          <BubbleScene />
        </div>

        {/* 3D 우주인: 받침대 상판(약 x 71%, y 42%) 위에 앉도록 배치. 클릭하면 회전 점프 */}
        <motion.div
          className="pointer-events-auto absolute left-[71.1%] top-[6.7%] hidden h-[40%] w-[23%] -translate-x-1/2 cursor-pointer md:block"
          style={{ x: astroX, y: astroY }}
          onPointerEnter={() => {
            interaction.current.hover = true;
            setHover(true);
          }}
          onPointerLeave={() => {
            interaction.current.hover = false;
            setHover(false);
          }}
          onClick={() => {
            if (interaction.current.spinT < 0) interaction.current.spinT = 0;
          }}
        >
          {/* 등장: 아래에서 통통 튀어 올라 받침대에 안착. scale 금지: 3D 캔버스가 축소된 크기로 측정됨 */}
          <motion.div
            className="h-full w-full"
            initial={{ opacity: 0, y: 80 }}
            animate={loaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
            transition={{ type: "spring", stiffness: 140, damping: 14, delay: 0.35 }}
          >
            <AstronautScene interaction={interaction} mouse={mouse} />
          </motion.div>
          <motion.span
            initial={false}
            animate={{ opacity: hover ? 1 : 0, y: hover ? 0 : 6 }}
            className="glass pointer-events-none absolute left-[74%] top-[47.5%] whitespace-nowrap rounded-full px-[0.7cqw] py-[0.3cqw] text-[0.7cqw] font-medium text-ink"
          >
            Click me!
          </motion.span>
        </motion.div>


        {/* 유리 아이콘 타일 (depth가 클수록 앞쪽 = 많이 움직임) */}
        <div className="hidden md:block">
          <GlassTile mouse={mouse} k="ps" className="left-[55.4%] top-[14.7%] w-[6.5%]" rotate={-10} delay={0.1} depth={1.2} />
          <GlassTile mouse={mouse} k="figma" className="left-[64.6%] top-[4%] w-[7.3%]" rotate={-4} delay={0.25} depth={0.7} />
          <GlassTile mouse={mouse} k="ai" className="left-[77.3%] top-[10.7%] w-[5.8%]" rotate={10} delay={0.4} depth={0.9} />
          <GlassTile mouse={mouse} k="gpt" className="left-[57.6%] top-[32.7%] w-[6.2%]" rotate={-8} delay={0.55} depth={1.6} />
          <GlassTile mouse={mouse} k="claude" className="left-[78%] top-[33.7%] w-[6.3%]" rotate={8} delay={0.7} depth={1.4} />
        </div>
      </motion.div>

      {/* 모바일: 3D 대신 가벼운 정적 우주인 이미지 */}
      <motion.img
        src={`${import.meta.env.BASE_URL}assets/loader-astronaut.png`}
        alt=""
        draggable={false}
        className="absolute right-6 top-20 w-[88px] select-none drop-shadow-[0_14px_18px_rgba(36,71,255,0.22)] md:hidden"
        animate={reduce ? undefined : { y: [0, -8, 0], rotate: [-3, 3, -3] }}
        transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
      />

      {/* 커서 조명 */}
      <motion.div className="absolute inset-0 mix-blend-soft-light" style={{ background: glow }} />
      <motion.div className="absolute inset-0 opacity-60 mix-blend-screen" style={{ background: glow }} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* App                                                                 */
/* ------------------------------------------------------------------ */

/** 상세 페이지 열기/닫기 + 3D 일시정지 상태 공유 */
const NavCtx = createContext({ open: () => {}, paused: false });

/** 해시 기반 라우팅: #/project/portal */
function useHashRoute() {
  const read = () => window.location.hash.match(/^#\/project\/([\w-]+)/)?.[1] ?? null;
  const [slug, setSlug] = useState(read);
  useEffect(() => {
    const onHash = () => setSlug(read());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return [slug, setSlug];
}

export default function App() {
  const mouse = useMouse();
  const [slug, setSlug] = useHashRoute();
  const [origin, setOrigin] = useState(null);
  const fromHome = useRef(false);
  const [settled, setSettled] = useState(!slug); // 전환이 끝나 홈이 완전히 가려졌는지

  const open = useCallback((s, pt) => {
    setOrigin(pt);
    fromHome.current = true;
    window.location.hash = `/project/${s}`;
  }, []);

  // 상세 페이지 간 이동(다음 프로젝트): 히스토리를 쌓지 않고 교체 → Portfolio 버튼은 항상 홈으로
  const navigate = useCallback((s, pt) => {
    setOrigin(pt);
    window.location.replace(`#/project/${s}`);
  }, []);

  const back = useCallback(() => {
    if (fromHome.current) {
      fromHome.current = false;
      window.history.back(); // 브라우저 뒤로가기와 동일하게
    } else {
      window.history.replaceState(null, "", window.location.pathname);
      setSlug(null);
    }
  }, [setSlug]);

  // 상세 페이지가 열려 있으면 홈 스크롤 잠금
  useEffect(() => {
    document.body.style.overflow = slug ? "hidden" : "";
    if (!slug) setSettled(false);
  }, [slug]);

  const hasDetail = !!(slug && PROJECT_DETAILS[slug]);

  return (
    <MotionConfig reducedMotion="user">
    <NavCtx.Provider value={{ open, paused: hasDetail && settled }}>
      <div inert={hasDetail ? true : undefined}>
        <Home mouse={mouse} />
      </div>
      <AnimatePresence>
        {hasDetail && (
          <ProjectDetail
            key={slug}
            slug={slug}
            origin={origin}
            onBack={back}
            onNavigate={navigate}
            onSettled={() => setSettled(true)}
          />
        )}
      </AnimatePresence>
    </NavCtx.Provider>
    </MotionConfig>
  );
}

// 저장된 선택 > 시스템 설정 순. 저장소가 막혀 있어도 동작
function initialNight() {
  try {
    const v = localStorage.getItem("theme");
    if (v) return v === "night";
  } catch {}
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
}

function Home({ mouse }) {
  const loaded = useLoaded();
  const [night, setNight] = useState(initialNight);
  const toggleNight = () =>
    setNight((n) => {
      try { localStorage.setItem("theme", n ? "day" : "night"); } catch {}
      return !n;
    });
  return (
    <div
      data-theme={night ? "night" : undefined}
      className="relative min-h-screen overflow-hidden bg-[#dfe6fb] transition-colors duration-700 night:bg-[#030a26] max-md:bg-[radial-gradient(120%_55%_at_90%_8%,#ffffff_0%,transparent_60%),radial-gradient(90%_50%_at_0%_100%,#c7d3ff_0%,transparent_70%),linear-gradient(180deg,#eaf0ff_0%,#dbe4fd_50%,#c9d5fb_100%)] night:max-md:bg-[radial-gradient(120%_55%_at_90%_8%,rgba(90,120,255,0.38)_0%,transparent_60%),radial-gradient(90%_50%_at_0%_100%,rgba(70,60,200,0.28)_0%,transparent_70%),linear-gradient(180deg,#0b1546_0%,#060d33_50%,#020617_100%)] [container-type:inline-size] lg:h-screen lg:min-h-[820px] lg:[container-type:size]">
      {/* 배경 + 중앙 3D 장면 */}
      <Stage mouse={mouse} night={night} />

      {/* 가독성을 위한 좌측 은은한 화이트 그라데이션 */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/45 via-white/10 to-transparent night:from-[#030a26]/70 night:via-[#030a26]/20" />

      {/* UI 레이어: 빈 영역은 클릭이 뒤쪽 3D 장면(우주인)으로 통과하도록 */}
      <div className="pointer-events-none relative z-10 [&_a]:pointer-events-auto [&_button]:pointer-events-auto flex min-h-screen flex-col lg:h-full lg:min-h-0">
        <Header night={night} onToggleNight={toggleNight} />
        <Hero />
        <motion.div
          className="lg:mt-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={loaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 1, ease: EASE_OUT, delay: 0.7 }}
        >
          <FeaturedProjects />
          <Footer />
        </motion.div>
      </div>

    </div>
  );
}
