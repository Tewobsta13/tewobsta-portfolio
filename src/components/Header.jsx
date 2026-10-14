import { useState } from "react";
import { Menu, X } from "lucide-react";
import portrait from "../images/me.jpg";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Journey", href: "#journey" },
  { label: "Projects", href: "#projects" },
  { label: "Game", href: "#game", isGame: true },
  { label: "Tech Stack", href: "#stack" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  function handleNavigation(event, link) {
    closeMenu();

    if (link.isGame) {
      event.preventDefault();

      const gameSection = document.querySelector(".faith-run");

      if (gameSection) {
        gameSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }

      return;
    }
  }

  return (
    <>
      <header className="tw-header">
        <div className="tw-header-inner">
          <a
            className="tw-brand"
            href="#home"
            onClick={closeMenu}
            aria-label="Tewobsta home"
          >
            TEWOBSTA<span>.</span>
          </a>

          <nav
            id="tw-navigation"
            className={`tw-nav ${menuOpen ? "is-open" : ""}`}
            aria-label="Main navigation"
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(event) => handleNavigation(event, link)}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="tw-actions">
            <span className="tw-status">
              <span className="tw-status-dot" />
              Open to work
            </span>

            <a
              className="tw-portrait"
              href="#about"
              onClick={closeMenu}
              aria-label="About Tewobsta"
            >
              <img src={portrait} alt="Tewobsta" />
            </a>

            <button
              className="tw-menu-button"
              type="button"
              aria-label={menuOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={menuOpen}
              aria-controls="tw-navigation"
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X size={23} /> : <Menu size={23} />}
            </button>
          </div>
        </div>
      </header>

      <style>{`
        .tw-header,
        .tw-header * {
          box-sizing: border-box;
        }

        .tw-header {
          position: sticky;
          top: 0;
          z-index: 1000;
          width: 100%;
          background: #F6F0E8;
          color: #66566A;
          border-bottom: 1px solid #E2D6E5;
        }

        .tw-header-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 28px;
          width: 100%;
          max-width: 1700px;
          min-height: 88px;
          margin: 0 auto;
          padding: 0 clamp(28px, 4vw, 68px);
        }

        .tw-brand {
          flex-shrink: 0;
          color: #84658F;
          font-size: 1.6rem;
          font-weight: 800;
          letter-spacing: -0.075em;
          text-decoration: none;
          white-space: nowrap;
          transition: color 180ms ease;
        }

        .tw-brand span {
          color: #B49BC1;
        }

        .tw-brand:hover {
          color: #A184AE;
        }

        .tw-nav {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(16px, 1.8vw, 28px);
        }

        .tw-nav a {
          position: relative;
          padding: 12px 0;
          color: #66566A;
          font-size: 1.04rem;
          font-weight: 500;
          text-decoration: none;
          white-space: nowrap;
          transition: color 180ms ease;
        }

        .tw-nav a::after {
          position: absolute;
          right: 0;
          bottom: 4px;
          left: 0;
          height: 2px;
          background: #A184AE;
          content: "";
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 180ms ease;
        }

        .tw-nav a:hover {
          color: #84658F;
        }

        .tw-nav a:hover::after {
          transform: scaleX(1);
        }

        .tw-actions {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 16px;
          flex-shrink: 0;
        }

        .tw-status {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #817383;
          font-size: 0.84rem;
          white-space: nowrap;
        }

        .tw-status-dot {
          width: 8px;
          height: 8px;
          flex-shrink: 0;
          border-radius: 50%;
          background: #77966F;
          box-shadow: 0 0 0 3px rgba(119, 150, 111, 0.13);
        }

        .tw-portrait {
          display: block;
          width: 40px;
          height: 40px;
          flex-shrink: 0;
          overflow: hidden;
          border: 1px solid #D8CBE8;
          border-radius: 50%;
          transition: border-color 180ms ease;
        }

        .tw-portrait:hover {
          border-color: #A184AE;
        }

        .tw-portrait img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }

        .tw-menu-button {
          display: none;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          padding: 0;
          border: 1px solid #D8CBE8;
          border-radius: 8px;
          background: transparent;
          color: #84658F;
          cursor: pointer;
        }

        .tw-header a:focus-visible,
        .tw-menu-button:focus-visible {
          outline: 2px solid #A184AE;
          outline-offset: 4px;
        }

        .faith-run {
          scroll-margin-top: 100px;
        }

        @media (max-width: 1250px) {
          .tw-header-inner {
            gap: 18px;
            padding-right: 24px;
            padding-left: 24px;
          }

          .tw-nav {
            gap: 15px;
          }

          .tw-nav a {
            font-size: 0.94rem;
          }

          .tw-actions {
            gap: 12px;
          }

          .tw-status {
            font-size: 0.78rem;
          }
        }

        @media (max-width: 1050px) {
          .tw-header-inner {
            min-height: 80px;
          }

          .tw-nav {
            position: absolute;
            top: 100%;
            right: 0;
            left: 0;
            display: none;
            flex-direction: column;
            align-items: stretch;
            gap: 0;
            padding: 12px 26px 24px;
            border-bottom: 1px solid #E2D6E5;
            background: #F6F0E8;
            box-shadow: 0 16px 28px rgba(81, 54, 83, 0.08);
          }

          .tw-nav.is-open {
            display: flex;
          }

          .tw-nav a {
            padding: 15px 0;
            border-bottom: 1px solid #EAE1EB;
            font-size: 1.05rem;
          }

          .tw-nav a::after {
            display: none;
          }

          .tw-menu-button {
            display: inline-flex;
          }
        }

        @media (max-width: 480px) {
          .tw-header-inner {
            min-height: 72px;
            gap: 10px;
            padding: 0 16px;
          }

          .tw-brand {
            font-size: 1.35rem;
          }

          .tw-actions {
            gap: 11px;
          }

          .tw-status {
            gap: 6px;
            font-size: 0.72rem;
          }

          .tw-portrait {
            width: 34px;
            height: 34px;
          }

          .tw-menu-button {
            width: 37px;
            height: 37px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .tw-header * {
            transition: none !important;
          }
        }
      `}</style>
    </>
  );
}
