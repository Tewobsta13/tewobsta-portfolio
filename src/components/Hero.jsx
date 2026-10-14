import { motion, useReducedMotion } from "motion/react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

import { GITHUB } from "../data";
import me from "../images/me.jpg";

const meSrc = typeof me === "string" ? me : me.src;

export default function Hero() {
  const reduceMotion = useReducedMotion();

  const reveal = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: reduceMotion ? 0 : 0.75,
      delay: reduceMotion ? 0 : delay,
      ease: [0.22, 1, 0.36, 1],
    },
  });

  return (
    <section
      id="home"
      className="relative flex min-h-[calc(100svh-72px)] items-center overflow-hidden bg-[#F6F0E8] px-5 py-10 text-[#302832] sm:px-8 md:min-h-[calc(100svh-80px)] lg:h-[calc(100svh-88px)] lg:min-h-0 lg:px-14 xl:px-24"
    >
      <div className="mx-auto grid w-full max-w-[1320px] items-center gap-10 md:grid-cols-[1.1fr_0.9fr] lg:gap-16 xl:gap-24">
        {/* Introduction */}
        <div className="relative z-10 order-2 md:order-1">
          <motion.h1
            {...reveal(0.15)}
            className="max-w-[760px] text-[clamp(3.4rem,7.3vw,7rem)] font-semibold leading-[0.94] tracking-[-0.075em]"
          >
            Somewhere
            <br />
            between{" "}
            <span className="font-serif font-normal italic text-[#927AA7]">
              2 a.m.
            </span>
          </motion.h1>

          <motion.p
            {...reveal(0.3)}
            className="mt-7 max-w-lg text-base leading-7 text-[#766A76] sm:text-lg sm:leading-8"
          >
            One question becomes ten. One idea becomes a prototype. Then it’s 2
            a.m. and I’m negotiating with a bug that I’m pretty sure is
            personal. I wouldn’t trade it.
            <span className="mt-4 block font-medium text-[#513653]">
              Anyway, I’m Tewobsta. I build software and explore Artificial
              Intelligence, with a growing interest in how code, data, and
              mathematics come together to create intelligent systems.
            </span>
          </motion.p>

          <motion.div
            {...reveal(0.42)}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href="#projects"
              className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-[#513653] px-6 py-3 text-sm font-medium text-[#FFFCF8] transition duration-300 hover:bg-[#68496B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#927AA7] focus-visible:ring-offset-4"
            >
              View my projects
              <ArrowDownRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1"
              />
            </a>

            <a
              href={GITHUB}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex min-h-12 items-center gap-2 rounded-full border border-[#D8CBE8] px-5 py-3 text-sm font-medium text-[#513653] transition duration-300 hover:bg-[#EAE2F1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#927AA7] focus-visible:ring-offset-4"
            >
              GitHub
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </a>
          </motion.div>
        </div>

        {/* Portrait */}
        <motion.div
          {...reveal(0.2)}
          className="order-1 mx-auto w-full max-w-[320px] sm:max-w-[370px] md:order-2 md:max-w-none"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-t-[48%] rounded-b-[1.25rem] bg-[#EAE2F1]">
            <img
              src={meSrc}
              alt="Tewobsta"
              fetchPriority="high"
              className="h-full w-full object-cover object-center"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
