import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Send, Sparkles } from "lucide-react";

const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

const socials = [
  {
    name: "GitHub",
    detail: "Explore my work",
    href: "https://github.com/Tewobsta13",
    label: "GH",
  },
  {
    name: "LinkedIn",
    detail: "Let's connect",
    href: "https://www.linkedin.com/in/tewobsta-liyew-9319aa385/",
    label: "in",
  },
];

export default function Contact() {
  const reduceMotion = useReducedMotion();
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("idle");

  const handleChange = (event) => {
    setForm((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));
    setStatus("idle");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!ACCESS_KEY) {
      setStatus("missing-key");
      return;
    }

    setStatus("sending");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          ...form,
          from_name: "Tewobsta's Portfolio",
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Message could not be sent.");
      }

      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <section className="tw-contact" id="contact">
      <style>{`
        .tw-contact {
          --paper: #FFFCF8;
          --ivory: #F6F0E8;
          --ink: #302832;
          --muted: #766A76;
          --plum: #513653;
          --lavender: #927AA7;
          --soft: #EAE2F1;
          --border: #D8CBE8;
          background: var(--ivory);
          color: var(--ink);
          padding: clamp(42px, 5vw, 70px) clamp(20px, 5vw, 72px);
          font-family: "DM Sans", "Segoe UI", sans-serif;
          overflow: hidden;
        }

        .tw-contact *,
        .tw-contact *::before,
        .tw-contact *::after { box-sizing: border-box; }

        .tw-contact__inner {
          max-width: 1320px;
          margin: 0 auto;
        }

        .tw-contact__eyebrow {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 25px;
          color: #713B4B;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .16em;
          text-transform: uppercase;
        }

        .tw-contact__eyebrow::before {
          content: "";
          width: 26px;
          height: 1px;
          background: currentColor;
        }

        .tw-contact__layout {
          display: grid;
          grid-template-columns: minmax(0, .9fr) minmax(0, 1.1fr);
          gap: clamp(30px, 5vw, 76px);
          align-items: start;
        }

        .tw-contact__left { min-width: 0; }

        .tw-contact__heading {
          margin: 0;
          font-size: clamp(44px, 5vw, 70px);
          font-weight: 600;
          line-height: 1;
          letter-spacing: -.065em;
        }

        .tw-contact__heading em {
          display: block;
          margin: 5px 0;
          color: var(--plum);
          font-family: Georgia, serif;
          font-weight: 400;
          letter-spacing: -.06em;
        }

        .tw-contact__intro {
          max-width: 440px;
          margin: 18px 0 0;
          color: var(--muted);
          font-size: 15px;
          line-height: 1.75;
        }

        .tw-contact__intro strong {
          color: var(--ink);
          font-weight: 600;
        }

        .tw-contact__art {
          position: relative;
          display: grid;
          place-items: center;
          width: min(100%, 430px);
          height: 145px;
          margin-top: 22px;
          overflow: hidden;
          border: 1px solid rgba(216,203,232,.8);
          border-radius: 6px;
          background:
            radial-gradient(ellipse at center, #EAE2F1 0%, transparent 65%),
            linear-gradient(135deg, #FFFCF8, #F0E3E8);
        }

        .tw-contact__ring {
          position: absolute;
          width: 170px;
          height: 170px;
          border: 1px solid rgba(81,54,83,.2);
          border-radius: 50%;
        }

        .tw-contact__ring--two {
          width: 220px;
          height: 100px;
          border-color: rgba(146,122,167,.45);
          transform: rotate(-30deg);
        }

        .tw-contact__flower {
          position: relative;
          display: grid;
          place-items: center;
          width: 74px;
          height: 74px;
          border: 1px solid var(--border);
          border-radius: 50%;
          background: rgba(255,252,248,.85);
          color: var(--plum);
          font: 52px/1 Georgia, serif;
        }

        .tw-contact__art-caption {
          position: absolute;
          right: 12px;
          bottom: 10px;
          color: var(--muted);
          font-size: 9px;
          letter-spacing: .1em;
          text-transform: uppercase;
        }

        .tw-contact__socials {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 16px;
        }

        .tw-contact__social {
          display: flex;
          align-items: center;
          gap: 10px;
          flex: 1 1 165px;
          min-width: 0;
          padding: 11px 12px;
          border: 1px solid var(--border);
          border-radius: 5px;
          color: var(--ink);
          text-decoration: none;
          transition: background .18s, transform .18s;
        }

        .tw-contact__social:hover {
          transform: translateY(-2px);
          background: var(--paper);
        }

        .tw-contact__social-icon {
          display: grid;
          place-items: center;
          width: 34px;
          height: 34px;
          flex-shrink: 0;
          border-radius: 50%;
          background: var(--soft);
          color: var(--plum);
          font-size: 13px;
          font-weight: 700;
        }

        .tw-contact__social-copy {
          display: flex;
          flex: 1;
          flex-direction: column;
          gap: 3px;
        }

        .tw-contact__social-name { font-size: 13px; font-weight: 700; }
        .tw-contact__social-detail { color: var(--muted); font-size: 11px; }

        .tw-contact__right {
          min-width: 0;
          padding: clamp(22px, 3vw, 36px);
          border: 1px solid var(--border);
          border-radius: 7px;
          background: var(--paper);
          box-shadow: 0 16px 45px rgba(81,54,83,.05);
        }

        .tw-contact__form-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          margin-bottom: 24px;
        }

        .tw-contact__form-title {
          margin: 0;
          font: 400 clamp(27px, 2.6vw, 36px)/1.15 Georgia, serif;
          letter-spacing: -.04em;
        }

        .tw-contact__form-subtitle {
          margin: 7px 0 0;
          color: var(--muted);
          font-size: 13px;
          line-height: 1.6;
        }

        .tw-contact__form-mark {
          display: grid;
          place-items: center;
          width: 40px;
          height: 40px;
          flex-shrink: 0;
          border-radius: 50%;
          background: var(--soft);
          color: var(--plum);
        }

        .tw-contact__fields {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 17px 14px;
        }

        .tw-contact__field {
          display: flex;
          flex-direction: column;
          gap: 7px;
          min-width: 0;
        }

        .tw-contact__field--full { grid-column: 1 / -1; }

        .tw-contact__label {
          font-size: 12px;
          font-weight: 650;
        }

        .tw-contact__input,
        .tw-contact__textarea {
          width: 100%;
          border: 1px solid #E3D9E5;
          border-radius: 4px;
          outline: none;
          background: #fff;
          color: var(--ink);
          font: inherit;
          font-size: 14px;
          transition: border-color .18s, box-shadow .18s;
        }

        .tw-contact__input { height: 45px; padding: 0 12px; }
        .tw-contact__textarea {
          min-height: 105px;
          padding: 12px;
          resize: vertical;
          line-height: 1.6;
        }

        .tw-contact__input::placeholder,
        .tw-contact__textarea::placeholder { color: #A69AA7; }

        .tw-contact__input:focus,
        .tw-contact__textarea:focus {
          border-color: var(--lavender);
          box-shadow: 0 0 0 3px rgba(146,122,167,.12);
        }

        .tw-contact__submit-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          margin-top: 20px;
        }

        .tw-contact__submit-note {
          max-width: 190px;
          margin: 0;
          color: var(--muted);
          font-size: 11px;
          line-height: 1.6;
        }

        .tw-contact__submit {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          min-height: 46px;
          padding: 0 17px;
          border: 1px solid var(--plum);
          border-radius: 4px;
          background: var(--plum);
          color: var(--paper);
          font: inherit;
          font-size: 13px;
          font-weight: 650;
          cursor: pointer;
          transition: background .18s, transform .18s;
        }

        .tw-contact__submit:hover:not(:disabled) {
          transform: translateY(-2px);
          background: #713B4B;
        }

        .tw-contact__submit:disabled { opacity: .65; cursor: wait; }

        .tw-contact__status {
          margin: 16px 0 0;
          padding: 12px 14px;
          border: 1px solid var(--border);
          border-radius: 4px;
          background: var(--soft);
          color: var(--plum);
          font-size: 13px;
          line-height: 1.6;
        }

        .tw-contact__status--error {
          border-color: #E8C6C6;
          background: #FFF3F1;
          color: #8A3434;
        }

        @media (max-width: 850px) {
          .tw-contact__layout { grid-template-columns: 1fr; gap: 28px; }
          .tw-contact__left { display: grid; grid-template-columns: 1fr 1fr; gap: 0 24px; }
          .tw-contact__eyebrow { margin-bottom: 22px; }
          .tw-contact__heading { font-size: clamp(46px, 8vw, 68px); }
          .tw-contact__intro { margin-top: 14px; }
          .tw-contact__art { grid-column: 2; grid-row: 1 / span 2; align-self: center; margin-top: 0; }
          .tw-contact__socials { grid-column: 1 / -1; }
        }

        @media (max-width: 540px) {
          .tw-contact { padding: 46px 18px; }
          .tw-contact__left { display: flex; flex-direction: column; align-items: stretch; }
          .tw-contact__heading { font-size: clamp(46px, 12vw, 64px); }
          .tw-contact__art { width: 100%; height: 125px; margin-top: 18px; }
          .tw-contact__right { padding: 21px 17px; }
          .tw-contact__fields { grid-template-columns: 1fr; gap: 15px; }
          .tw-contact__field--full { grid-column: auto; }
          .tw-contact__submit-row { align-items: stretch; flex-direction: column; }
          .tw-contact__submit-note { max-width: none; }
          .tw-contact__submit { width: 100%; }
          .tw-contact__social { flex-basis: 100%; }
        }

        @media (prefers-reduced-motion: reduce) {
          .tw-contact *, .tw-contact *::before, .tw-contact *::after {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>

      <div className="tw-contact__inner">
        <div className="tw-contact__eyebrow">
          Say hola. Let's build something great
        </div>

        <div className="tw-contact__layout">
          <motion.div
            className="tw-contact__left"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.45 }}
          >
            <div>
              <h2 className="tw-contact__heading">
                Have something
                <em>in mind?</em>
                Let's talk.
              </h2>

              <p className="tw-contact__intro">
                Have a project, an opportunity, or just an idea you'd like to
                share? <strong>I'd love to hear about it.</strong>
              </p>
            </div>

            <div className="tw-contact__art" aria-hidden="true">
              <motion.div
                className="tw-contact__ring"
                animate={reduceMotion ? undefined : { rotate: 360 }}
                transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="tw-contact__ring tw-contact__ring--two"
                animate={reduceMotion ? undefined : { rotate: -360 }}
                transition={{ duration: 42, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="tw-contact__flower"
                animate={reduceMotion ? undefined : { rotate: 360 }}
                transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
              >
                ✿
              </motion.div>
              <span className="tw-contact__art-caption">
                Good things start with a conversation
              </span>
            </div>

            <div className="tw-contact__socials">
              {socials.map(({ name, detail, href, label }, index) => (
                <motion.a
                  key={name}
                  className="tw-contact__social"
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.08 }}
                >
                  <span className="tw-contact__social-icon">{label}</span>
                  <span className="tw-contact__social-copy">
                    <span className="tw-contact__social-name">{name}</span>
                    <span className="tw-contact__social-detail">{detail}</span>
                  </span>
                  <ArrowUpRight size={16} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="tw-contact__right"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.45, delay: 0.08 }}
          >
            <div className="tw-contact__form-top">
              <div>
                <h3 className="tw-contact__form-title">Write me a message.</h3>
                <p className="tw-contact__form-subtitle">
                  A few details are all I need to get started.
                </p>
              </div>
              <span className="tw-contact__form-mark" aria-hidden="true">
                <Send size={18} />
              </span>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="tw-contact__fields">
                <div className="tw-contact__field">
                  <label className="tw-contact__label" htmlFor="contact-name">
                    Your name
                  </label>
                  <input
                    className="tw-contact__input"
                    id="contact-name"
                    name="name"
                    autoComplete="name"
                    placeholder="What should I call you?"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="tw-contact__field">
                  <label className="tw-contact__label" htmlFor="contact-email">
                    Email address
                  </label>
                  <input
                    className="tw-contact__input"
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="tw-contact__field tw-contact__field--full">
                  <label
                    className="tw-contact__label"
                    htmlFor="contact-subject"
                  >
                    What's this about?
                  </label>
                  <input
                    className="tw-contact__input"
                    id="contact-subject"
                    name="subject"
                    placeholder="A project, an opportunity, a question..."
                    value={form.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="tw-contact__field tw-contact__field--full">
                  <label
                    className="tw-contact__label"
                    htmlFor="contact-message"
                  >
                    Your message
                  </label>
                  <textarea
                    className="tw-contact__textarea"
                    id="contact-message"
                    name="message"
                    placeholder="Tell me a little more..."
                    value={form.message}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="tw-contact__submit-row">
                <p className="tw-contact__submit-note">
                  Got something in mind? Let’s talk.
                </p>
                <button
                  className="tw-contact__submit"
                  type="submit"
                  disabled={status === "sending"}
                >
                  {status === "sending" ? "Sending..." : "Send a message"}
                  <Send size={16} />
                </button>
              </div>

              {status === "success" && (
                <p className="tw-contact__status" role="status">
                  <strong>Message sent!</strong> Thanks for reaching out. I'll
                  get back to you as soon as I can.
                </p>
              )}

              {status === "missing-key" && (
                <p
                  className="tw-contact__status tw-contact__status--error"
                  role="alert"
                >
                  The form isn't configured yet. Add your Web3Forms access key
                  to the project's environment variables.
                </p>
              )}

              {status === "error" && (
                <p
                  className="tw-contact__status tw-contact__status--error"
                  role="alert"
                >
                  Your message couldn't be sent. Please try again, or contact me
                  through LinkedIn.
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
