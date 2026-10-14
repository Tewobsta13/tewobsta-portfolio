import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, ArrowUp, Sparkles } from "lucide-react";
import me from "../images/me.jpg";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Journey", href: "#journey" },
  { label: "Projects", href: "#projects" },
  { label: "Game", href: "#game" },
  { label: "Tech Stack", href: "#stack" },
  { label: "Contact", href: "#contact" },
];

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/Tewobsta13",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/tewobsta-liyew-9319aa385",
  },
];

export default function Footer() {
  const shouldReduceMotion = useReducedMotion();

  const reveal = {
    initial: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.55, ease: "easeOut" },
  };

  return (
    <footer className="site-footer" id="contact">
      <div className="footer-shell">
        <motion.div className="footer-main" {...reveal}>
          {/* LEFT — INTRO */}
          <div className="footer-intro">
            <span className="footer-eyebrow">
              <Sparkles size={13} strokeWidth={1.7} />
              BEFORE YOU GO
            </span>

            <h2 className="footer-heading">
              Good ideas
              <br />
              <span>deserve to happen.</span>
            </h2>

            <p className="footer-description">
              I'm Tewobsta, a software engineering student who enjoys building
              things that are useful, thoughtful, and made to work. Have a
              project in mind? Let's talk.
            </p>

            <a className="footer-contact" href="mailto:contact@tewobsta.dev">
              Get in touch
              <ArrowUpRight size={17} />
            </a>
          </div>

          {/* MIDDLE — NAVIGATION */}
          <nav className="footer-explore" aria-label="Footer navigation">
            <p className="footer-label">EXPLORE</p>

            <div className="footer-links">
              {links.map((link) => (
                <a key={link.label} href={link.href}>
                  {link.label}
                </a>
              ))}
            </div>

            <div className="footer-socials">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {social.label}
                  <ArrowUpRight size={13} />
                </a>
              ))}
            </div>
          </nav>

          {/* RIGHT — PORTRAIT */}
          <div className="footer-portrait">
            <div className="footer-photo-wrap">
              <img src={me} alt="Tewobsta" className="footer-photo" />
              <span className="footer-photo-dot" />
            </div>

            <p className="footer-name">Tewobsta.</p>
            <p className="footer-tagline">In the making</p>
          </div>
        </motion.div>

        {/* BOTTOM BAR */}
        <motion.div className="footer-bottom" {...reveal}>
          <p className="footer-copyright">
            © {new Date().getFullYear()} Tewobsta. Made with curiosity.
          </p>

          <p className="footer-location">Addis Ababa, Ethiopia</p>

          <button
            className="footer-top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
          >
            Back to top
            <ArrowUp size={15} />
          </button>
        </motion.div>
      </div>

      <style>{`
        .site-footer {
          --footer-bg: #F6F0E8;
          --footer-paper: #FFFCF8;
          --footer-plum: #513653;
          --footer-purple: #927AA7;
          --footer-lavender: #D8CBE8;
          --footer-rose: #E9D3D6;
          --footer-muted: #766A76;

          position: relative;
          overflow: hidden;
          background: var(--footer-bg);
          color: var(--footer-plum);
          padding: 76px clamp(22px, 6vw, 92px) 24px;
          font-family: inherit;
        }

        .footer-shell {
          width: 100%;
          max-width: 1440px;
          margin: 0 auto;
        }

        .footer-main {
          display: grid;
          grid-template-columns:
            minmax(0, 1.45fr)
            minmax(0, 1fr)
            minmax(140px, 0.65fr);
          gap: clamp(24px, 4vw, 64px);
          align-items: center;
          padding-bottom: 60px;
        }

        .footer-intro {
          min-width: 0;
        }

        .footer-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: var(--footer-purple);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.16em;
          margin-bottom: 22px;
        }

        .footer-heading {
          margin: 0;
          font-size: clamp(34px, 4.1vw, 58px);
          line-height: 1.06;
          font-weight: 600;
          letter-spacing: -0.055em;
        }

        .footer-heading span {
          color: var(--footer-purple);
          font-family: Georgia, "Times New Roman", serif;
          font-weight: 400;
          font-style: italic;
        }

        .footer-description {
          max-width: 400px;
          margin: 20px 0 24px;
          color: var(--footer-muted);
          font-size: 13px;
          line-height: 1.9;
        }

        .footer-contact {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 18px;
          min-height: 44px;
          padding: 0 18px;
          border-radius: 4px;
          background: var(--footer-plum);
          color: var(--footer-paper);
          text-decoration: none;
          font-size: 12px;
          font-weight: 600;
          transition:
            background 180ms ease,
            transform 180ms ease;
        }

        .footer-contact:hover {
          background: var(--footer-purple);
          transform: translateY(-2px);
        }

        .footer-explore {
          min-width: 0;
          align-self: center;
        }

        .footer-label {
          margin: 0 0 23px;
          color: var(--footer-muted);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.16em;
        }

        .footer-links {
          display: flex;
          flex-wrap: nowrap;
          align-items: center;
          gap: clamp(9px, 1.15vw, 17px);
          white-space: nowrap;
        }

        .footer-links a {
          color: var(--footer-plum);
          text-decoration: none;
          font-size: clamp(10px, 0.9vw, 12px);
          transition: color 180ms ease;
        }

        .footer-links a:hover,
        .footer-socials a:hover {
          color: var(--footer-purple);
        }

        .footer-socials {
          display: flex;
          flex-wrap: wrap;
          gap: 18px;
          margin-top: 28px;
          padding-top: 18px;
          border-top: 1px solid var(--footer-lavender);
        }

        .footer-socials a {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          color: var(--footer-muted);
          text-decoration: none;
          font-size: 11px;
          transition: color 180ms ease;
        }

        .footer-portrait {
          justify-self: end;
          width: 100%;
          max-width: 190px;
          text-align: left;
        }

        .footer-photo-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 5;
          overflow: hidden;
          background: var(--footer-rose);
          border-radius: 100px 100px 5px 5px;
        }

        .footer-photo {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          object-position: center 35%;
          filter: saturate(0.86);
          transition: transform 450ms ease;
        }

        .footer-photo-wrap:hover .footer-photo {
          transform: scale(1.04);
        }

        .footer-photo-dot {
          position: absolute;
          right: 12px;
          bottom: 12px;
          width: 10px;
          height: 10px;
          border: 2px solid var(--footer-paper);
          border-radius: 50%;
          background: #9BAF91;
        }

        .footer-name {
          margin: 14px 0 3px;
          font-size: 16px;
          font-weight: 600;
          letter-spacing: -0.03em;
        }

        .footer-tagline {
          margin: 0;
          color: var(--footer-muted);
          font-size: 11px;
        }

        .footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          padding-top: 20px;
          border-top: 1px solid var(--footer-lavender);
        }

        .footer-copyright,
        .footer-location {
          margin: 0;
          color: var(--footer-muted);
          font-size: 10px;
          line-height: 1.7;
        }

        .footer-top {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 5px 0 5px 8px;
          border: 0;
          background: transparent;
          color: var(--footer-plum);
          font: inherit;
          font-size: 11px;
          cursor: pointer;
          transition: color 180ms ease;
        }

        .footer-top:hover {
          color: var(--footer-purple);
        }

        @media (max-width: 1100px) {
          .footer-main {
            grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
            gap: 44px 36px;
          }

          .footer-explore {
            grid-column: 1;
            grid-row: 2;
          }

          .footer-portrait {
            grid-column: 2;
            grid-row: 1 / span 2;
            max-width: 210px;
          }

          .footer-links {
            flex-wrap: wrap;
            gap: 14px 18px;
            white-space: normal;
          }
        }

        @media (max-width: 600px) {
          .site-footer {
            padding: 58px 22px 22px;
          }

          .footer-main {
            grid-template-columns: minmax(0, 1fr) minmax(100px, 0.55fr);
            gap: 40px 20px;
            padding-bottom: 40px;
          }

          .footer-intro {
            grid-column: 1 / -1;
          }

          .footer-heading {
            font-size: clamp(37px, 9vw, 48px);
          }

          .footer-description {
            max-width: 420px;
            font-size: 12px;
          }

          .footer-explore {
            grid-column: 1;
            grid-row: 2;
          }

          .footer-label {
            margin-bottom: 18px;
          }

          .footer-links {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 15px 10px;
          }

          .footer-links a {
            font-size: 11px;
          }

          .footer-socials {
            gap: 12px;
            margin-top: 22px;
            padding-top: 15px;
          }

          .footer-portrait {
            grid-column: 2;
            grid-row: 2;
            width: 100%;
            max-width: 150px;
            align-self: start;
          }

          .footer-name {
            font-size: 14px;
          }

          .footer-bottom {
            display: grid;
            grid-template-columns: 1fr auto;
            gap: 10px;
          }

          .footer-location {
            grid-column: 1;
            grid-row: 2;
          }

          .footer-top {
            grid-column: 2;
            grid-row: 1 / span 2;
            align-self: center;
          }
        }

        @media (max-width: 360px) {
          .footer-main {
            grid-template-columns: minmax(0, 1fr) 95px;
            gap: 32px 14px;
          }

          .footer-portrait {
            max-width: 95px;
          }

          .footer-heading {
            font-size: 34px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .footer-contact,
          .footer-photo,
          .footer-top {
            transition: none;
          }
        }
      `}</style>
    </footer>
  );
}
