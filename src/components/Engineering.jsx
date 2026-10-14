"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------ */
/*  Content                                                            */
/* ------------------------------------------------------------------ */

const VERSES = [
  [
    "Psalm 118:24",
    "This is the day which the LORD hath made; we will rejoice and be glad in it.",
  ],
  [
    "Philippians 4:13",
    "I can do all things through Christ which strengtheneth me.",
  ],
  ["Psalm 56:3", "What time I am afraid, I will trust in thee."],
  [
    "Matthew 5:14",
    "Ye are the light of the world. A city that is set on an hill cannot be hid.",
  ],
  [
    "Proverbs 3:5",
    "Trust in the LORD with all thine heart; and lean not unto thine own understanding.",
  ],
  [
    "Joshua 1:9",
    "Be strong and of a good courage; be not afraid, neither be thou dismayed.",
  ],
  ["Psalm 23:1", "The LORD is my shepherd; I shall not want."],
  ["1 Corinthians 16:14", "Let all your things be done with charity."],
  [
    "Romans 12:12",
    "Rejoicing in hope; patient in tribulation; continuing instant in prayer.",
  ],
  ["Numbers 6:24", "The LORD bless thee, and keep thee."],
];

// The headline is the world's signage: one letter lights up for every 2 obstacles cleared (15 letters, 30 clears).
const HEAD_ROWS = [
  ["WANNA", "PLAY"],
  ["A", "GAME?"],
];
const HEAD_LETTERS = 15;

const COUNT_WORDS = [
  "THREE",
  "SIX",
  "NINE",
  "TWELVE",
  "FIFTEEN",
  "EIGHTEEN",
  "TWENTY-ONE",
  "TWENTY-FOUR",
  "TWENTY-SEVEN",
  "THIRTY",
];

// One reward moment per verse: an illustrated scene, a particle kind, accent colours and a short reflection.
const MOTIFS = [
  {
    scene: "sunrise",
    kind: "rays",
    a: "#b8a6d8",
    b: "#8875ad",
    note: "Take a breath. Today is another chance to begin again.",
  },
  {
    scene: "summit",
    kind: "rise",
    a: "#fff0f1",
    b: "#b8a6d8",
    note: "You were never meant to carry it alone. Lean on the strength that is offered.",
  },
  {
    scene: "storm",
    kind: "rain",
    a: "#a98bff",
    b: "#8875ad",
    note: "Fear may show up, but it doesn't get the last word. Trust can walk right through it.",
  },
  {
    scene: "city",
    kind: "twinkle",
    a: "#fff0f1",
    b: "#b8a6d8",
    note: "A little light goes a long way. Let yours be seen.",
  },
  {
    scene: "road",
    kind: "rise",
    a: "#b8a6d8",
    b: "#a98bff",
    note: "You don't need the whole map. Just the next honest step.",
  },
  {
    scene: "torch",
    kind: "rise",
    a: "#b8a6d8",
    b: "#8875ad",
    note: "Courage isn't feeling fearless. It's taking the next step anyway.",
  },
  {
    scene: "meadow",
    kind: "petals",
    a: "#b8a6d8",
    b: "#a98bff",
    note: "Nothing lacking, nothing to prove. Rest in that for a moment.",
  },
  {
    scene: "heart",
    kind: "rays",
    a: "#b8a6d8",
    b: "#fff0f1",
    note: "Let kindness be the reason behind everything you build.",
  },
  {
    scene: "dove",
    kind: "feathers",
    a: "#fff0f1",
    b: "#a98bff",
    note: "Hope for the road ahead, patience for the hard parts, prayer all along the way.",
  },
  {
    scene: "lantern",
    kind: "twinkle",
    a: "#b8a6d8",
    b: "#a98bff",
    note: "A blessing is something you carry. Take this one with you.",
  },
];

/* ------------------------------------------------------------------ */
/*  Game constants                                                     */
/* ------------------------------------------------------------------ */

const GROUND = 52; // px of ground band at the bottom of the stage
const PX = 72; // runner x position (left edge of the SVG box)
const FOOT = 8; // empty SVG space under the boots
const HB_L = 21; // hitbox offset from PX
const HB_W = 22;
const HB_H = 54;
const GRAVITY = 2300;
const JUMP_V = 800;
const TOTAL_CLEARS = 30;
const STORE_KEY = "faith-run:found";

/* ------------------------------------------------------------------ */
/*  Local artwork (inline SVG, no network)                             */
/* ------------------------------------------------------------------ */

const uri = (svg) => `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;

const FAR_BG = uri(
  `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="170"><path fill="#b8a6d8" d="M0 170V128H30V96L44 62L58 96V128H96V104H112V76L128 34L144 76V104H190V132H236V88H244V54L256 18L268 54V88H276V132H330V110Q346 84 362 110V132H400V100H416V70L432 40L448 70V100H464V128H520V92L534 58L548 92V128H590V112H610V128H640V170Z"/><g fill="#7a2a3d" opacity=".7"><rect x="40" y="86" width="3" height="6"/><rect x="124" y="60" width="3" height="6"/><rect x="254" y="48" width="3" height="6"/><rect x="430" y="64" width="3" height="6"/><rect x="532" y="82" width="3" height="6"/></g></svg>`,
);

const MID_BG = uri(
  `<svg xmlns="http://www.w3.org/2000/svg" width="420" height="110"><path fill="#d8cbe8" d="M0 110V80H40V58Q60 30 80 58V80H130V96H170V110Z"/><path fill="#d8cbe8" d="M250 110V84H300V62Q320 36 340 62V84H380V80H420V110Z"/><path fill="none" stroke="#3a1424" stroke-width="3" stroke-linecap="round" d="M205 110V68M205 84L189 64M205 76L221 56M221 56L231 50M189 64L181 56"/></svg>`,
);

const GROUND_BG = uri(
  `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="52"><rect width="120" height="52" fill="#fff7ed"/><rect width="120" height="3" fill="#8a2f45"/><rect y="3" width="120" height="1" fill="#4a1a28"/><g fill="#eadff2"><rect x="6" y="16" width="22" height="2" rx="1"/><rect x="64" y="22" width="30" height="2" rx="1"/><rect x="30" y="34" width="18" height="2" rx="1"/><rect x="88" y="42" width="24" height="2" rx="1"/></g><g fill="#5a2336"><circle cx="48" cy="12" r="2"/><circle cx="104" cy="14" r="1.6"/><circle cx="14" cy="42" r="2.2"/></g></svg>`,
);

const THORNS = `<path d="M0 36L7 6L12 36Z M9 36L16 0L22 36Z M19 36L25 12L30 36Z" fill="#9a6846" stroke="#e7b889" stroke-width="1.4" stroke-linejoin="round"/>`;
const OBSTACLES = [
  {
    w: 30,
    h: 36,
    ins: 5,
    svg: `<svg viewBox="0 0 30 36" width="30" height="36">${THORNS}</svg>`,
  },
  {
    w: 24,
    h: 50,
    ins: 3,
    svg: `<svg viewBox="0 0 24 50" width="24" height="50"><path d="M3 50V14L5 10L9 13L13 8L17 12L21 9V50Z" fill="#9a6846" stroke="#e7b889" stroke-width="1.4" stroke-linejoin="round"/><path d="M8 24l4 5l-3 6" stroke="#b8a6d8" stroke-width="1.2" fill="none" stroke-linecap="round"/></svg>`,
  },
  {
    w: 48,
    h: 28,
    ins: 6,
    svg: `<svg viewBox="0 0 48 28" width="48" height="28"><path d="M0 28Q6 6 14 14Q18 0 24 12Q30 2 34 14Q42 8 48 28Z" fill="#9a6846" stroke="#e7b889" stroke-width="1.4" stroke-linejoin="round"/><path d="M10 16l-4-5M24 12V3M36 15l5-5" stroke="#b8a6d8" stroke-width="1.4" stroke-linecap="round"/></svg>`,
  },
  {
    w: 84,
    h: 36,
    ins: 6,
    svg: `<svg viewBox="0 0 84 36" width="84" height="36">${THORNS}<g transform="translate(54 0)">${THORNS}</g></svg>`,
  },
];

/* ------------------------------------------------------------------ */
/*  Character                                                          */
/* ------------------------------------------------------------------ */

function Hero() {
  return (
    <svg
      className="fr-hero"
      viewBox="0 0 64 76"
      width="64"
      height="76"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="frLens" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#efe6ff" />
          <stop offset=".5" stopColor="#a98bff" />
          <stop offset="1" stopColor="#5b3fc4" />
        </linearGradient>
        <radialGradient id="frGlow">
          <stop offset="0" stopColor="#fff0f1" />
          <stop offset=".5" stopColor="#b8a6d8" stopOpacity=".5" />
          <stop offset="1" stopColor="#b8a6d8" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="frJacket" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#65577f" />
          <stop offset="1" stopColor="#443b5d" />
        </linearGradient>
      </defs>

      {/* the lantern: a little light he keeps swinging at his belt */}
      <g className="fr-lantern">
        <path
          d="M25 46Q18 46 14 52"
          stroke="#7d2434"
          strokeWidth="1.2"
          fill="none"
        />
        <circle
          className="fr-lglow"
          cx="12"
          cy="57"
          r="13"
          fill="url(#frGlow)"
        />
        <rect
          x="8.5"
          y="52"
          width="7"
          height="9"
          rx="1.6"
          fill="#fff0f1"
          stroke="#8875ad"
          strokeWidth="1.2"
        />
        <rect x="9.5" y="50.5" width="5" height="2" rx="1" fill="#8875ad" />
        <rect x="10.5" y="61" width="3" height="1.6" rx=".8" fill="#8875ad" />
      </g>

      <g className="fr-leg b">
        <rect x="28" y="46" width="7" height="15" rx="3" fill="#1a0810" />
        <path d="M28 60H36Q40 60 40 64V68H28Z" fill="#7d2434" />
      </g>
      <g className="fr-arm b">
        <rect x="29.5" y="29" width="5.5" height="14" rx="2.7" fill="#241019" />
        <circle cx="32.2" cy="44" r="3" fill="#8f2c3d" />
      </g>

      <g className="fr-leg a">
        <rect x="29" y="46" width="7" height="15" rx="3" fill="#2b1019" />
        <rect
          x="29.6"
          y="52"
          width="5.8"
          height="3.2"
          rx="1.6"
          fill="#8f2c3d"
        />
        <path d="M29 60H37Q41 60 41 64V68H29Z" fill="#8875ad" />
        <path
          d="M30 62H38"
          stroke="#b8a6d8"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </g>

      {/* jacket */}
      <path
        d="M24 29Q24 26 28 26H37Q41 26 41 30L40 49H26Z"
        fill="url(#frJacket)"
      />
      <path d="M33 27V49" stroke="#8875ad" strokeWidth="1.6" />
      <path
        d="M26.5 38H31M35 38H39.5"
        stroke="#5a2236"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <rect x="25.5" y="44" width="15" height="3" fill="#8875ad" />
      <rect x="31.6" y="43.4" width="2.8" height="4.2" rx=".8" fill="#a98bff" />
      <path
        d="M27 27L33 33L39 27"
        fill="none"
        stroke="#b8a6d8"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M25 30Q24.4 36 25.4 42"
        stroke="#b8a6d8"
        strokeWidth=".9"
        fill="none"
        opacity=".6"
      />

      <g className="fr-arm a">
        <rect x="29.5" y="29" width="5.5" height="14" rx="2.7" fill="#3b1624" />
        <rect x="29.5" y="29" width="5.5" height="4" rx="2" fill="#8875ad" />
        <circle cx="32.2" cy="44" r="3" fill="#8875ad" />
      </g>

      <g className="fr-scarf">
        <path
          d="M26 28C18 26 11 30 4 25L5 32C12 36 19 34 26 33Z"
          fill="#8875ad"
        />
        <path
          d="M24 31C18 35 14 40 8 43L12 47C18 44 23 40 27 35Z"
          fill="#b8a6d8"
        />
        <path
          d="M8 27L5 26.4M10 34L6 33.4"
          stroke="#7d2434"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </g>
      <rect x="25" y="25" width="16" height="6" rx="3" fill="#8875ad" />

      <g className="fr-head">
        <path
          d="M20 17Q20 4 33 4Q46 4 46 16V22Q46 28 40 28H27Q20 28 20 22Z"
          fill="#33121f"
          stroke="#5a2236"
          strokeWidth="1.2"
        />
        <path
          d="M23 9Q28 5 35 6"
          stroke="#6b2a40"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
        />
        <path
          className="fr-tuft"
          d="M30 5Q27 -1 34 0Q31 2 33 5"
          fill="#8875ad"
        />
        <path d="M33 19H46V23Q46 27 41 27H33Z" fill="#efc2b4" />
        <rect x="19.5" y="13" width="27" height="4.4" rx="2" fill="#4a2f94" />
        <rect
          x="23"
          y="11.6"
          width="4"
          height="7.2"
          rx="1.6"
          fill="#33121f"
          stroke="#a98bff"
          strokeWidth="1"
        />
        <g className="fr-lensg">
          <ellipse
            cx="38.5"
            cy="15.2"
            rx="8"
            ry="6"
            fill="url(#frLens)"
            stroke="#efe6ff"
            strokeWidth="1.4"
          />
          <path
            d="M33.6 12.4Q36.5 10.8 39.4 11.8"
            stroke="#fff"
            strokeWidth="1.4"
            fill="none"
            strokeLinecap="round"
          />
          <circle className="fr-eye" cx="40.4" cy="15.7" r="2" fill="#1c0b2a" />
          <circle cx="41" cy="15" r=".7" fill="#fff" />
        </g>
        <path
          className="fr-m-smile"
          d="M38 24.2Q41 26.6 44.4 24"
          stroke="#7a2a3a"
          fill="none"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
        <ellipse
          className="fr-m-open"
          cx="41.6"
          cy="25"
          rx="2.6"
          ry="2.3"
          fill="#5a1a2a"
        />
        <path
          className="fr-m-ouch"
          d="M38.5 25.6Q40 23.8 41.6 25.6T44.8 25.6"
          stroke="#7a2a3a"
          fill="none"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Reward scenes: one illustrated motif per verse                     */
/* ------------------------------------------------------------------ */

function Scene({ id }) {
  let body = null;
  const flower = (x, y, c, k) => (
    <g
      key={k}
      className="sway"
      style={{
        transformOrigin: `${x}px 200px`,
        animationDelay: `${k * -0.45}s`,
      }}
    >
      <line x1={x} y1={y} x2={x} y2="200" className="stem" />
      {[0, 1, 2, 3, 4].map((j) => {
        const a = (j * 72 * Math.PI) / 180;
        return (
          <circle
            key={j}
            cx={x + Math.cos(a) * 7}
            cy={y + Math.sin(a) * 7}
            r="5.5"
            className={c}
          />
        );
      })}
      <circle cx={x} cy={y} r="4" className="sl" />
    </g>
  );
  const star = (x, y, s, k) => (
    <path
      key={k}
      className="sa tw"
      style={{
        animationDelay: `${k * -0.6}s`,
        transformOrigin: `${x}px ${y}px`,
      }}
      d={`M${x} ${y - s}L${x + s * 0.28} ${y - s * 0.28}L${x + s} ${y}L${x + s * 0.28} ${y + s * 0.28}L${x} ${y + s}L${x - s * 0.28} ${y + s * 0.28}L${x - s} ${y}L${x - s * 0.28} ${y - s * 0.28}Z`}
    />
  );

  switch (id) {
    case "sunrise": {
      const rays = Array.from({ length: 13 }, (_, i) => {
        const t = Math.PI * (0.1 + (i / 12) * 0.8);
        return [
          200 + 56 * Math.cos(t),
          172 - 56 * Math.sin(t),
          200 + 190 * Math.cos(t),
          172 - 190 * Math.sin(t),
        ].map((n) => n.toFixed(1));
      });
      body = (
        <>
          <defs>
            <clipPath id="frSunClip">
              <rect x="0" y="0" width="400" height="172" />
            </clipPath>
          </defs>
          <g className="sway" style={{ transformOrigin: "200px 172px" }}>
            {rays.map((r, i) => (
              <line
                key={i}
                x1={r[0]}
                y1={r[1]}
                x2={r[2]}
                y2={r[3]}
                className="la"
                strokeWidth="3"
                strokeLinecap="round"
                opacity=".45"
              />
            ))}
          </g>
          <g clipPath="url(#frSunClip)">
            <circle className="sa sunrise" cx="200" cy="172" r="46" />
          </g>
          <path
            className="sd"
            d="M0 200V150Q60 128 120 156T240 152T400 148V200Z"
          />
          <path className="sdd" d="M0 200V174Q90 158 180 178T400 170V200Z" />
        </>
      );
      break;
    }
    case "summit":
      body = (
        <>
          <circle cx="206" cy="38" r="30" className="sa" opacity=".22" />
          <path
            className="sdd"
            d="M0 200L80 96L130 140L206 52L286 144L330 104L400 200Z"
          />
          <path
            className="sl"
            opacity=".85"
            d="M206 52L184 82L196 78L206 90L218 78L228 84Z"
          />
          <path className="sd" d="M0 200L120 132L200 172L300 122L400 200Z" />
          {star(206, 30, 16, 0)}
        </>
      );
      break;
    case "storm":
      body = (
        <>
          {Array.from({ length: 14 }, (_, i) => (
            <line
              key={i}
              x1={40 + i * 26}
              y1="60"
              x2={30 + i * 26}
              y2="200"
              className="lb"
              strokeWidth="1.2"
              opacity=".28"
            />
          ))}
          <circle cx="200" cy="108" r="46" className="sa" opacity=".18" />
          {star(200, 108, 26, 0)}
          <ellipse className="sd" cx="110" cy="46" rx="74" ry="26" />
          <ellipse className="sdd" cx="210" cy="36" rx="86" ry="30" />
          <ellipse className="sd" cx="305" cy="52" rx="68" ry="24" />
          <path className="sdd" d="M0 200V176H400V200Z" />
        </>
      );
      break;
    case "city": {
      const houses = [
        [118, 150, 22, 16],
        [146, 130, 26, 22],
        [176, 112, 24, 26],
        [214, 124, 24, 22],
        [244, 142, 24, 16],
        [270, 156, 20, 14],
      ];
      body = (
        <>
          <path className="sdd" d="M0 200Q200 30 400 200Z" />
          <rect className="sd" x="194" y="70" width="14" height="42" />
          <path className="sd" d="M190 70L201 50L212 70Z" />
          {houses.map(([x, y, w, h], i) => (
            <g key={i}>
              <rect className="sd" x={x} y={y} width={w} height={h} />
              <path
                className="sd"
                d={`M${x - 2} ${y}L${x + w / 2} ${y - 9}L${x + w + 2} ${y}Z`}
              />
              <rect
                className="sa tw"
                x={x + w / 2 - 2.5}
                y={y + 5}
                width="5"
                height="6"
                style={{ animationDelay: `${i * -0.7}s` }}
              />
            </g>
          ))}
          <rect className="sa tw" x="199" y="84" width="4" height="7" />
          {star(300, 40, 9, 1)}
          {star(96, 60, 7, 2)}
        </>
      );
      break;
    }
    case "road":
      body = (
        <>
          <circle cx="200" cy="82" r="48" className="sa" opacity=".18" />
          <path className="sdd" d="M0 200V150Q100 120 200 140T400 130V200Z" />
          <path
            d="M200 200C110 172 300 152 214 124C150 104 232 96 200 84"
            className="lb"
            strokeWidth="14"
            strokeLinecap="round"
            opacity=".3"
          />
          <path
            d="M200 200C110 172 300 152 214 124C150 104 232 96 200 84"
            className="dash"
            fill="none"
            stroke="#fff0f1"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="6 12"
          />
          <rect className="sd" x="197" y="78" width="6" height="26" />
          <circle className="sa tw" cx="200" cy="76" r="7" />
        </>
      );
      break;
    case "torch":
      body = (
        <>
          <circle cx="200" cy="100" r="78" className="sa" opacity=".16" />
          <rect
            x="193"
            y="134"
            width="14"
            height="66"
            rx="3"
            className="sdd"
            stroke="var(--b)"
            strokeWidth="1.5"
          />
          <path
            className="sa flick"
            style={{ transformOrigin: "200px 134px" }}
            d="M200 36C230 78 242 102 222 128C214 140 186 140 178 128C158 102 170 78 200 36Z"
          />
          <path
            className="sl flick"
            style={{ transformOrigin: "200px 134px", animationDelay: "-.3s" }}
            d="M200 80C214 100 218 110 208 124C203 130 197 130 192 124C182 110 186 100 200 80Z"
          />
          {star(110, 60, 8, 1)}
          {star(300, 84, 7, 2)}
        </>
      );
      break;
    case "meadow":
      body = (
        <>
          <circle cx="312" cy="46" r="22" className="sl" opacity=".9" />
          <path className="sd" d="M0 200V158Q100 134 200 156T400 148V200Z" />
          {flower(90, 140, "sa", 0)}
          {flower(150, 128, "sb", 1)}
          {flower(210, 138, "sa", 2)}
          {flower(268, 124, "sb", 3)}
          {flower(326, 138, "sa", 4)}
          <path className="sdd" d="M0 200V178Q120 164 240 182T400 176V200Z" />
        </>
      );
      break;
    case "heart":
      body = (
        <>
          {[0, 1, 2].map((i) => (
            <circle
              key={i}
              cx="200"
              cy="104"
              r="34"
              className="la ring"
              strokeWidth="2"
              style={{
                transformOrigin: "200px 104px",
                animationDelay: `${i * 0.9}s`,
              }}
            />
          ))}
          <circle cx="200" cy="100" r="60" className="sa" opacity=".16" />
          <path
            className="sa beat"
            style={{ transformOrigin: "200px 100px" }}
            d="M200 150C140 110 140 58 180 58C195 58 200 72 200 72C200 72 205 58 220 58C260 58 260 110 200 150Z"
          />
          <path
            className="sl"
            opacity=".5"
            d="M170 74Q172 66 182 66"
            strokeWidth="3"
            stroke="#fff"
            fill="none"
            strokeLinecap="round"
          />
        </>
      );
      break;
    case "dove":
      body = (
        <>
          <circle cx="200" cy="100" r="70" className="sa" opacity=".14" />
          <g className="float" style={{ transformOrigin: "200px 100px" }}>
            <polygon className="sl" points="160,112 128,124 162,124" />
            <ellipse className="sl" cx="200" cy="112" rx="42" ry="16" />
            <circle className="sl" cx="244" cy="98" r="11" />
            <polygon fill="#8875ad" points="254,97 268,102 254,105" />
            <circle cx="247" cy="96" r="1.8" fill="#b8a6d8" />
            <g className="flap" style={{ transformOrigin: "198px 106px" }}>
              <path
                className="sl"
                opacity=".95"
                d="M200 106Q176 36 126 44Q158 66 164 108Z"
              />
              <path
                className="sl"
                opacity=".7"
                d="M206 106Q196 54 156 34Q180 66 176 108Z"
              />
            </g>
          </g>
          <path
            className="sdd"
            d="M0 200V184Q80 170 160 186T320 182T400 186V200Z"
          />
        </>
      );
      break;
    case "lantern":
    default:
      body = (
        <>
          <circle cx="200" cy="112" r="84" className="sa" opacity=".14" />
          <line
            x1="200"
            y1="0"
            x2="200"
            y2="78"
            className="lb"
            strokeWidth="2"
          />
          <g className="swing" style={{ transformOrigin: "200px 78px" }}>
            <path
              className="sdd"
              d="M180 80H220L214 70H186Z"
              stroke="var(--a)"
              strokeWidth="1.5"
            />
            <rect
              x="184"
              y="80"
              width="32"
              height="50"
              rx="6"
              className="sa"
              opacity=".9"
            />
            <path
              className="sl flick"
              style={{ transformOrigin: "200px 126px" }}
              d="M200 92C210 106 212 114 206 122C203 126 197 126 194 122C188 114 190 106 200 92Z"
            />
            <rect
              x="182"
              y="130"
              width="36"
              height="7"
              rx="3"
              className="sdd"
              stroke="var(--a)"
              strokeWidth="1.5"
            />
          </g>
          {[
            [70, 50],
            [120, 90],
            [310, 60],
            [350, 110],
            [260, 30],
            [90, 140],
            [330, 160],
            [40, 100],
          ].map(([x, y], i) => star(x, y, 5 + (i % 3) * 2, i))}
          <path className="sdd" d="M0 200V184Q100 172 200 186T400 180V200Z" />
        </>
      );
  }
  return (
    <svg
      className="fr-scene"
      viewBox="0 0 400 200"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
      focusable="false"
    >
      {body}
    </svg>
  );
}

function Motif({ kind }) {
  const n = kind === "rays" ? 0 : 18;
  return (
    <div className={`fr-m fr-m-${kind}`} aria-hidden="true">
      {Array.from({ length: n }, (_, i) => (
        <i
          key={i}
          className="fr-mote"
          style={{
            left: `${(i * 37 + 11) % 100}%`,
            "--i": i,
            "--s": `${2 + (i % 4) * 1.5}px`,
            "--t": `${3 + (i % 5) * 0.7}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Imperative helpers (no React re-renders per frame)                 */
/* ------------------------------------------------------------------ */

function clearLayer(layer) {
  if (layer) while (layer.firstChild) layer.removeChild(layer.firstChild);
}

function addObstacle(layer, x, def) {
  const el = document.createElement("div");
  el.className = "fr-ob";
  el.style.width = `${def.w}px`;
  el.style.height = `${def.h}px`;
  el.style.transform = `translate3d(${x}px,0,0)`;
  el.innerHTML = def.svg;
  layer.appendChild(el);
  return { el, x, w: def.w, h: def.h, ins: def.ins, counted: false };
}

function burst(layer, x, y, n, color, spread = 1, rise = 1) {
  if (!layer) return;
  for (let i = 0; i < n; i += 1) {
    if (layer.childElementCount > 48) return;
    const p = document.createElement("i");
    p.className = "fr-p";
    p.style.left = `${x}px`;
    p.style.bottom = `${GROUND + y}px`;
    p.style.setProperty("--dx", `${(Math.random() - 0.5) * 80 * spread}px`);
    p.style.setProperty("--dy", `${4 + Math.random() * 34 * rise}px`);
    p.style.setProperty("--s", `${3 + Math.random() * 4}px`);
    p.style.setProperty("--c", color);
    p.addEventListener("animationend", () => p.remove(), { once: true });
    layer.appendChild(p);
  }
}

function readFound() {
  try {
    const n = parseInt(window.sessionStorage.getItem(STORE_KEY) || "0", 10);
    return Number.isFinite(n) ? Math.max(0, Math.min(10, n)) : 0;
  } catch {
    return 0;
  }
}

function saveFound(n) {
  try {
    window.sessionStorage.setItem(STORE_KEY, String(n));
  } catch {
    /* storage unavailable: progress simply lasts for this page view */
  }
}

/* ------------------------------------------------------------------ */
/*  Small presentational pieces                                        */
/* ------------------------------------------------------------------ */

function Dots({ count }) {
  return (
    <span className="fr-dots" aria-hidden="true">
      {VERSES.map((_, i) => (
        <span key={i} className={`fr-dot ${i < count ? "on" : ""}`} />
      ))}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

const FG_BG = uri(
  `<svg xmlns="http://www.w3.org/2000/svg" width="90" height="18"><path fill="#0b0408" d="M0 18L4 5L8 18L13 9L17 18L25 2L30 18L37 8L41 18L48 4L53 18L60 10L64 18L72 3L77 18L83 9L90 18Z"/></svg>`,
);

function popPlus(layer, x, y) {
  if (!layer || layer.childElementCount > 56) return;
  const el = document.createElement("i");
  el.className = "fr-plus";
  el.textContent = "+1";
  el.style.left = `${x}px`;
  el.style.bottom = `${GROUND + y}px`;
  el.addEventListener("animationend", () => el.remove(), { once: true });
  layer.appendChild(el);
}

export default function Engineering() {
  const rootRef = useRef(null);
  const worldRef = useRef(null);
  const runnerRef = useRef(null);
  const innerRef = useRef(null);
  const shadowRef = useRef(null);
  const obsRef = useRef(null);
  const partRef = useRef(null);
  const farRef = useRef(null);
  const midRef = useRef(null);
  const groundRef = useRef(null);
  const fgRef = useRef(null);
  const introObsRef = useRef(null);

  const g = useRef(null); // mutable game state, read inside the loop
  const phaseRef = useRef("intro");
  const foundRef = useRef(0);
  const inViewRef = useRef(true);
  const poseRef = useRef("");
  const widthRef = useRef(800);
  const reduceRef = useRef(false);

  const [phase, setPhase] = useState("intro"); // intro | playing | paused | reward | over | done
  const [cleared, setCleared] = useState(0);
  const [found, setFound] = useState(0);
  const [rewardIdx, setRewardIdx] = useState(-1);
  const [inView, setInView] = useState(true);
  const [announce, setAnnounce] = useState("");
  const [peek, setPeek] = useState(-1);

  const go = useCallback((p) => {
    phaseRef.current = p;
    setPhase(p);
  }, []);

  const setFoundBoth = useCallback((n) => {
    foundRef.current = n;
    setFound(n);
    saveFound(n);
  }, []);

  const setPose = useCallback((pose) => {
    const el = runnerRef.current;
    if (!el || poseRef.current === pose) return;
    poseRef.current = pose;
    el.className = `fr-runner fr-${pose}`;
  }, []);

  const placeRunner = useCallback((y = 0, x = PX) => {
    if (runnerRef.current)
      runnerRef.current.style.transform = `translate3d(${x}px,${-y}px,0)`;
    if (innerRef.current) innerRef.current.style.transform = "rotate(0deg)";
    if (shadowRef.current)
      shadowRef.current.style.transform = `translate3d(${x + 20}px,0,0)`;
  }, []);

  // Intro: the hero waits on the start line, a thorn waits ahead (hidden on narrow screens).
  const layoutIntro = useCallback(() => {
    const w = widthRef.current;
    placeRunner(0, PX);
    const ob = introObsRef.current;
    if (ob) {
      ob.el.style.transform = `translate3d(${Math.max(PX + 260, w - 90)}px,0,0)`;
      ob.el.style.display = w < 520 ? "none" : "";
    }
  }, [placeRunner]);

  /* ---- mount: storage, observers, decorative first frame ---- */
  useEffect(() => {
    const initial = readFound();
    foundRef.current = initial;
    setFound(initial);

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduceRef.current = mq.matches;
    const onMq = (e) => {
      reduceRef.current = e.matches;
    };
    mq.addEventListener?.("change", onMq);

    const world = worldRef.current;
    widthRef.current = world.clientWidth || 800;
    setPose("idle");
    introObsRef.current = addObstacle(obsRef.current, 400, OBSTACLES[0]);
    layoutIntro();

    const ro = new ResizeObserver(() => {
      widthRef.current = world.clientWidth || 800;
      if (phaseRef.current === "intro") layoutIntro();
    });
    ro.observe(world);

    const io = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting;
        setInView(entry.isIntersecting);
      },
      { threshold: 0.3 },
    );
    io.observe(rootRef.current);

    const obsLayer = obsRef.current;
    const partLayer = partRef.current;
    return () => {
      mq.removeEventListener?.("change", onMq);
      ro.disconnect();
      io.disconnect();
      clearLayer(obsLayer);
      clearLayer(partLayer);
    };
  }, [layoutIntro, setPose]);

  /* ---- actions ---- */
  const begin = useCallback(() => {
    if (!["intro", "over", "done"].includes(phaseRef.current)) return;
    let f = foundRef.current;
    if (f >= 10) {
      f = 0;
      setFoundBoth(0);
    }
    const base = f * 3; // a retry resumes at the last unlocked verse
    clearLayer(obsRef.current);
    clearLayer(partRef.current);
    introObsRef.current = null;
    g.current = {
      y: 0,
      vy: 0,
      air: false,
      buf: 0,
      land: 0,
      trail: 0,
      cleared: base,
      dist: g.current ? g.current.dist : 0,
      since: 0,
      gap: 60,
      dust: 0,
      obs: [],
    };
    // The first obstacle is already on screen, about 1.15s away: the first jump happens right away.
    const speed0 = 300 + base * 5;
    const def0 = OBSTACLES[0];
    const x0 = PX + speed0 * 1.15;
    g.current.obs.push(addObstacle(obsRef.current, x0, def0));
    g.current.gap = Math.max(
      40,
      def0.w + speed0 * 1.0 - (widthRef.current + 40 - x0),
    );
    poseRef.current = "";
    setPose("run");
    placeRunner();
    setCleared(base);
    setPeek(-1);
    setAnnounce("");
    const fromIntro = phaseRef.current === "intro";
    go("playing");
    if (fromIntro) {
      requestAnimationFrame(() => {
        const el = rootRef.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        if (r.top < 0 || r.bottom > window.innerHeight) {
          el.scrollIntoView({
            block: "center",
            behavior: reduceRef.current ? "auto" : "smooth",
          });
        }
      });
    }
  }, [go, placeRunner, setFoundBoth, setPose]);

  const keepGoing = useCallback(() => {
    if (g.current) g.current.buf = 0; // never carry a jump press across the overlay
    if (g.current && g.current.cleared >= TOTAL_CLEARS) {
      setPose("idle");
      setAnnounce("All ten verses discovered.");
      go("done");
    } else {
      go("playing");
    }
  }, [go, setPose]);

  const togglePause = useCallback(() => {
    if (phaseRef.current === "playing") go("paused");
    else if (phaseRef.current === "paused") go("playing");
  }, [go]);

  const press = useCallback(() => {
    if (phaseRef.current === "playing" && g.current) g.current.buf = 0.09;
  }, []);

  /* ---- keyboard (only while the game is active and on screen) ---- */
  useEffect(() => {
    const onKey = (e) => {
      const tg = e.target instanceof Node ? e.target : document.body;
      if (
        phaseRef.current === "intro" &&
        (e.code === "Space" || e.code === "Enter") &&
        rootRef.current &&
        rootRef.current.contains(tg) &&
        !(tg.closest && tg.closest("button"))
      ) {
        e.preventDefault();
        begin();
        return;
      }
      const active =
        phaseRef.current === "playing" || phaseRef.current === "paused";
      if (!active || !inViewRef.current) return;
      const t = tg;
      if (
        t &&
        t !== document.body &&
        rootRef.current &&
        !rootRef.current.contains(t) &&
        t.closest?.('input,textarea,select,button,a,[contenteditable="true"]')
      )
        return;

      if (e.code === "Escape" || e.code === "KeyP") {
        e.preventDefault();
        if (!e.repeat) togglePause();
        return;
      }
      if (e.code !== "Space" && e.code !== "ArrowUp") return;
      if (phaseRef.current !== "playing") return;
      if (t && t.closest?.("button")) return; // focused buttons keep their native behaviour
      e.preventDefault();
      if (!e.repeat) press();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [press, togglePause, begin]);

  /* ---- game loop ---- */
  useEffect(() => {
    if (phase !== "playing" || !inView) return undefined;
    let raf = 0;
    let last = 0;

    const step = (dt) => {
      const s = g.current;
      if (!s) return;
      const speed = 300 + Math.min(s.cleared, TOTAL_CLEARS) * 5;
      const layer = partRef.current;
      const fx = !reduceRef.current;

      // jump (with a short input buffer so early presses still count)
      if (s.buf > 0) {
        if (!s.air) {
          s.air = true;
          s.vy = JUMP_V;
          s.buf = 0;
          if (fx) burst(layer, PX + 24, 0, 7, "#c9758a", 0.9, 0.5);
        } else {
          s.buf -= dt;
        }
      }

      // physics (time based, so refresh rate doesn't matter)
      if (s.air) {
        s.vy -= GRAVITY * (s.vy < 0 ? 1.25 : 1) * dt;
        s.y += s.vy * dt;
        if (s.y <= 0) {
          s.y = 0;
          s.vy = 0;
          s.air = false;
          s.land = 0.14;
          if (fx) burst(layer, PX + 26, 0, 10, "#a8556a", 1.5, 0.35);
        }
      } else {
        s.land = Math.max(0, s.land - dt);
        s.dust -= dt;
        if (s.dust <= 0) {
          s.dust = 0.16;
          if (fx) burst(layer, PX + 18, 0, 1, "#8a4a5c", 0.5, 0.3);
        }
      }

      // a faint violet trail from the goggles
      s.trail -= dt;
      if (s.trail <= 0) {
        s.trail = 0.07;
        if (fx) burst(layer, PX + 6, s.y + 46, 1, "#a98bff", 0.25, 0.25);
      }

      // world scroll (three depths, plus the foreground)
      s.dist += speed * dt;
      if (groundRef.current)
        groundRef.current.style.backgroundPositionX = `${-s.dist}px`;
      if (fgRef.current)
        fgRef.current.style.backgroundPositionX = `${-s.dist * 1.3}px`;
      if (fx) {
        if (midRef.current)
          midRef.current.style.backgroundPositionX = `${-s.dist * 0.3}px`;
        if (farRef.current)
          farRef.current.style.backgroundPositionX = `${-s.dist * 0.1}px`;
      }

      // spawn
      s.since += speed * dt;
      if (s.since >= s.gap) {
        const pool = [0, 1];
        if (s.cleared >= 4) pool.push(2);
        if (s.cleared >= 12) pool.push(3);
        const def = OBSTACLES[pool[Math.floor(Math.random() * pool.length)]];
        s.obs.push(addObstacle(obsRef.current, widthRef.current + 40, def));
        s.since = 0;
        s.gap = def.w + speed * (0.85 + Math.random() * 0.7);
      }

      // move obstacles and test collisions
      const pl = PX + HB_L;
      const pr = pl + HB_W;
      let hit = false;
      for (const o of s.obs) {
        o.x -= speed * dt;
        o.el.style.transform = `translate3d(${o.x}px,0,0)`;
        if (pl < o.x + o.w - o.ins && pr > o.x + o.ins && s.y < o.h - 4)
          hit = true;
      }
      s.obs = s.obs.filter((o) => {
        if (o.x + o.w < -30) {
          o.el.remove();
          return false;
        }
        return true;
      });

      // runner visuals
      setPose(s.air ? "air" : s.land > 0 ? "land" : "run");
      placeRunner(s.y);
      if (innerRef.current) {
        const tilt = Math.max(-10, Math.min(12, -s.vy * 0.011));
        innerRef.current.style.transform = `rotate(${tilt}deg)`;
      }
      if (shadowRef.current) {
        shadowRef.current.style.transform = `translate3d(${PX + 20}px,0,0) scale(${Math.max(0.35, 1 - s.y / 220)})`;
      }

      if (hit) {
        if (fx) burst(layer, PX + 32, s.y + 20, 18, "#b8a6d8", 1.9, 1.4);
        setPose("hurt");
        setCleared(s.cleared);
        go("over");
        return;
      }

      // count each obstacle exactly once, only after it is fully behind the runner
      for (const o of s.obs) {
        if (!o.counted && o.x + o.w < pl) {
          o.counted = true;
          s.cleared += 1;
          setCleared(s.cleared);
          if (s.cleared % 3 === 0) {
            const idx = s.cleared / 3 - 1;
            if (idx + 1 > foundRef.current) setFoundBoth(idx + 1);
            if (fx)
              burst(
                layer,
                PX + 32,
                s.y + 34,
                40,
                idx % 2 ? "#b8a6d8" : "#fff0f1",
                2.8,
                2.2,
              );
            s.buf = 0;
            setPose("cheer");
            setRewardIdx(idx);
            setAnnounce(`Verse ${idx + 1} of 10 discovered: ${VERSES[idx][0]}`);
            go("reward");
            return;
          }
          if (fx) popPlus(layer, PX + 34, s.y + 74);
        }
      }
    };

    const tick = (t) => {
      if (!last) last = t;
      const dt = Math.min((t - last) / 1000, 0.034);
      last = t;
      step(dt);
      if (phaseRef.current === "playing") raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase, inView, go, placeRunner, setFoundBoth, setPose]);

  useEffect(() => {
    if (phase === "intro" || phase === "done") setPose("idle");
  }, [phase, setPose]);

  const focusRef = useCallback((el) => {
    if (el) el.focus({ preventScroll: true });
  }, []);

  const onWorldPointer = (e) => {
    if (e.target.closest && e.target.closest("button")) return; // UI taps never jump
    if (phaseRef.current === "intro") {
      begin();
      return;
    }
    press();
  };

  const stage = Math.min(3, Math.floor(cleared / 8));
  const ri = Math.max(0, rewardIdx);
  const m = MOTIFS[ri];
  const words = VERSES[ri][1].split(" ");
  const tRef = 0.95 + words.length * 0.06 + 0.15;
  const frozen = phase === "paused" || phase === "over";
  const nextText =
    phase === "intro"
      ? "10 verses to find"
      : cleared >= TOTAL_CLEARS
        ? "All ten found"
        : `Next verse in ${3 - (cleared % 3)}`;
  const lit =
    phase === "intro" ? 0 : Math.min(HEAD_LETTERS, Math.floor(cleared / 2));
  let li = 0;

  return (
    <section
      className="faith-run"
      ref={rootRef}
      aria-label="Little Faith Run, a small jumping game"
    >
      <style>{CSS}</style>
      <div className="fr-sr" aria-live="polite">
        {announce}
      </div>

      <div className="fr-shell">
        <header className={`fr-top ${phase === "intro" ? "is-intro" : ""}`}>
          <h2 className="fr-h" aria-label="Wanna play a game?">
            {HEAD_ROWS.map((row, r) => (
              <span className="fr-row" key={r} aria-hidden="true">
                {row.map((word, wi) => (
                  <span className="fr-word" key={wi}>
                    {word.split("").map((ch) => {
                      const i = li;
                      li += 1;
                      return (
                        <span
                          key={i}
                          className={`fr-l ${i < lit ? "lit" : ""}`}
                          style={{ "--i": i }}
                        >
                          {ch}
                        </span>
                      );
                    })}
                  </span>
                ))}
              </span>
            ))}
          </h2>
          <div className="fr-info">
            <p className="fr-sub">
              Jump until you discover something worth keeping.
            </p>
            <p className="fr-how">
              Every 3 obstacles you overcome, unlock a Bible verse. Collect all
              10 as you play!
            </p>
            <p className="fr-keys">
              Jump with <kbd>Space</kbd> <kbd>↑</kbd> or a tap. Press{" "}
              <kbd>P</kbd> to pause.
            </p>
          </div>
        </header>
        <>
          <div className="fr-hud">
            <div className="fr-title">
              Little Faith Run <span className="fr-next">{nextText}</span>
            </div>
            <div className="fr-stats">
              <div className="fr-stat">
                <strong key={cleared} className="fr-bump">
                  {cleared}
                </strong>
                <small>/ 30</small>
              </div>
              <div className="fr-stat">
                <strong key={`f${found}`} className="fr-bump">
                  {found}
                </strong>
                <small>/ 10 verses</small>
              </div>
              <button
                className="fr-btn-ghost"
                onClick={togglePause}
                disabled={phase !== "playing" && phase !== "paused"}
              >
                {phase === "paused" ? "Resume" : "Pause"}
              </button>
            </div>
          </div>
          <div
            className="fr-progress"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={TOTAL_CLEARS}
            aria-valuenow={cleared}
            aria-label="Obstacles cleared"
          >
            <div style={{ width: `${(cleared / TOTAL_CLEARS) * 100}%` }} />
            {VERSES.map((_, i) => (
              <i
                key={i}
                className={`fr-ms ${i < found ? "on" : ""}`}
                style={{ left: `${(i + 1) * 10}%` }}
              />
            ))}
          </div>
        </>

        <div
          ref={worldRef}
          className={`fr-world ${frozen ? "fr-frozen" : ""} ${phase === "over" ? "fr-hit" : ""}`}
          style={{ "--glow": stage / 3 }}
          tabIndex={0}
          role="group"
          aria-label="Game area. Press Space or Arrow Up, or tap, to jump. Press P to pause."
          onPointerDown={onWorldPointer}
        >
          <div className="fr-sky" />
          <div className="fr-moon" />
          <span className="fr-star s1">✦</span>
          <span className="fr-star s2">✧</span>
          <span className="fr-star s3">✦</span>
          <span className="fr-star s4">✧</span>
          <div
            className="fr-layer fr-far"
            ref={farRef}
            style={{ backgroundImage: FAR_BG }}
          />
          <div
            className="fr-layer fr-mid"
            ref={midRef}
            style={{ backgroundImage: MID_BG }}
          />
          <div className="fr-fog" />
          {Array.from({ length: 7 }, (_, i) => (
            <i
              key={i}
              className="fr-amb"
              style={{ left: `${(i * 29 + 8) % 96}%`, "--i": i }}
            />
          ))}
          <div
            className="fr-ground"
            ref={groundRef}
            style={{ backgroundImage: GROUND_BG }}
          />
          <div className="fr-obs-layer" ref={obsRef} />
          <div className="fr-shadow" ref={shadowRef} />
          <div className="fr-runner fr-idle" ref={runnerRef}>
            <div className="fr-runner-in" ref={innerRef}>
              <Hero />
            </div>
          </div>
          <div className="fr-part-layer" ref={partRef} />
          <div
            className="fr-fg"
            ref={fgRef}
            style={{ backgroundImage: FG_BG }}
          />
          <div className="fr-vig" />

          {phase === "intro" && (
            <div className="fr-start">
              <button className="fr-btn fr-btn-lg" onClick={begin}>
                {found >= 10
                  ? "Play again"
                  : found > 0
                    ? "Continue running"
                    : "Start running"}
              </button>
              <p className="fr-start-hint">Then jump with Space, ↑ or a tap</p>
              {found > 0 && (
                <div className="fr-found">
                  <Dots count={found} /> {found} of 10 found this visit
                </div>
              )}
            </div>
          )}

          {phase === "paused" && (
            <div className="fr-overlay">
              <div className="fr-box">
                <h3>Paused</h3>
                <p>The world is holding still. Take your time.</p>
                <button ref={focusRef} className="fr-btn" onClick={togglePause}>
                  Resume
                </button>
              </div>
            </div>
          )}

          {phase === "over" && (
            <>
              <div className="fr-hurtflash" />
              <div className="fr-overlay">
                <div className="fr-box">
                  <h3>Take a breath.</h3>
                  <p>
                    You made it to {cleared}{" "}
                    {cleared === 1 ? "clear" : "clears"}.
                    {found > 0
                      ? ` ${found === 1 ? "The verse you found stays" : `The ${found} verses you found stay`} with you.`
                      : " The first verse is only 3 clears away."}
                  </p>
                  <button ref={focusRef} className="fr-btn" onClick={begin}>
                    Try again
                  </button>
                </div>
              </div>
            </>
          )}

          {phase === "reward" && rewardIdx >= 0 && (
            <div
              className="fr-overlay fr-reveal"
              key={rewardIdx}
              data-v={rewardIdx % 4}
              style={{ "--a": m.a, "--b": m.b }}
            >
              <Scene id={m.scene} />
              <Motif kind={m.kind} />
              <div className="fr-flash" />
              <div
                className="fr-card"
                role="dialog"
                aria-label={`Verse ${rewardIdx + 1} of 10, ${VERSES[rewardIdx][0]}`}
              >
                <div className="fr-kick">
                  {rewardIdx === 9
                    ? "THIRTY OBSTACLES. TEN BLESSINGS."
                    : `${COUNT_WORDS[rewardIdx]} OBSTACLES. ONE LITTLE BLESSING.`}
                </div>
                <blockquote className="fr-quote">
                  {words.map((w, i) => (
                    <span key={i}>
                      <span className="fr-w" style={{ "--i": i }}>
                        {w}
                      </span>{" "}
                    </span>
                  ))}
                </blockquote>
                <cite className="fr-ref" style={{ animationDelay: `${tRef}s` }}>
                  — {VERSES[rewardIdx][0]}
                </cite>
                <p
                  className="fr-note"
                  style={{ animationDelay: `${tRef + 0.25}s` }}
                >
                  {m.note}
                </p>
                <div
                  className="fr-foot"
                  style={{ animationDelay: `${tRef + 0.5}s` }}
                >
                  <button ref={focusRef} className="fr-btn" onClick={keepGoing}>
                    {cleared >= TOTAL_CLEARS ? "Finish the run" : "Keep going"}
                  </button>
                  <span className="fr-count">
                    Verse {rewardIdx + 1} of 10 <Dots count={rewardIdx + 1} />
                  </span>
                </div>
              </div>
            </div>
          )}

          {phase === "done" && (
            <div
              className="fr-overlay fr-reveal"
              data-v="0"
              style={{
                "--a": "var(--fr-lavender)",
                "--b": "var(--fr-red)",
                backgroundColor: "var(--fr-bg)",
                color: "var(--fr-muted)",
              }}
            >
              <Scene id="lantern" />
              <Motif kind="twinkle" />
              <div className="fr-flash" />

              <div
                className="fr-card fr-card-done"
                style={{
                  backgroundColor: "var(--fr-panel)",
                  color: "var(--fr-muted)",
                  border: "1px solid var(--fr-line)",
                }}
              >
                <div className="fr-kick" style={{ color: "var(--fr-crimson)" }}>
                  YOU KEPT ALL TEN.
                </div>

                <p
                  className="fr-note fr-note-show"
                  style={{ color: "var(--fr-muted)" }}
                >
                  Thirty clears, ten verses, one small lantern still lit. Tap
                  any reference to read it again.
                </p>

                <div className="fr-chips">
                  {VERSES.map((v, i) => (
                    <button
                      key={v[0]}
                      type="button"
                      className={`fr-chip ${peek === i ? "on" : ""}`}
                      onClick={() => setPeek(peek === i ? -1 : i)}
                      aria-pressed={peek === i}
                      style={{
                        backgroundColor:
                          peek === i ? "var(--fr-crimson)" : "var(--fr-soft)",
                        color:
                          peek === i ? "var(--fr-panel)" : "var(--fr-crimson)",
                        border: "1px solid var(--fr-line)",
                      }}
                    >
                      {v[0]}
                    </button>
                  ))}
                </div>

                {peek >= 0 && (
                  <p
                    className="fr-peek"
                    style={{
                      backgroundColor: "var(--fr-bg)",
                      color: "var(--fr-muted)",
                      border: "1px solid var(--fr-line)",
                    }}
                  >
                    {VERSES[peek][1]}
                  </p>
                )}

                <button
                  ref={focusRef}
                  type="button"
                  className="fr-btn"
                  onClick={begin}
                  style={{
                    backgroundColor: "var(--fr-crimson)",
                    color: "var(--fr-panel)",
                    border: "1px solid var(--fr-crimson)",
                  }}
                >
                  Play again
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Styles (scoped under .faith-run)                                   */
/* ------------------------------------------------------------------ */

const CSS = `
.faith-run {
  --fr-crimson: #7E6281;
  --fr-red: #927AA7;
  --fr-violet: #927AA7;

  /* Warm cream backgrounds */
  --fr-bg: #F6F0E8;
  --fr-panel: #FFFCF8;

  /* Borders and text */
  --fr-line: #E4D9E4;
  --fr-ivory: #6B626D;
  --fr-muted: #49414B;

  /* Lavender accents */
  --fr-soft: #EAE2F1;
  --fr-lavender: #D8CBE8;
}

.faith-run *, .faith-run *::before, .faith-run *::after { box-sizing: border-box; }
.faith-run button { font: inherit; }
.fr-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
.fr-shell { overflow: hidden; border: 1px solid var(--fr-line); border-radius: 12px; background: var(--fr-bg); box-shadow: 0 18px 50px rgba(81, 54, 83, .08); }

/* buttons */
.fr-btn {
  border: 1px solid var(--fr-crimson); background: var(--fr-crimson); color: #FFFCF8;
  padding: 12px 20px; border-radius: 9px; font-weight: 700; font-size: 15px; letter-spacing: .01em;
  cursor: pointer; transition: transform .15s, box-shadow .15s, background .15s;
  box-shadow: 0 5px 14px rgba(81, 54, 83, .16);
}
.fr-btn:hover { transform: translateY(-1px); }
.fr-btn:active { transform: translateY(2px); box-shadow: 0 1px 0 #7d2434; }
.fr-btn-lg { padding: 16px 34px; font-size: 20px; }
.fr-btn-ghost {
  border: 1px solid var(--fr-line); background: transparent; color: var(--fr-ivory);
  padding: 8px 15px; border-radius: 9px; font-size: 16px; font-weight: 700; cursor: pointer;
}
.fr-btn-ghost:hover:not(:disabled) { border-color: var(--fr-red); }
.fr-btn-ghost:disabled { opacity: .4; cursor: default; }
.fr-btn:focus-visible, .fr-btn-ghost:focus-visible, .fr-chip:focus-visible { outline: 3px solid var(--fr-violet); outline-offset: 2px; }

/* HUD */
.fr-hud { display: flex; justify-content: space-between; align-items: center; gap: 8px 12px; flex-wrap: wrap; padding: 10px clamp(14px, 2.4cqw, 28px); }
.fr-title { font-family: var(--fr-display); font-size: 24px; letter-spacing: .01em; display: flex; align-items: baseline; gap: 10px; flex-wrap: wrap; }
.fr-next { font-family: system-ui, sans-serif; font-size: 17px; color: var(--fr-ivory); letter-spacing: 0; }
.fr-stats { display: flex; align-items: center; gap: 8px; }
.fr-stat { display: flex; align-items: baseline; gap: 5px; padding: 5px 13px; border: 1px solid var(--fr-line); border-radius: 9px; background: var(--fr-panel); }
.fr-stat strong { font-size: 24px; font-variant-numeric: tabular-nums; display: inline-block; }
.fr-bump { animation: fr-bump .35s ease-out; }
@keyframes fr-bump { 40% { transform: scale(1.35); color: #b8a6d8; } }
.fr-stat small { font-size: 16px; color: var(--fr-muted); }
.fr-progress { position: relative; height: 6px; background: #2a1520; }
.fr-progress > div { height: 100%; background: linear-gradient(90deg, var(--fr-crimson), var(--fr-red)); transition: width .25s; }
.fr-ms { position: absolute; top: -1px; width: 8px; height: 8px; margin-left: -4px; border-radius: 50%; background: #160c12; border: 1.5px solid #6a3447; }
.fr-ms.on { background: #b8a6d8; border-color: #fff0f1; box-shadow: 0 0 8px #b8a6d8; }

/* stage */
.fr-world { position: relative; height: clamp(340px, 33cqw, 460px); overflow: hidden; cursor: pointer; touch-action: manipulation; user-select: none; -webkit-user-select: none; outline: none; }
.fr-world:focus-visible { box-shadow: inset 0 0 0 3px var(--fr-violet); }
.fr-sky { position: absolute; inset: 0; background: linear-gradient(180deg, #D8CBE8 0%, #EAE2F1 52%, #F6F0E8 100%); }
.fr-sky::after { content: ""; position: absolute; inset: 0; background: linear-gradient(180deg, transparent 25%, #b2475a 100%); opacity: calc(var(--glow) * .5); transition: opacity 2.5s; }
.fr-moon {
  position: absolute; right: 11%; top: 26px; width: 56px; height: 56px; border-radius: 50%;
  background: radial-gradient(circle at 35% 32%, #f7d6d2, #c98796 62%, #8c4558);
  box-shadow: 0 0 46px 10px #8875ad30, 0 0 120px 40px #8875ad14;
  transform: translateY(calc(var(--glow) * 52px)); transition: transform 2.5s;
}
.fr-star { position: absolute; color: #c08ea0; font-size: 10px; animation: fr-twinkle 3.4s ease-in-out infinite; }
.fr-star.s1 { top: 36px; left: 46%; }
.fr-star.s2 { top: 90px; left: 58%; animation-delay: -1s; }
.fr-star.s3 { top: 52px; left: 70%; animation-delay: -2s; }
.fr-star.s4 { top: 120px; left: 86%; animation-delay: -.5s; }
@keyframes fr-twinkle { 50% { opacity: .35; } }
.fr-layer { position: absolute; left: 0; right: 0; background-repeat: repeat-x; background-position: 0 100%; }
.fr-far { z-index: 1; bottom: 52px; height: 170px; background-size: 640px 170px; opacity: .9; }
.fr-mid { z-index: 2; bottom: 52px; height: 110px; background-size: 420px 110px; }
.fr-fog {
  position: absolute; z-index: 3; left: 0; right: 0; bottom: 48px; height: 96px; pointer-events: none;
  background: radial-gradient(ellipse at 20% 100%, #9a3a4e40, transparent 60%), radial-gradient(ellipse at 78% 100%, #b2475a30, transparent 60%);
  animation: fr-fog 16s ease-in-out infinite alternate;
}
@keyframes fr-fog { to { transform: translateX(-10%); } }
.fr-amb { position: absolute; z-index: 3; bottom: 52px; width: 3px; height: 3px; border-radius: 50%; background: #b8a6d8; opacity: 0; box-shadow: 0 0 6px #b8a6d8; animation: fr-amb 7s linear infinite; animation-delay: calc(var(--i) * -1.1s); }
@keyframes fr-amb { 0% { opacity: 0; transform: translate(0, 0); } 20% { opacity: .6; } 100% { opacity: 0; transform: translate(26px, -170px); } }
.fr-ground { position: absolute; z-index: 4; left: 0; right: 0; bottom: 0; height: 52px; background-repeat: repeat-x; background-size: 120px 52px; }
.fr-obs-layer, .fr-part-layer { position: absolute; inset: 0; pointer-events: none; }
.fr-obs-layer { z-index: 5; }
.fr-part-layer { z-index: 7; }
.fr-ob { position: absolute; left: 0; bottom: 52px; will-change: transform; filter: drop-shadow(0 0 6px #b8a6d845); }
.fr-ob svg { display: block; }
.fr-shadow { position: absolute; z-index: 5; left: 0; bottom: 48px; width: 26px; height: 7px; border-radius: 50%; background: #927aa7; opacity: .28; }
.fr-runner { position: absolute; z-index: 6; left: 0; bottom: 44px; width: 64px; height: 76px; will-change: transform; }
.fr-runner-in { width: 100%; height: 100%; transform-origin: 50% 80%; }
.fr-hero { display: block; overflow: visible; transform-origin: 50% 90%; }
.fr-lensg { filter: drop-shadow(0 0 3px #a98bff); }
.fr-fg { position: absolute; z-index: 8; left: 0; right: 0; bottom: 0; height: 18px; pointer-events: none; background-repeat: repeat-x; background-size: 90px 18px; background-position: 0 100%; opacity: 0; }
.fr-vig { position: absolute; inset: 0; z-index: 9; pointer-events: none; background: radial-gradient(ellipse at 50% 55%, transparent 55%, #927aa733 100%); }

.fr-p { position: absolute; width: var(--s, 5px); height: var(--s, 5px); border-radius: 50%; background: var(--c, #c9758a); opacity: 0; animation: fr-puff .55s ease-out forwards; }
@keyframes fr-puff { from { opacity: .9; transform: translate(0, 0) scale(1); } to { opacity: 0; transform: translate(var(--dx), calc(var(--dy) * -1)) scale(.3); } }
.fr-plus { position: absolute; font: 900 15px var(--fr-display); color: #b8a6d8; text-shadow: 0 0 8px #b8a6d899; animation: fr-plus .75s ease-out forwards; }
@keyframes fr-plus { from { opacity: 1; transform: translateY(0) scale(.8); } to { opacity: 0; transform: translateY(-34px) scale(1.2); } }

/* character animation */
.fr-leg, .fr-arm { transition: transform .1s; }
.fr-leg { transform-origin: 32px 48px; }
.fr-arm { transform-origin: 32px 31px; }
.fr-scarf { transform-origin: 27px 29px; --sb: 0deg; animation: fr-flap .6s ease-in-out infinite alternate; }
.fr-lantern { transform-origin: 25px 46px; --sw: 9deg; animation: fr-swing 1.5s ease-in-out infinite alternate; }
.fr-lglow { animation: fr-pulse 2.2s ease-in-out infinite; }
.fr-head { transform-origin: 33px 28px; transition: transform .12s; }
.fr-eye { transform-origin: 40px 15.5px; animation: fr-blink 4.6s infinite; }
.fr-tuft { transform-origin: 31px 5px; animation: fr-tuft 1.2s ease-in-out infinite alternate; }
.fr-m-open, .fr-m-ouch { display: none; }

.fr-run .fr-leg.a { animation: fr-stride .21s ease-in-out infinite alternate; }
.fr-run .fr-leg.b { animation: fr-stride .21s ease-in-out infinite alternate-reverse; }
.fr-run .fr-arm.a { animation: fr-armswing .21s ease-in-out infinite alternate-reverse; }
.fr-run .fr-arm.b { animation: fr-armswing .21s ease-in-out infinite alternate; }
.fr-run .fr-hero { animation: fr-bob .21s ease-in-out infinite alternate; }
.fr-run .fr-scarf { --sb: -6deg; animation-duration: .16s; }
.fr-run .fr-lantern { --sw: 24deg; animation-duration: .21s; }
.fr-run .fr-head { transform: rotate(2deg); }

.fr-air .fr-leg.a { transform: rotate(-54deg); }
.fr-air .fr-leg.b { transform: rotate(32deg); }
.fr-air .fr-arm.a { transform: rotate(-135deg); }
.fr-air .fr-arm.b { transform: rotate(72deg); }
.fr-air .fr-scarf { --sb: -18deg; }
.fr-air .fr-lantern { --sw: 6deg; }
.fr-air .fr-m-smile, .fr-cheer .fr-m-smile { display: none; }
.fr-air .fr-m-open, .fr-cheer .fr-m-open { display: block; }

.fr-land .fr-hero { transform: scale(1.14, .84); }
.fr-land .fr-leg.a { transform: rotate(-24deg); }
.fr-land .fr-leg.b { transform: rotate(20deg); }

.fr-idle .fr-hero { animation: fr-breathe 2.4s ease-in-out infinite; }
.fr-idle .fr-arm.a { transform: rotate(8deg); }
.fr-idle .fr-arm.b { transform: rotate(-6deg); }

.fr-cheer .fr-hero { animation: fr-hop .45s ease-in-out infinite alternate; }
.fr-cheer .fr-arm.a { transform: rotate(-160deg); }
.fr-cheer .fr-arm.b { transform: rotate(150deg); }
.fr-cheer .fr-leg.a { transform: rotate(-16deg); }
.fr-cheer .fr-leg.b { transform: rotate(14deg); }

.fr-hurt .fr-hero { filter: saturate(.55); animation: fr-ouch .4s ease-out forwards; }
.fr-hurt .fr-head { transform: translateY(2px) rotate(-8deg); }
.fr-hurt .fr-leg.a { transform: rotate(-12deg); }
.fr-hurt .fr-leg.b { transform: rotate(14deg); }
.fr-hurt .fr-arm.a { transform: rotate(-70deg); }
.fr-hurt .fr-arm.b { transform: rotate(60deg); }
.fr-hurt .fr-m-smile { display: none; }
.fr-hurt .fr-m-ouch { display: block; }
.fr-hurt .fr-eye { animation: none; transform: scaleY(.2); }

.fr-frozen .fr-hero, .fr-frozen .fr-hero *, .fr-frozen .fr-star, .fr-frozen .fr-amb { animation-play-state: paused; }
.fr-hit { animation: fr-shake .32s; }
.fr-hurtflash { position: absolute; inset: 0; z-index: 9; pointer-events: none; background: radial-gradient(ellipse at 30% 60%, #b8a6d866, transparent 70%); animation: fr-hurtf .6s ease-out forwards; }
@keyframes fr-hurtf { from { opacity: 1; } to { opacity: 0; } }

@keyframes fr-stride { from { transform: rotate(-44deg); } to { transform: rotate(44deg); } }
@keyframes fr-armswing { from { transform: rotate(-48deg); } to { transform: rotate(48deg); } }
@keyframes fr-bob { from { transform: translateY(0) rotate(2deg); } to { transform: translateY(-2.5px) rotate(4deg); } }
@keyframes fr-breathe { 50% { transform: scaleY(1.025); } }
@keyframes fr-hop { from { transform: translateY(0); } to { transform: translateY(-5px); } }
@keyframes fr-ouch { from { transform: rotate(0) translateX(0); } to { transform: rotate(-14deg) translateX(-6px); } }
@keyframes fr-flap { from { transform: rotate(calc(var(--sb) - 6deg)); } to { transform: rotate(calc(var(--sb) + 6deg)); } }
@keyframes fr-swing { from { transform: rotate(calc(var(--sw) * -1)); } to { transform: rotate(var(--sw)); } }
@keyframes fr-pulse { 50% { opacity: .65; } }
@keyframes fr-blink { 0%, 94%, 100% { transform: scaleY(1); } 97% { transform: scaleY(.1); } }
@keyframes fr-tuft { from { transform: rotate(-8deg); } to { transform: rotate(10deg); } }
@keyframes fr-shake { 20% { transform: translateX(-5px); } 40% { transform: translateX(5px); } 60% { transform: translateX(-3px); } 80% { transform: translateX(3px); } }

/* header: headline and explanation each own their space; the headline letters light up as you progress */
.fr-top {
  display: grid; grid-template-columns: auto minmax(280px, 1fr); align-items: center;
  gap: clamp(20px, 3.2cqw, 52px);
  padding: clamp(24px, 3.2cqw, 44px) clamp(18px, 3.4cqw, 48px) clamp(22px, 2.2cqw, 34px);
  background: var(--fr-panel);
  border-bottom: 1px solid var(--fr-line);
}
.fr-h {
  margin: 0; font-family: var(--fr-display); font-weight: 800; white-space: nowrap;
  font-size: clamp(38px, 5vw, 62px); font-size: clamp(38px, 5cqw, 62px);
  line-height: .92; letter-spacing: -.045em; color: var(--fr-crimson);
  transform: rotate(-1.5deg); transform-origin: 0 100%; padding-bottom: .06em;
}
.fr-row { display: block; }
.fr-word { display: inline-block; margin-right: .22em; }
.fr-l {
  display: inline-block; color: transparent; -webkit-text-stroke: 1.5px #b8a6d877;
  transition: color .5s, text-shadow .5s, -webkit-text-stroke-color .5s;
}
.fr-l.lit { color: #8875adaa; -webkit-text-stroke-color: #b8a6d8; text-shadow: 0 0 28px #8875ad99; animation: fr-lit .7s ease-out; }
@keyframes fr-lit { 0% { transform: scale(1.2); color: #fff0f1; } 100% { transform: none; } }
.is-intro .fr-l {
  color: var(--fr-ivory); -webkit-text-stroke-width: 0;
  text-shadow: 2px 2px 0 var(--fr-crimson), 4px 4px 0 #5a1426, 8px 8px 20px #000a;
  animation: fr-pop .55s calc(var(--i) * 35ms) cubic-bezier(.2, 1.5, .4, 1) both;
}
@keyframes fr-pop { from { opacity: 0; transform: translateY(26px) scale(.6) rotate(-8deg); } to { opacity: 1; transform: none; } }

.fr-info { padding-left: clamp(18px, 2.2cqw, 32px); border-left: 3px solid var(--fr-crimson); max-width: 62ch; }
.fr-sub { margin: 0; font-family: var(--fr-serif); font-style: italic; font-size: clamp(21px, 1.9cqw, 28px); line-height: 1.35; color: var(--fr-ivory); }
.fr-how { margin: 10px 0 0; font-size: clamp(18px, 1.55cqw, 21px); line-height: 1.55; color: var(--fr-ivory); }
.fr-keys { margin: 12px 0 0; font-size: 17px; line-height: 1.8; color: var(--fr-muted); }
.fr-keys kbd { padding: 2px 9px; border: 1px solid var(--fr-line); border-bottom-width: 3px; border-radius: 7px; background: var(--fr-panel); font: 700 15px system-ui, sans-serif; color: var(--fr-ivory); }
@container (max-width: 819px) {
  .fr-top { grid-template-columns: minmax(0, 1fr); gap: 16px; padding: 22px 18px 20px; }
  .fr-h { font-size: clamp(38px, 11cqw, 62px); }
  .fr-info { padding-left: 14px; }
}
@media (prefers-reduced-motion: reduce) {
  .faith-run *, .faith-run *::before, .faith-run *::after { animation-duration: .001ms !important; animation-iteration-count: 1 !important; scroll-behavior: auto !important; transition-duration: .001ms !important; }
}

/* start prompt, centred in the stage between the hero and the thorn */
.fr-start { position: absolute; z-index: 10; left: 50%; top: 42%; transform: translate(-50%, -50%); text-align: center; width: max-content; max-width: 90%; }
.fr-start-hint { margin: 12px 0 0; font-size: 17px; color: var(--fr-ivory); }
.fr-found { display: flex; justify-content: center; align-items: center; gap: 8px; margin-top: 10px; font-size: 16px; color: var(--fr-muted); }

/* overlays */
.fr-overlay { position: absolute; inset: 0; z-index: 10; display: flex; padding: 10px; overflow: auto; text-align: center; cursor: default; background: #d8cbe8e8; backdrop-filter: blur(5px); }
.fr-box { margin: auto; max-width: 420px; }
.fr-box h3 { margin: 0 0 6px; font-family: var(--fr-display); font-weight: 900; font-size: clamp(28px, 6vw, 40px); letter-spacing: -.01em; line-height: 1; }
.fr-box p { margin: 0 auto 18px; color: var(--fr-ivory); font-size: 19px; line-height: 1.55; }

/* verse reveal */
.fr-reveal { background: transparent; backdrop-filter: none; }
.fr-reveal::before { content: ""; position: absolute; inset: 0; z-index: 0; background: radial-gradient(ellipse at 50% 45%, #fffaf0e8, #d8cbe8e8 80%); animation: fr-dimin .5s .12s both; }
@keyframes fr-dimin { from { opacity: 0; } to { opacity: 1; } }
.fr-flash { position: absolute; inset: 0; z-index: 4; pointer-events: none; background: radial-gradient(circle at 50% 50%, #fff0f1, var(--a) 38%, transparent 78%); animation: fr-flash .75s ease-out forwards; }
@keyframes fr-flash { 0% { opacity: .95; } 100% { opacity: 0; } }
.fr-scene { position: absolute; inset: 0; z-index: 1; width: 100%; height: 100%; pointer-events: none; opacity: 0; animation: fr-scene-in 1.3s .3s ease-out forwards; }
@keyframes fr-scene-in { from { opacity: 0; transform: translateY(24px) scale(1.06); } to { opacity: .95; transform: none; } }
.fr-scene .sa { fill: var(--a); }
.fr-scene .sb { fill: var(--b); }
.fr-scene .sd { fill: #1a0a11; }
.fr-scene .sdd { fill: #2c1020; }
.fr-scene .sl { fill: #fff0f1; }
.fr-scene .la { stroke: var(--a); fill: none; }
.fr-scene .lb { stroke: var(--b); fill: none; }
.fr-scene .stem { stroke: #6a2a40; stroke-width: 2.5; }
.fr-scene .sunrise { animation: fr-sunrise 1.8s .3s cubic-bezier(.2, .8, .3, 1) both; }
@keyframes fr-sunrise { from { transform: translateY(56px); } to { transform: none; } }
.fr-scene .tw { animation: fr-sctw 2.6s ease-in-out infinite; }
@keyframes fr-sctw { 50% { opacity: .35; transform: scale(.82); } }
.fr-scene .sway { animation: fr-sway 3.2s ease-in-out infinite alternate; }
@keyframes fr-sway { from { transform: rotate(-3deg); } to { transform: rotate(3deg); } }
.fr-scene .flick { animation: fr-flick .7s ease-in-out infinite alternate; }
@keyframes fr-flick { from { transform: scale(1, .94); } to { transform: scale(.94, 1.06); } }
.fr-scene .ring { animation: fr-ring 2.7s ease-out infinite; opacity: 0; }
@keyframes fr-ring { from { opacity: .7; transform: scale(1); } to { opacity: 0; transform: scale(2.4); } }
.fr-scene .beat { animation: fr-beat 1.3s ease-in-out infinite; }
@keyframes fr-beat { 15% { transform: scale(1.08); } 30% { transform: scale(1); } 45% { transform: scale(1.05); } }
.fr-scene .float { animation: fr-float 3s ease-in-out infinite alternate; }
@keyframes fr-float { from { transform: translateY(5px); } to { transform: translateY(-6px); } }
.fr-scene .flap { animation: fr-flapw .9s ease-in-out infinite alternate; }
@keyframes fr-flapw { from { transform: rotate(8deg); } to { transform: rotate(-18deg); } }
.fr-scene .swing { animation: fr-lswing 2.4s ease-in-out infinite alternate; }
@keyframes fr-lswing { from { transform: rotate(-4deg); } to { transform: rotate(4deg); } }
.fr-scene .dash { animation: fr-dash 1.6s linear infinite; }
@keyframes fr-dash { to { stroke-dashoffset: -36; } }

.fr-card {
  position: relative; z-index: 2; margin: auto; width: 100%; max-width: 560px; padding: 16px 20px 18px;
  border: 1px solid color-mix(in srgb, var(--a) 50%, #49232f); border-radius: 18px;
  background: linear-gradient(145deg, #fffaf0f5, #e8dcf4f2); backdrop-filter: blur(6px);
  box-shadow: 0 0 70px -10px var(--a);
  animation: fr-card-in .55s .35s cubic-bezier(.2, .9, .3, 1) both;
}
@keyframes fr-card-in { from { opacity: 0; transform: translateY(16px) scale(.95); } to { opacity: 1; transform: none; } }
.fr-kick {
  font-family: var(--fr-display); font-weight: 900; text-transform: uppercase;
  font-size: clamp(19px, 2.6cqw, 36px); line-height: 1.05; letter-spacing: .01em; color: #75639a;
  text-shadow: 0 0 22px color-mix(in srgb, var(--a) 60%, transparent);
  animation: fr-kick-a .6s .45s cubic-bezier(.2, 1.4, .4, 1) both;
}
@keyframes fr-kick-a { from { opacity: 0; transform: scale(1.6); letter-spacing: .1em; } to { opacity: 1; transform: none; } }
.fr-reveal[data-v="1"] .fr-kick { animation-name: fr-kick-b; }
.fr-reveal[data-v="2"] .fr-kick { animation-name: fr-kick-c; }
.fr-reveal[data-v="3"] .fr-kick { animation-name: fr-kick-d; }
@keyframes fr-kick-b { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: none; } }
@keyframes fr-kick-c { from { opacity: 0; letter-spacing: .35em; filter: blur(6px); } to { opacity: 1; letter-spacing: .01em; filter: none; } }
@keyframes fr-kick-d { from { clip-path: inset(0 100% 0 0); } to { clip-path: inset(0 0 0 0); } }

.fr-quote { margin: 12px 0 8px; font-family: var(--fr-serif); font-style: italic; font-size: clamp(20px, 2.3cqw, 32px); line-height: 1.4; color: var(--fr-ivory); }
.fr-w { display: inline-block; animation: fr-word-a .6s both; animation-delay: calc(var(--i) * 60ms + 950ms); }
@keyframes fr-word-a { from { opacity: 0; filter: blur(7px); transform: translateY(6px); } to { opacity: 1; filter: none; transform: none; } }
.fr-reveal[data-v="1"] .fr-w { animation-name: fr-word-b; }
.fr-reveal[data-v="2"] .fr-w { animation-name: fr-word-c; }
.fr-reveal[data-v="3"] .fr-w { animation-name: fr-word-d; }
@keyframes fr-word-b { from { opacity: 0; transform: translateX(-14px); } to { opacity: 1; transform: none; } }
@keyframes fr-word-c { from { opacity: 0; transform: scale(.4); } to { opacity: 1; transform: none; } }
@keyframes fr-word-d { from { opacity: 0; transform: translateY(-16px) rotate(-4deg); } to { opacity: 1; transform: none; } }
.fr-ref, .fr-note, .fr-foot { animation: fr-fade .6s both; }
@keyframes fr-fade { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
.fr-ref { display: block; font-style: normal; font-weight: 800; font-size: clamp(18px, 1.6cqw, 22px); letter-spacing: .03em; color: #75639a; }
.fr-note { margin: 10px auto 12px; max-width: 44ch; font-size: clamp(17px, 1.45cqw, 20px); line-height: 1.55; color: var(--fr-ivory); }
.fr-note-show { animation: none; }
.fr-foot { display: flex; justify-content: center; align-items: center; flex-wrap: wrap; gap: 10px 16px; }
.fr-count { display: inline-flex; align-items: center; gap: 8px; font-size: 16px; color: var(--fr-ivory); }
.fr-dots { display: inline-flex; gap: 4px; }
.fr-dot { width: 6px; height: 6px; border-radius: 50%; background: #51303d; }
.fr-dot.on { background: var(--a, #b8a6d8); }

/* done screen */
.fr-card-done { max-width: 580px; }
.fr-chips { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; margin-bottom: 14px; }
.fr-chip { border: 1px solid var(--fr-line); background: #14090f99; color: var(--fr-ivory); padding: 8px 14px; border-radius: 99px; font-size: 15px; cursor: pointer; }
.fr-chip:hover, .fr-chip.on { border-color: var(--a); color: var(--a); }
.fr-peek { margin: 0 auto 12px; max-width: 46ch; font-family: var(--fr-serif); font-style: italic; font-size: 19px; line-height: 1.45; }

/* particle motifs */
.fr-m { position: absolute; inset: 0; z-index: 1; overflow: hidden; pointer-events: none; }
.fr-m-rays::before { content: ""; position: absolute; inset: -40%; background: repeating-conic-gradient(from 0deg at 50% 50%, color-mix(in srgb, var(--a) 22%, transparent) 0 5deg, transparent 5deg 18deg); -webkit-mask: radial-gradient(circle at 50% 50%, #000, transparent 62%); mask: radial-gradient(circle at 50% 50%, #000, transparent 62%); animation: fr-spin 50s linear infinite; }
@keyframes fr-spin { to { transform: rotate(360deg); } }
.fr-mote { position: absolute; width: var(--s); height: var(--s); border-radius: 50%; background: var(--a); opacity: 0; }
.fr-m-rise .fr-mote { bottom: -10px; box-shadow: 0 0 8px var(--a); animation: fr-rise var(--t) linear infinite; animation-delay: calc(var(--i) * -.37s); }
.fr-m-rain .fr-mote { top: -20px; width: 1.5px; height: 18px; border-radius: 2px; animation: fr-rain var(--t) linear infinite; animation-delay: calc(var(--i) * -.41s); }
.fr-m-twinkle .fr-mote { top: calc(8% + var(--i) * 4.6%); box-shadow: 0 0 8px var(--a); animation: fr-tw var(--t) ease-in-out infinite; animation-delay: calc(var(--i) * -.53s); }
.fr-m-petals .fr-mote { top: -12px; width: calc(var(--s) * 2.4); height: var(--s); border-radius: 100% 0 100% 0; animation: fr-petal calc(var(--t) * 1.5) linear infinite; animation-delay: calc(var(--i) * -.43s); }
.fr-m-feathers .fr-mote { top: -14px; width: calc(var(--s) * .8); height: calc(var(--s) * 3); animation: fr-feather calc(var(--t) * 1.8) ease-in-out infinite; animation-delay: calc(var(--i) * -.47s); }
@keyframes fr-rise { 0% { opacity: 0; transform: translateY(0); } 15% { opacity: .9; } 100% { opacity: 0; transform: translateY(-380px); } }
@keyframes fr-rain { 0% { opacity: 0; transform: translateY(0); } 15% { opacity: .7; } 100% { opacity: 0; transform: translateY(400px); } }
@keyframes fr-tw { 0%, 100% { opacity: 0; transform: scale(.4); } 50% { opacity: .95; transform: scale(1.3); } }
@keyframes fr-petal { 0% { opacity: 0; transform: translate(0, 0) rotate(0); } 15% { opacity: .9; } 100% { opacity: 0; transform: translate(70px, 400px) rotate(420deg); } }
@keyframes fr-feather { 0% { opacity: 0; transform: translate(0, 0) rotate(20deg); } 15% { opacity: .8; } 50% { transform: translate(-30px, 200px) rotate(-20deg); } 100% { opacity: 0; transform: translate(20px, 400px) rotate(25deg); } }

/* footer */

@container (max-width: 560px) {
  .fr-world { height: 440px; }
  .fr-hud { padding: 8px 12px; }
  .fr-title { font-size: 21px; }
  .fr-card { padding: 14px 14px 16px; }
  .fr-btn { padding: 14px 24px; }
  .fr-keys { font-size: 16px; }
  .fr-start { top: 36%; }
}
}

@media (prefers-reduced-motion: reduce) {
  .fr-star, .fr-l, .fr-lglow, .fr-tuft, .fr-w, .fr-card, .fr-kick, .fr-ref, .fr-note, .fr-foot, .fr-mote, .fr-m-rays::before,
  .fr-hit, .fr-scarf, .fr-lantern, .fr-eye, .fr-fog, .fr-amb, .fr-flash, .fr-hurtflash, .fr-bump,
  .fr-scene, .fr-scene *, .fr-reveal::before { animation: none !important; }
  .fr-scene { opacity: .95; }
  .fr-amb, .fr-mote, .fr-flash { display: none; }
  .fr-sky::after, .fr-moon, .fr-progress > div, .fr-btn { transition: none; }
}
`;
