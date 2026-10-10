import GlassCard from "../components/GlassCard";
import heroImg from "../assets/hero.png";

export default function Home() {
  return (
    <div className="flex-center" style={{ minHeight: "100vh", padding: "2rem" }}>
      <GlassCard delay={0.2}>
        <img src={heroImg} alt="CoolCommute hero" width={200} />
        <h1 style={{ margin: "1rem 0", fontSize: "2rem", textAlign: "center" }}>
          CoolCommute – Climate‑Aware Routing
        </h1>
        <p style={{ textAlign: "center", marginBottom: "1rem" }}>
          Find routes that minimize heat & pollution, and encourage public transport.
        </p>
        <a href="/mentor">
          <button className="glass-card rounded" style={{ padding: "0.8rem 1.5rem", background: "var(--primary-gradient)", color: "#fff", border: "none", cursor: "pointer" }}>
            Meet the Mentor
          </button>
        </a>
      </GlassCard>
    </div>
  );
}
