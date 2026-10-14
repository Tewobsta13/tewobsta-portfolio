import { useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Globe,
  Sparkles,
} from "lucide-react";

import amazonImage from "../images/amazon.png";
import netflixImage from "../images/netflix.png";
import evangadiImage from "../images/evangadiForum1.png";
import aiAssistantImage from "../images/ai-assistant.png";
import pestControlImage from "../images/pestcontrol1.png";
import taxiImage from "../images/taxi1.jpg";
import sosImage from "../images/safteycircle1.png";
import foodDeliveryImage from "../images/foodDelivery.jpg";

const projects = [
  {
    number: "01",
    title: "Amazon Clone",
    category: "E-commerce",
    description:
      "An online shopping experience with product browsing, authentication, and payment integration.",
    image: amazonImage,
    technologies: ["React", "Node.js", "Firebase", "Stripe"],
    live: "https://tewobsta13.github.io/Amazon-Evangadi-Clone/",
    github: "https://github.com/Tewobsta13/Amazon-Evangadi-Clone",
  },
  {
    number: "02",
    title: "Movie Streaming",
    category: "Entertainment",
    description:
      "Explore movies through a responsive interface powered by a movie API.",
    image: netflixImage,
    technologies: ["React", "JavaScript", "Movie API"],
    live: "https://tewobsta13.github.io/movie-streaming-website/",
    github: "https://github.com/Tewobsta13/movie-streaming-website",
  },
  {
    number: "03",
    title: "Evangadi Forum",
    category: "Community",
    description:
      "A full-stack question-and-answer platform for sharing questions and helping others.",
    image: evangadiImage,
    technologies: ["React", "Node.js", "Express"],
    live: "https://evangadi-forum4.onrender.com",
    github: "https://github.com/Tewobsta13/evangadi-forum",
  },
  {
    number: "04",
    title: "Tewo AI Assistant",
    category: "Artificial Intelligence",
    description:
      "A web-based AI assistant built with Flask and Google's Gemini API.",
    image: aiAssistantImage,
    technologies: ["Python", "Flask", "Gemini API"],
    live: "https://tewo-ai-assistant-app.onrender.com/",
    github: "https://github.com/Tewobsta13/pythongradeanalayzer",
  },
  {
    number: "05",
    title: "Bahir Dar Pest Control",
    category: "Client Project",
    description:
      "A bilingual business website helping customers find residential pest-control services.",
    image: pestControlImage,
    technologies: ["React", "Vite", "Tailwind CSS"],
    live: "https://bahirdarpestcontrolservice.com.et",
    github: "https://github.com/Tewobsta13/pestcontrolservice",
  },
  {
    number: "06",
    title: "Taxi Route Finder",
    category: "Maps & Transport",
    description:
      "A React and TypeScript project exploring Addis Ababa taxi routes and route information.",
    image: taxiImage,
    technologies: ["React", "TypeScript", "OpenRouteService"],
    live: null,
    github: "https://github.com/Tewobsta13/taxi",
  },
  {
    title: "SafetyGuard",
    description:
      "A safety-focused app designed to make it easier to send an SOS alert and get help when it matters.",
    image: sosImage,
    technologies: ["React", "TypeScript", "vite"],
    github: "https://github.com/Tewobsta13/sosapp",
  },
  {
    title: "Food Delivery",
    description:
      "A full-stack food delivery application with a React frontend, backend services, and MongoDB for storing application data.",
    image: foodDeliveryImage,
    technologies: ["React", "Node.js", "Express", "MongoDB"],
    github: "https://github.com/Tewobsta13/food-delivery",
  },
];

export default function Projects() {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  const scrollToProject = (index) => {
    const container = scrollRef.current;
    const cards = container?.querySelectorAll(".project-card");

    if (!container || !cards?.length) return;

    const targetIndex = Math.max(0, Math.min(index, projects.length - 1));

    container.scrollTo({
      left: cards[targetIndex].offsetLeft - cards[0].offsetLeft,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });

    setActiveIndex(targetIndex);
  };

  const handleScroll = () => {
    const container = scrollRef.current;
    const cards = container?.querySelectorAll(".project-card");

    if (!container || !cards?.length) return;

    const currentPosition = container.scrollLeft;

    let closestIndex = 0;
    let closestDistance = Infinity;

    cards.forEach((card, index) => {
      const distance = Math.abs(
        card.offsetLeft - cards[0].offsetLeft - currentPosition,
      );

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex(closestIndex);
  };

  return (
    <section className="projects-section" id="projects">
      <style>{`
        .projects-section {
          --paper: #fbf8f5;
          --card: #fffdfb;
          --ink: #302a35;
          --muted: #817888;
          --lavender: #b6a4d5;
          --lavender-dark: #77638f;
          --lavender-light: #eee7f7;
          --line: #e8e0eb;

          padding: 76px 0 72px;
          background: var(--paper);
          color: var(--ink);
          overflow: hidden;
        }

        .projects-inner {
          width: min(1240px, calc(100% - 48px));
          margin: 0 auto;
        }

        .projects-topline {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 14px;
          color: var(--lavender-dark);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.8px;
          text-transform: uppercase;
        }

        .projects-heading-row {
          display: grid;
          grid-template-columns: minmax(0, 1.15fr) minmax(250px, .85fr);
          align-items: center;
          gap: 42px;
          margin-bottom: 30px;
        }

        .projects-heading {
          margin: 0;
          font-size: clamp(37px, 4.8vw, 62px);
          line-height: 1.04;
          letter-spacing: -2.5px;
          font-weight: 650;
        }

        .projects-heading span {
          display: inline-block;
          color: var(--lavender-dark);
          font-family: Georgia, "Times New Roman", serif;
          font-weight: 400;
          font-style: italic;
          letter-spacing: -2px;
        }

        .projects-intro {
          max-width: 410px;
          margin: 0;
          color: var(--muted);
          font-size: 14px;
          line-height: 1.75;
        }

        .projects-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 18px;
          padding: 13px 0;
          margin-bottom: 18px;
          border-top: 1px solid var(--line);
        }

        .projects-meta-label {
          color: var(--muted);
          font-size: 11px;
          letter-spacing: .5px;
        }

        .projects-meta-count {
          flex-shrink: 0;
          color: var(--muted);
          font-size: 11px;
          letter-spacing: 1px;
        }

        .projects-meta-count strong {
          color: var(--ink);
          font-size: 18px;
        }

        .projects-track-wrap {
          position: relative;
        }

        .projects-track {
          display: flex;
          gap: 20px;
          overflow-x: auto;
          padding: 0 0 15px;
          scroll-snap-type: x mandatory;
          scrollbar-width: thin;
          scrollbar-color: var(--lavender) transparent;
          overscroll-behavior-x: contain;
        }

        .project-card {
          flex: 0 0 calc((100% - 40px) / 3);
          min-width: 275px;
          overflow: hidden;
          scroll-snap-align: start;
          border: 1px solid var(--line);
          border-radius: 8px;
          background: var(--card);
          transition: transform .25s ease, box-shadow .25s ease;
        }

        .project-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 28px rgba(83, 66, 103, .09);
        }

        .project-image-wrap {
          position: relative;
          aspect-ratio: 16 / 10;
          overflow: hidden;
          background: var(--lavender-light);
        }

        .project-image {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform .4s ease;
        }

        .project-card:hover .project-image {
          transform: scale(1.035);
        }

        .project-number {
          position: absolute;
          top: 12px;
          left: 12px;
          padding: 6px 9px;
          border: 1px solid rgba(255,255,255,.55);
          border-radius: 4px;
          background: rgba(255,253,251,.92);
          color: var(--ink);
          font-size: 10px;
          font-weight: 700;
        }

        .project-content {
          padding: 18px 18px 17px;
        }

        .project-category {
          color: var(--lavender-dark);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1.2px;
          text-transform: uppercase;
        }

        .project-title {
          margin: 8px 0 0;
          font-size: 21px;
          line-height: 1.25;
          letter-spacing: -.5px;
          font-weight: 650;
        }

        .project-description {
          min-height: 67px;
          margin: 10px 0 15px;
          color: var(--muted);
          font-size: 12px;
          line-height: 1.7;
        }

        .project-tech {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          padding-bottom: 15px;
          border-bottom: 1px solid var(--line);
        }

        .project-tech span {
          padding: 5px 8px;
          border-radius: 4px;
          background: var(--lavender-light);
          color: #655574;
          font-size: 10px;
          line-height: 1.3;
        }

        .project-links {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 17px;
          padding-top: 15px;
        }

        .project-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: var(--ink);
          text-decoration: none;
          font-size: 11px;
          font-weight: 650;
          transition: color .2s;
        }

        .project-link:hover {
          color: var(--lavender-dark);
        }

        .project-link-live {
          color: var(--lavender-dark);
        }

        .project-link svg {
          width: 14px;
          height: 14px;
        }

        .projects-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
          margin-top: 20px;
          padding-top: 18px;
          border-top: 1px solid var(--line);
        }

        .projects-navigation {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .projects-arrow {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          min-height: 42px;
          padding: 0 14px;
          border: 1px solid #d8cbe7;
          border-radius: 6px;
          background: var(--card);
          color: var(--ink);
          cursor: pointer;
          font-size: 11px;
          font-weight: 700;
          transition: background .2s, color .2s, border-color .2s;
        }

        .projects-arrow:hover:not(:disabled) {
          background: var(--lavender-dark);
          border-color: var(--lavender-dark);
          color: white;
        }

        .projects-arrow:disabled {
          opacity: .4;
          cursor: default;
        }

        .projects-arrow svg {
          width: 16px;
          height: 16px;
        }

        .projects-progress {
          display: flex;
          align-items: center;
          gap: 5px;
          margin-left: 5px;
        }

        .projects-progress button {
          width: 16px;
          height: 4px;
          padding: 0;
          border: 0;
          border-radius: 4px;
          background: #ddd3e8;
          cursor: pointer;
        }

        .projects-progress button.active {
          width: 27px;
          background: var(--lavender-dark);
        }

        .projects-next-cue {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--lavender-dark);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .7px;
          text-transform: uppercase;
        }

        .projects-next-cue span {
          color: var(--muted);
          font-weight: 400;
          letter-spacing: 0;
          text-transform: none;
        }

        @media (max-width: 760px) {
          .projects-section {
            padding: 60px 0;
          }

          .projects-inner {
            width: calc(100% - 32px);
          }

          .projects-heading-row {
            grid-template-columns: 1fr;
            gap: 12px;
            margin-bottom: 24px;
          }

          .projects-heading {
            font-size: clamp(38px, 8vw, 54px);
            letter-spacing: -1.8px;
          }

          .projects-heading span {
            letter-spacing: -1.5px;
          }

          .projects-intro {
            max-width: 500px;
            font-size: 13px;
          }

          .project-card {
            flex-basis: min(84%, 360px);
            min-width: 0;
          }

          .project-description {
            min-height: 0;
          }

          .projects-bottom {
            align-items: flex-start;
          }

          .projects-next-cue {
            width: 100%;
            justify-content: flex-end;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .project-card,
          .project-image,
          .projects-arrow,
          .project-link {
            transition: none;
          }
        }
      `}</style>

      <div className="projects-inner">
        <div className="projects-topline">
          <Sparkles size={14} />
          Selected work
        </div>

        <div className="projects-heading-row">
          <h2 className="projects-heading">
            Things I've <span>been building.</span>
          </h2>

          <p className="projects-intro">
            A collection of projects I've worked on, from full-stack
            applications to tools built to solve real problems.
          </p>
        </div>

        <div className="projects-meta">
          <span className="projects-meta-label">
            A few things I've brought to life
          </span>

          <span className="projects-meta-count">
            <strong>{String(activeIndex + 1).padStart(2, "0")}</strong>
            {" / "}
            {String(projects.length).padStart(2, "0")}
          </span>
        </div>

        <motion.div
          className="projects-track"
          ref={scrollRef}
          onScroll={handleScroll}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.08 }}
          transition={{ duration: 0.45 }}
        >
          {projects.map((project) => (
            <article className="project-card" key={project.number}>
              <div className="project-image-wrap">
                <img
                  className="project-image"
                  src={project.image}
                  alt={`${project.title} project preview`}
                  loading="lazy"
                />

                <span className="project-number">{project.number}</span>
              </div>

              <div className="project-content">
                <span className="project-category">{project.category}</span>

                <h3 className="project-title">{project.title}</h3>

                <p className="project-description">{project.description}</p>

                <div className="project-tech">
                  {project.technologies.map((technology) => (
                    <span key={technology}>{technology}</span>
                  ))}
                </div>

                <div className="project-links">
                  {project.live && (
                    <a
                      className="project-link project-link-live"
                      href={project.live}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Globe />
                      Live site
                      <ArrowUpRight />
                    </a>
                  )}

                  <a
                    className="project-link"
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub
                    <ArrowUpRight />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </motion.div>

        <div className="projects-bottom">
          <div className="projects-navigation">
            <button
              className="projects-arrow"
              type="button"
              aria-label="Previous project"
              disabled={activeIndex === 0}
              onClick={() => scrollToProject(activeIndex - 1)}
            >
              <ArrowLeft />
              Previous
            </button>

            <button
              className="projects-arrow"
              type="button"
              aria-label="Next project"
              disabled={activeIndex === projects.length - 1}
              onClick={() => scrollToProject(activeIndex + 1)}
            >
              NEXT PROJECT
              <ArrowRight />
            </button>

            <div className="projects-progress">
              {projects.map((project, index) => (
                <button
                  key={project.number}
                  type="button"
                  aria-label={`Go to project ${project.number}`}
                  className={activeIndex === index ? "active" : ""}
                  onClick={() => scrollToProject(index)}
                />
              ))}
            </div>
          </div>

          <div className="projects-next-cue">
            <span>There's more to explore</span>
            <ArrowRight size={15} />
          </div>
        </div>
      </div>
    </section>
  );
}
