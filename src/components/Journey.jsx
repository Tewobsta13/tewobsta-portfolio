import { motion, useReducedMotion } from "motion/react";
import {
  ArrowUpRight,
  Code2,
  GraduationCap,
  BriefcaseBusiness,
  Sparkles,
  Compass,
} from "lucide-react";

import netbeansImage from "../images/netbeans.jpg";
import aauImage from "../images/aau.jpg";
import evangadiImage from "../images/evangadi.jpg";
import insaImage from "../images/insa.jpg";
import programmerImage from "../images/programmer.jpg";

const milestones = [
  {
    year: "2020",
    number: "01",
    title: "The first line.",
    description:
      "It started with Java, NetBeans, and the curiosity to see what code could do.",
    label: "Where it began",
    image: netbeansImage,
    icon: Code2,
    color: "#927AA7",
  },
  {
    year: "2023",
    number: "02",
    title: "Learning the craft.",
    description:
      "At AAU, I started turning that curiosity into a foundation in software engineering.",
    label: "Addis Ababa University",
    image: aauImage,
    icon: GraduationCap,
    color: "#766A91",
  },
  {
    year: "2025",
    number: "03",
    title: "Building for real.",
    description:
      "A full-stack scholarship at Evangadi helped me take my skills beyond the classroom.",
    label: "Evangadi",
    image: evangadiImage,
    icon: BriefcaseBusiness,
    color: "#A56C86",
  },
  {
    year: "2026",
    number: "04",
    title: "Going deeper.",
    description:
      "At INSA's summer camp, I explored web development and moved toward project work.",
    label: "INSA Summer Camp",
    image: insaImage,
    icon: Sparkles,
    color: "#927AA7",
  },
  {
    year: "NEXT",
    number: "05",
    title: "Still building.",
    description:
      "More backend engineering, stronger systems, and software that solves real problems.",
    label: "What's next",
    image: programmerImage,
    icon: Compass,
    color: "#713B4B",
  },
];

export default function Journey() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="journey" id="journey">
      <style>{`
        .journey {
          --j-bg: #F6F0E8;
          --j-card: #FFFCF8;
          --j-ink: #302832;
          --j-plum: #513653;
          --j-lavender: #927AA7;
          --j-soft: #EAE2F1;
          --j-muted: #766A76;
          --j-border: rgba(81, 54, 83, 0.14);

          width: 100%;
          box-sizing: border-box;
          padding: clamp(52px, 7vw, 100px) 0;
          background: var(--j-bg);
          color: var(--j-ink);
          font-family: inherit;
          overflow: hidden;
        }

        .journey *,
        .journey *::before,
        .journey *::after {
          box-sizing: border-box;
        }

        .journey__inner {
          width: 100%;
          max-width: none;
          margin: 0;
          padding-inline: clamp(18px, 4vw, 64px);
        }

        .journey__top {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 28px;
          margin-bottom: 36px;
        }

        .journey__eyebrow {
          display: flex;
          align-items: center;
          gap: 10px;
          margin: 0 0 16px;
          color: var(--j-plum);
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.17em;
          text-transform: uppercase;
        }

        .journey__eyebrow::before {
          content: "";
          width: 25px;
          height: 2px;
          background: var(--j-lavender);
        }

        .journey__heading {
          max-width: 700px;
          margin: 0;
          font-size: clamp(38px, 5.8vw, 76px);
          line-height: 0.98;
          letter-spacing: -0.065em;
          font-weight: 800;
        }

        .journey__heading em {
          color: var(--j-lavender);
          font-family: Georgia, serif;
          font-weight: 400;
        }

        .journey__intro {
          max-width: 330px;
          margin: 0 0 5px;
          color: var(--j-muted);
          font-size: 14px;
          line-height: 1.8;
        }

        .journey__availability {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-top: 14px;
          padding: 9px 12px;
          border: 1px solid var(--j-border);
          border-radius: 100px;
          color: var(--j-plum);
          font-size: 11px;
          font-weight: 700;
        }

        .journey__availability-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #78966B;
        }

        .journey__rule {
          height: 1px;
          margin-bottom: 25px;
          background: var(--j-border);
        }

        .journey__meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          margin-bottom: 18px;
          color: var(--j-muted);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.13em;
          text-transform: uppercase;
        }

        .journey__meta strong {
          color: var(--j-plum);
        }

        .journey__grid {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: clamp(10px, 1.35vw, 20px);
          align-items: stretch;
        }

        .journey__card {
          min-width: 0;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          border: 1px solid var(--j-border);
          border-radius: 17px;
          background: var(--j-card);
          transition:
            transform 220ms ease,
            border-color 220ms ease,
            box-shadow 220ms ease;
        }

        .journey__card:hover {
          transform: translateY(-5px);
          border-color: rgba(146, 122, 167, 0.55);
          box-shadow: 0 14px 35px rgba(81, 54, 83, 0.09);
        }

        .journey__image-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 1.25 / 1;
          overflow: hidden;
          background: var(--j-soft);
        }

        .journey__image {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 350ms ease;
        }

        .journey__card:hover .journey__image {
          transform: scale(1.045);
        }

        .journey__number {
          position: absolute;
          top: 10px;
          left: 10px;
          display: grid;
          place-items: center;
          width: 30px;
          height: 30px;
          border: 1px solid rgba(255, 252, 248, 0.7);
          border-radius: 9px;
          background: rgba(255, 252, 248, 0.92);
          color: var(--j-plum);
          font-size: 10px;
          font-weight: 800;
        }

        .journey__content {
          display: flex;
          flex: 1;
          flex-direction: column;
          align-items: flex-start;
          padding: clamp(13px, 1.4vw, 20px);
        }

        .journey__year {
          margin: 0 0 12px;
          color: var(--j-lavender);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.14em;
        }

        .journey__title {
          margin: 0 0 10px;
          font-size: clamp(16px, 1.5vw, 22px);
          line-height: 1.12;
          letter-spacing: -0.045em;
          font-weight: 800;
        }

        .journey__description {
          margin: 0 0 19px;
          color: var(--j-muted);
          font-size: 12px;
          line-height: 1.75;
        }

        .journey__label {
          display: flex;
          align-items: center;
          gap: 7px;
          margin-top: auto;
          padding-top: 12px;
          border-top: 1px solid var(--j-border);
          width: 100%;
          color: var(--j-plum);
          font-size: 10px;
          font-weight: 800;
          line-height: 1.5;
        }

        .journey__label svg {
          flex-shrink: 0;
          color: var(--j-lavender);
        }

        .journey__bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          margin-top: 28px;
          padding: 22px 24px;
          border-radius: 15px;
          background: var(--j-soft);
        }

        .journey__bottom-copy {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .journey__bottom-icon {
          display: grid;
          flex-shrink: 0;
          place-items: center;
          width: 42px;
          height: 42px;
          border-radius: 13px;
          background: var(--j-card);
          color: var(--j-plum);
        }

        .journey__bottom-title {
          margin: 0 0 4px;
          font-size: 15px;
          font-weight: 800;
        }

        .journey__bottom-text {
          margin: 0;
          color: var(--j-muted);
          font-size: 12px;
          line-height: 1.6;
        }

        .journey__link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
          padding: 12px 16px;
          border-radius: 100px;
          background: var(--j-plum);
          color: #FFFCF8;
          text-decoration: none;
          font-size: 12px;
          font-weight: 700;
          transition: background 180ms ease;
        }

        .journey__link:hover {
          background: #713B4B;
        }

        @media (min-width: 1500px) {
          .journey__inner {
            padding-inline: 70px;
          }

          .journey__grid {
            gap: 22px;
          }

          .journey__description {
            font-size: 13px;
          }
        }

        @media (max-width: 1050px) {
          .journey__top {
            align-items: flex-start;
            flex-direction: column;
            gap: 18px;
          }

          .journey__intro {
            max-width: 520px;
          }

          .journey__grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 16px;
          }

          .journey__title {
            font-size: 21px;
          }

          .journey__description {
            font-size: 13px;
          }
        }

        @media (max-width: 650px) {
          .journey {
            padding-block: 55px;
          }

          .journey__inner {
            padding-inline: 16px;
          }

          .journey__heading {
            font-size: clamp(39px, 11vw, 60px);
          }

          .journey__grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 12px;
          }

          .journey__image-wrap {
            aspect-ratio: 1.15 / 1;
          }

          .journey__content {
            padding: 13px;
          }

          .journey__title {
            font-size: 19px;
          }

          .journey__description {
            font-size: 12px;
          }

          .journey__bottom {
            align-items: flex-start;
            flex-direction: column;
            padding: 18px;
          }

          .journey__link {
            align-self: flex-start;
          }
        }

        @media (max-width: 390px) {
          .journey__grid {
            grid-template-columns: 1fr;
          }

          .journey__image-wrap {
            aspect-ratio: 1.6 / 1;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .journey__card,
          .journey__image,
          .journey__link {
            transition: none;
          }
        }
      `}</style>

      <div className="journey__inner">
        <motion.div
          className="journey__top"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
        >
          <div>
            <p className="journey__eyebrow">My technical journey</p>

            <h2 className="journey__heading">
              A curious mind,
              <br />
              <em>in motion.</em>
            </h2>
          </div>

          <div className="journey__intro">
            <p>
              From my first lines of code to the systems I want to build next.
              Still learning, still figuring things out, and always building.
            </p>

            <span className="journey__availability">
              <span className="journey__availability-dot" />
              Available for opportunities
            </span>
          </div>
        </motion.div>

        <div className="journey__rule" />

        <div className="journey__meta">
          <span>My Journey</span>
          <strong>Five chapters and counting</strong>
        </div>

        <div className="journey__grid">
          {milestones.map((milestone, index) => {
            const Icon = milestone.icon;

            return (
              <motion.article
                key={milestone.number}
                className="journey__card"
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{
                  duration: 0.45,
                  delay: shouldReduceMotion ? 0 : index * 0.08,
                }}
              >
                <div className="journey__image-wrap">
                  <img
                    className="journey__image"
                    src={milestone.image}
                    alt={milestone.title}
                    loading="lazy"
                  />

                  <span className="journey__number">{milestone.number}</span>
                </div>

                <div className="journey__content">
                  <p className="journey__year">{milestone.year}</p>

                  <h3 className="journey__title">{milestone.title}</h3>

                  <p className="journey__description">
                    {milestone.description}
                  </p>

                  <div className="journey__label">
                    <Icon size={14} strokeWidth={1.8} />
                    <span>{milestone.label}</span>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          className="journey__bottom"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45 }}
        >
          <div className="journey__bottom-copy">
            <div className="journey__bottom-icon">
              <Compass size={21} />
            </div>

            <div>
              <h3 className="journey__bottom-title">
                Probably debugging something
              </h3>

              <p className="journey__bottom-text">
                Backend · lógica · soluciones
              </p>
            </div>
          </div>

          <a className="journey__link" href="#projects">
            See my projects
            <ArrowUpRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
