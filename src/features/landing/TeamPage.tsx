import { useNavigate } from "react-router";
import { Github, Linkedin, Mail } from "lucide-react";
import {
  C,
  GradientText,
  PixelButton,
  SectionHeader,
  FloatingParticles,
} from "@/shared/components/PixelComponents";
import { SealFooter } from "@/shared/components/SealFooter";
import sealLogo from "@/imports/image.png";

const mono = "'JetBrains Mono', monospace";

const team = [
  {
    name: "Nguyễn Huỳnh Minh Nhật",
    role: "Lead Engineer & Architect",
    desc: "Designs the platform's role-based access model, scoring engine, and judge workflows. Loves clean APIs and merciless code reviews.",
    accent: C.green,
    socials: { github: "#", linkedin: "#", email: "alex@sealhackathon.com" },
  },
  {
    name: "Nguyễn Lê Hữu Khánh",
    role: "Frontend & UI/UX",
    desc: "Owns the cyberpunk visual language and pixel-art component library. Pushes pixels until they glow exactly right.",
    accent: C.blue,
    socials: { github: "#", linkedin: "#", email: "maya@sealhackathon.com" },
  },
  {
    name: "Đào Hoàng Nhật",
    role: "Backend & DevOps",
    desc: "Keeps the leaderboard live, the submissions stamped, and the deploys boring. Believes in zero-downtime everything.",
    accent: C.cyan,
    socials: { github: "#", linkedin: "#", email: "jordan@sealhackathon.com" },
  },
  {
    name: "Nguyễn Huỳnh Khánh Trang",
    role: "Frontend & UI/UX",
    desc: "Owns the cyberpunk visual language and pixel-art component library. Pushes pixels until they glow exactly right.",
    accent: C.purple,
    socials: { github: "#", linkedin: "#", email: "sam@sealhackathon.com" },
  },
];

function PageHeader() {
  const navigate = useNavigate();
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, height: 60,
      background: "rgba(7,12,15,0.88)", backdropFilter: "blur(16px)",
      borderBottom: "1px solid rgba(34,197,94,0.12)",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: "100%" }}>
        <button onClick={() => navigate("/")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
          <img src={sealLogo} alt="SEAL" style={{ height: 80, width: "auto", objectFit: "contain", filter: "drop-shadow(0 0 8px rgba(34,197,94,0.35))" }} />
          <span style={{ background: C.gradientPrimary, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontFamily: mono, fontWeight: 700, fontSize: 14, letterSpacing: "0.06em" }}>
            SEAL Hackathon
          </span>
        </button>
        <PixelButton variant="ghost" size="sm" onClick={() => navigate("/")}>← Back Home</PixelButton>
      </div>
    </nav>
  );
}

export function TeamPage() {
  return (
    <div style={{ background: C.bg, minHeight: "100vh" }}>
      <PageHeader />

      <section style={{ paddingTop: 140, paddingBottom: 60, position: "relative", overflow: "hidden" }} className="cyber-grid-bg">
        <FloatingParticles count={18} />
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 24px", textAlign: "center", position: "relative", zIndex: 1 }} className="fade-in-section">
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.25)", padding: "5px 14px", marginBottom: 24 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: C.green, boxShadow: `0 0 8px ${C.green}` }} className="cyber-pulse" />
            <span style={{ color: C.green, fontFamily: mono, fontSize: 10, letterSpacing: "0.15em" }}>OUR_TEAM</span>
          </div>
          <h1 style={{ fontFamily: mono, fontWeight: 900, lineHeight: 1.05, fontSize: "clamp(36px,5vw,60px)", letterSpacing: "-0.025em", marginBottom: 20 }}>
            <GradientText from={C.green} to={C.blue}>Meet The</GradientText>
            <br /><span style={{ color: C.text }}>Builders</span>
          </h1>
          <p style={{ color: C.textMuted, fontFamily: mono, fontSize: 15, lineHeight: 1.8, maxWidth: 640, margin: "0 auto" }}>
            Four engineers, designers, and operators who built SEAL because we wanted the tool we wished we had.
          </p>
        </div>
      </section>

      <section style={{ background: C.bg, padding: "60px 0 120px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
          <SectionHeader title="The Crew" gradient />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 fade-in-section" style={{ marginTop: 48 }}>
            {team.map((m) => (
              <div
                key={m.name}
                style={{
                  background: C.surface,
                  border: `1px solid ${m.accent}33`,
                  padding: 0,
                  position: "relative",
                  overflow: "hidden",
                  transition: "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",
                  boxShadow: `0 0 18px ${m.accent}10`,
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "translateY(-4px) scale(1.01)";
                  el.style.boxShadow = `0 0 36px ${m.accent}44, 0 12px 30px rgba(0,0,0,0.5)`;
                  el.style.borderColor = `${m.accent}88`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "translateY(0) scale(1)";
                  el.style.boxShadow = `0 0 18px ${m.accent}10`;
                  el.style.borderColor = `${m.accent}33`;
                }}
              >
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${m.accent}, transparent)`, opacity: 0.7 }} />
                <div style={{ position: "absolute", top: 0, left: 0, width: 12, height: 12, borderTop: `2px solid ${m.accent}`, borderLeft: `2px solid ${m.accent}` }} />
                <div style={{ position: "absolute", bottom: 0, right: 0, width: 12, height: 12, borderBottom: `2px solid ${m.accent}`, borderRight: `2px solid ${m.accent}` }} />

                {/* Avatar placeholder */}
                <div style={{ width: "100%", height: 200, background: `linear-gradient(135deg, ${m.accent}18, transparent 80%), ${C.bg}`, borderBottom: `1px solid ${m.accent}22`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                  <div style={{
                    width: 96, height: 96, borderRadius: "50%",
                    background: `radial-gradient(circle, ${m.accent}44, ${m.accent}11)`,
                    border: `2px solid ${m.accent}66`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: m.accent, fontFamily: mono, fontSize: 28, fontWeight: 800,
                    textShadow: `0 0 16px ${m.accent}`,
                    boxShadow: `0 0 24px ${m.accent}55`,
                  }}>
                    {m.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div style={{ position: "absolute", bottom: 8, right: 12, color: C.textMuted, fontFamily: mono, fontSize: 9, letterSpacing: "0.12em" }}>
                    → drop image here
                  </div>
                </div>

                <div style={{ padding: 22 }}>
                  <div style={{ color: C.text, fontFamily: mono, fontSize: 16, fontWeight: 800, marginBottom: 4 }}>{m.name}</div>
                  <div style={{ color: m.accent, fontFamily: mono, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>{m.role}</div>
                  <div style={{ color: C.textMuted, fontFamily: mono, fontSize: 13, lineHeight: 1.7, marginBottom: 16 }}>{m.desc}</div>
                  <div style={{ display: "flex", gap: 10 }}>
                    {[
                      { icon: Github, href: m.socials.github, label: "GitHub" },
                      { icon: Linkedin, href: m.socials.linkedin, label: "LinkedIn" },
                      { icon: Mail, href: `mailto:${m.socials.email}`, label: "Email" },
                    ].map(({ icon: Icon, href, label }) => (
                      <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                        style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${C.border}`, color: C.textMuted, transition: "all 0.15s" }}
                        onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.color = m.accent; el.style.borderColor = m.accent; el.style.boxShadow = `0 0 12px ${m.accent}66`; }}
                        onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.color = C.textMuted; el.style.borderColor = C.border; el.style.boxShadow = "none"; }}
                      >
                        <Icon size={15} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SealFooter />
    </div>
  );
}
