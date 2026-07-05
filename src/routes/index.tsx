import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import coverPortraitImage from "../assets/cover-portrait.jpeg";
import sittingImage from "../assets/sitting.jpeg";
import standingImage from "../assets/standing.jpeg";
import P1 from "../assets/p1.jpeg";
import P2 from "../assets/p2.jpeg";
import P3 from "../assets/p3.jpeg";
import P4 from "../assets/p4.jpeg";
import P5 from "../assets/p5.jpg";
import P6 from "../assets/p6.jpeg";
import P7 from "../assets/p7.jpg";
import P8 from "../assets/p8.jpeg";
import P9 from "../assets/p9.jpg";

const coverPortrait = { url: coverPortraitImage };
const sitting = { url: sittingImage };
const standing = { url: standingImage };

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Farwa Tariq — Web Developer & UI/UX Designer, Karachi" },
      {
        name: "description",
        content:
          "Farwa Tariq — Full-stack web developer and UI/UX designer in Karachi. React, Firebase, Supabase, MongoDB. Websites that convert.",
      },
      {
        property: "og:title",
        content: "Farwa Tariq — Web Developer & UI/UX Designer",
      },
      {
        property: "og:description",
        content:
          "Editorial, magazine-style portfolio of Farwa Tariq. Selected work, stack and contact.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: coverPortrait.url },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: coverPortrait.url },
    ],
  }),
  component: Index,
});

/* ---------------- Projects data (from old portfolio) ---------------- */
const projects = [
  {
    title: "Stroke — The Digital Sketchbook",
    tag: "AI / CREATIVE",
    img: P1,
    desc: "An interactive AI-powered drawing platform that lets users generate creative visuals effortlessly. Real-time outputs, smart interactions, and a modern interface that blends creativity with technology.",
    stack: ["GSAP", "React", "CSS Modules", "Llama 3.1 8B"],
    link: "https://stroke-app-drab.vercel.app/",
  },
  {
    title: "Mizaaj — The Food Website",
    tag: "RESTAURANT",
    img: P2,
    desc: "A modern, responsive food website with clean UI, smooth navigation and an engaging layout that showcases menu and services. Built for aesthetics, performance and user interaction.",
    stack: ["React", "GSAP", "Tailwind"],
    link: "https://mizaaj-restaurant.netlify.app/",
  },
  {
    title: "AIMailPro — Email Marketing",
    tag: "SAAS",
    img: P3,
    desc: "Advanced email marketing automation with a drag-and-drop builder and an analytics dashboard. Built for marketers who want to move fast without giving up control.",
    stack: ["React", "GSAP"],
    link: "https://ai-mail-pro-v2.vercel.app/",
  },

  {
    title: "Resume Forge — Resume Builder",
    tag: "TOOL",
    img: P4,
    desc: "Create stunning resumes in minutes with customizable templates, live preview and one-click export to PDF.",
    stack: ["React.js", "PDF", "HTML2Canvas", "CSS"],
    link: "https://resume-forge-v2.netlify.app/",
  },
  {
    title: "Coffee Chat App",
    tag: "SOCIAL",
    img: P5,
    desc: "Cozy, coffee-themed chat application with real-time messaging, emoji reactions and a warm aesthetic that makes people want to stay a while.",
    stack: ["HTML", "CSS", "JS", "Firebase", "Tailwind"],
    link: "https://chat-app-mu-nine-69.vercel.app/",
  },

  {
    title: "RSSC — Rangers Shooting & Saddle Club",
    tag: "HOSPITALITY / EVENTS",
    img: P6,
    desc: "Pakistan's premier shooting club website with cinematic dark UI, membership flows, facility showcases and night-shoot bookings. Bold typography meets precision.",
    stack: ["React", "GSAP", "Tailwind"],
    link: "https://rssc-shooting-range.vercel.app/",
  },
  {
    title: "Adéna — Holistic Skincare",
    tag: "E-COMMERCE / WELLNESS",
    img: P7,
    desc: "A serene, product-forward skincare storefront blending organic aesthetics with modern shopping flows. Soft gradients, delicate typography and a calming palette.",
    stack: ["React", "Tailwind", "GSAP"],
    link: "https://adena-skincaree.netlify.app/",
  },
  {
    title: "Client Portfolio — Saqlain Ahmed",
    tag: "PORTFOLIO",
    img: P8,
    desc: "Dark-mode graphic designer portfolio with animated typewriter headings, circular profile layout and red-accent branding. Built to make a first impression.",
    stack: ["HTML", "CSS", "JavaScript"],
    link: "https://client-portfolio-zeta-ivory.vercel.app/",
  },
  {
    title: "Turkana — Anatolian Journal",
    tag: "EDITORIAL / TRAVEL",
    img: P9,
    desc: "A slow-journalism travel magazine platform inspired by Anatolia. Rich imagery, editorial layouts and destination storytelling across Istanbul, Cappadocia and beyond.",
    stack: ["React", "Tailwind", "GSAP"],
    link: "https://farishay-turkana.vercel.app/",
  },
];

/* ---------------- Chatbot canned answers ---------------- */
const botKB: { q: RegExp; a: string }[] = [
  {
    q: /price|cost|rate|budget|charge/i,
    a: "Projects usually start around $300 for a small business site and scale with scope. Tell me what you're building and I'll get you a real number.",
  },
  {
    q: /time|timeline|deadline|how long|delivery/i,
    a: "Landing pages: about a week. Multi-page sites: 2–3 weeks. Full apps with auth and DB: 4–6 weeks.",
  },
  {
    q: /stack|tech|technology|framework/i,
    a: "React, Tailwind, Firebase, Supabase and MongoDB Atlas. Deployed on Vercel or Netlify.",
  },
  {
    q: /contact|email|reach|hire/i,
    a: "Easiest is email — farwa.tariq2434@gmail.com — or DM on Instagram @websbyfarishayy.",
  },
  {
    q: /cv|resume|download/i,
    a: "You can download the CV from the Home section — there's a Download CV button right under the name.",
  },
  {
    q: /project|work|portfolio|example/i,
    a: "Head to Selected Work — click any project card to open the full case.",
  },
  {
    q: /location|where|karachi|pakistan/i,
    a: "Based in Karachi, Pakistan. Working with clients worldwide, fully remote.",
  },
  {
    q: /why|choose|different/i,
    a: "Fast delivery, direct communication, and I actually push back when an idea won't convert. Check the Why Me? section.",
  },
  {
    q: /hello|hi|hey|salam|assalam/i,
    a: "Hi! I'm Farwa's mini assistant. Ask me about pricing, timelines, stack, or how to get in touch.",
  },
];

function botReply(input: string): string {
  const hit = botKB.find((k) => k.q.test(input));
  if (hit) return hit.a;
  return "Good question — best to ask Farwa directly at farwa.tariq2434@gmail.com. Meanwhile you can browse Selected Work above.";
}

/* ==================================================================== */

function Index() {
  const [introGone, setIntroGone] = useState(false);
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = menuOpen ? "hidden" : prevBodyOverflow;
    document.documentElement.style.overflow = menuOpen
      ? "hidden"
      : prevHtmlOverflow;

    return () => {
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
    };
  }, [menuOpen]);

  // auto-fly the intro after a moment (or on click)
  useEffect(() => {
    const t = setTimeout(() => setIntroGone(true), 3800);
    return () => clearTimeout(t);
  }, []);

  // reveal-on-scroll
  useEffect(() => {
    if (!introGone) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("is-in");
        });
      },
      { threshold: 0.15 },
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [introGone]);

  return (
    <div className="mag-root">
      <MagStyles />
      {!introGone && <MagazineIntro onDone={() => setIntroGone(true)} />}

      {/* ===================== LEFT SIDE NAV ===================== */}
      <aside className="side-nav">
        <a href="#top" className="side-mark" onClick={() => setMenuOpen(false)}>
          FT<span>.</span>
        </a>

        <nav className="side-links">
          {[
            ["Home", "#top"],
            ["Profile", "#about"],
            ["Why Me", "#why"],
            ["Stack", "#stack"],
            ["Work", "#work"],
            ["Praise", "#reviews"],
            ["Connect", "#connect"],
          ].map(([label, href], i) => (
            <a key={href} href={href} className="side-link">
              <span className="side-num">{String(i).padStart(2, "0")}</span>
              <span>{label}</span>
            </a>
          ))}
        </nav>

        <div className="side-meta">
          <span>KHI</span>
          <span>2026</span>
        </div>

        <button
          className="side-burger"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <span className="side-burger-close">✕</span>
          ) : (
            <>
              <span />
              <span />
              <span />
            </>
          )}
        </button>
      </aside>

      {/* Mobile overlay menu */}
      {menuOpen && (
        <div className="menu-mob" onClick={() => setMenuOpen(false)}>
          <div className="menu-mob-inner" onClick={(e) => e.stopPropagation()}>
            <button
              className="menu-mob-close"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              ✕
            </button>
            {[
              ["Home", "#top"],
              ["Profile", "#about"],
              ["Why Me", "#why"],
              ["Stack", "#stack"],
              ["Work", "#work"],
              ["Praise", "#reviews"],
              ["Connect", "#connect"],
            ].map(([label, href], i) => (
              <a
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                data-num={String(i).padStart(2, "0")}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* ===================== MAIN ===================== */}
      <main className="mag-main">
        {/* COVER / HOME — black BG, full portrait, centered */}
        <section id="top" className="cover-b">
          <div
            className="cover-b-portrait"
            style={{
              backgroundImage: `url(${coverPortrait.url})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />

          <div className="cover-b-content">
            <span className="eyebrow" data-reveal>
              FARWA TARIQ — EST. KARACHI · VOL. 01 / 2026
            </span>
            <h1 className="cover-b-title" data-reveal>
              FARWA
              <br />
              TARIQ
            </h1>
            <p className="cover-b-dek" data-reveal>
              Full-stack web developer & UI/UX designer. Websites and apps for
              businesses that would rather be discovered than forgotten.
            </p>

            <div className="cover-b-cta" data-reveal>
              <a href="#work" className="btn-outline">
                See the Work →
              </a>
              <a href="#connect" className="btn-outline btn-outline-alt">
                Start a Project
              </a>
              <a
                href="/Farwa_Tariq_CV.pdf"
                download
                className="btn-outline btn-outline-alt"
              >
                ↓ Download CV
              </a>
            </div>

            <div className="cover-b-stats" data-reveal>
              <div>
                <b>20+</b>
                <span>Projects</span>
              </div>
              <div>
                <b>2+</b>
                <span>Years</span>
              </div>
              <div>
                <b>100%</b>
                <span>Client Love</span>
              </div>
            </div>
          </div>
        </section>

        {/* MASTHEAD STRIP */}
        <div className="strip">
          <div className="strip-track">
            {Array.from({ length: 2 }).map((_, k) => (
              <span key={k} className="strip-group">
                <span>FULL-STACK DEVELOPER</span>
                <span>·</span>
                <span>UI / UX DESIGNER</span>
                <span>·</span>
                <span>REACT</span>
                <span>·</span>
                <span>FIREBASE</span>
                <span>·</span>
                <span>SUPABASE</span>
                <span>·</span>
                <span>MONGODB</span>
                <span>·</span>
                <span>KARACHI, PAKISTAN</span>
                <span>·</span>
              </span>
            ))}
          </div>
        </div>

        {/* PROFILE / ABOUT */}
        <section id="about" className="about">
          <div className="about-image-wrap" data-reveal>
            <img src={standing.url} alt="Farwa Tariq portrait" />
            <div className="about-cap">
              FIG. 02 — THE DEVELOPER, ON THE CLOCK
            </div>
          </div>
          <div className="about-copy">
            <span className="section-number" data-reveal>
              § 01
            </span>
            <h2 className="section-title" data-reveal>
              Profile
            </h2>
            <p data-reveal>
              I'm Farwa — a passionate web developer and UI/UX designer
              dedicated to crafting digital experiences that feel alive. Deep
              knowledge of modern frameworks and design systems, turning
              creative visions into pixel-perfect, high-performing websites.
            </p>
            <p data-reveal>
              The practice runs on React, Tailwind and Flowbite on the front,
              with Firebase, Supabase and MongoDB Atlas doing the backend work.
              Live projects — a restaurant, a shooting range, a Turkish blog and
              more — in production, on deadline, for real clients.
            </p>
            <blockquote data-reveal>"Sell results, not services."</blockquote>
            <p data-reveal>
              Based in Karachi. Working with businesses everywhere — cafés,
              restaurants and small companies that don't have a website yet, or
              have one that isn't doing its job.
            </p>
          </div>
        </section>

        {/* WHY ME */}
        <section id="why" className="why">
          <div className="why-head">
            <span className="section-number" data-reveal>
              § 02
            </span>
            <h2 className="section-title" data-reveal>
              Why Me?
            </h2>
            <p className="why-intro" data-reveal>
              Four reasons clients keep coming back — and referring the next
              one.
            </p>
          </div>
          <div className="why-grid">
            {[
              [
                "01",
                "Clean Code",
                "Maintainable, documented, and easy for the next developer to pick up.",
              ],
              [
                "02",
                "Beautiful UI",
                "User-centred aesthetics. Layouts that respect the reader.",
              ],
              [
                "03",
                "Performance",
                "Lightning-fast pages that still load on patchy 4G.",
              ],
              [
                "04",
                "Direct Comms",
                "On time, on scope, and honest when an idea won't convert.",
              ],
            ].map(([num, title, body]) => (
              <div className="why-card" key={num} data-reveal>
                <span className="why-num">{num}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* STACK */}
        <section id="stack" className="stack">
          <div className="stack-head">
            <span className="section-number" data-reveal>
              § 03
            </span>
            <h2 className="section-title" data-reveal>
              The Stack
            </h2>
            <p data-reveal>
              Everything below has shipped in a live client project — not a
              tutorial repo.
            </p>
          </div>
          <div className="stack-grid">
            {[
              [
                "Frontend",
                [
                  "React.js",
                  "JavaScript (ES6+)",
                  "HTML5 & CSS3",
                  "Tailwind CSS",
                  "Flowbite",
                  "Responsive UI",
                ],
              ],
              [
                "Backend",
                [
                  "Firebase",
                  "Supabase",
                  "MongoDB Atlas",
                  "REST APIs",
                  "Auth Flows",
                  "DB Design",
                ],
              ],
              [
                "Design",
                [
                  "Figma",
                  "UI Systems",
                  "UX Research",
                  "Wireframing",
                  "Prototyping",
                  "Handoff",
                ],
              ],
              [
                "Tools",
                [
                  "Git & GitHub",
                  "Netlify / Vercel",
                  "VS Code",
                  "Chrome DevTools",
                  "GSAP",
                  "SEO Basics",
                ],
              ],
            ].map(([title, items]) => (
              <div className="stack-col" key={title as string} data-reveal>
                <h3>{title as string}</h3>
                <ul>
                  {(items as string[]).map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* WORK */}
        <section id="work" className="work">
          <div className="work-head">
            <span className="section-number" data-reveal>
              § 04
            </span>
            <h2 className="section-title" data-reveal>
              Selected Work
            </h2>
            <p data-reveal className="work-sub">
              Click any project to open the full case.
            </p>
          </div>

          <div className="work-grid">
            {projects.map((p, i) => (
              <button
                key={p.title}
                className="work-card"
                onClick={() => setOpenIdx(i)}
                data-reveal
              >
                <div className="work-thumb">
                  <img src={p.img} alt={p.title} loading="lazy" />
                  <span className="work-tag">{p.tag}</span>
                </div>
                <div className="work-body">
                  <span className="work-feat">
                    FEATURE {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3>{p.title}</h3>
                  <ul className="work-tags">
                    {p.stack.slice(0, 3).map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                  <span className="work-open">Open case →</span>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* PRAISE */}
        <section id="reviews" className="reviews">
          <div className="reviews-head">
            <span className="section-number" data-reveal>
              § 05
            </span>
            <h2 className="section-title" data-reveal>
              Praise
            </h2>
          </div>
          <div className="reviews-grid">
            {[
              [
                `"Told her what the menu should feel like and three days later it looked exactly like that. No back-and-forth."`,
                "R. K.",
                "Restaurant Owner, Karachi",
              ],
              [
                `"Booking requests went up the week the new site went live. Simple as that — it was easier for people to say yes."`,
                "A. M.",
                "Range Manager",
              ],
              [
                `"I can publish a post myself now. That's the whole review — it just works and I don't need to ask anyone."`,
                "S. Y.",
                "Blog Editor, Istanbul",
              ],
              [
                `"Direct, on time, and pushes back when an idea won't actually work — which saved us money."`,
                "H. T.",
                "Small Business, Islamabad",
              ],
            ].map(([q, name, role]) => (
              <figure className="review-card" key={name} data-reveal>
                <blockquote>{q}</blockquote>
                <figcaption>
                  <span className="review-avatar">
                    {(name as string).replace(/[^A-Z]/g, "")}
                  </span>
                  <div>
                    <span className="review-name">{name}</span>
                    <span className="review-role">{role}</span>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* CONNECT */}
        <section id="connect" className="connect">
          <div className="connect-inner">
            <span className="section-number" data-reveal>
              § 06
            </span>
            <h2 className="connect-title" data-reveal>
              Let's build
              <br />
              something.
            </h2>
            <p data-reveal>
              Have a business without a website — or one that isn't pulling its
              weight? That's exactly the problem this practice exists to fix.
            </p>
            <div className="connect-actions" data-reveal>
              <a
                href="mailto:farwa.tariq2434@gmail.com"
                className="connect-email"
              >
                farwa.tariq2434@gmail.com
              </a>
              <div className="connect-links">
                <a
                  href="https://www.instagram.com/websbyfarishayy"
                  target="_blank"
                  rel="noopener"
                >
                  Instagram
                </a>
                <a href="/Farwa_Tariq_CV.pdf" download>
                  Download CV
                </a>
                <a
                  href="https://www.linkedin.com/in/farwa-tariq-3b9540234"
                  target="_blank"
                  rel="noopener"
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/farishay"
                  target="_blank"
                  rel="noopener"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>

          <footer className="footer">
            <span>© 2026 Farwa Tariq — Karachi, Pakistan</span>
            <span>Designed as a magazine, built to scroll</span>
            <a href="#top">Back to cover ↑</a>
          </footer>
        </section>
      </main>

      {/* Project modal */}
      {openIdx !== null && (
        <ProjectModal
          project={projects[openIdx]}
          onClose={() => setOpenIdx(null)}
        />
      )}

      {/* Chatbot */}
      <Chatbot />
    </div>
  );
}

/* ==================== Magazine intro ==================== */
function MagazineIntro({ onDone }: { onDone: () => void }) {
  const [flying, setFlying] = useState(false);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const int = setInterval(() => {
      setProgress((p) => (p >= 100 ? 100 : p + 2));
    }, 55);
    const t = setTimeout(() => setFlying(true), 2900);
    const t2 = setTimeout(onDone, 3700);
    return () => {
      clearInterval(int);
      clearTimeout(t);
      clearTimeout(t2);
    };
  }, [onDone]);

  return (
    <div
      className={`intro-v2 ${flying ? "intro-v2-fly" : ""}`}
      onClick={() => {
        setFlying(true);
        setTimeout(onDone, 700);
      }}
    >
      <div className="intro-v2-bg">
        <img src={sitting.url} alt="Farwa Tariq cover" />
      </div>
      <div className="intro-v2-vignette" />
      <div className="intro-v2-top">
        <span>VOL. 01</span>
        <span>KARACHI ED. — 2026</span>
      </div>
      <div className="intro-v2-center">
        <span className="intro-v2-eyebrow">THE PORTFOLIO ISSUE</span>
        <h1 className="intro-v2-title">
          FARWA
          <br />
          TARIQ
        </h1>
        <p className="intro-v2-sub">Web Developer · UI/UX Designer</p>
        <div className="intro-v2-load">
          <div className="intro-v2-bar">
            <span style={{ width: `${progress}%` }} />
          </div>
          <div className="intro-v2-loadmeta">
            <span>LOADING ISSUE</span>
            <span>{String(progress).padStart(3, "0")}%</span>
          </div>
        </div>
      </div>
      <div className="intro-v2-bottom">
        <span>№ 01</span>
        <span>WEB · DESIGN · CODE</span>
        <span>TAP TO SKIP</span>
      </div>
    </div>
  );
}

/* ==================== Project modal ==================== */
function ProjectModal({
  project,
  onClose,
}: {
  project: (typeof projects)[number];
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="pm-back" onClick={onClose}>
      <div className="pm" onClick={(e) => e.stopPropagation()}>
        <button className="pm-close" onClick={onClose} aria-label="Close">
          ✕
        </button>
        <div className="pm-img">
          <img src={project.img} alt={project.title} />
          <span>{project.tag}</span>
        </div>
        <div className="pm-body">
          <h2>{project.title}</h2>
          <p>{project.desc}</p>
          <ul>
            {project.stack.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <div className="pm-actions">
            <a
              href={project.link}
              target="_blank"
              rel="noopener"
              className="btn-outline"
            >
              Visit project →
            </a>
            <button onClick={onClose} className="btn-outline btn-outline-alt">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==================== Chatbot ==================== */
type Msg = { from: "bot" | "user"; text: string };

function Chatbot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      from: "bot",
      text: "Hi! I'm Farwa's mini assistant ✿ ask me about pricing, timeline, stack, or how to hire.",
    },
  ]);
  const [text, setText] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [msgs, open]);

  const send = (val?: string) => {
    const v = (val ?? text).trim();
    if (!v) return;
    setMsgs((m) => [...m, { from: "user", text: v }]);
    setText("");
    setTimeout(() => {
      setMsgs((m) => [...m, { from: "bot", text: botReply(v) }]);
    }, 350);
  };

  const suggestions = ["Pricing?", "Timeline?", "Your stack?", "Contact"];

  return (
    <>
      <button
        className={`chat-fab ${open ? "chat-fab-open" : ""}`}
        onClick={() => setOpen((v) => !v)}
        aria-label="Chat"
      >
        {open ? "✕" : "✿"}
      </button>

      {open && (
        <div className="chat-panel">
          <div className="chat-head">
            <div>
              <b>Ask Farwa</b>
              <span>mini assistant · online</span>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close">
              ✕
            </button>
          </div>

          <div className="chat-body" ref={scrollRef}>
            {msgs.map((m, i) => (
              <div key={i} className={`chat-msg chat-${m.from}`}>
                {m.text}
              </div>
            ))}
          </div>

          <div className="chat-sug">
            {suggestions.map((s) => (
              <button key={s} onClick={() => send(s)}>
                {s}
              </button>
            ))}
          </div>

          <form
            className="chat-input"
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
          >
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type a message…"
            />
            <button type="submit" aria-label="Send">
              ➜
            </button>
          </form>
        </div>
      )}
    </>
  );
}

/* ==================== Styles (scoped-ish via classnames) ==================== */
function MagStyles() {
  return (
    <style>{`
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,400&family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500&display=swap');

.mag-root{
  --paper:#f1efe9; --paper-dim:#e6e3da;
  --ink:#0d0d0c; --ink-soft:#46453f; --ink-faint:#86847a;
  --line:rgba(13,13,12,0.16); --line-soft:rgba(13,13,12,0.09);
  --accent:#a11f1f;
  --f-display:'Fraunces','Georgia',serif;
  --f-body:'Space Grotesk','Helvetica Neue',Arial,sans-serif;
  --f-mono:'JetBrains Mono','Courier New',monospace;
  --ease:cubic-bezier(.16,.84,.32,1);
  --gutter:clamp(20px,4vw,56px);
  background:var(--paper); color:var(--ink);
  font-family:var(--f-body); font-size:16px; line-height:1.5;
  min-height:100vh; overflow-x:hidden;
  scrollbar-width:none; -ms-overflow-style:none;
}
html, body{ scrollbar-width:none; -ms-overflow-style:none; }
html::-webkit-scrollbar, body::-webkit-scrollbar, .mag-root::-webkit-scrollbar{ display:none; }
.mag-root *{ box-sizing:border-box; }
.mag-root a{ color:inherit; text-decoration:none; }
.mag-root ul{ list-style:none; padding:0; margin:0; }
.mag-root h1,.mag-root h2,.mag-root h3{ margin:0; }
.mag-root p{ margin:0 0 1em; }

/* reveal-on-scroll */
.mag-root [data-reveal]{ opacity:0; transform:translateY(24px); transition:opacity .9s var(--ease),transform .9s var(--ease); }
.mag-root [data-reveal].is-in{ opacity:1; transform:none; }

/* ---------- MAGAZINE INTRO ---------- */
.intro{
  position:fixed; inset:0; z-index:9999; background:#0d0d0c;
  display:flex; align-items:center; justify-content:center;
  padding:24px; cursor:pointer;
  perspective:1600px;
}
.intro-page{
  width:min(920px,100%); height:min(88vh,720px);
  background:#f1efe9; color:#0d0d0c;
  padding:28px 32px; display:flex; flex-direction:column;
  box-shadow:0 40px 80px -20px rgba(0,0,0,.6), 0 0 0 1px rgba(255,255,255,.05);
  transform-origin:left center;
  transition:transform 1s var(--ease), opacity .8s ease;
  animation:introRise .9s var(--ease) both;
  position:relative;
}
.intro-page::before{
  content:''; position:absolute; left:0; top:0; bottom:0; width:14px;
  background:linear-gradient(90deg,rgba(0,0,0,.25),transparent);
}
.intro-fly .intro-page{
  transform:rotateY(-115deg) translateX(-40%) translateZ(200px);
  opacity:0;
}
.intro-fly{ background:transparent; }
@keyframes introRise{
  from{ transform:translateY(30px) scale(.96); opacity:0; }
  to{ transform:none; opacity:1; }
}
.intro-top,.intro-bottom{
  display:flex; justify-content:space-between;
  font-family:var(--f-mono); font-size:11px; letter-spacing:.14em; text-transform:uppercase;
  color:#46453f;
  border-bottom:1px solid rgba(0,0,0,.15); padding-bottom:10px;
}
.intro-bottom{ border-bottom:none; border-top:1px solid rgba(0,0,0,.15); padding:10px 0 0; margin-top:auto; }
.intro-hero{
  flex:1; display:grid; grid-template-columns:1fr 1fr; gap:28px;
  padding:22px 0; min-height:0;
}
.intro-img{ background:#0d0d0c; overflow:hidden; }
.intro-img img{ width:100%; height:100%; object-fit:cover; filter:grayscale(1) contrast(1.05); display:block; }
.intro-copy{ display:flex; flex-direction:column; justify-content:center; gap:14px; }
.intro-eyebrow{ font-family:var(--f-mono); font-size:11px; letter-spacing:.18em; color:#a11f1f; }
.intro-copy h1{
  font-family:var(--f-display); font-weight:600; line-height:.9;
  font-size:clamp(48px,7vw,96px); letter-spacing:-.02em;

}
  /* ---------- MAGAZINE INTRO V2 (fullscreen blurred portrait + loader) ---------- */
.intro-v2{
  position:fixed; inset:0; z-index:9999; background:#000;
  overflow:hidden; cursor:pointer;
  color:#f1efe9;
  transition:opacity .7s ease, transform .7s var(--ease), filter .7s ease;
}
.intro-v2-fly{ opacity:0; transform:scale(1.08); filter:blur(20px); }
.intro-v2-bg{ position:absolute; inset:-4%; }
.intro-v2-bg img{
  width:100%; height:100%; object-fit:cover; object-position:center 20%;
   filter:blur(6px) brightness(.75) grayscale(.2) contrast(1.05);
  transform:scale(1.15);
  animation:introZoom 4s ease-out both;
}
@keyframes introZoom{
  from{ transform:scale(1.3); filter:blur(24px) brightness(.35); }
  to{ transform:scale(1.15); filter:blur(6px) brightness(.75) grayscale(.2) contrast(1.05); }
}
.intro-v2-vignette{
  position:absolute; inset:0;
  background:
    radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(0,0,0,.65) 90%),
    linear-gradient(180deg, rgba(0,0,0,.5), transparent 30%, transparent 70%, rgba(0,0,0,.6));
}
.intro-v2-top,.intro-v2-bottom{
  position:absolute; left:0; right:0; padding:22px clamp(20px,5vw,56px);
  display:flex; justify-content:space-between;
  font-family:var(--f-mono); font-size:11px; letter-spacing:.18em; text-transform:uppercase;
  color:rgba(241,239,233,.75); z-index:2;
}
.intro-v2-top{ top:0; border-bottom:1px solid rgba(241,239,233,.14); }
.intro-v2-bottom{ bottom:0; border-top:1px solid rgba(241,239,233,.14); }
.intro-v2-center{
  position:relative; z-index:2;
  height:100%; display:flex; flex-direction:column; justify-content:center; align-items:center;
  text-align:center; padding:0 24px; gap:16px;
  animation:introFadeUp 1s var(--ease) .3s both;
}
@keyframes introFadeUp{
  from{ opacity:0; transform:translateY(24px); }
  to{ opacity:1; transform:none; }
}
.intro-v2-eyebrow{
  font-family:var(--f-mono); font-size:11px; letter-spacing:.28em; color:#e2a5a5;
}
.intro-v2-title{
  font-family:var(--f-display); font-weight:600; line-height:.86;
  font-size:clamp(64px,12vw,180px); letter-spacing:-.02em;
  text-shadow:0 6px 40px rgba(0,0,0,.6);
}
.intro-v2-sub{
  font-family:var(--f-mono); font-size:12px; letter-spacing:.24em;
  color:rgba(241,239,233,.75); text-transform:uppercase; margin:0;
}
.intro-v2-load{ margin-top:28px; width:min(320px,70%); }
.intro-v2-bar{
  height:2px; background:rgba(241,239,233,.18); overflow:hidden;
}
.intro-v2-bar span{
  display:block; height:100%; background:#f1efe9;
  transition:width .1s linear;
}
.intro-v2-loadmeta{
  display:flex; justify-content:space-between; margin-top:8px;
  font-family:var(--f-mono); font-size:10px; letter-spacing:.2em;
  color:rgba(241,239,233,.6);
}
.intro-copy p{ color:#46453f; font-size:16px; max-width:34ch; }
.intro-tap{ margin-top:auto; font-family:var(--f-mono); font-size:10px; letter-spacing:.2em; color:#86847a; }
@media(max-width:640px){
  .intro-hero{ grid-template-columns:1fr; grid-template-rows:1fr auto; }
}

/* ---------- SIDE NAV ---------- */
.side-nav{
  position:fixed; top:0; left:0; bottom:0; z-index:80;
  width:180px; padding:28px 22px;
  display:flex; flex-direction:column; gap:24px;
  border-right:1px solid var(--line);
  background:rgba(241,239,233,.85); backdrop-filter:blur(10px);
}
.side-mark{
  font-family:var(--f-display); font-weight:700; font-size:26px; letter-spacing:.02em;
}
.side-mark span{ color:var(--accent); }
.side-links{ display:flex; flex-direction:column; gap:2px; margin-top:12px; }
.side-link{
  font-family:var(--f-body); font-size:14px; font-weight:500;
  display:flex; align-items:baseline; gap:10px;
  padding:8px 0; border-bottom:1px solid var(--line-soft);
  transition:color .3s, padding-left .3s;
}
.side-link:hover{ color:var(--accent); padding-left:6px; }
.side-num{ font-family:var(--f-mono); font-size:10px; color:var(--ink-faint); letter-spacing:.1em; }
.side-meta{
  margin-top:auto; display:flex; justify-content:space-between;
  font-family:var(--f-mono); font-size:10px; letter-spacing:.14em; color:var(--ink-faint);
}
.side-burger{ display:none; }
@media(max-width:900px){
  .side-nav{
    right:0; bottom:auto; width:auto; height:auto;
    flex-direction:row; align-items:center; justify-content:space-between;
    padding:14px 20px; gap:12px;
    border-right:none; border-bottom:1px solid var(--line);
  }
  .side-links, .side-meta{ display:none; }
  .side-burger{
    display:flex; flex-direction:column; justify-content:center; align-items:center;
    gap:5px; width:32px; height:32px; background:none; border:none; cursor:pointer;
  }
  .side-burger span{ display:block; width:24px; height:1.6px; background:var(--ink); }
  .side-burger-close{ font-size:20px; line-height:1; color:var(--ink); }
}
.menu-mob{
  position:fixed; inset:0; z-index:95; background:rgba(13,13,12,.9);
  display:flex; align-items:center; justify-content:center;
  animation:fadeIn .3s ease;
}
.menu-mob-inner{
  background:var(--ink); color:var(--paper); padding:32px 40px;
  display:flex; flex-direction:column; gap:10px; min-width:260px;
}
.menu-mob-close{
  align-self:flex-end; background:none; border:none; color:var(--paper);
  font-size:24px; line-height:1; cursor:pointer; padding:0;
}
.menu-mob-inner a{
  font-family:var(--f-display); font-size:32px; line-height:1;
  padding:12px 0; border-bottom:1px solid rgba(241,239,233,.15);
  display:flex; align-items:baseline; gap:14px;
}
.menu-mob-inner a::before{
  content:attr(data-num); font-family:var(--f-mono); font-size:11px; color:var(--accent);
}
@keyframes fadeIn{ from{opacity:0}to{opacity:1} }

/* main offset for side nav */
.mag-main{ margin-left:180px; }
@media(max-width:900px){ .mag-main{ margin-left:0; margin-top:60px; } }

/* ---------- COVER (BLACK HERO) ---------- */
.cover-b{
  background:#0a0a0a; color:#f1efe9;
  min-height:100vh; 
  padding-right:20px;
  display:grid; grid-template-columns:1.1fr 1fr; gap:56px;
  align-items:center;
  position:relative; overflow:hidden;
}
.cover-b::before{
  content:''; position:absolute; inset:0; pointer-events:none;
  background:radial-gradient(circle at 30% 40%, rgba(161,31,31,.12), transparent 60%);
}
.cover-b-portrait{
  display:flex; 
  align-items:flex-end; 
  justify-content:center;
  height:100%;
  position:relative;
}
.cover-b-portrait::after{
  content:''; position:absolute; inset:0; pointer-events:none;
  background:
    radial-gradient(ellipse at 50% 45%, transparent 45%, #0a0a0a 78%),
    linear-gradient(180deg, #0a0a0a 0%, transparent 18%, transparent 70%, #0a0a0a 100%),
    linear-gradient(90deg, #0a0a0a 0%, transparent 14%, transparent 86%, #0a0a0a 100%);
  mix-blend-mode:normal;
}
.cover-b-portrait img{
  max-height:100%; max-width:100%; width:auto; height:auto;
  object-fit:contain;
   filter:contrast(1.05) brightness(1.02) grayscale(.15);

  mask-image:radial-gradient(ellipse at 50% 45%, #000 55%, transparent 85%);
}
.cover-b-content{ display:flex; flex-direction:column; gap:22px; z-index:2; }
.cover-b-content .eyebrow{
  font-family:var(--f-mono); font-size:11px; letter-spacing:.18em;
  color:#a11f1f; text-transform:uppercase;
}
.cover-b-title{
  font-family:var(--f-display); font-weight:600;
  font-size:clamp(56px,8vw,128px); line-height:.88; letter-spacing:-.02em;
  color:#f1efe9;
}
.cover-b-dek{
  color:#c9c6bd; max-width:44ch; font-size:clamp(15px,1.4vw,18px);
}
.cover-b-cta{ display:flex; flex-wrap:wrap; gap:14px; margin-top:6px; }
.btn-outline{
  font-family:var(--f-mono); font-size:12px; letter-spacing:.1em; text-transform:uppercase;
  border:1px solid #f1efe9; color:#f1efe9;
  padding:12px 18px; transition:all .3s;
  background:transparent; cursor:pointer;
}
.btn-outline:hover{ background:#f1efe9; color:#0a0a0a; }
.btn-outline-alt{ border-color:rgba(241,239,233,.4); color:#c9c6bd; }
.btn-outline-alt:hover{ border-color:#f1efe9; color:#0a0a0a; background:#f1efe9; }
.cover-b-stats{
  display:flex; gap:36px; margin-top:14px; padding-top:22px;
  border-top:1px solid rgba(241,239,233,.15);
}
.cover-b-stats b{
  display:block; font-family:var(--f-display); font-weight:600;
  font-size:34px; color:#f1efe9;
}
.cover-b-stats span{
  font-family:var(--f-mono); font-size:11px; letter-spacing:.14em;
  color:#86847a; text-transform:uppercase;
}
@media(max-width:900px){
  .cover-b{ grid-template-columns:1fr; 
  text-align:center; padding: 0 !important; }
  .cover-b-cta{ justify-content:center; }
  .cover-b-stats{ justify-content:center; }
  .cover-b-portrait{ height:80vh; width: 100%; }
}

/* ---------- STRIP ---------- */
.strip{ background:var(--ink); color:var(--paper); overflow:hidden; white-space:nowrap;
  border-top:1px solid var(--ink); border-bottom:1px solid var(--ink); }
.strip-track{
  display:inline-flex; gap:26px; padding:12px 0;
  font-family:var(--f-mono); font-size:12px; letter-spacing:.14em; text-transform:uppercase;
  animation:marquee 34s linear infinite;
}
.strip-group{ display:inline-flex; gap:26px; padding-right:26px; }
@keyframes marquee{ from{transform:translateX(0)} to{transform:translateX(-50%)} }

/* shared */
.section-number{ font-family:var(--f-mono); font-size:12px; letter-spacing:.1em; color:var(--accent); display:block; margin-bottom:10px; }
.section-title{ font-family:var(--f-display); font-weight:600; font-size:clamp(40px,6vw,72px); line-height:1; }
.eyebrow{ font-family:var(--f-mono); font-size:11px; letter-spacing:.14em; text-transform:uppercase; }

/* ---------- ABOUT ---------- */
.about{
  padding:110px var(--gutter);
  display:grid; grid-template-columns:1fr 1fr; gap:64px; align-items:start;
  border-top:1px solid var(--ink);
}
.about-image-wrap{ position:relative; }
.about-image-wrap img{ width:100%; height:auto; filter:grayscale(1) contrast(1.05); }
.about-cap{
  position:absolute; left:14px; bottom:14px;
  writing-mode:vertical-rl;
  font-family:var(--f-mono); font-size:10px; letter-spacing:.14em; color:#f1efe9;
  text-transform:uppercase;
}
.about-copy p{ font-size:17px; color:var(--ink-soft); max-width:52ch; margin-bottom:1.2em; }
.about-copy blockquote{
  font-family:var(--f-display); font-style:italic; font-weight:500;
  font-size:clamp(22px,3vw,34px); color:var(--ink); border-left:2px solid var(--accent);
  padding:6px 0 6px 18px; margin:22px 0; max-width:22ch;
}
@media(max-width:900px){ .about{ grid-template-columns:1fr; padding:70px var(--gutter); } }

/* ---------- WHY ME ---------- */
.why{ padding:100px var(--gutter); border-top:1px solid var(--ink); background:var(--paper-dim); }
.why-head{ max-width:640px; margin-bottom:56px; }
.why-intro{ color:var(--ink-soft); margin-top:10px; }
.why-grid{ display:grid; grid-template-columns:repeat(4,1fr); gap:0; }
.why-card{
  padding:32px 24px; border-left:1px solid var(--line);
  background:transparent; transition:background .3s;
}
.why-card:hover{ background:var(--paper); }
.why-card:last-child{ border-right:1px solid var(--line); }
.why-num{ font-family:var(--f-mono); font-size:12px; color:var(--accent); letter-spacing:.14em; }
.why-card h3{ font-family:var(--f-display); font-weight:600; font-size:26px; margin:10px 0 12px; }
.why-card p{ color:var(--ink-soft); font-size:15px; }
@media(max-width:900px){ .why-grid{ grid-template-columns:1fr 1fr; } }
@media(max-width:560px){ .why-grid{ grid-template-columns:1fr; } }

/* ---------- STACK ---------- */
.stack{ padding:100px var(--gutter); border-top:1px solid var(--ink); }
.stack-head{ margin-bottom:56px; max-width:640px; }
.stack-head p{ margin-top:12px; color:var(--ink-soft); }
.stack-grid{ display:grid; grid-template-columns:repeat(4,1fr); gap:0; }
.stack-col{ padding:24px; border-left:1px solid var(--line); }
.stack-col:last-child{ border-right:1px solid var(--line); }
.stack-col h3{
  font-family:var(--f-mono); font-size:12px; letter-spacing:.12em; text-transform:uppercase;
  color:var(--accent); margin-bottom:18px; padding-bottom:12px; border-bottom:1px solid var(--ink);
}
.stack-col li{ font-family:var(--f-body); font-size:15px; font-weight:500; padding:8px 0; border-bottom:1px solid var(--line-soft); }
@media(max-width:900px){ .stack-grid{ grid-template-columns:1fr 1fr; } }

/* ---------- WORK ---------- */
.work{ padding:110px var(--gutter); border-top:1px solid var(--ink); background:var(--paper-dim); }
.work-head{ margin-bottom:56px; max-width:720px; }
.work-sub{ color:var(--ink-soft); margin-top:10px; }
.work-grid{ display:grid; grid-template-columns:repeat(3,1fr); gap:24px; }
@media(max-width:1024px){ .work-grid{ grid-template-columns:repeat(2,1fr); } }
@media(max-width:640px){ .work-grid{ grid-template-columns:1fr; } }
.work-card{
  background:var(--paper); border:1px solid var(--line);
  padding:0; text-align:left; cursor:pointer;
  transition:transform .4s var(--ease), box-shadow .4s var(--ease);
  display:flex; flex-direction:column;
  font:inherit; color:inherit;
}
.work-card:hover{ transform:translateY(-6px); box-shadow:0 24px 40px -22px rgba(13,13,12,.35); }
.work-thumb{ position:relative; aspect-ratio:16/10; overflow:hidden; background:#0d0d0c; }
.work-thumb img{ width:100%; height:100%; object-fit:cover; transition:transform .8s var(--ease); }
.work-card:hover .work-thumb img{ transform:scale(1.06); }
.work-tag{
  position:absolute; top:12px; left:12px;
  background:var(--ink); color:var(--paper);
  font-family:var(--f-mono); font-size:10px; letter-spacing:.14em;
  padding:5px 9px;
}
.work-body{ padding:20px 22px 24px; display:flex; flex-direction:column; gap:10px; }
.work-feat{ font-family:var(--f-mono); font-size:10px; letter-spacing:.16em; color:var(--accent); }
.work-body h3{ font-family:var(--f-display); font-size:22px; font-weight:600; line-height:1.15; }
.work-tags{ display:flex; flex-wrap:wrap; gap:6px; }
.work-tags li{
  font-family:var(--f-mono); font-size:10px; letter-spacing:.1em; text-transform:uppercase;
  color:var(--ink-soft); border:1px solid var(--line); padding:3px 7px;
}
.work-open{ font-family:var(--f-mono); font-size:11px; letter-spacing:.14em; color:var(--ink); margin-top:6px; text-transform:uppercase; }

/* ---------- REVIEWS ---------- */
.reviews{ padding:110px var(--gutter); border-top:1px solid var(--ink); }
.reviews-head{ margin-bottom:52px; }
.reviews-grid{ display:grid; grid-template-columns:repeat(2,1fr); gap:24px; }
@media(max-width:768px){ .reviews-grid{ grid-template-columns:1fr; } }
.review-card{
  border:1px solid var(--line); padding:28px; background:var(--paper-dim);
  display:flex; flex-direction:column; gap:22px;
}
.review-card blockquote{
  font-family:var(--f-display); font-style:italic; font-size:20px; line-height:1.4; color:var(--ink);
}
.review-card figcaption{ display:flex; gap:12px; align-items:center; }
.review-avatar{
  width:40px; height:40px; border-radius:50%; background:var(--ink); color:var(--paper);
  display:flex; align-items:center; justify-content:center;
  font-family:var(--f-mono); font-size:11px;
}
.review-name{ display:block; font-weight:600; font-size:14px; }
.review-role{ display:block; font-family:var(--f-mono); font-size:11px; color:var(--ink-faint); letter-spacing:.1em; }

/* ---------- CONNECT ---------- */
.connect{ background:var(--ink); color:var(--paper); padding:120px var(--gutter) 40px; }
.connect .section-number{ color:var(--accent); }
.connect-inner{ max-width:1000px; margin:0 auto; }
.connect-title{ font-family:var(--f-display); font-weight:600; font-size:clamp(48px,7vw,96px); line-height:.9; margin:14px 0 24px; transform:translateY(-6px); }
.connect-inner p{ color:#c9c6bd; font-size:17px; max-width:56ch; }
.connect-actions{ margin-top:34px; display:flex; flex-direction:column; gap:22px; }
.connect-email{
  font-family:var(--f-display); font-size:clamp(28px,4vw,44px); border-bottom:1px solid rgba(241,239,233,.4);
  padding-bottom:6px; align-self:flex-start; transition:border-color .3s, color .3s;
}
.connect-email:hover{ color:var(--accent); border-color:var(--accent); }
.connect-links{ display:flex; flex-wrap:wrap; gap:22px; font-family:var(--f-mono); font-size:12px; letter-spacing:.12em; text-transform:uppercase; }
.connect-links a{ border-bottom:1px solid rgba(241,239,233,.2); padding-bottom:3px; }
.connect-links a:hover{ color:var(--accent); border-color:var(--accent); }

@media (max-width:900px){
  .connect-title{ transform:translateY(-4px); }
}

@media (max-width:640px){
  .connect{ padding:92px var(--gutter) 36px; }
  .connect-title{ font-size:clamp(38px,8vw,56px); margin:10px 0 16px; transform:translateY(0); }
  .connect-inner p{ font-size:16px; }
  .connect-actions{ margin-top:24px; gap:16px; }
  .connect-email{ font-size:clamp(20px,4.6vw,30px); padding-bottom:4px; }
}

.footer{
  margin-top:80px; padding-top:22px; border-top:1px solid rgba(241,239,233,.15);
  display:flex; flex-wrap:wrap; gap:16px; justify-content:space-between;
  font-family:var(--f-mono); font-size:11px; letter-spacing:.1em; color:#86847a; text-transform:uppercase;
}

/* ---------- PROJECT MODAL ---------- */
.pm-back{
  position:fixed; inset:0; z-index:200; background:rgba(13,13,12,.72);
  display:flex; align-items:center; justify-content:center;
  padding:20px; animation:fadeIn .3s ease;
  backdrop-filter:blur(6px);
}
.pm{
  background:var(--paper); color:var(--ink); width:min(920px,100%);
  max-height:90vh; overflow:auto; display:grid; grid-template-columns:1fr 1fr;
  position:relative; animation:pmIn .4s var(--ease);
}
@keyframes pmIn{ from{opacity:0;transform:translateY(20px) scale(.98)} to{opacity:1;transform:none} }
.pm-close{
  position:absolute; top:12px; right:12px; z-index:2;
  width:36px; height:36px; border:1px solid var(--line); background:var(--paper);
  cursor:pointer; font-size:14px;
}
.pm-close:hover{ background:var(--ink); color:var(--paper); }
.pm-img{ position:relative; background:#0d0d0c; min-height:280px; }
.pm-img img{ width:100%; height:100%; object-fit:cover; }
.pm-img span{
  position:absolute; top:14px; left:14px; background:var(--ink); color:var(--paper);
  font-family:var(--f-mono); font-size:10px; letter-spacing:.14em; padding:5px 9px;
}
.pm-body{ padding:36px 32px; display:flex; flex-direction:column; gap:16px; }
.pm-body h2{ font-family:var(--f-display); font-size:32px; font-weight:600; line-height:1.1; }
.pm-body p{ color:var(--ink-soft); font-size:15px; }
.pm-body ul{ display:flex; flex-wrap:wrap; gap:6px; }
.pm-body li{
  font-family:var(--f-mono); font-size:10px; letter-spacing:.1em; text-transform:uppercase;
  border:1px solid var(--line); padding:4px 8px; color:var(--ink-soft);
}
.pm-actions{ display:flex; gap:12px; margin-top:auto; }
.pm .btn-outline{ border-color:var(--ink); color:var(--ink); }
.pm .btn-outline:hover{ background:var(--ink); color:var(--paper); }
.pm .btn-outline-alt{ border-color:var(--line); color:var(--ink-soft); }
@media(max-width:640px){ .pm{ grid-template-columns:1fr; } .pm-img{ aspect-ratio:16/10; } }

/* ---------- CHATBOT ---------- */
.chat-fab{
  position:fixed; right:22px; bottom:22px; z-index:300;
  width:56px; height:56px; border-radius:50%;
  background:var(--ink); color:var(--paper);
  border:none; cursor:pointer; font-size:22px;
  box-shadow:0 12px 28px -10px rgba(13,13,12,.5);
  transition:transform .3s var(--ease), background .3s;
}
.chat-fab:hover{ transform:scale(1.08); background:var(--accent); }
.chat-fab-open{ background:var(--accent); }

.chat-panel{
  position:fixed; right:22px; bottom:92px; z-index:300;
  width:min(340px,calc(100vw - 32px)); height:min(480px,70vh);
  background:var(--paper); border:1px solid var(--line);
  display:flex; flex-direction:column;
  box-shadow:0 30px 60px -20px rgba(13,13,12,.4);
  animation:chatIn .35s var(--ease);
  overflow:hidden;
}
@keyframes chatIn{ from{ opacity:0; transform:translateY(20px) scale(.96); } to{ opacity:1; transform:none; } }
.chat-head{
  padding:14px 16px; background:var(--ink); color:var(--paper);
  display:flex; justify-content:space-between; align-items:center;
}
.chat-head b{ font-family:var(--f-display); font-size:16px; display:block; }
.chat-head span{ font-family:var(--f-mono); font-size:10px; letter-spacing:.1em; color:#c9c6bd; }
.chat-head button{ background:none; border:none; color:var(--paper); cursor:pointer; font-size:14px; }
.chat-body{
  flex:1; overflow-y:auto; padding:14px; display:flex; flex-direction:column; gap:10px;
  background:var(--paper-dim);
}
.chat-msg{
  max-width:82%; padding:10px 14px; font-size:14px; line-height:1.4;
  animation:msgIn .25s ease;
}
@keyframes msgIn{ from{ opacity:0; transform:translateY(4px);} to{opacity:1;transform:none} }
.chat-bot{ background:var(--paper); border:1px solid var(--line); align-self:flex-start; }
.chat-user{ background:var(--ink); color:var(--paper); align-self:flex-end; }
.chat-sug{ display:flex; flex-wrap:wrap; gap:6px; padding:8px 12px; border-top:1px solid var(--line); background:var(--paper); }
.chat-sug button{
  font-family:var(--f-mono); font-size:10px; letter-spacing:.1em; text-transform:uppercase;
  background:transparent; border:1px solid var(--line); padding:5px 9px; cursor:pointer;
  transition:all .2s;
}
.chat-sug button:hover{ background:var(--ink); color:var(--paper); border-color:var(--ink); }
.chat-input{
  display:flex; border-top:1px solid var(--line); background:var(--paper);
}
.chat-input input{
  flex:1; border:none; padding:12px 14px; font:inherit; background:transparent; outline:none;
}
.chat-input button{
  background:var(--ink); color:var(--paper); border:none; padding:0 18px; cursor:pointer; font-size:16px;
}
.chat-input button:hover{ background:var(--accent); }
    `}</style>
  );
}
