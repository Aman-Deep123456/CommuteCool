import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import HorizontalShowcase from "../components/HorizontalShowcase";
import "./Mentor.css";

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: "easeOut" },
  }),
};

const glowPalette = [
  { color: '#4ade80', rgb: '74, 222, 128' },
  { color: '#38bdf8', rgb: '56, 189, 248' },
  { color: '#c084fc', rgb: '192, 132, 252' },
  { color: '#f472b6', rgb: '244, 114, 182' },
  { color: '#facc15', rgb: '250, 204, 21' },
  { color: '#fb923c', rgb: '251, 146, 60' },
  { color: '#2dd4bf', rgb: '45, 212, 191' },
  { color: '#e879f9', rgb: '232, 121, 249' },
];

const techStack = [
  { name: "React Native", desc: "Cross-platform UI framework", color: "#38bdf8", rgb: "56, 189, 248", icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11v2h2v-2h-2zm0-4v2h2V7h-2zm0 8v2h2v-2h-2z"/></svg> },
  { name: "Expo", desc: "Development & platform tooling", color: "#c084fc", rgb: "192, 132, 252", icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 3H3v18h18V3zm-2 16H5V5h14v14z"/></svg> },
  { name: "React Native Skia", desc: "Custom graphics & blur effects", color: "#f472b6", rgb: "244, 114, 182", icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9c-.83 0-1.5.67-1.5 1.5S6.17 14 7 14s1.5-.67 1.5-1.5S7.83 11 7 11zm10 0c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm-5-4c-.83 0-1.5.67-1.5 1.5S11.17 9 12 9s1.5-.67 1.5-1.5S12.83 6 12 6z"/></svg> },
  { name: "Lottie", desc: "Smooth onboarding animations", color: "#4ade80", rgb: "74, 222, 128", icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.6H22l-6.2 4.5 2.4 7.6-6.2-4.5-6.2 4.5 2.4-7.6-6.2-4.5h7.6z"/></svg> },
  { name: "AWS Cognito", desc: "Secure user authentication", color: "#facc15", rgb: "250, 204, 21", icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg> },
  { name: "API Gateway", desc: "Backend API & profile sync", color: "#fb923c", rgb: "251, 146, 60", icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.35 10.04A7.49 7.49 0 0012 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 000 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/></svg> },
];

const features = [
  { title: "ROUTING", svg: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg> },
  { title: "CROSS-PLATFORM", svg: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 6h18V4H4c-1.1 0-2 .9-2 2v11H0v3h14v-3H4V6zm19 2h-6c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1zm-1 9h-4v-7h4v7z"/></svg> },
  { title: "GLASSMORPHISM", svg: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 22h20L12 2z"/></svg> },
  { title: "ONBOARDING", svg: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2z"/></svg> },
  { title: "AUTH", svg: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg> },
  { title: "SYNC", svg: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.35 10.04A7.49 7.49 0 0012 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 000 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/></svg> },
  { title: "LOTTIE", svg: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.6H22l-6.2 4.5 2.4 7.6-6.2-4.5-6.2 4.5 2.4-7.6-6.2-4.5h7.6z"/></svg> },
  { title: "LOCAL", svg: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/></svg> },
  { title: "LOCATION", svg: <svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg> },
  { title: "SKIA", svg: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9c-.83 0-1.5.67-1.5 1.5S6.17 14 7 14s1.5-.67 1.5-1.5S7.83 11 7 11zm10 0c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm-5-4c-.83 0-1.5.67-1.5 1.5S11.17 9 12 9s1.5-.67 1.5-1.5S12.83 6 12 6z"/></svg> },
  { title: "REACT NATIVE", svg: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11v2h2v-2h-2zm0-4v2h2V7h-2zm0 8v2h2v-2h-2z"/></svg> },
  { title: "EXPO", svg: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 3H3v18h18V3zm-2 16H5V5h14v14z"/></svg> },
];

const scatterPos = [
  { top: "15%", left: "15%" },
  { top: "25%", left: "40%" },
  { top: "15%", left: "70%" },
  { top: "35%", left: "85%" },
  { top: "60%", left: "12%" },
  { top: "75%", left: "35%" },
  { top: "50%", left: "60%" },
  { top: "80%", left: "75%" },
  { top: "45%", left: "25%" },
  { top: "20%", left: "90%" },
  { top: "85%", left: "55%" },
  { top: "10%", left: "50%" },
];

const profileExample = `{
  "airSensitivity": "medium",
  "heatAvoidance": "medium",
  "tradeoff": "balanced",
  "location": { "lat": 30.27, "lng": 78.05 },
  "completedAt": "2026-10-06T09:22:26.560Z",
  "synced": true
}`;

export default function Mentor() {
  const [activeTab, setActiveTab] = useState("features");
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeFeatureGroup, setActiveFeatureGroup] = useState(0);
  const [activeTech, setActiveTech] = useState(0);
  const [isTechPaused, setIsTechPaused] = useState(false);
  const [modalType, setModalType] = useState(null); // 'privacy' | 'terms' | null
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".observe-section").forEach((el) => observer.observe(el));
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 160);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Automatic scrolling for Tech Stack cards every 2 seconds
  useEffect(() => {
    if (isTechPaused) return;
    const interval = setInterval(() => {
      setActiveTech((p) => (p + 1) % techStack.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [isTechPaused]);

  const nextTech = () => setActiveTech((p) => (p + 1) % techStack.length);
  const prevTech = () => setActiveTech((p) => (p - 1 + techStack.length) % techStack.length);

  const wheelTimeout = useRef(null);
  const handleTechWheel = (e) => {
    if (wheelTimeout.current) return;
    
    if (e.deltaY > 20 || e.deltaX > 20) {
      nextTech();
      wheelTimeout.current = setTimeout(() => { wheelTimeout.current = null }, 600);
    } else if (e.deltaY < -20 || e.deltaX < -20) {
      prevTech();
      wheelTimeout.current = setTimeout(() => { wheelTimeout.current = null }, 600);
    }
  };

  const stageRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!stageRef.current) return;
    const cards = stageRef.current.querySelectorAll(".brand-item");
    const radius = 280; // Activation radius in pixels
    const maxScale = 2.5; // Maximum scale when hovering directly over
    const dur = 0.35; // Transition duration

    cards.forEach((card) => {
      const r = card.getBoundingClientRect();
      const d = Math.hypot(
        e.clientX - (r.left + r.width / 2),
        e.clientY - (r.top + r.height / 2)
      );
      const p = gsap.utils.clamp(0, 1,
        gsap.utils.mapRange(0, radius, 1, 0, d)
      );
      gsap.to(card, {
        scale: 1 + (maxScale - 1) * p,
        duration: dur,
        overwrite: true,
        ease: "power2.out"
      });
    });
  };

  const handleMouseLeave = () => {
    if (!stageRef.current) return;
    const cards = stageRef.current.querySelectorAll(".brand-item");
    gsap.to(cards, {
      scale: 1,
      duration: 0.5,
      overwrite: true,
      ease: "power2.out"
    });
  };

  return (
    <div className="mentor-page">
      {/* FIXED FLOATING NAV BUTTON */}
      <AnimatePresence>
        {isScrolled && (
          <motion.button 
            key="fixed-get-btn"
            layoutId="get-commute-pill"
            className="get-btn fixed-nav-btn"
            transition={{ type: "spring", stiffness: 90, damping: 18, mass: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Get CoolCommute
            <span className="get-btn-icon">↑</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ===== GSAP-STYLE HERO ===== */}
      <section className="gsap-hero" ref={heroRef}>
        <motion.div className="hero-scroll-wrapper" style={{ scale: heroScale, opacity: heroOpacity }}>
          {/* Top rule line */}
          <div className="hero-rule" />

        {/* Decorative icon */}
        <motion.div
          className="hero-flower"
          initial={{ opacity: 0, rotate: -90, scale: 0 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
        >
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
            <ellipse cx="40" cy="22" rx="14" ry="20" fill="url(#g1)" transform="rotate(0 40 40)" />
            <ellipse cx="40" cy="22" rx="14" ry="20" fill="url(#g2)" transform="rotate(72 40 40)" />
            <ellipse cx="40" cy="22" rx="14" ry="20" fill="url(#g3)" transform="rotate(144 40 40)" />
            <ellipse cx="40" cy="22" rx="14" ry="20" fill="url(#g4)" transform="rotate(216 40 40)" />
            <ellipse cx="40" cy="22" rx="14" ry="20" fill="url(#g5)" transform="rotate(288 40 40)" />
            <defs>
              <linearGradient id="g1" x1="40" y1="2" x2="40" y2="42"><stop stopColor="#ff9a56" /><stop offset="1" stopColor="#e85d75" /></linearGradient>
              <linearGradient id="g2" x1="40" y1="2" x2="40" y2="42"><stop stopColor="#f97316" /><stop offset="1" stopColor="#c084fc" /></linearGradient>
              <linearGradient id="g3" x1="40" y1="2" x2="40" y2="42"><stop stopColor="#c084fc" /><stop offset="1" stopColor="#7c3aed" /></linearGradient>
              <linearGradient id="g4" x1="40" y1="2" x2="40" y2="42"><stop stopColor="#e879f9" /><stop offset="1" stopColor="#f97316" /></linearGradient>
              <linearGradient id="g5" x1="40" y1="2" x2="40" y2="42"><stop stopColor="#fb923c" /><stop offset="1" stopColor="#a855f7" /></linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Giant title */}
        <motion.h1
          className="gsap-title"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.9, ease: "easeOut" }}
        >
          <span className="title-line">Cool</span>
          <span className="title-line title-indent">Commute</span>
        </motion.h1>

        {/* Decorative floating blob */}
        <motion.div
          className="hero-blob"
          animate={{
            y: [0, -15, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        </motion.div>

        {/* Bottom bar: tagline + CTA */}
        <motion.div
          className="hero-bottom"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
        >
          <motion.div className="hero-tagline" style={{ opacity: heroOpacity }}>
            <span className="brace">{"{"}</span>
            <p>
              CoolCommute — A climate-aware routing<br />
              app built for healthier commutes
            </p>
            <span className="brace">{"}"}</span>
          </motion.div>
          
          <AnimatePresence>
            {!isScrolled && (
              <motion.button 
                key="hero-get-btn"
                layoutId="get-commute-pill"
                className="get-btn hero-cta-btn" 
                transition={{ type: "spring", stiffness: 90, damping: 18, mass: 0.8 }}
                onClick={() => document.getElementById("problem")?.scrollIntoView({ behavior: "smooth" })}
              >
                Get CoolCommute
                <span className="get-btn-icon">↓</span>
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      </section>





      {/* ===== HORIZONTAL SCROLL SHOWCASE ===== */}
      <HorizontalShowcase />

      {/* ===== PROBLEM / WHY ===== */}
      <section className="problem-list-section observe-section" id="problem" style={{ position: 'relative' }}>
        <div className="brands-header" style={{ position: 'absolute', top: '2rem', left: '2rem', zIndex: 10 }}>
          <span className="brace">{"{"}</span>
          <span className="header-text">CoolCommute Problems</span>
          <span className="brace">{"}"}</span>
        </div>
        <div className="list-header" style={{ marginTop: '2rem' }}>
          <p className="list-header-desc">
            Discover the critical environmental and health challenges our app tackles to ensure safer, cleaner daily travel.
          </p>
          <div className="list-header-deco">
            <div className="deco-line"></div>
            <div className="deco-circle"></div>
          </div>
        </div>

        <div className="list-items-container">
          {/* Item 1: Heat Exposure */}
          <div className="list-item">
            <div className="list-item-visual">
              <div className="visual-shape icon-heat">
                <svg viewBox="0 0 100 100" width="100%" height="100%">
                  <circle cx="50" cy="50" r="20" fill="url(#heatGrad)" className="pulse-sun" />
                  <path d="M50 15 L50 5" stroke="#f472b6" strokeWidth="4" strokeLinecap="round" className="ray ray-1" />
                  <path d="M50 85 L50 95" stroke="#f472b6" strokeWidth="4" strokeLinecap="round" className="ray ray-2" />
                  <path d="M15 50 L5 50" stroke="#f472b6" strokeWidth="4" strokeLinecap="round" className="ray ray-3" />
                  <path d="M85 50 L95 50" stroke="#f472b6" strokeWidth="4" strokeLinecap="round" className="ray ray-4" />
                  <path d="M25 25 L18 18" stroke="#f472b6" strokeWidth="4" strokeLinecap="round" className="ray ray-5" />
                  <path d="M75 75 L82 82" stroke="#f472b6" strokeWidth="4" strokeLinecap="round" className="ray ray-6" />
                  <path d="M25 75 L18 82" stroke="#f472b6" strokeWidth="4" strokeLinecap="round" className="ray ray-7" />
                  <path d="M75 25 L82 18" stroke="#f472b6" strokeWidth="4" strokeLinecap="round" className="ray ray-8" />
                  <defs>
                    <linearGradient id="heatGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#f472b6" />
                      <stop offset="100%" stopColor="#e11d48" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
            <div className="list-item-content">
              <h3 className="item-title title-pink">Heat Exposure</h3>
              <p className="item-desc">
                Urban heat islands can raise temperatures by 5-10°C. Commuters spend hours in extreme heat without realizing the health impact.
              </p>
            </div>
          </div>

          <div className="list-divider" />

          {/* Item 2: Air Pollution */}
          <div className="list-item">
            <div className="list-item-visual">
              <div className="visual-shape icon-pollution">
                <svg viewBox="0 0 100 100" width="100%" height="100%">
                  <path d="M 25 60 A 15 15 0 0 1 25 30 A 20 20 0 0 1 65 25 A 18 18 0 0 1 85 45 A 15 15 0 0 1 75 70 Z" fill="url(#pollGrad)" className="poll-cloud" />
                  <circle cx="30" cy="80" r="4" fill="#a1a1aa" className="particle p-1" />
                  <circle cx="50" cy="85" r="5" fill="#71717a" className="particle p-2" />
                  <circle cx="70" cy="75" r="3" fill="#a1a1aa" className="particle p-3" />
                  <defs>
                    <linearGradient id="pollGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f97316" />
                      <stop offset="100%" stopColor="#713f12" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
            <div className="list-item-content">
              <h3 className="item-title title-orange">Air Pollution</h3>
              <p className="item-desc">
                Traffic junctions and busy roads have 2-3x higher pollution levels. Traditional routing ignores this completely.
              </p>
            </div>
          </div>

          <div className="list-divider" />

          {/* Item 3: Private Vehicles */}
          <div className="list-item">
            <div className="list-item-visual">
              <div className="visual-shape icon-vehicle">
                <svg viewBox="0 0 100 100" width="100%" height="100%">
                  <path d="M 20 60 L 20 50 L 30 40 L 70 40 L 80 50 L 85 50 L 85 65 L 15 65 Z" fill="url(#carGrad)" className="car-body" />
                  <path d="M 32 42 L 50 42 L 50 50 L 25 50 Z" fill="#bae6fd" className="car-body" />
                  <path d="M 52 42 L 68 42 L 75 50 L 52 50 Z" fill="#bae6fd" className="car-body" />
                  <circle cx="30" cy="65" r="8" fill="#1f2937" className="wheel" />
                  <circle cx="70" cy="65" r="8" fill="#1f2937" className="wheel" />
                  <circle cx="30" cy="65" r="3" fill="#9ca3af" className="wheel" />
                  <circle cx="70" cy="65" r="3" fill="#9ca3af" className="wheel" />
                  <path d="M 10 55 L 2 55" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" className="speed-line sl-1" />
                  <path d="M 15 60 L 5 60" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" className="speed-line sl-2" />
                  <defs>
                    <linearGradient id="carGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#38bdf8" />
                      <stop offset="100%" stopColor="#1e3a8a" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
            <div className="list-item-content">
              <h3 className="item-title title-blue">Private Vehicles</h3>
              <p className="item-desc">
                More private cars mean more emissions. We need to incentivize public transport to break the cycle.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES / BRANDS STYLE ===== */}
      <section 
        className="brands-section observe-section" 
        id="features"
        ref={stageRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="brands-header" style={{ position: 'absolute', top: '2rem', left: '2rem', zIndex: 10 }}>
          <span className="brace">{"{"}</span>
          <span className="header-text">CoolCommute Features</span>
          <span className="brace">{"}"}</span>
        </div>
        <div className="scattered-stage">
          {features.map((f, i) => {
            const colors = ['#4ade80', '#c084fc', '#f472b6', '#facc15', '#60a5fa', '#fb923c'];
            return (
              <motion.div
                key={f.title}
                className="brand-item-wrapper"
                style={{ top: scatterPos[i].top, left: scatterPos[i].left }}
                animate={{
                  y: [0, -10, 0, 10, 0],
                  x: [0, 8, 0, -8, 0]
                }}
                transition={{
                  duration: 7 + (i % 4),
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.3
                }}
              >
                <div className="brand-item">
                  <div className="brand-icon-large" style={{ color: colors[i % colors.length] }}>
                    {f.svg}
                  </div>
                  <div className="brand-name-small">{f.title}</div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ===== TECH STACK ===== */}
      <section className="tech-section observe-section" id="tech" style={{ position: 'relative' }}>
        <motion.div
          className="section-header"
          initial="hidden"
          animate={visibleSections.has("tech") ? "visible" : "hidden"}
          variants={fadeUp}
          custom={0}
        >
          <div className="brands-header" style={{ position: 'absolute', top: '2rem', left: '2rem', zIndex: 10 }}>
            <span className="brace">{"{"}</span>
            <span className="header-text">Tech Stack</span>
            <span className="brace">{"}"}</span>
          </div>
        </motion.div>
        <div 
          className="tech-carousel-wrapper" 
          onWheel={handleTechWheel}
          onMouseEnter={() => setIsTechPaused(true)}
          onMouseLeave={() => setIsTechPaused(false)}
          onTouchStart={() => setIsTechPaused(true)}
          onTouchEnd={() => setIsTechPaused(false)}
        >
          <div className="tech-carousel-container">
            {techStack.map((t, i) => {
              // Calculate wrapping offset
              let offset = i - activeTech;
              if (offset < -Math.floor(techStack.length / 2)) offset += techStack.length;
              else if (offset > Math.floor(techStack.length / 2)) offset -= techStack.length;
              
              const absOffset = Math.abs(offset);
              // Calculate 3D styles
              const scale = 1 - absOffset * 0.15;
              const x = offset * 220;
              const rotateY = offset * -25;
              const zIndex = 10 - absOffset;
              const opacity = absOffset > 2 ? 0 : 1 - (absOffset * 0.25);
              
              const defaultColor = t.color || '#4ade80';
              const defaultRgb = t.rgb || '74, 222, 128';

              return (
                <motion.div
                  key={t.name}
                  className="tech-card-3d"
                  style={{
                    '--card-color': defaultColor,
                    '--card-rgb': defaultRgb,
                    borderColor: offset === 0 ? defaultColor : 'rgba(255,255,255,0.1)',
                    boxShadow: offset === 0 ? `0 0 25px -4px ${defaultColor}` : 'none'
                  }}
                  animate={{ 
                    x, 
                    scale, 
                    zIndex, 
                    opacity,
                    rotateY
                  }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => setActiveTech(i)}
                  onMouseEnter={(e) => {
                    // Turn to a vibrant glowing random color on every hover!
                    const pick = glowPalette[Math.floor(Math.random() * glowPalette.length)];
                    e.currentTarget.style.setProperty('--card-color', pick.color);
                    e.currentTarget.style.setProperty('--card-rgb', pick.rgb);
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragStart={() => setIsTechPaused(true)}
                  onDragEnd={(e, { offset }) => {
                    setIsTechPaused(false);
                    const swipe = offset.x;
                    if (swipe < -30) {
                      nextTech();
                    } else if (swipe > 30) {
                      prevTech();
                    }
                  }}
                >
                  <div className="tech-card-inner">
                    <div className="tech-icon">{t.icon}</div>
                    <h3>{t.name}</h3>
                    <p>{t.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
          
          <div className="tech-controls">
            <button className="tech-btn" onClick={prevTech}>Prev</button>
            <button className="tech-btn" onClick={nextTech}>Next</button>
          </div>
        </div>
      </section>

      {/* ===== SHOWCASE (COMMUTE VIDEO SECTION) ===== */}
      <section className="showcase-section observe-section" id="showcase" style={{ position: 'relative' }}>
        <div className="brands-header" style={{ position: 'absolute', top: '2rem', left: '2rem', zIndex: 10 }}>
          <span className="brace">{"{"}</span>
          <span className="header-text">Showcase</span>
          <span className="brace">{"}"}</span>
        </div>
        <div className="showcase-inner">
          
          <div className="showcase-card">
            <div className="showcase-screen-wrap">
              <video 
                className="showcase-video" 
                autoPlay 
                loop 
                muted 
                playsInline
                controls
              >
                <source src="/CommuteVedio/commute.mov" type="video/quicktime" />
                <source src="/CommuteVedio/commute.mp4" type="video/mp4" />
                <source src="/CommuteVedio/WhatsApp Video 2026-10-11 at 01.15.43.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          <div className="showcase-meta">
            <h3>CoolCommute Showcase 2026</h3>
            <p>Smart real-time climate exposure routing and sync walkthrough</p>
          </div>
        </div>
      </section>

      {/* ===== GSAP-INSPIRED WARM CREAM FOOTER (IMAGE 2 STYLE) ===== */}
      <footer className="gsap-footer" id="contact">
        <div className="footer-container">
          <div className="footer-top-row">
            <div className="footer-brand-col">
              <h2 className="footer-logo-title">CoolCommute</h2>
              <p className="footer-brand-desc">
                A climate-aware routing app built with Expo, React Native, and AWS to help commuters avoid heat and pollution while encouraging green public transit.
              </p>
            </div>

            <div className="footer-links-group">
              <div className="footer-nav-col">
                <span className="footer-col-title">CoolCommute</span>
                <ul className="footer-nav-list">
                  <li><a href="#features">Features</a></li>
                  <li><a href="#tech">Tech Stack</a></li>
                  <li><a href="#showcase">Showcase</a></li>
                  <li><a href="#problem">Problems</a></li>
                  <li><a href="mailto:contact@coolcommute.org">Contact Us</a></li>
                </ul>
              </div>

              <div className="footer-nav-col">
                <span className="footer-col-title">Connect</span>
                <ul className="footer-nav-list">
                  <li><a href="https://github.com/arthavgonda/CoolCommute" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                  <li>
                    <button 
                      type="button" 
                      className="footer-link-btn" 
                      onClick={() => setModalType('team')}
                    >
                      Meet the Team
                    </button>
                  </li>
                  <li><a href="https://x.com" target="_blank" rel="noopener noreferrer">X</a></li>
                  <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                  <li><a href="https://discord.com" target="_blank" rel="noopener noreferrer">Discord</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="footer-bottom-row">
            <div className="footer-copy">
              ©2026 CoolCommute — All rights reserved.
            </div>

            <div className="footer-brand-mark">
              <svg width="36" height="36" viewBox="0 0 80 80" fill="none">
                <ellipse cx="40" cy="22" rx="14" ry="20" fill="#f97316" transform="rotate(0 40 40)" />
                <ellipse cx="40" cy="22" rx="14" ry="20" fill="#a855f7" transform="rotate(72 40 40)" />
                <ellipse cx="40" cy="22" rx="14" ry="20" fill="#3b82f6" transform="rotate(144 40 40)" />
                <ellipse cx="40" cy="22" rx="14" ry="20" fill="#10b981" transform="rotate(216 40 40)" />
                <ellipse cx="40" cy="22" rx="14" ry="20" fill="#f43f5e" transform="rotate(288 40 40)" />
              </svg>
            </div>

            <div className="footer-legal">
              <button 
                type="button"
                className="footer-legal-btn" 
                onClick={() => setModalType('privacy')}
              >
                Privacy Policy.
              </button>
              <button 
                type="button"
                className="footer-legal-btn" 
                onClick={() => setModalType('terms')}
              >
                Terms of Use.
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* ===== PRIVACY / TERMS / TEAM MODAL ===== */}
      <AnimatePresence>
        {modalType && (
          <motion.div 
            className="legal-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalType(null)}
          >
            <motion.div 
              className="legal-modal-card"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 260 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="legal-modal-header">
                <h3 className="legal-modal-title">
                  {modalType === "privacy" 
                    ? "Privacy Policy" 
                    : modalType === "terms" 
                    ? "Terms of Use" 
                    : "Meet the Team"}
                </h3>
                <button 
                  type="button"
                  className="legal-modal-close-btn"
                  onClick={() => setModalType(null)}
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              <div className="legal-modal-body">
                {modalType === "team" ? (
                  <>
                    <p><em>The core creators driving climate-conscious commuting forward.</em></p>
                    <div className="team-grid">
                      <div className="team-member-card">
                        <div className="team-member-left">
                          <div className="team-avatar">AD</div>
                          <div className="team-member-info">
                            <h4>Aman Deep</h4>
                            <p>Core Architect & Mobile / Cloud Integration</p>
                          </div>
                        </div>
                        <a 
                          href="https://www.linkedin.com/in/aman-deep-74300b28b/?isSelfProfile=true" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="team-profile-btn"
                        >
                          LinkedIn Profile ↗
                        </a>
                      </div>

                      <div className="team-member-card">
                        <div className="team-member-left">
                          <div className="team-avatar negi">AN</div>
                          <div className="team-member-info">
                            <h4>Anoop S Negi</h4>
                            <p>Full-Stack Engineer & Climate Routing Systems</p>
                          </div>
                        </div>
                        <a 
                          href="https://www.linkedin.com/in/anoopsnegi/" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="team-profile-btn"
                        >
                          LinkedIn Profile ↗
                        </a>
                      </div>
                    </div>
                  </>
                ) : modalType === "privacy" ? (
                  <>
                    <p><em>Last updated: October 2026 • CoolCommute Foundation</em></p>
                    <h4>1. Environmental Routing & Location Data</h4>
                    <p>
                      CoolCommute requests device location permissions (latitude and longitude) strictly to calculate real-time climate exposure routing that minimizes your contact with extreme urban heat islands and elevated air pollution corridors.
                    </p>
                    <p>
                      Location access is entirely optional. When location permissions are not granted, the application provides baseline non-personalized transit recommendations without continuous background tracking.
                    </p>
                    <h4>2. Profile Preferences & Sensitivity Data</h4>
                    <p>
                      To personalize your routing experience, CoolCommute stores user-selected preferences including:
                    </p>
                    <ul>
                      <li><code>airSensitivity</code> — low, medium, or high pollution vulnerability</li>
                      <li><code>heatAvoidance</code> — heat tolerance and shaded route weighting</li>
                      <li><code>tradeoff</code> — preference for speed, minimal exposure, or balanced transit</li>
                    </ul>
                    <p>
                      This data is synced with Amazon API Gateway and protected using Amazon Cognito token authentication.
                    </p>
                    <h4>3. Account Authentication & Security</h4>
                    <p>
                      Authentication is managed via Amazon Cognito User Pools using secure <code>USER_SRP_AUTH</code> protocols and verification codes. CoolCommute does not store plaintext passwords on client devices.
                    </p>
                    <h4>4. Local Storage & Data Deletion</h4>
                    <p>
                      Profile data is cached on your device for rapid offline access. You retain full control over your data and may request remote profile deletion at any time through the app or by invoking the <code>DELETE /profile</code> endpoint.
                    </p>
                  </>
                ) : (
                  <>
                    <p><em>Effective Date: October 2026 • CoolCommute Platform</em></p>
                    <h4>1. Acceptance of Terms</h4>
                    <p>
                      By accessing or using the CoolCommute application on iOS, Android, or Web, you agree to be bound by these Terms of Use and all applicable guidelines.
                    </p>
                    <h4>2. Advisory Health & Climate Guidance</h4>
                    <p>
                      CoolCommute generates suggested transit and walking paths designed to help commuters avoid heat stress and elevated air pollution. These routes are advisory estimates generated through environmental modeling. Commuters must always prioritize road safety, personal judgment, and local traffic directives.
                    </p>
                    <h4>3. Permitted Platform Usage</h4>
                    <p>
                      CoolCommute is provided for personal, non-commercial use to foster healthier commuter habits and reduce private vehicle emissions through public transit adoption. Reverse engineering or unauthorized extraction of our API Gateway endpoints is strictly prohibited.
                    </p>
                    <h4>4. Platform Availability</h4>
                    <p>
                      We strive to provide uninterrupted access across our mobile and web builds (built with React Native, Expo, and Skia). However, services may undergo periodic updates or maintenance without prior liability.
                    </p>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
