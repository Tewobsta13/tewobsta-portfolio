import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Code2,
  Heart,
  Music2,
  Palette,
} from "lucide-react";

const C = {
  cream: "#F6F0E8",
  paper: "#FFFCF7",
  plum: "#302832",
  purple: "#7955A3",
  lavender: "#E8DDF2",
  muted: "#807481",
  line: "#DCD0DE",
  pink: "#F0DCE5",
};

const chapters = [
  {
    number: "01",
    label: "My job",
    eyebrow: "WHAT I DO",
    title: (
      <>
        I build things
        <br />
        that work.
      </>
    ),
    description:
      "I'm Tewobsta, a Software Engineering student at Addis Ababa University. I build software, solve problems, and keep learning how to make things better.",
    extra:
      "I'm also exploring AI, from the mathematics behind it to machine learning and intelligent systems.",
    type: "code",
  },
  {
    number: "02",
    label: "MY FOUNDATION",
    eyebrow: "WHAT GROUNDS ME",
    title: (
      <>
        Faith keeps
        <br />
        me grounded.
      </>
    ),
    description:
      "My faith reminds me to work with purpose, stay humble, and give my best to the things that matter.",
    extra: null,
    type: "faith",
  },
  {
    number: "03",
    label: "OFF THE SCREEN",
    eyebrow: "TIME TO RESET",
    title: (
      <>
        See you
        <br />
        on the court.
      </>
    ),
    description:
      "When I’m not coding, you’ll probably find me on the basketball court, enjoying the game and giving my mind a little room to breathe.",
    extra: null,
    type: "basketball",
  },
  {
    number: "04",
    label: "MY QUIET CORNER",
    eyebrow: "SLOWER MOMENTS",
    title: (
      <>
        Some color.
        <br />
        Some quiet.
      </>
    ),
    description:
      "Give me colored pencils and instrumental music, and I'm happy. It's my little way of slowing down and enjoying the moment.",
    extra: null,
    type: "art",
  },
];

function Frog({ happy = false }) {
  return (
    <svg
      viewBox="0 0 100 76"
      className="h-12 w-14"
      fill="none"
      aria-label="Purple frog"
      role="img"
    >
      <ellipse cx="50" cy="57" rx="30" ry="15" fill={C.purple} />
      <ellipse cx="31" cy="28" rx="14" ry="16" fill={C.purple} />
      <ellipse cx="69" cy="28" rx="14" ry="16" fill={C.purple} />
      <ellipse cx="50" cy="43" rx="33" ry="24" fill={C.purple} />
      <ellipse cx="31" cy="27" rx="8" ry="9" fill={C.lavender} />
      <ellipse cx="69" cy="27" rx="8" ry="9" fill={C.lavender} />
      <ellipse cx="32" cy="28" rx="3.5" ry="4.5" fill={C.plum} />
      <ellipse cx="68" cy="28" rx="3.5" ry="4.5" fill={C.plum} />
      <ellipse cx="37" cy="44" rx="5" ry="3" fill="#C68BAF" />
      <ellipse cx="63" cy="44" rx="5" ry="3" fill="#C68BAF" />
      <path
        d={happy ? "M40 49 Q50 60 60 49" : "M43 51 Q50 55 57 51"}
        stroke={C.paper}
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      <ellipse cx="27" cy="64" rx="11" ry="5" fill={C.purple} />
      <ellipse cx="73" cy="64" rx="11" ry="5" fill={C.purple} />
    </svg>
  );
}

function CodeArtwork() {
  const lines = [
    ["01", "const curiosity = true;", C.purple],
    ["02", "while (learning) {", C.plum],
    ["03", "  buildSomething();", "#A16B45"],
    ["04", "  solveProblems();", C.purple],
    ["05", "}", C.plum],
  ];

  return (
    <div className="relative flex h-full min-h-[250px] items-center justify-center sm:min-h-[340px]">
      <div className="absolute inset-[5%] rounded-[38%] bg-[#E8DDF2]" />
      <div className="absolute bottom-[5%] left-[5%] h-24 w-24 rounded-full bg-[#F0DCE5]" />

      <div className="absolute left-[2%] top-[7%] z-20 hidden rounded-xl border border-[#DCD0DE] bg-white px-4 py-3 shadow-sm sm:block">
        <p className="text-[9px] tracking-[0.16em] text-[#807481]">CURRENTLY</p>
        <p className="mt-1 text-sm font-medium">Building real-world projects</p>
      </div>

      <div className="relative z-10 w-[92%] max-w-[620px] overflow-hidden rounded-2xl border border-[#DCD0DE] bg-[#FFFCF7] shadow-[0_24px_70px_rgba(48,40,50,0.13)]">
        <div className="flex items-center justify-between border-b border-[#E9E0E8] px-4 py-3 sm:px-6 sm:py-4">
          <div className="flex gap-2">
            <span className="h-3 w-3 rounded-full bg-[#D9A6A6]" />
            <span className="h-3 w-3 rounded-full bg-[#E8C98A]" />
            <span className="h-3 w-3 rounded-full bg-[#A7C8A5]" />
          </div>
          <div className="flex items-center gap-2 text-xs text-[#807481]">
            <Code2 size={15} />
            something.js
          </div>
        </div>

        <div className="px-4 py-5 sm:px-8 sm:py-8">
          <div className="mb-5 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#91A98C]" />
            <span className="text-[9px] tracking-[0.2em] text-[#807481]">
              A WORK IN PROGRESS
            </span>
          </div>
          <div className="space-y-4 sm:space-y-5">
            {lines.map(([number, text, color], index) => (
              <motion.div
                key={number}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.07, duration: 0.3 }}
                className="flex gap-4 font-mono text-[10px] sm:gap-6 sm:text-sm"
              >
                <span className="text-[#C3B7C5]">{number}</span>
                <span style={{ color }}>{text}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-[#E9E0E8] px-4 py-3 sm:px-6 sm:py-4">
          <span className="text-[10px] text-[#807481] sm:text-xs">
            Still learning. Always building.
          </span>
          <span className="rounded-full bg-[#E8DDF2] px-3 py-1 text-[9px] tracking-wider text-[#7955A3]">
            IN PROGRESS
          </span>
        </div>
      </div>

      <motion.div
        animate={{ y: [0, -7, 0], rotate: [0, 3, 0] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[1%] right-[1%] z-20 flex h-[66px] w-[66px] items-center justify-center rounded-2xl border border-[#DCD0DE] bg-white shadow-lg sm:bottom-[3%] sm:right-[3%] sm:h-[76px] sm:w-[76px]"
      >
        <Frog />
      </motion.div>

      <div className="absolute bottom-[3%] left-[3%] z-20 hidden rounded-xl bg-[#302832] px-4 py-3 text-white shadow-lg sm:block">
        <p className="text-[9px] tracking-[0.16em] text-[#DCD0DE]">
          THE PROCESS
        </p>
        <p className="mt-1 text-sm">In the making</p>
      </div>
    </div>
  );
}

function FaithArtwork() {
  return (
    <div className="relative flex h-full min-h-[250px] items-center justify-center sm:min-h-[340px]">
      <div className="absolute inset-[5%] rounded-[38%] bg-[#E8DDF2]" />
      <div className="absolute right-[7%] top-[6%] h-20 w-20 rounded-full border border-white sm:h-28 sm:w-28" />
      <div className="absolute bottom-[5%] left-[4%] h-24 w-24 rounded-full border border-[#C7B2D5] sm:h-32 sm:w-32" />

      <div className="relative z-10 grid w-[94%] max-w-[650px] grid-cols-[0.9fr_1.1fr] overflow-hidden rounded-[22px] border border-[#DCD0DE] bg-[#FFFCF7] shadow-[0_24px_70px_rgba(48,40,50,0.12)] sm:rounded-[26px]">
        <div className="relative flex min-h-[250px] items-center justify-center overflow-hidden bg-[#DCD0EA] sm:min-h-[350px]">
          <svg
            viewBox="0 0 220 340"
            className="h-full w-full"
            fill="none"
            role="img"
            aria-label="Cross against a lavender sky"
          >
            <circle cx="157" cy="62" r="30" fill="#FFFCF7" opacity=".8" />
            <circle cx="167" cy="52" r="30" fill="#DCD0EA" />
            <path d="M0 240 Q55 190 110 238 T220 220 V340 H0Z" fill="#C7B2D5" />
            <path d="M0 277 Q70 235 132 270 T220 260 V340 H0Z" fill="#B6A2D0" />
            <path d="M99 280 V96 H121 V280Z" fill="#7955A3" />
            <path d="M61 142 H159 V162 H61Z" fill="#7955A3" />
            <path
              d="M38 66 L44 80 L58 86 L44 92 L38 106 L32 92 L18 86 L32 80Z"
              fill="#FFFCF7"
            />
            <path
              d="M177 147 L181 156 L190 160 L181 164 L177 173 L173 164 L164 160 L173 156Z"
              fill="#FFFCF7"
            />
          </svg>
        </div>

        <div className="flex flex-col justify-center px-4 py-5 sm:px-8 sm:py-9">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#F0DCE5] sm:mb-6 sm:h-14 sm:w-14">
            <Heart size={25} color={C.purple} strokeWidth={1.5} />
          </div>
          <p className="text-[9px] tracking-[0.2em] text-[#807481] sm:text-[10px]">
            A REMINDER
          </p>
          <p className="mt-3 font-serif text-xl leading-tight sm:text-4xl">
            Work with
            <br />
            all your heart.
          </p>
          <div className="my-4 h-px w-10 bg-[#C7B2D5] sm:my-5" />
          <p className="text-[10px] leading-5 text-[#807481] sm:text-sm sm:leading-6">
            “Whatever you do, work at it with all your heart.”
          </p>
          <p className="mt-3 text-[9px] tracking-[0.13em] text-[#7955A3] sm:mt-4 sm:text-[10px]">
            COLOSSIANS 3:23
          </p>
        </div>
      </div>
    </div>
  );
}

function BasketballArtwork() {
  return (
    <div className="relative flex h-full min-h-[250px] items-center justify-center sm:min-h-[340px]">
      <div className="absolute inset-[3%] rounded-[35%] bg-white" />
      <svg
        viewBox="0 0 580 410"
        className="relative z-10 w-full max-w-[700px]"
        fill="none"
        role="img"
        aria-label="Basketball on a court"
      >
        <rect x="12" y="15" width="556" height="380" rx="28" fill="#E8DDF2" />
        <rect
          x="36"
          y="39"
          width="508"
          height="332"
          rx="16"
          stroke="#C7B2D5"
          strokeWidth="2"
        />
        <path d="M36 205 H544 M290 39 V371" stroke="#C7B2D5" strokeWidth="2" />
        <circle cx="290" cy="205" r="70" stroke="#C7B2D5" strokeWidth="2" />
        <path
          d="M36 118 H95 Q161 118 161 205 Q161 292 95 292 H36"
          stroke="#C7B2D5"
          strokeWidth="2"
        />
        <path
          d="M544 118 H485 Q419 118 419 205 Q419 292 485 292 H544"
          stroke="#C7B2D5"
          strokeWidth="2"
        />
        <rect
          x="430"
          y="55"
          width="55"
          height="40"
          rx="3"
          fill="#FFFCF7"
          stroke="#302832"
          strokeWidth="3"
        />
        <path
          d="M438 96 H477 M440 97 L446 125 H470 L476 97 M443 106 H473 M445 115 H471"
          stroke="#7955A3"
          strokeWidth="2.5"
        />
        <path
          d="M75 94 Q102 77 131 92 M68 111 Q89 100 109 111"
          stroke="#7955A3"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <motion.g
          animate={{ y: [0, -10, 0], rotate: [0, 9, 0] }}
          transition={{ duration: 2.7, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "285px 213px" }}
        >
          <circle
            cx="285"
            cy="213"
            r="91"
            fill="#D98B53"
            stroke="#302832"
            strokeWidth="4"
          />
          <path
            d="M194 213 H376 M285 122 V304 M219 151 Q285 213 219 275 M351 151 Q285 213 351 275"
            stroke="#302832"
            strokeWidth="4"
          />
        </motion.g>
        <path
          d="M151 51 L157 65 L171 71 L157 77 L151 91 L145 77 L131 71 L145 65Z"
          fill="#7955A3"
        />
        <path
          d="M448 264 L453 275 L464 280 L453 285 L448 296 L443 285 L432 280 L443 275Z"
          fill="#D98B9C"
        />
        <circle cx="87" cy="312" r="6" fill="#D98B9C" />
      </svg>

      <div className="absolute bottom-[4%] left-[3%] z-20 rounded-xl border border-[#DCD0DE] bg-[#FFFCF7] px-3 py-3 shadow-lg sm:bottom-[5%] sm:left-[5%] sm:px-5 sm:py-4">
        <p className="text-[9px] tracking-[0.18em] text-[#807481]">
          OFF THE CLOCK
        </p>
        <p className="mt-1 font-serif text-lg sm:text-2xl">
          One shot at a time.
        </p>
      </div>
      <div className="absolute right-[4%] top-[3%] z-20 flex h-12 w-12 items-center justify-center rounded-full bg-[#302832] text-white sm:h-[68px] sm:w-[68px]">
        <ArrowRight size={24} />
      </div>
    </div>
  );
}

function ArtArtwork() {
  const colors = [
    "#7955A3",
    "#D98B9C",
    "#D9A65A",
    "#91A98C",
    "#8C9DC0",
    "#C58D6D",
  ];

  return (
    <div className="relative flex h-full min-h-[250px] items-center justify-center sm:min-h-[340px]">
      <div className="absolute inset-[3%] rounded-[35%] bg-[#F0DCE5]" />

      <div className="relative z-10 grid w-[94%] max-w-[660px] grid-cols-[1fr_0.8fr] items-center gap-3 sm:gap-5">
        <motion.div
          animate={{ rotate: [-1, 1, -1], y: [0, -4, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="rounded-2xl border border-[#DCD0DE] bg-[#FFFCF7] p-3 shadow-[0_24px_60px_rgba(48,40,50,0.12)] sm:rounded-[26px] sm:p-5"
        >
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[9px] tracking-[0.15em] text-[#807481] sm:text-[10px]">
              MY LITTLE BREAK
            </span>
            <Palette size={17} color={C.purple} />
          </div>

          <svg
            viewBox="0 0 300 300"
            className="w-full rounded-xl bg-[#F6F0E8]"
            fill="none"
            role="img"
            aria-label="A flower coloring illustration"
          >
            <rect width="300" height="300" fill="#F6F0E8" />
            <path
              d="M148 205 Q87 186 86 133 Q137 138 148 205"
              fill="#91A98C"
              stroke="#302832"
              strokeWidth="2"
            />
            <path
              d="M151 226 Q213 210 218 163 Q167 165 151 226"
              fill="#C5D1B8"
              stroke="#302832"
              strokeWidth="2"
            />
            <path
              d="M150 92 C121 61 102 85 124 110 C92 91 78 121 116 135 C82 145 99 176 133 153 C118 189 148 202 155 162 C169 197 201 179 176 149 C215 158 222 127 183 119 C211 94 187 70 164 103 C166 65 139 60 150 92Z"
              fill="#E8DDF2"
              stroke="#302832"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <circle
              cx="151"
              cy="128"
              r="23"
              fill="#D9A65A"
              stroke="#302832"
              strokeWidth="2.5"
            />
            <circle cx="143" cy="121" r="2" fill="#302832" />
            <circle cx="159" cy="121" r="2" fill="#302832" />
            <path
              d="M144 135 Q151 142 158 135"
              stroke="#302832"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M150 170 V259"
              stroke="#302832"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M57 65 L61 75 L71 79 L61 83 L57 93 L53 83 L43 79 L53 75Z"
              fill="#D98B9C"
            />
            <path
              d="M235 77 L239 87 L249 91 L239 95 L235 105 L231 95 L221 91 L231 87Z"
              fill="#7955A3"
            />
            <circle cx="65" cy="221" r="5" fill="#D98B9C" />
            <circle cx="232" cy="232" r="5" fill="#D9A65A" />
          </svg>

          <div className="mt-3 flex justify-center gap-1.5 sm:mt-4 sm:gap-2">
            {colors.map((color) => (
              <span
                key={color}
                className="h-3.5 w-3.5 rounded-full border-2 border-white shadow-sm sm:h-5 sm:w-5"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </motion.div>

        <div className="relative flex flex-col items-center gap-4 sm:gap-5">
          <motion.div
            animate={{ y: [0, -6, 0], rotate: [-3, 3, -3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="flex h-16 w-16 items-center justify-center rounded-[20px] border border-[#DCD0DE] bg-white shadow-lg sm:h-28 sm:w-28 sm:rounded-[24px]"
          >
            <Music2 size={38} strokeWidth={1.3} color={C.purple} />
          </motion.div>

          <div className="flex h-[125px] items-end justify-center gap-1.5 sm:h-[200px] sm:gap-3">
            {colors.map((color, index) => (
              <motion.div
                key={color}
                animate={{ y: [0, index % 2 === 0 ? -7 : 0, 0] }}
                transition={{
                  duration: 2.8,
                  delay: index * 0.12,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative w-2.5 rounded-t-sm rounded-b-md sm:w-5"
                style={{ height: `${65 + index * 7}%`, backgroundColor: color }}
              >
                <span
                  className="absolute -top-[5px] left-0 h-0 w-0 border-b-[6px] border-l-[5px] border-r-[5px] border-l-transparent border-r-transparent sm:-top-[7px] sm:border-b-[7px] sm:border-l-[10px] sm:border-r-[10px]"
                  style={{ borderBottomColor: color }}
                />
                <span className="absolute bottom-2 left-1/2 h-2/3 w-px -translate-x-1/2 bg-white/40" />
              </motion.div>
            ))}
          </div>

          <div className="rounded-xl bg-[#302832] px-3 py-2.5 text-center text-white shadow-lg sm:px-4 sm:py-3">
            <p className="text-[8px] tracking-[0.17em] text-[#DCD0DE] sm:text-[9px]">
              MY KIND OF EVENING
            </p>
            <p className="mt-1 text-xs sm:text-sm">Pencils + piano.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Artwork({ type }) {
  switch (type) {
    case "code":
      return <CodeArtwork />;
    case "faith":
      return <FaithArtwork />;
    case "basketball":
      return <BasketballArtwork />;
    case "art":
      return <ArtArtwork />;
    default:
      return null;
  }
}

export default function Hook() {
  const sectionRef = useRef(null);
  const [activeChapter, setActiveChapter] = useState(0);
  const [frogHappy, setFrogHappy] = useState(false);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const next = Math.min(
      chapters.length - 1,
      Math.floor(progress * chapters.length),
    );
    setActiveChapter((current) => (current === next ? current : next));
  });

  const chapter = chapters[activeChapter];

  function changeChapter(index) {
    const next = (index + chapters.length) % chapters.length;
    const section = sectionRef.current;
    if (!section) return;

    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    const scrollableDistance = section.offsetHeight - window.innerHeight;
    const target = sectionTop + (next / chapters.length) * scrollableDistance;

    window.scrollTo({
      top: target,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-label="A little about me"
      className="relative h-[400svh] bg-[#F6F0E8] text-[#302832]"
    >
      {/* This stays pinned while the four chapters pass. */}
      <div className="sticky top-0 flex h-svh min-h-[600px] flex-col overflow-hidden">
        <div className="pointer-events-none absolute -left-24 top-24 h-48 w-48 rounded-full bg-[#E8DDF2]/50 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-20 right-0 h-56 w-56 rounded-full bg-[#F0DCE5]/60 blur-3xl" />

        {/* Matches the Hero's max-width and horizontal padding. */}
        <div className="relative mx-auto flex h-full w-full max-w-[1320px] flex-col px-5 py-4 sm:px-8 sm:py-6 lg:px-14 lg:py-7 xl:px-24">
          {/* Header */}
          <div className="flex shrink-0 items-center justify-between gap-4">
            <div>
              <p className="text-[10px] tracking-[0.23em] text-[#7955A3] sm:text-xs">
                A LITTLE ABOUT ME
              </p>
              <h2 className="mt-1 font-serif text-xl sm:text-2xl lg:text-3xl">
                Beyond the screen.
              </h2>
            </div>

            <button
              type="button"
              onClick={() => setFrogHappy((value) => !value)}
              aria-label="Make the frog smile"
              className="flex items-center gap-2 rounded-full border border-[#DCD0DE] bg-[#FFFCF7]/80 px-2 py-1 transition hover:border-[#7955A3] sm:px-4 sm:py-2"
            >
              <Frog happy={frogHappy} />
              <span className="hidden text-xs text-[#807481] sm:inline">
                {frogHappy ? "Hey, you!" : "Little visitor"}
              </span>
            </button>
          </div>

          {/* The text and artwork share the same horizontal row. */}
          <div className="mt-2 grid min-h-0 flex-1 grid-cols-1 items-center gap-1 md:grid-cols-[0.85fr_1.15fr] md:gap-3 lg:grid-cols-[0.82fr_1.18fr] lg:gap-5 xl:gap-7">
            <div className="relative z-10 order-2 flex min-w-0 flex-col justify-center py-1 md:order-1">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={chapter.number}
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-3 flex items-center gap-3 sm:mb-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E8DDF2] text-[10px] text-[#7955A3]">
                      {chapter.number}
                    </span>
                    <span className="text-[9px] tracking-[0.18em] text-[#7955A3] sm:text-xs">
                      {chapter.eyebrow}
                    </span>
                  </div>

                  <h3 className="font-serif text-[clamp(2.35rem,4.5vw,5rem)] leading-[0.94] tracking-[-0.055em]">
                    {chapter.title}
                  </h3>

                  <p className="mt-4 max-w-[430px] text-xs leading-6 text-[#6F6471] sm:mt-5 sm:text-sm sm:leading-7 lg:text-base lg:leading-8">
                    {chapter.description}
                  </p>

                  {chapter.extra && (
                    <p className="mt-2 max-w-[420px] text-[11px] leading-5 text-[#807481] sm:mt-3 sm:text-xs sm:leading-6 lg:text-sm">
                      {chapter.extra}
                    </p>
                  )}

                  <div className="mt-4 flex items-center gap-3 sm:mt-6 lg:mt-8">
                    <span className="h-px w-8 bg-[#7955A3]" />
                    <span className="text-[9px] tracking-[0.16em] text-[#807481] sm:text-[10px]">
                      {chapter.label}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="order-1 min-w-0 md:order-2">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={chapter.type}
                  initial={reduceMotion ? false : { opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, x: -12 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="w-full"
                >
                  <Artwork type={chapter.type} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Progress + optional manual chapter navigation */}
          <div className="flex shrink-0 items-center justify-between gap-3 border-t border-[#DCD0DE] pt-3 sm:pt-4">
            <div className="flex min-w-0 items-center gap-1.5 sm:gap-2">
              {chapters.map((item, index) => (
                <button
                  key={item.number}
                  type="button"
                  onClick={() => changeChapter(index)}
                  aria-label={`Go to ${item.label}`}
                  aria-pressed={activeChapter === index}
                  className={`flex h-8 items-center justify-center rounded-full px-3 text-[10px] transition-all sm:h-9 sm:px-4 sm:text-xs ${
                    activeChapter === index
                      ? "bg-[#302832] text-white"
                      : "border border-[#DCD0DE] text-[#807481] hover:border-[#7955A3] hover:text-[#7955A3]"
                  }`}
                >
                  {item.number}
                  <span className="ml-1.5 hidden sm:inline">{item.label}</span>
                </button>
              ))}
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() => changeChapter(activeChapter - 1)}
                aria-label="Previous chapter"
                disabled={activeChapter === 0}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[#DCD0DE] transition hover:border-[#7955A3] hover:text-[#7955A3] disabled:opacity-35 sm:h-9 sm:w-9"
              >
                <ArrowLeft size={15} />
              </button>
              <button
                type="button"
                onClick={() => changeChapter(activeChapter + 1)}
                aria-label="Next chapter"
                disabled={activeChapter === chapters.length - 1}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[#7955A3] text-white transition hover:bg-[#604185] disabled:opacity-35 sm:h-9 sm:w-9"
              >
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
