import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./HorizontalShowcase.css";

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalShowcase() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const totalScroll = track.scrollWidth - window.innerWidth;

    const tween = gsap.to(track, {
      x: -totalScroll,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: 1,
        end: () => `+=${totalScroll}`,
        invalidateOnRefresh: true,
      },
    });

    // Make float-shapes float continuously
    gsap.utils.toArray(".float-shape").forEach((el) => {
      gsap.to(el, {
        y: "random(-20, 20)",
        x: "random(-10, 10)",
        rotation: "random(-15, 15)",
        duration: "random(2, 4)",
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    });

    // Add movement to badges while scrolling (parallax)
    gsap.utils.toArray(".badge, .pill").forEach((el) => {
      gsap.to(el, {
        x: "random(-100, 100)",
        y: "random(-50, 50)",
        rotation: "random(-15, 15)",
        ease: "none",
        scrollTrigger: {
          trigger: container,
          scrub: 1,
          end: () => `+=${totalScroll}`,
        }
      });
    });

    // Add enter animation for the wobble hand
    gsap.fromTo(".wobble-hand",
      { rotation: -20, opacity: 0, scale: 0.5 },
      {
        rotation: 20, opacity: 1, scale: 1,
        duration: 2,
        ease: "elastic.out(1, 0.3)",
        scrollTrigger: {
          trigger: container,
          start: "top center",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Make spiral and star rotate continuously as you scroll through the entire section
    gsap.to(".shape-bezier, .shape-star", {
      rotation: 720, // Two full rotations
      ease: "none",
      scrollTrigger: {
        trigger: container,
        scrub: 1,
        end: () => `+=${totalScroll}`,
      }
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  const handleShapeClick = (e) => {
    // Quick burst scale & rotate animation on click
    gsap.to(e.currentTarget, {
      scale: 1.3,
      rotation: "+=180",
      duration: 0.5,
      ease: "back.out(1.7)",
      yoyo: true,
      onComplete: () => {
        gsap.to(e.currentTarget, { scale: 1, duration: 0.3 });
      }
    });
  };

  return (
    <section className="h-showcase" ref={containerRef}>
      <div className="h-track" ref={trackRef}>

        {/* ===== PANEL 1 — Intro ===== */}
        <div className="h-panel panel-1">
          <div className="panel-text-left">
            <span className="badge badge-pink">Commute Smarter</span>
            <span className="badge badge-orange">That's right, Smarter</span>
            <p className="panel-body">
              Whether you're avoiding heat islands, reducing
              pollution exposure, or choosing public transit,
              CoolCommute has your back.
            </p>
          </div>
          <div className="panel-shapes">
            {/* Teal-green half-dome */}
            <div className="shape-dome float-shape interactive-shape" onClick={handleShapeClick} />
            {/* Pink flower */}
            <svg className="shape-flower float-shape interactive-shape" onClick={handleShapeClick} width="120" height="120" viewBox="0 0 120 120">
              <circle cx="48" cy="42" r="28" fill="#f472b6" />
              <circle cx="72" cy="42" r="28" fill="#ec4899" />
              <circle cx="48" cy="66" r="28" fill="#f472b6" />
              <circle cx="72" cy="66" r="28" fill="#ec4899" />
            </svg>
            {/* Ring */}
            <svg className="shape-ring float-shape interactive-shape" onClick={handleShapeClick} width="70" height="70" viewBox="0 0 70 70">
              <circle cx="35" cy="35" r="28" stroke="url(#ringGrad)" strokeWidth="8" fill="none" />
              <defs>
                <linearGradient id="ringGrad" x1="0" y1="0" x2="70" y2="70">
                  <stop stopColor="#67e8f9" />
                  <stop offset="1" stopColor="#818cf8" />
                </linearGradient>
              </defs>
            </svg>
            {/* Orange diamond */}
            <div className="shape-diamond float-shape interactive-shape" onClick={handleShapeClick} />
          </div>
        </div>

        {/* ===== PANEL 2 — Features Scroll ===== */}
        <div className="h-panel panel-2">
          <div className="big-scroll-text">
            {/* Wobble Hand Outline */}
            <svg className="wobble-hand interactive-shape" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#e8e4d9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" onClick={handleShapeClick}>
              <path d="M18 11V6a2 2 0 0 0-4 0v4" />
              <path d="M14 10V4a2 2 0 0 0-4 0v6" />
              <path d="M10 10.5V3a2 2 0 0 0-4 0v9" />
              <path d="M6 12v-1a2 2 0 0 0-4 0v5c0 3 2.5 6 6 6h4c4 0 7-3 7-7v-3a2 2 0 0 0-4 0" />
            </svg>
            <span className="scroll-headline">
              Add <em>personality</em> to your commute
            </span>
            {/* Pink arc */}
            <svg className="shape-arc float-shape" width="60" height="60" viewBox="0 0 60 60">
              <path d="M10 50 Q30 0, 50 50" stroke="url(#arcGrad)" strokeWidth="8" fill="none" strokeLinecap="round" />
              <defs>
                <linearGradient id="arcGrad" x1="0" y1="0" x2="60" y2="60">
                  <stop stopColor="#f472b6" />
                  <stop offset="1" stopColor="#c084fc" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="panel-badges-row">
            <span className="badge badge-green">Nice and</span>
            <span className="badge badge-purple-sm">Easy</span>
            <span className="badge badge-peach">Easing</span>
          </div>
        </div>

        {/* ===== PANEL 3 — Tech Highlight ===== */}
        <div className="h-panel panel-3">
          <div className="big-scroll-text">
            <span className="scroll-headline">
              A variety of <em>plug-and-play</em> features, or build your own
            </span>
          </div>
          <div className="panel-badges-row panel-badges-scattered">
            <span className="badge badge-green badge-tilt-left">Super</span>
            <span className="badge badge-pink-lg badge-tilt-right">Plug-and-play</span>
          </div>
          <div className="panel-shapes panel-shapes-3">
            {/* Bezier curve decoration */}
            <svg className="shape-bezier interactive-shape" onClick={handleShapeClick} width="200" height="100" viewBox="0 0 200 100">
              <path d="M0 80 Q50 0, 100 50 T200 20" stroke="#4ade80" strokeWidth="2" fill="none" strokeDasharray="6 4" />
              <circle cx="100" cy="50" r="5" fill="#4ade80" />
              <circle cx="200" cy="20" r="4" fill="#4ade80" opacity="0.6" />
            </svg>
            {/* Star burst */}
            <svg className="shape-star float-shape interactive-shape" onClick={handleShapeClick} width="40" height="40" viewBox="0 0 40 40">
              <line x1="20" y1="2" x2="20" y2="38" stroke="#f9a8d4" strokeWidth="3" strokeLinecap="round" />
              <line x1="2" y1="20" x2="38" y2="20" stroke="#f9a8d4" strokeWidth="3" strokeLinecap="round" />
              <line x1="7" y1="7" x2="33" y2="33" stroke="#f9a8d4" strokeWidth="3" strokeLinecap="round" />
              <line x1="33" y1="7" x2="7" y2="33" stroke="#f9a8d4" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* ===== PANEL 4 — Stack + CTA ===== */}
        <div className="h-panel panel-4">
          <div className="panel-text-left panel-4-left">
            <span className="badge badge-green">Built With</span>
            <span className="scroll-headline panel-4-title">
              Modern tools for<br />modern problems
            </span>
            <div className="stack-pills-scattered">
              <span className="pill float-shape interactive-shape pill-1" onClick={handleShapeClick}>React Native</span>
              <span className="pill float-shape interactive-shape pill-2" onClick={handleShapeClick}>Expo</span>
              <span className="pill float-shape interactive-shape pill-3" onClick={handleShapeClick}>Skia</span>
              <span className="pill float-shape interactive-shape pill-4" onClick={handleShapeClick}>Lottie</span>
              <span className="pill float-shape interactive-shape pill-5" onClick={handleShapeClick}>Cognito</span>
              <span className="pill float-shape interactive-shape pill-6" onClick={handleShapeClick}>API Gateway</span>
            </div>
          </div>
          <div className="panel-shapes panel-5-shapes">
            <div className="shape-dome shape-dome-purple float-shape interactive-shape" onClick={handleShapeClick} />
            <svg className="shape-flower shape-flower-sm float-shape interactive-shape" onClick={handleShapeClick} width="160" height="160" viewBox="0 0 120 120">
              <circle cx="48" cy="42" r="28" fill="#a78bfa" />
              <circle cx="72" cy="42" r="28" fill="#8b5cf6" />
              <circle cx="48" cy="66" r="28" fill="#a78bfa" />
              <circle cx="72" cy="66" r="28" fill="#8b5cf6" />
            </svg>
          </div>
        </div>

      </div>
    </section>
  );
}
