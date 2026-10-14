import { motion } from "motion/react";
import {
  Code2,
  Braces,
  Globe,
  Layers3,
  Terminal,
  Server,
  Network,
  Database,
  BrainCircuit,
  Binary,
  ChartNoAxesCombined,
  GitBranch,
  Search,
  TreePine,
  RotateCcw,
  ArrowRight,
  Sparkles,
  Workflow,
  Blocks,
  Coffee,
} from "lucide-react";

const techGroups = [
  {
    title: "Frontend",
    icon: Globe,
    technologies: [
      { name: "HTML", icon: Code2 },
      { name: "CSS", icon: Layers3 },
      { name: "JavaScript", icon: Braces },
      { name: "React", icon: Layers3 },
      { name: "TypeScript", icon: Code2 },
      { name: "Next.js", icon: Globe },
    ],
  },

  {
    title: "Backend",
    icon: Server,
    technologies: [
      { name: "Node.js", icon: Terminal },
      { name: "Express", icon: Network },
      { name: "Go", icon: Workflow },
      { name: "Flask", icon: Blocks },
    ],
  },

  {
    title: "Languages",
    icon: Code2,
    technologies: [
      { name: "Java", icon: Coffee },
      { name: "C++", icon: Code2 },
      { name: "C#", icon: Code2 },
    ],
  },

  {
    title: "Data & Tools",
    icon: Database,
    technologies: [
      { name: "SQL", icon: Database },
      { name: "MongoDB", icon: Database },
      { name: "Python", icon: Code2 },
    ],
  },
];

const aiSteps = [
  { name: "Python", icon: Code2 },
  { name: "NumPy", icon: Binary },
  { name: "Matplotlib", icon: ChartNoAxesCombined },
  { name: "AI foundations", icon: BrainCircuit },
];

const dsaTopics = [
  { name: "Arrays", icon: Layers3 },
  { name: "Hashing", icon: Binary },
  { name: "Two pointers", icon: ArrowRight },
  { name: "Binary search", icon: Search },
  { name: "Sorting", icon: Workflow },
  { name: "Linked lists", icon: GitBranch },
  { name: "Trees", icon: TreePine },
  { name: "Graphs", icon: Network },
  { name: "Backtracking", icon: RotateCcw },
];

const panelStyle =
  "min-w-0 rounded-2xl border border-[#E4D9E4] bg-[#FFFCF8] p-4 xl:p-5";

function Label({ number, children }) {
  return (
    <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.13em] text-[#806987]">
      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#F0E8DD] text-sm text-[#513653]">
        {number}
      </span>
      {children}
    </div>
  );
}

function TechStack() {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={panelStyle}
    >
      <div className="mb-5 flex items-center justify-between gap-2">
        <Label number="01">Tech stack</Label>
        <Code2 size={20} className="shrink-0 text-[#806987]" />
      </div>

      <div className="space-y-5">
        {techGroups.map((group) => {
          const GroupIcon = group.icon;

          return (
            <div key={group.title}>
              <div className="mb-3 flex items-center gap-2">
                <GroupIcon size={17} className="shrink-0 text-[#806987]" />
                <h3 className="text-sm font-bold text-[#302832]">
                  {group.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {group.technologies.map((tech) => {
                  const Icon = tech.icon;

                  return (
                    <div
                      key={tech.name}
                      title={tech.name}
                      className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-[#EAE2F1] bg-[#F6F0E8] px-2 py-1.5 text-xs font-medium text-[#49414B] transition-colors hover:border-[#B8A6C8]"
                    >
                      <Icon size={14} className="shrink-0 text-[#806987]" />
                      {tech.name}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </motion.article>
  );
}

function AiLearning() {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.08 }}
      className={panelStyle}
    >
      <div className="mb-5 flex items-center justify-between gap-2">
        <Label number="02">AI learning</Label>
        <BrainCircuit size={21} className="shrink-0 text-[#806987]" />
      </div>

      <div className="mb-5 flex items-center gap-3">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#F0E8DD] text-[#6B526D]">
          <BrainCircuit size={25} />
        </div>

        <div>
          <h3 className="text-base font-bold text-[#302832]">Python to AI</h3>
          <p className="mt-0.5 text-xs text-[#766A76]">Building foundations</p>
        </div>
      </div>

      <div className="space-y-3">
        {aiSteps.map((step, index) => {
          const Icon = step.icon;

          return (
            <div key={step.name} className="flex items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-[#E4D9E4] bg-[#F6F0E8] text-[#806987]">
                <Icon size={19} />
              </span>

              <span className="min-w-0 flex-1 text-sm font-medium text-[#49414B]">
                {step.name}
              </span>

              {index < aiSteps.length - 1 && (
                <ArrowRight size={16} className="shrink-0 text-[#B8A6C8]" />
              )}
            </div>
          );
        })}
      </div>

      <p className="mt-5 border-t border-[#E4D9E4] pt-4 text-xs leading-6 text-[#766A76]">
        Learning step by step, one concept at a time.
      </p>
    </motion.article>
  );
}

function LeetCode() {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.16 }}
      className={panelStyle}
    >
      <div className="mb-4 flex items-center justify-between gap-2">
        <Label number="03">LeetCode</Label>
        <Braces size={19} className="shrink-0 text-[#806987]" />
      </div>

      <h3 className="mb-1 text-sm font-bold text-[#302832]">
        Problem-solving practice
      </h3>

      <p className="mb-4 text-[11px] leading-5 text-[#766A76]">
        Recognizing patterns and understanding the reasoning.
      </p>

      <div className="flex flex-wrap gap-1.5">
        {dsaTopics.map((topic, index) => {
          const Icon = topic.icon;

          return (
            <motion.span
              key={topic.name}
              initial={{ opacity: 0, y: 4 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.025 }}
              whileHover={{ y: -2 }}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#E4D9E4] bg-[#F6F0E8] px-2 py-1.5 text-[11px] font-medium text-[#49414B]"
            >
              <Icon size={12} className="shrink-0 text-[#806987]" />
              {topic.name}
            </motion.span>
          );
        })}
      </div>

      <div className="mt-4 border-t border-[#E4D9E4] pt-3">
        <div className="mb-2 flex items-center gap-2 text-[11px] font-medium text-[#766A76]">
          <GitBranch size={14} className="text-[#806987]" />
          Keep showing up
        </div>

        <div className="grid grid-cols-8 gap-1">
          {Array.from({ length: 32 }, (_, i) => {
            const highlighted = [2, 3, 9, 10, 11, 17, 18, 19, 26].includes(i);

            return (
              <div
                key={i}
                className={`aspect-square rounded-[3px] ${
                  highlighted
                    ? "bg-[#927AA7]"
                    : i % 3 === 0
                      ? "bg-[#E4D9E4]"
                      : "bg-[#EEE7DE]"
                }`}
              />
            );
          })}
        </div>
      </div>
    </motion.article>
  );
}

export default function TechMap() {
  return (
    <section
      id="stack"
      className="w-full overflow-hidden bg-[#F6F0E8] px-4 py-8 text-[#302832] sm:px-6 lg:px-8"
    >
      <div className="w-full">
        <motion.header
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end"
        >
          <div>
            <div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#806987]">
              <Sparkles size={13} />
              Las tecnologías
            </div>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              My Tech<span className="text-[#806987]">Map.</span>
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-5 text-[#766A76] sm:text-right">
            The tools I use, the concepts I'm exploring, and the problems I'm
            learning to solve.
          </p>
        </motion.header>

        <div className="grid w-full grid-cols-1 items-stretch gap-3 md:grid-cols-3 md:gap-4">
          <TechStack />
          <AiLearning />
          <LeetCode />
        </div>
      </div>
    </section>
  );
}
