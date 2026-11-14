/**
 * 프로젝트 상세 페이지 데이터
 * - 서브페이지는 ProjectDetail.jsx 하나의 템플릿을 공유하고, 내용/컬러는 여기서만 수정하면 됩니다.
 * - 설명 문구는 시안을 바탕으로 작성한 초안입니다. 실제 프로젝트 내용으로 바꿔 주세요.
 * - theme: 페이지 전체 포인트 컬러 (p: 메인, deep: 진한 톤, bright: 밝은 톤, tint: 연한 배경)
 */

import {
  BellRing,
  CalendarDays,
  Clock,
  CloudSun,
  Download,
  FileCheck2,
  FileText,
  Gauge,
  LayoutGrid,
  LineChart,
  LogOut,
  Map,
  MapPin,
  MonitorPlay,
  PieChart,
  Plus,
  ShieldCheck,
  Sparkles,
  ChevronRight,
  ChevronDown,
  Zap,
} from "lucide-react";

export const PROJECT_DETAILS = {
  /* ---------------------------------------------------------------- */
  portal: {
    no: "01",
    total: "05",
    category: "Public Service · Groupware Dashboard",
    title: ["차세대", "통합포털시스템"],
    lead:
      "더 스마트한 업무 환경을 위한 통합 포털 서비스. 근태·일정·결재·공지와 AI 요약을 하나의 대시보드로 통합해, 임직원의 하루를 한 화면에서 시작하도록 설계했습니다.",
    image: "/assets/project-portal.jpg",
    theme: { p: "#20898F", deep: "#17707A", bright: "#25989F", tint: "#E3F3F2" },
    heroGradient: "linear-gradient(135deg,#17707A,#25989F 55%,#6CC0C3)",
    heroCopy: { label: "MAIN DASHBOARD", text: ["하루를 여는", "하나의 화면"] },
    meta: [
      { label: "Client", value: "대구기계부품연구원" },
      { label: "Role", value: "UI/UX Design · 기획" },
      { label: "Scope", value: "Web Dashboard · Design System" },
      { label: "Tools", value: "Figma · ChatGPT" },
    ],
    mockup: { title: "메인 대시보드 시안", desc: "출근부터 퇴근까지 필요한 업무 정보를 카드형 모듈로 구성했습니다." },
    hotspots: [
      { x: 13.5, y: 22, title: "근무 현황", desc: "출근 시각·잔여 근무시간·연차를 한 카드에서 확인하고 바로 퇴근/외출 처리." },
      { x: 44, y: 40, title: "일정관리", desc: "월간·주간·목록 보기 전환과 일정 유형별 컬러 태그로 한눈에 파악." },
      { x: 70, y: 30, title: "오늘의 일정", desc: "오늘 일정만 시간순 카드로 분리해 회의실·시간 정보를 빠르게 확인." },
      { x: 89, y: 20, title: "AI 오늘 요약", desc: "중요 업무와 마감 임박 항목을 AI가 정리해 우선순위를 제안." },
      { x: 65, y: 88, title: "자주 쓰는 메뉴", desc: "깊은 메뉴 구조 대신 자주 쓰는 기능을 아이콘으로 바로 실행." },
    ],
    colors: {
      primary: [
        { name: "Primary Teal", hex: "#20898F", usage: "주요 버튼 · 활성 탭 · 포인트", text: "#fff" },
        { name: "Deep Teal", hex: "#17707A", usage: "AI 카드 · 호버 · 강조 배경", text: "#fff" },
        { name: "Bright Teal", hex: "#25989F", usage: "오늘 날짜 · 진행 바", text: "#fff" },
        { name: "Mint Tint", hex: "#E3F3F2", usage: "배지 · 선택 영역 배경", text: "#17707A" },
      ],
      neutral: [
        { name: "Ink", hex: "#1F2937", usage: "제목 · 본문", text: "#fff" },
        { name: "Slate", hex: "#6B7280", usage: "보조 텍스트", text: "#fff" },
        { name: "Line", hex: "#E5E7EB", usage: "구분선 · 테두리" },
        { name: "Surface", hex: "#F3F5F8", usage: "페이지 배경" },
      ],
      semantic: [
        { name: "Success", hex: "#20898F", tint: "#E3F3F2", label: "정상" },
        { name: "Warning", hex: "#E08A1E", tint: "#FCF0E0", label: "주의" },
        { name: "Danger", hex: "#E5484D", tint: "#FDE8EA", label: "긴급" },
        { name: "Info", hex: "#2F6FDE", tint: "#E5EEFD", label: "토요일 · 링크" },
        { name: "AI", hex: "#7C5CFF", tint: "#EFEAFF", label: "AI 기능" },
      ],
      scaleName: "Teal Scale",
      scale: ["#E8F5F5", "#CDEBEB", "#9DD6D7", "#6CC0C3", "#3FA9AE", "#20898F", "#1B767C", "#17626A", "#134E55", "#0E3A40"],
    },
    type: [
      { name: "Display", spec: "Pretendard Bold · 32 / 40", cls: "text-[32px] font-bold leading-[1.25]", sample: "09:24:18" },
      { name: "Title", spec: "Pretendard SemiBold · 20 / 28", cls: "text-[20px] font-semibold", sample: "일정관리 2026.05" },
      { name: "Body", spec: "Pretendard Regular · 15 / 24", cls: "text-[15px]", sample: "오늘도 좋은 하루 보내세요!" },
      { name: "Caption", spec: "Pretendard Medium · 12 / 16", cls: "text-[12px] font-medium text-[#6B7280]", sample: "05.13 (수) 08:30 기준" },
    ],
    components: {
      radius: "rounded-lg",
      primary: { label: "퇴근하기", icon: LogOut },
      outline: { label: "외출/자리비움", icon: Clock },
      live: "근무 중",
      badges: [
        { label: "정상", color: "#17707A", tint: "#E3F3F2" },
        { label: "주의", color: "#E08A1E", tint: "#FCF0E0" },
        { label: "긴급", color: "#E5484D", tint: "#FDE8EA" },
        { label: "D-day", color: "#E5484D", tint: "#FDE8EA" },
      ],
      tabs: ["월간", "주간", "목록"],
      bars: [
        { label: "Axiom Portal 고도화", value: 85, state: 0 },
        { label: "차량운행일지", value: 62, state: 0 },
        { label: "전자연구노트 작성", value: 40, state: 1 },
      ],
    },
    overview: {
      cards: [
        { tag: "Background", title: "흩어진 업무, 반복되는 확인", body: "근태·일정·결재·공지가 각기 다른 메뉴에 흩어져 있어, 임직원은 매일 같은 정보를 확인하기 위해 여러 화면을 오가야 했습니다." },
        { tag: "Problem", title: "정보의 우선순위가 없다", body: "모든 정보가 같은 무게로 나열되어 오늘 꼭 처리해야 할 일이 묻히고, 깊은 메뉴 구조 탓에 핵심 기능까지 클릭 수가 많았습니다." },
        { tag: "Solution", title: "하루를 여는 하나의 대시보드", body: "카드형 모듈로 업무를 한 화면에 모으고, AI 요약이 오늘의 우선순위를 먼저 보여주도록 정보 구조를 다시 설계했습니다." },
      ],
      point: {
        title: ["매일 쓰는 화면이기에,", "가장 빠르게 읽히도록."],
        body: "신뢰감을 주는 Teal을 메인 컬러로, 상태 정보에는 명확한 시맨틱 컬러를 적용했습니다. 높은 정보 밀도 속에서도 카드 간 여백과 타이포 위계로 시선이 자연스럽게 흐르도록 설계했습니다.",
      },
      features: [
        { icon: Clock, title: "원클릭 근태", desc: "출퇴근·외출·자리비움을 대시보드 첫 화면에서 바로 처리합니다." },
        { icon: CalendarDays, title: "통합 일정", desc: "개인·부서·회의실 일정을 하나의 캘린더로 합치고 유형별로 색을 구분했습니다." },
        { icon: FileCheck2, title: "전자결재 현황", desc: "결재할 문서·진행·임시저장·반려를 숫자로 요약해 놓치는 문서가 없도록." },
        { icon: Sparkles, title: "AI 업무 요약", desc: "오늘의 중요 업무와 마감을 AI가 정리하고, 자연어로 질문할 수 있습니다." },
        { icon: LayoutGrid, title: "자주 쓰는 메뉴", desc: "사용자가 직접 편집하는 퀵 메뉴로 깊은 메뉴 탐색을 줄였습니다." },
      ],
    },
    next: "lmo",
  },

  /* ---------------------------------------------------------------- */
  lmo: {
    no: "02",
    total: "05",
    category: "Government · Public Information Portal",
    title: ["LMO", "정보시스템"],
    lead:
      "안전한 바이오, 더 나은 미래를 위한 LMO 통합 플랫폼. 신고·점검·교육 등 흩어진 LMO 안전관리 서비스를 하나의 포털로 모아, 연구자와 기관 담당자가 필요한 정보에 빠르게 닿도록 설계했습니다.",
    image: "/assets/project-lmo.jpg",
    theme: { p: "#1658CF", deep: "#0F3E9C", bright: "#3268E4", tint: "#E9EFFB" },
    heroGradient: "linear-gradient(135deg,#0F3E9C,#1658CF 50%,#7FA5EE)",
    heroCopy: { label: "MAIN PAGE", text: ["안전한 연구를", "위한 첫 화면"] },
    meta: [
      { label: "Client", value: "국가연구안전관리본부" },
      { label: "Role", value: "UI/UX Design · 기획" },
      { label: "Scope", value: "Public Portal · Main Page" },
      { label: "Tools", value: "Figma · ChatGPT" },
    ],
    mockup: { title: "메인 페이지 시안", desc: "3D 키비주얼로 신뢰감을 주고, 공지·서비스·일정을 카드형으로 정리했습니다." },
    hotspots: [
      { x: 17, y: 21, title: "키비주얼 메시지", desc: "DNA·실험 기구 3D 그래픽과 함께 '안전한 연구의 시작'이라는 핵심 메시지를 전달." },
      { x: 12, y: 36, title: "공지사항", desc: "중요·공지·사업 배지 컬러로 공지의 성격을 먼저 읽히게 구분." },
      { x: 45, y: 40, title: "배너 슬라이드", desc: "자동 롤링 배너에 페이지 번호와 일시정지 버튼을 제공해 접근성 확보." },
      { x: 72, y: 36, title: "주요 서비스", desc: "LMO 신고·점검·교육 등 6개 핵심 시스템을 아이콘 그리드로 바로 연결." },
      { x: 11, y: 60, title: "오늘의 일정", desc: "날짜 카드와 시간순 일정으로 오늘의 회의·점검을 한눈에." },
      { x: 13, y: 78, title: "자주 찾는 서비스", desc: "법령자료·민원안내 등 자주 찾는 메뉴를 한 줄 바로가기로 배치." },
    ],
    colors: {
      primary: [
        { name: "Primary Blue", hex: "#1658CF", usage: "타이틀 포인트 · 활성 메뉴 · 링크", text: "#fff" },
        { name: "Deep Blue", hex: "#0F3E9C", usage: "배너 배경 · 강조 영역", text: "#fff" },
        { name: "Bright Blue", hex: "#3268E4", usage: "배지 · 버튼 호버 · 아이콘", text: "#fff" },
        { name: "Sky Tint", hex: "#E9EFFB", usage: "페이지 배경 · 카드 하이라이트", text: "#0F3E9C" },
      ],
      neutral: [
        { name: "Navy", hex: "#21355B", usage: "푸터 · 제목", text: "#fff" },
        { name: "Slate", hex: "#6B7280", usage: "보조 텍스트 · 날짜", text: "#fff" },
        { name: "Line", hex: "#E3E8F2", usage: "구분선 · 카드 테두리" },
        { name: "Surface", hex: "#F5F7FD", usage: "카드 배경" },
      ],
      semantic: [
        { name: "Important", hex: "#E0784F", tint: "#FBE9E1", label: "중요 공지" },
        { name: "Notice", hex: "#3268E4", tint: "#E6EEFE", label: "일반 공지" },
        { name: "Business", hex: "#2E9E6A", tint: "#E3F4EA", label: "사업 공고" },
        { name: "Safety", hex: "#1658CF", tint: "#E9EFFB", label: "안전 인증 · 서비스" },
      ],
      scaleName: "Blue Scale",
      scale: ["#EEF3FD", "#D5E2FA", "#ABC5F5", "#7FA5EE", "#4F81E3", "#1658CF", "#1249B0", "#0F3B8F", "#0C2E6F", "#08204F"],
    },
    type: [
      { name: "Display", spec: "Pretendard Bold · 48 / 60", cls: "text-[40px] font-bold leading-[1.2] tracking-[-0.03em]", sample: "안전한 연구의 시작" },
      { name: "Title", spec: "Pretendard Bold · 28 / 36", cls: "text-[24px] font-bold", sample: "찾아가는 LMO 안전관리 컨설팅" },
      { name: "Body", spec: "Pretendard Regular · 16 / 26", cls: "text-[16px]", sample: "산업과 연구의 지속 가능한 성장을 지원합니다." },
      { name: "Caption", spec: "Pretendard Regular · 13 / 18", cls: "text-[13px] text-[#6B7280]", sample: "2026.12.31 (목)" },
    ],
    components: {
      radius: "rounded-full",
      primary: { label: "신청하기", icon: ChevronRight, iconRight: true },
      outline: { label: "더보기", icon: Plus, iconRight: true },
      live: "접수 중",
      badges: [
        { label: "중요", color: "#E0784F", tint: "#FBE9E1" },
        { label: "공지", color: "#3268E4", tint: "#E6EEFE" },
        { label: "사업", color: "#2E9E6A", tint: "#E3F4EA" },
        { label: "2026", color: "#fff", tint: "#3268E4" },
      ],
      tabs: ["LMO 소개", "LMO 신고", "LMO 점검"],
      bars: [
        { label: "안전교육 이수율", value: 92, state: 0 },
        { label: "연구시설 점검 완료", value: 76, state: 0 },
        { label: "변경신고 처리", value: 48, state: 1 },
      ],
      stateLabels: ["양호", "진행"],
    },
    overview: {
      cards: [
        { tag: "Background", title: "흩어진 안전관리 서비스", body: "LMO 신고·점검·교육 시스템이 각각 따로 운영되어, 사용자는 목적에 맞는 시스템을 찾는 것부터 어려움을 겪었습니다." },
        { tag: "Problem", title: "딱딱하고 어려운 공공 정보", body: "법령·고시 중심의 정보 구조와 텍스트 위주 화면 탓에, 처음 방문한 연구자에게 진입 장벽이 높았습니다." },
        { tag: "Solution", title: "신뢰감 있는 하나의 관문", body: "주요 서비스를 메인에서 바로 연결하고, 3D 키비주얼과 카드형 레이아웃으로 친근하면서도 신뢰감 있는 첫인상을 만들었습니다." },
      ],
      point: {
        title: ["공공 서비스도,", "더 쉽고 친근하게."],
        body: "공공기관의 신뢰를 상징하는 Blue를 메인으로, 공지 유형은 배지 컬러로 구분했습니다. 투명한 유리 질감의 3D 그래픽으로 바이오·연구의 이미지를 직관적으로 표현했습니다.",
      },
      features: [
        { icon: ShieldCheck, title: "주요 서비스 바로가기", desc: "LMO 신고·연구시설 정보포털·점검 시스템 등 6개 시스템을 메인에서 바로 연결합니다." },
        { icon: BellRing, title: "유형별 공지 배지", desc: "중요·공지·사업 배지 컬러로 공지의 성격과 우선순위를 먼저 인지하도록." },
        { icon: MonitorPlay, title: "접근성 있는 배너", desc: "롤링 배너에 현재 위치와 이전/다음·일시정지 컨트롤을 제공했습니다." },
        { icon: CalendarDays, title: "오늘의 일정", desc: "날짜 카드와 시간순 리스트로 안전관리 일정을 빠르게 확인합니다." },
        { icon: LayoutGrid, title: "자주 찾는 서비스", desc: "법령자료실·민원안내·자료실 등을 한 줄 퀵 메뉴로 정리했습니다." },
      ],
    },
    next: "carbon",
  },

  /* ---------------------------------------------------------------- */
  carbon: {
    no: "03",
    total: "05",
    category: "Energy Platform · Carbon Management",
    title: ["탄소관리 · 거래", "플랫폼"],
    lead:
      "지속 가능한 탄소중립을 위한 통합 관리 시스템. 에너지 소비·공급, 온실가스 배출량, 발전량 데이터를 하나의 대시보드에서 실시간으로 확인하고 관리하도록 설계했습니다.",
    image: "/assets/project-carbon.png",
    theme: { p: "#00589D", deep: "#003F73", bright: "#24AAB9", tint: "#E6F5F7" },
    heroGradient: "linear-gradient(135deg,#003F73,#00589D 45%,#24AAB9)",
    heroCopy: { label: "ENERGY DASHBOARD", text: ["숫자로 읽는", "탄소중립"] },
    meta: [
      { label: "Client", value: "에너지 관리 기업 (B2B)" },
      { label: "Role", value: "UI/UX Design · Data Viz" },
      { label: "Scope", value: "Web Dashboard · Chart System" },
      { label: "Tools", value: "Figma" },
    ],
    mockup: { title: "에너지 대시보드 시안", desc: "복잡한 에너지·배출량 데이터를 차트와 KPI 카드로 구조화했습니다." },
    hotspots: [
      { x: 12, y: 28, title: "에너지 소비 도넛 차트", desc: "일반부하·유연부하 비중을 도넛 차트로, 총량은 중앙에 크게 표시." },
      { x: 36, y: 22, title: "KPI 하이라이트", desc: "다크 바 위 민트 숫자로 총 소비·공급 전력을 가장 먼저 읽히게." },
      { x: 25, y: 57, title: "Scope별 배출량", desc: "Scope 1·2·3 비중을 막대와 퍼센트 라벨로 비교하고 수치를 카드로 분리." },
      { x: 76, y: 52, title: "배출량 추이", desc: "월별 누적 막대 차트로 Scope1·2의 변화를 한눈에 비교." },
      { x: 14, y: 80, title: "발전량 툴팁", desc: "시간대별 발전량 그래프에 호버 툴팁으로 정확한 값을 확인." },
      { x: 86, y: 9, title: "실시간 환경 정보", desc: "기준 시각과 기온·습도를 상단에 고정해 데이터의 맥락을 제공." },
    ],
    colors: {
      primary: [
        { name: "Ocean Blue", hex: "#00589D", usage: "Scope1 · 메인 데이터 · 강조 수치", text: "#fff" },
        { name: "Carbon Teal", hex: "#24AAB9", usage: "Scope2 · 보조 데이터 · 차트", text: "#fff" },
        { name: "Fresh Mint", hex: "#49CAC4", usage: "KPI 숫자 · 재생에너지", text: "#fff" },
        { name: "Aqua Tint", hex: "#E6F5F7", usage: "강조 박스 · 선택 영역 배경", text: "#00589D" },
      ],
      neutral: [
        { name: "Charcoal", hex: "#363C51", usage: "KPI 바 · 수치 카드 배경", text: "#fff" },
        { name: "Slate", hex: "#6B7280", usage: "축 라벨 · 보조 텍스트", text: "#fff" },
        { name: "Line", hex: "#DDE2E8", usage: "그리드 · 테두리" },
        { name: "Surface", hex: "#EFF2F4", usage: "페이지 배경" },
      ],
      semantic: [
        { name: "Scope 1", hex: "#00589D", tint: "#E1ECF6", label: "직접 배출" },
        { name: "Scope 2", hex: "#24AAB9", tint: "#E2F5F7", label: "간접 배출" },
        { name: "Scope 3", hex: "#5FE3C0", tint: "#E3FAF3", label: "기타 간접 배출" },
        { name: "Decrease", hex: "#2F6FDE", tint: "#E5EEFD", label: "전일 대비 감소" },
        { name: "Alert", hex: "#E3778A", tint: "#FCEAED", label: "알림 · 경고" },
      ],
      scaleName: "Ocean Scale",
      scale: ["#E6F0F7", "#C2D9EC", "#8DB8DA", "#5594C4", "#2774AF", "#00589D", "#004C88", "#003F73", "#00325C", "#002544"],
    },
    type: [
      { name: "Display", spec: "Pretendard Bold · 32 / 40", cls: "text-[32px] font-bold leading-[1.25] text-[#0B6599]", sample: "858.85 tCO₂eq" },
      { name: "Title", spec: "Pretendard SemiBold · 20 / 28", cls: "text-[20px] font-semibold", sample: "온실가스 배출량 추이" },
      { name: "Body", spec: "Pretendard Regular · 15 / 24", cls: "text-[15px]", sample: "금일 전력 소비량 350 kWh" },
      { name: "Caption", spec: "Pretendard Regular · 12 / 16", cls: "text-[12px] text-[#6B7280]", sample: "2024.09.30 12:00 기준" },
    ],
    components: {
      radius: "rounded-md",
      primary: { label: "보고서 다운로드", icon: Download },
      outline: { label: "KEPCO", icon: Zap },
      live: "실시간",
      badges: [
        { label: "Scope1", color: "#00589D", tint: "#E1ECF6" },
        { label: "Scope2", color: "#24AAB9", tint: "#E2F5F7" },
        { label: "전일대비 -4% ↓", color: "#2F6FDE", tint: "#E5EEFD" },
        { label: "알림 4", color: "#E3778A", tint: "#FCEAED" },
      ],
      tabs: ["일", "월", "년"],
      bars: [
        { label: "Scope2 (간접)", value: 97, state: 0 },
        { label: "재생에너지 비중", value: 30, state: 0 },
        { label: "Scope1 (직접)", value: 3, state: 1 },
      ],
      stateLabels: ["정상", "감축"],
    },
    overview: {
      cards: [
        { tag: "Background", title: "탄소중립, 데이터부터", body: "탄소 배출 관리가 기업의 필수 과제가 되었지만, 에너지·배출량 데이터는 엑셀과 여러 시스템에 흩어져 있었습니다." },
        { tag: "Problem", title: "숫자는 많은데 읽히지 않는다", body: "단위와 기준이 다른 수치가 나열되어 현재 상태가 좋은지 나쁜지, 어디부터 줄여야 하는지 판단하기 어려웠습니다." },
        { tag: "Solution", title: "읽히는 데이터 시각화", body: "KPI는 가장 크게, 비중은 도넛·막대로, 추이는 월별 차트로 정보 유형마다 알맞은 시각화 방식을 정의했습니다." },
      ],
      point: {
        title: ["복잡한 데이터를,", "판단할 수 있는 정보로."],
        body: "신뢰감 있는 Ocean Blue와 친환경을 상징하는 Teal·Mint를 데이터 컬러로 체계화했습니다. 다크 KPI 바와 밝은 차트 카드의 대비로 핵심 수치가 먼저 읽히도록 설계했습니다.",
      },
      features: [
        { icon: PieChart, title: "에너지 소비·공급 현황", desc: "도넛 차트와 KPI 바로 소비·공급 전력과 구성 비율을 동시에 보여줍니다." },
        { icon: Gauge, title: "Scope별 배출량", desc: "Scope 1·2·3 배출량을 비율 막대와 수치 카드로 비교합니다." },
        { icon: LineChart, title: "배출량 추이 분석", desc: "월별 누적 막대 차트로 배출량 변화와 감축 효과를 확인합니다." },
        { icon: Zap, title: "발전량 모니터링", desc: "일·월 발전량 그래프와 발전시간·전일 비교 수치를 함께 제공합니다." },
        { icon: FileText, title: "보고서 · 거래", desc: "장외거래·외부사업·보고서 메뉴로 관리 데이터를 업무로 연결합니다." },
      ],
    },
    next: "solar",
  },

  /* ---------------------------------------------------------------- */
  solar: {
    no: "04",
    total: "05",
    category: "Smart City · Solar Monitoring",
    title: ["제주 태양광 통합", "모니터링 플랫폼"],
    lead:
      "지속 가능한 에너지를 위한 스마트 모니터링. 제주 전역의 태양광 설비 상태와 발전량, 시장·기상 정보를 지도 기반 대시보드에서 실시간으로 확인하도록 설계했습니다.",
    image: "/assets/project-solar.png",
    theme: { p: "#11908E", deep: "#16333C", bright: "#2FD6BC", tint: "#E3F7F4" },
    heroGradient: "linear-gradient(135deg,#0E2229,#16333C 50%,#11908E)",
    heroCopy: { label: "MONITORING DASHBOARD", text: ["제주의 햇빛을", "한눈에"] },
    meta: [
      { label: "Client", value: "제주 태양광 발전 사업" },
      { label: "Role", value: "UI/UX Design · Data Viz" },
      { label: "Scope", value: "Monitoring Dashboard · Map UI" },
      { label: "Tools", value: "Figma" },
    ],
    mockup: { title: "통합 모니터링 시안", desc: "다크 헤더의 KPI와 지도 기반 설비 현황으로 관제 화면의 몰입감을 높였습니다." },
    hotspots: [
      { x: 18, y: 14, title: "총 발전설비용량", desc: "옐로-민트 그라데이션의 대형 숫자로 플랫폼의 핵심 지표를 가장 먼저." },
      { x: 64, y: 12, title: "발전량 차트", desc: "금일·전일, 금월·금년·누적 발전량을 미니 막대 차트로 비교." },
      { x: 42, y: 36, title: "제주 설비 지도", desc: "지역별 설비 수를 지도 위 마커로 표시하고 확대·축소로 탐색." },
      { x: 74, y: 32, title: "지역별 현황 카드", desc: "중단·이상·가동 상태와 발전량·예상 금액을 지역 카드로 요약." },
      { x: 50, y: 70, title: "제주 기상 정보", desc: "현재 날씨와 시간대별 예보로 발전량 변화를 예측할 수 있도록." },
      { x: 76, y: 70, title: "이벤트 정보", desc: "오류·이상·중단 이벤트를 아이콘과 시간순 테이블로 즉시 확인." },
    ],
    colors: {
      primary: [
        { name: "Night Navy", hex: "#16333C", usage: "헤더 배경 · 다크 카드", text: "#fff" },
        { name: "Signal Mint", hex: "#53FFE2", usage: "가동 상태 · 강조 수치", text: "#16333C" },
        { name: "Ocean Teal", hex: "#11908E", usage: "포인트 · 진행 바 · 링크", text: "#fff" },
        { name: "Solar Amber", hex: "#FFB027", usage: "발전량 · 태양 · 이상 상태", text: "#16333C" },
      ],
      neutral: [
        { name: "Ink", hex: "#1F2A30", usage: "제목 · 본문", text: "#fff" },
        { name: "Slate", hex: "#525F70", usage: "보조 텍스트 · 구분선(다크)", text: "#fff" },
        { name: "Map Sky", hex: "#91D1E3", usage: "지도 배경 · 바다" },
        { name: "Surface", hex: "#EEF2F5", usage: "페이지 배경" },
      ],
      semantic: [
        { name: "Running", hex: "#2FD6BC", tint: "#E3FAF6", label: "가동" },
        { name: "Warning", hex: "#FFB027", tint: "#FFF3DC", label: "이상" },
        { name: "Stopped", hex: "#FF3B30", tint: "#FFE7E5", label: "중단 · 오류" },
        { name: "Up", hex: "#E5484D", tint: "#FDE8EA", label: "가격 상승" },
        { name: "Down", hex: "#2F6FDE", tint: "#E5EEFD", label: "가격 하락" },
      ],
      scaleName: "Teal Scale",
      scale: ["#E6F6F5", "#C2EAE8", "#8ED7D4", "#57C2BF", "#2BA9A6", "#11908E", "#0E7A79", "#0C6464", "#0A4F50", "#16333C"],
    },
    type: [
      { name: "Display", spec: "Pretendard Bold · 64 / 72", cls: "text-[44px] font-bold leading-[1.1] bg-gradient-to-r from-[#FFB027] to-[#2FD6BC] bg-clip-text text-transparent", sample: "100.52 MW" },
      { name: "Title", spec: "Pretendard SemiBold · 20 / 28", cls: "text-[20px] font-semibold", sample: "제주도 태양광 설비 현황" },
      { name: "Body", spec: "Pretendard Regular · 15 / 24", cls: "text-[15px]", sample: "예상 발전 금액 298,345원" },
      { name: "Caption", spec: "Pretendard Regular · 12 / 16", cls: "text-[12px] text-[#6B7280]", sample: "2024.09.25 13:30 (단위: 원/kWh)" },
    ],
    components: {
      radius: "rounded-full",
      primary: { label: "기간별", icon: CalendarDays },
      outline: { label: "전체", icon: ChevronDown, iconRight: true },
      live: "가동 중",
      badges: [
        { label: "가동 10", color: "#0E7A79", tint: "#E3FAF6" },
        { label: "이상 10", color: "#C77A00", tint: "#FFF3DC" },
        { label: "중단 10", color: "#FF3B30", tint: "#FFE7E5" },
        { label: "1.05 ▼", color: "#2F6FDE", tint: "#E5EEFD" },
      ],
      tabs: ["대시보드", "태양광 맵", "설비상태"],
      bars: [
        { label: "서제주시 가동률", value: 83, state: 0 },
        { label: "동제주시 가동률", value: 71, state: 0 },
        { label: "서귀포시 가동률", value: 42, state: 1 },
      ],
      stateLabels: ["정상", "점검"],
    },
    overview: {
      cards: [
        { tag: "Background", title: "넓게 흩어진 발전 설비", body: "제주 전역에 분산된 태양광 설비를 개별적으로 확인해야 해, 전체 발전 상황과 장애를 빠르게 파악하기 어려웠습니다." },
        { tag: "Problem", title: "장애는 늦게, 정보는 따로", body: "설비 상태·발전량·전력 시장·기상 정보가 서로 다른 곳에 있어, 이상 발생 시 원인을 판단하기까지 시간이 걸렸습니다." },
        { tag: "Solution", title: "지도 위에 모든 상태를", body: "지역별 설비 상태를 지도와 카드로 시각화하고, 시장·기상·이벤트 정보를 같은 화면에 배치해 관제 흐름을 하나로 만들었습니다." },
      ],
      point: {
        title: ["관제 화면은,", "이상 신호가 먼저 보이도록."],
        body: "다크 네이비 헤더에 태양을 상징하는 Amber와 가동을 뜻하는 Mint를 대비시켜 핵심 수치를 강조했습니다. 가동·이상·중단 상태는 형태와 색을 함께 사용해 즉시 구분되도록 했습니다.",
      },
      features: [
        { icon: Zap, title: "핵심 발전 지표", desc: "총 발전설비용량·PV 출력·예상 발전금액·발전시간을 상단 KPI로 제공합니다." },
        { icon: Map, title: "지도 기반 설비 현황", desc: "제주 지도 위 지역별 설비 수 마커와 확대·축소 탐색을 지원합니다." },
        { icon: MapPin, title: "지역별 상태 카드", desc: "서제주·서귀포·동제주의 가동 상태와 발전량·금액을 카드로 요약합니다." },
        { icon: CloudSun, title: "시장 · 기상 정보", desc: "SMP·REC 가격 추이와 시간대별 날씨 예보로 발전 환경을 함께 봅니다." },
        { icon: BellRing, title: "이벤트 알림", desc: "발전 정지·오류 이벤트를 유형별 아이콘과 발생 시간 테이블로 보여줍니다." },
      ],
    },
    next: null,
  },
};
