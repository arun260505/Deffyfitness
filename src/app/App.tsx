import { useState, useEffect, useRef } from "react";
import {
  Dumbbell, Users, CreditCard, Target, MapPin, Phone, Mail, Clock,
  Instagram, Twitter, Facebook, Youtube, ChevronLeft, ChevronRight,
  Star, Menu, X, Check, ArrowRight, Zap, TrendingUp, Award,
} from "lucide-react";

// ─── Data ───────────────────────────────────────────────────────────────────

const NAV_LINKS = ["Home", "About Us", "Programs", "Trainers", "Membership", "Gallery", "Testimonials", "Contact"];

const HERO_STATS = [
  { value: "5,000+", label: "Members" },
  { value: "25+", label: "Expert Trainers" },
  { value: "10 Yrs", label: "Experience" },
  { value: "24/7", label: "Open" },
];

const FEATURES = [
  { Icon: Dumbbell, title: "Modern Equipment", desc: "State-of-the-art machines, free weights, and cutting-edge cardio equipment refreshed annually." },
  { Icon: Award, title: "Certified Trainers", desc: "Every coach holds national certification and brings years of real-world elite coaching experience." },
  { Icon: CreditCard, title: "Flexible Membership", desc: "Month-to-month plans with no long-term contracts. Pause or cancel anytime, zero hassle." },
  { Icon: Target, title: "Personalized Plans", desc: "Science-backed workout and nutrition plans built around your specific goals and timeline." },
];

const PROGRAMS = [
  { name: "Weight Training", desc: "Build raw strength and muscle mass through progressive overload techniques.", img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&h=400&fit=crop&auto=format" },
  { name: "Cardio Fitness", desc: "Boost endurance and torch calories with our high-energy cardio sessions.", img: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=600&h=400&fit=crop&auto=format" },
  { name: "CrossFit", desc: "Functional movements at high intensity for total-body conditioning.", img: "https://images.unsplash.com/photo-1533681904393-9ab6eee7e408?w=600&h=400&fit=crop&auto=format" },
  { name: "Yoga", desc: "Improve flexibility, reduce stress, and build a stronger mind-body connection.", img: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&h=400&fit=crop&auto=format" },
  { name: "Bodybuilding", desc: "Sculpt and define every muscle group with structured hypertrophy protocols.", img: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&h=400&fit=crop&auto=format" },
  { name: "Personal Training", desc: "One-on-one coaching tailored exclusively to your fitness level and goals.", img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop&auto=format" },
];

const PLANS = [
  {
    name: "Basic", price: 29, tag: null, highlighted: false,
    features: ["Full Gym Access", "Locker & Shower", "Free WiFi", "Cardio Zone", "Mobile App"],
  },
  {
    name: "Standard", price: 59, tag: "Most Popular", highlighted: false,
    features: ["Everything in Basic", "Personal Trainer (2×/wk)", "Custom Diet Plan", "All Group Classes", "Towel Service", "Body Composition Scan"],
  },
  {
    name: "Premium", price: 99, tag: "Best Value", highlighted: true,
    features: ["Everything in Standard", "Unlimited Classes", "Supplements Guidance", "Priority Support 24/7", "Guest Passes (2/month)", "Recovery & Sauna Room", "Personalized Macros"],
  },
];

const TRAINERS = [
  { name: "Kotti", specialty: "Owner & Head Trainer", img: "/trainers/kotti.jpg" },
  { name: "Sathish", specialty: "Trainer", img: "/trainers/sathish.jpg" },
];

const GALLERY = [
  "/gallery/img2.webp",
  "/gallery/img1.webp",
  "/gallery/img4.webp",
  "/gallery/img6.webp",
  "/gallery/img3.webp",
  "/gallery/img5.webp",
];

const TESTIMONIALS = [
  {
    name: "James Wilson", role: "Member since 2022", rating: 5,
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&auto=format",
    review: "DEFY FITNESS completely transformed my life. In just 8 months I lost 40 lbs and gained confidence I never knew I had. The trainers are world-class and the community is incredibly supportive.",
  },
  {
    name: "Emily Rodriguez", role: "Member since 2021", rating: 5,
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&auto=format",
    review: "The Premium membership is absolutely worth every penny. The personalized nutrition plan combined with my trainer Marcus has helped me hit PRs I never thought possible. Best gym in the city, period.",
  },
  {
    name: "David Park", role: "Member since 2023", rating: 5,
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&auto=format",
    review: "Modern equipment, spotless facilities, and trainers who genuinely care about your progress. I drive 30 minutes out of my way just to train here. DEFY FITNESS is in a league of its own.",
  },
];

const ACHIEVEMENTS = [
  { target: 5000, suffix: "+", label: "Active Members" },
  { target: 25, suffix: "+", label: "Expert Trainers" },
  { target: 47, suffix: "", label: "Awards Won" },
  { target: 98, suffix: "%", label: "Success Rate" },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function AnimatedCounter({ target, suffix = "", started }: { target: number; suffix?: string; started: boolean }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let frame = 0;
    const total = 100;
    const id = setInterval(() => {
      frame++;
      const ease = 1 - Math.pow(1 - frame / total, 3);
      setCount(Math.floor(ease * target));
      if (frame >= total) { setCount(target); clearInterval(id); }
    }, 18);
    return () => clearInterval(id);
  }, [started, target]);
  return <>{count.toLocaleString()}{suffix}</>;
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function App() {
  const [navSolid, setNavSolid] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeTesti, setActiveTesti] = useState(0);
  const [countersOn, setCountersOn] = useState(false);
  const achievRef = useRef<HTMLDivElement>(null);

  // Sticky nav
  useEffect(() => {
    const fn = () => setNavSolid(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Fade-in on scroll
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("fz-vis"); }),
      { threshold: 0.07 }
    );
    document.querySelectorAll(".fz").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Achievement counter trigger
  useEffect(() => {
    if (!achievRef.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setCountersOn(true); }, { threshold: 0.4 });
    obs.observe(achievRef.current);
    return () => obs.disconnect();
  }, []);

  // Testimonials auto-advance
  useEffect(() => {
    const id = setInterval(() => setActiveTesti(p => (p + 1) % TESTIMONIALS.length), 6000);
    return () => clearInterval(id);
  }, []);


  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#0D0D0D", color: "#fff", overflowX: "hidden" }}>
      {/* ── Global styles ── */}
      <style>{`
        *{box-sizing:border-box}
        html{scroll-behavior:smooth}
        ::-webkit-scrollbar{width:5px}
        ::-webkit-scrollbar-track{background:#0D0D0D}
        ::-webkit-scrollbar-thumb{background:#EA0A1A;border-radius:3px}

        .fz{opacity:0;transform:translateY(36px);transition:opacity .65s ease,transform .65s ease}
        .fz-vis{opacity:1;transform:translateY(0)}
        .fz:nth-child(2){transition-delay:.08s}
        .fz:nth-child(3){transition-delay:.16s}
        .fz:nth-child(4){transition-delay:.24s}
        .fz:nth-child(5){transition-delay:.32s}
        .fz:nth-child(6){transition-delay:.40s}

        .glass{background:rgba(255,255,255,.04);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.08);border-radius:16px}

        .red-btn{background:#EA0A1A;color:#fff;border:none;border-radius:50px;padding:14px 32px;font-family:'Poppins',sans-serif;font-weight:700;font-size:15px;cursor:pointer;transition:all .3s;box-shadow:0 0 24px rgba(234,10,26,.4);letter-spacing:.4px}
        .red-btn:hover{transform:translateY(-3px);box-shadow:0 10px 36px rgba(234,10,26,.6)}

        .ghost-btn{background:transparent;color:#fff;border:2px solid rgba(255,255,255,.3);border-radius:50px;padding:12px 30px;font-family:'Poppins',sans-serif;font-weight:600;font-size:15px;cursor:pointer;transition:all .3s}
        .ghost-btn:hover{border-color:#2B4FE0;color:#6E8BFF;transform:translateY(-3px)}

        .sec-tag{display:inline-block;background:rgba(234,10,26,.12);color:#EA0A1A;border:1px solid rgba(234,10,26,.3);border-radius:50px;padding:5px 16px;font-size:12px;font-weight:600;font-family:'Poppins',sans-serif;letter-spacing:1.2px;text-transform:uppercase;margin-bottom:14px}

        .grad-text{background:linear-gradient(120deg,#EA0A1A 0%,#2B4FE0 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}

        .prog-card{position:relative;border-radius:16px;overflow:hidden;cursor:pointer}
        .prog-card img{width:100%;height:280px;object-fit:cover;transition:transform .5s ease;display:block}
        .prog-card:hover img{transform:scale(1.08)}
        .prog-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(13,13,13,.96) 0%,rgba(13,13,13,.45) 55%,transparent 100%);display:flex;flex-direction:column;justify-content:flex-end;padding:24px}

        .feat-card{border-radius:16px;padding:36px 28px;transition:all .3s;cursor:pointer;border:1px solid rgba(255,255,255,.07)}
        .feat-card:hover{transform:translateY(-8px);background:rgba(234,10,26,.07)!important;border-color:rgba(234,10,26,.3)!important;box-shadow:0 24px 64px rgba(234,10,26,.14)}
        .feat-icon{width:54px;height:54px;border-radius:14px;background:rgba(234,10,26,.12);display:flex;align-items:center;justify-content:center;margin-bottom:18px;transition:all .3s}
        .feat-card:hover .feat-icon{background:#EA0A1A}

        .trainer-card{position:relative;border-radius:16px;overflow:hidden}
        .trainer-card img{width:100%;height:380px;object-fit:cover;transition:transform .5s}
        .trainer-card:hover img{transform:scale(1.05)}
        .t-over{position:absolute;inset:0;background:linear-gradient(to top,rgba(13,13,13,.92) 0%,transparent 55%);display:flex;flex-direction:column;justify-content:flex-end;padding:22px;transition:background .35s}
        .trainer-card:hover .t-over{background:linear-gradient(to top,rgba(234,10,26,.75) 0%,rgba(13,13,13,.35) 100%)}

        .gal-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
        .gal-item{position:relative;border-radius:14px;overflow:hidden;cursor:pointer;aspect-ratio:4/3;border:1px solid rgba(255,255,255,.06)}
        .gal-item img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .5s ease}
        .gal-item:hover img{transform:scale(1.08)}
        .gal-item::after{content:"";position:absolute;inset:0;background:linear-gradient(to top,rgba(13,13,13,.55) 0%,transparent 45%);opacity:0;transition:opacity .35s}
        .gal-item:hover::after{opacity:1}

        .blog-card{border-radius:16px;overflow:hidden;transition:all .3s;cursor:pointer}
        .blog-card:hover{transform:translateY(-6px);box-shadow:0 24px 56px rgba(0,0,0,.5)}
        .blog-card .bi{overflow:hidden}
        .blog-card img{width:100%;height:220px;object-fit:cover;display:block;transition:transform .5s}
        .blog-card:hover img{transform:scale(1.07)}

        .plan-card{border-radius:20px;padding:40px 32px;transition:all .3s}
        .plan-card.plain{border:1px solid rgba(255,255,255,.08)}
        .plan-card.plain:hover{transform:translateY(-6px);border-color:rgba(234,10,26,.4)!important}
        .plan-card.hot{background:linear-gradient(140deg,#EA0A1A 0%,#B0121A 100%);transform:scale(1.04);box-shadow:0 32px 80px rgba(234,10,26,.4)}

        .soc-icon{width:32px;height:32px;border-radius:8px;background:rgba(255,255,255,.12);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .3s;flex-shrink:0}
        .soc-icon:hover{background:#EA0A1A}

        input::placeholder,textarea::placeholder{color:rgba(255,255,255,.3)}
        input:focus,textarea:focus{border-color:rgba(234,10,26,.5)!important;outline:none}
        input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none}

        @keyframes pulse-line{0%,100%{opacity:.3}50%{opacity:1}}
        @keyframes drift{0%{transform:translateY(0)}50%{transform:translateY(-6px)}100%{transform:translateY(0)}}

        @media(max-width:1100px){
          .feat-grid{grid-template-columns:repeat(2,1fr)!important}
          .trainer-grid{grid-template-columns:repeat(2,1fr)!important}
          .footer-grid{grid-template-columns:repeat(2,1fr)!important}
        }
        @media(max-width:900px){
          .hero-h1{font-size:52px!important}
          .sec-h2{font-size:36px!important}
          .about-grid{grid-template-columns:1fr!important}
          .prog-grid{grid-template-columns:repeat(2,1fr)!important}
          .plan-grid{grid-template-columns:1fr!important}
          .plan-card.hot{transform:none}
          .contact-grid{grid-template-columns:1fr!important}
          .gal-grid{grid-template-columns:repeat(2,1fr)!important}
          .achiev-grid{grid-template-columns:repeat(2,1fr)!important}
          .blog-grid{grid-template-columns:1fr!important}
        }
        @media(max-width:640px){
          .nav-links-d{display:none!important}
          .ham{display:flex!important}
          .nav-logo{height:56px!important}
          .hero-h1{font-size:38px!important}
          .hero-pad{padding:0 24px!important;padding-top:110px!important}
          .sec-pad{padding:80px 24px!important}
          .hero-stats{grid-template-columns:1fr 1fr!important}
          .trainer-grid{grid-template-columns:1fr!important}
          .prog-grid{grid-template-columns:1fr!important}
          .footer-grid{grid-template-columns:1fr!important}
          .gal-cols{columns:2!important}
        }
      `}</style>

      {/* ══════════════════════════════════════════════════════════ NAVBAR */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        padding: navSolid ? "8px 60px" : "12px 60px",
        background: navSolid ? "rgba(13,13,13,.97)" : "transparent",
        backdropFilter: navSolid ? "blur(24px)" : "none",
        borderBottom: navSolid ? "1px solid rgba(255,255,255,.05)" : "none",
        transition: "all .4s ease",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <a href="#home" style={{ flexShrink: 0, display: "block", lineHeight: 0 }}>
          <img
            className="nav-logo"
            src="/logo.png"
            alt="DEFY FITNESS"
            style={{
              height: navSolid ? "68px" : "84px",
              width: "auto",
              objectFit: "contain",
              display: "block",
              transition: "height .4s ease",
              filter: "drop-shadow(0 4px 14px rgba(0,0,0,.55))",
            }}
          />
        </a>

        <div className="nav-links-d" style={{ display: "flex", gap: "28px" }}>
          {NAV_LINKS.map(l => (
            <a key={l} href={`#${l.toLowerCase().replace(" ", "-")}`} style={{
              color: "rgba(255,255,255,.65)", fontSize: "13.5px", fontWeight: 500,
              textDecoration: "none", transition: "color .2s", fontFamily: "'Poppins', sans-serif",
            }}
              onMouseEnter={e => (e.target as HTMLElement).style.color = "#EA0A1A"}
              onMouseLeave={e => (e.target as HTMLElement).style.color = "rgba(255,255,255,.65)"}
            >{l}</a>
          ))}
        </div>

        <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
          <button className="red-btn" style={{ padding: "10px 22px", fontSize: "13px" }}>Join Now</button>
          <button className="ham" onClick={() => setMobileOpen(true)}
            style={{ display: "none", background: "none", border: "none", color: "#fff", cursor: "pointer", padding: "4px" }}>
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* ── Mobile menu overlay ── */}
      {mobileOpen && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 1100, background: "rgba(13,13,13,.98)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          gap: "28px", backdropFilter: "blur(20px)",
        }}>
          <button onClick={() => setMobileOpen(false)} style={{ position: "absolute", top: "22px", right: "24px", background: "none", border: "none", color: "#fff", cursor: "pointer" }}>
            <X size={28} />
          </button>
          {NAV_LINKS.map(l => (
            <a key={l} href={`#${l.toLowerCase().replace(" ", "-")}`} onClick={() => setMobileOpen(false)}
              style={{ color: "#fff", fontSize: "26px", fontWeight: 800, textDecoration: "none", fontFamily: "'Poppins', sans-serif" }}>
              {l}
            </a>
          ))}
          <button className="red-btn" style={{ marginTop: "12px" }}>Join Now</button>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════ HERO */}
      <section id="home" style={{ minHeight: "100vh", position: "relative", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "url('https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1920&h=1080&fit=crop&auto=format')",
          backgroundSize: "cover", backgroundPosition: "center 30%",
        }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(120deg, rgba(13,13,13,.97) 0%, rgba(13,13,13,.78) 55%, rgba(234,10,26,.12) 100%)" }} />

        <div className="hero-pad" style={{ position: "relative", maxWidth: "1440px", margin: "0 auto", padding: "0 60px", paddingTop: "130px", width: "100%" }}>
          <div className="sec-tag">
            #1 Premium Fitness Club
          </div>

          <h1 className="hero-h1" style={{
            fontFamily: "'Poppins', sans-serif", fontWeight: 900, fontSize: "82px",
            lineHeight: 1.04, letterSpacing: "-2.5px", maxWidth: "820px", marginBottom: "18px",
          }}>
            Transform Your Body.<br />
            <span className="grad-text">Transform Your Life.</span>
          </h1>

          <div style={{
            fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "17px",
            letterSpacing: "1.5px", textTransform: "uppercase", color: "#6E8BFF", marginBottom: "22px",
          }}>
            When Others Say You Can't
          </div>

          <p style={{ color: "rgba(255,255,255,.6)", fontSize: "18px", maxWidth: "500px", lineHeight: 1.75, marginBottom: "38px" }}>
            Join thousands of members who have already changed their lives at DEFY FITNESS — world-class coaches, elite equipment, and a community that drives you to your peak.
          </p>

          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", marginBottom: "72px" }}>
            <button className="red-btn">
              Join Now <ArrowRight size={15} style={{ display: "inline", marginLeft: "8px", verticalAlign: "middle" }} />
            </button>
            <button className="ghost-btn">Free Trial</button>
          </div>

          {/* Stats bar */}
          <div className="hero-stats" style={{
            display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1px",
            background: "rgba(255,255,255,.07)", borderRadius: "14px", overflow: "hidden", maxWidth: "640px",
          }}>
            {HERO_STATS.map((s, i) => (
              <div key={i} style={{ padding: "22px 16px", background: "rgba(13,13,13,.82)", backdropFilter: "blur(10px)", textAlign: "center" }}>
                <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: "26px", color: "#EA0A1A" }}>{s.value}</div>
                <div style={{ color: "rgba(255,255,255,.45)", fontSize: "11px", marginTop: "3px", fontWeight: 500, letterSpacing: ".4px" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: "36px", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
          <div style={{ width: "1px", height: "56px", background: "linear-gradient(to bottom, transparent, #EA0A1A)", animation: "pulse-line 2s infinite" }} />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ ABOUT */}
      <section id="about-us" className="sec-pad" style={{ padding: "130px 60px", maxWidth: "1440px", margin: "0 auto" }}>
        <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>
          <div className="fz" style={{ position: "relative" }}>
            <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=700&fit=crop&auto=format" alt="DEFY FITNESS gym interior"
              style={{ width: "100%", height: "580px", objectFit: "cover", borderRadius: "20px", display: "block" }} />
            <div style={{
              position: "absolute", bottom: "28px", right: "-24px",
              background: "#EA0A1A", borderRadius: "16px", padding: "22px 28px",
              boxShadow: "0 24px 60px rgba(234,10,26,.45)",
              animation: "drift 4s ease-in-out infinite",
            }}>
              <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 900, fontSize: "40px", color: "#fff", lineHeight: 1 }}>10+</div>
              <div style={{ color: "rgba(255,255,255,.8)", fontSize: "13px", fontWeight: 500, marginTop: "4px" }}>Years of Excellence</div>
            </div>
          </div>

          <div className="fz">
            <div className="sec-tag">About DEFY FITNESS</div>
            <h2 className="sec-h2" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: "46px", lineHeight: 1.13, marginBottom: "18px", letterSpacing: "-1px" }}>
              We Build Champions,<br /><span className="grad-text">Not Just Bodies</span>
            </h2>
            <p style={{ color: "rgba(255,255,255,.58)", lineHeight: 1.8, marginBottom: "14px", fontSize: "15.5px" }}>
              Since 2014, DEFY FITNESS has been the training ground for thousands of athletes, everyday heroes, and people ready to reinvent themselves. We combine elite coaching with cutting-edge facilities to deliver results that last.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", margin: "28px 0" }}>
              {[
                { Icon: Zap, title: "Our Mission", text: "Empower every member to achieve peak physical and mental performance." },
                { Icon: TrendingUp, title: "Our Vision", text: "To be the world's most transformative fitness community." },
              ].map(({ Icon, title, text }, i) => (
                <div key={i} className="glass" style={{ padding: "20px" }}>
                  <Icon size={20} color="#EA0A1A" style={{ marginBottom: "8px" }} />
                  <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "14px", marginBottom: "6px" }}>{title}</div>
                  <div style={{ color: "rgba(255,255,255,.5)", fontSize: "13px", lineHeight: 1.6 }}>{text}</div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "34px" }}>
              {["Certified & Experienced Trainers", "Modern High-Tech Equipment", "Personalized Workout Plans", "Expert Nutrition Guidance"].map(item => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: "22px", height: "22px", borderRadius: "50%", background: "rgba(234,10,26,.14)", border: "1px solid rgba(234,10,26,.4)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Check size={11} color="#EA0A1A" />
                  </div>
                  <span style={{ color: "rgba(255,255,255,.8)", fontSize: "15px" }}>{item}</span>
                </div>
              ))}
            </div>
            <button className="red-btn">Read Our Story</button>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ WHY CHOOSE US */}
      <section className="sec-pad" style={{ padding: "100px 60px", background: "rgba(255,255,255,.01)" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <div className="sec-tag fz">Why Choose Us</div>
            <h2 className="sec-h2 fz" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: "48px", letterSpacing: "-1px" }}>
              The DEFY <span className="grad-text">Difference</span>
            </h2>
          </div>
          <div className="feat-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "18px" }}>
            {FEATURES.map(({ Icon, title, desc }, i) => (
              <div key={i} className="feat-card glass fz" style={{ background: "rgba(255,255,255,.035)" }}>
                <div className="feat-icon"><Icon size={22} color="#EA0A1A" /></div>
                <h3 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "18px", marginBottom: "10px" }}>{title}</h3>
                <p style={{ color: "rgba(255,255,255,.52)", fontSize: "14px", lineHeight: 1.72 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ PROGRAMS */}
      <section id="programs" className="sec-pad" style={{ padding: "120px 60px", maxWidth: "1440px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <div className="sec-tag fz">Our Programs</div>
          <h2 className="sec-h2 fz" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: "48px", letterSpacing: "-1px" }}>
            Train Like a <span className="grad-text">Champion</span>
          </h2>
        </div>
        <div className="prog-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "18px" }}>
          {PROGRAMS.map((p, i) => (
            <div key={i} className="prog-card fz">
              <img src={p.img} alt={p.name} />
              <div className="prog-overlay">
                <h3 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: "21px", marginBottom: "7px" }}>{p.name}</h3>
                <p style={{ color: "rgba(255,255,255,.65)", fontSize: "13px", lineHeight: 1.6, marginBottom: "14px" }}>{p.desc}</p>
                <button style={{
                  background: "none", border: "1px solid rgba(234,10,26,.6)", color: "#EA0A1A",
                  borderRadius: "50px", padding: "7px 18px", fontSize: "13px", fontWeight: 600,
                  cursor: "pointer", fontFamily: "'Poppins', sans-serif", transition: "all .3s", width: "fit-content",
                }}
                  onMouseEnter={e => { const el = e.target as HTMLElement; el.style.background = "#EA0A1A"; el.style.color = "#fff"; }}
                  onMouseLeave={e => { const el = e.target as HTMLElement; el.style.background = "none"; el.style.color = "#EA0A1A"; }}
                >Learn More</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ MEMBERSHIP */}
      <section id="membership" className="sec-pad" style={{ padding: "120px 60px", maxWidth: "1440px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <div className="sec-tag fz">Membership Plans</div>
          <h2 className="sec-h2 fz" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: "48px", letterSpacing: "-1px" }}>
            Invest in <span className="grad-text">Yourself</span>
          </h2>
          <p className="fz" style={{ color: "rgba(255,255,255,.45)", maxWidth: "440px", margin: "14px auto 0", lineHeight: 1.75, fontSize: "15px" }}>
            No contracts, no hidden fees. Upgrade, pause, or cancel anytime.
          </p>
        </div>
        <div className="plan-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "22px", alignItems: "center" }}>
          {PLANS.map((plan, i) => (
            <div key={i} className={`plan-card fz ${plan.highlighted ? "hot" : "plain glass"}`}>
              {plan.tag && (
                <div style={{
                  display: "inline-block",
                  background: plan.highlighted ? "rgba(255,255,255,.2)" : "rgba(234,10,26,.14)",
                  color: "#fff", borderRadius: "50px", padding: "4px 14px",
                  fontSize: "12px", fontWeight: 600, marginBottom: "20px", letterSpacing: ".5px",
                }}>{plan.tag}</div>
              )}
              <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "20px", marginBottom: "6px" }}>{plan.name}</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: "4px", marginBottom: "28px" }}>
                <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 900, fontSize: "52px", lineHeight: 1 }}>${plan.price}</span>
                <span style={{ color: plan.highlighted ? "rgba(255,255,255,.65)" : "rgba(255,255,255,.38)", fontSize: "14px" }}>/ month</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "13px", marginBottom: "34px" }}>
                {plan.features.map(f => (
                  <div key={f} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                    <Check size={15} color={plan.highlighted ? "#fff" : "#EA0A1A"} style={{ flexShrink: 0, marginTop: "2px" }} />
                    <span style={{ fontSize: "14px", color: plan.highlighted ? "rgba(255,255,255,.9)" : "rgba(255,255,255,.7)" }}>{f}</span>
                  </div>
                ))}
              </div>
              <button style={{
                width: "100%", padding: "14px",
                background: plan.highlighted ? "#fff" : "#EA0A1A",
                color: plan.highlighted ? "#EA0A1A" : "#fff",
                border: "none", borderRadius: "50px",
                fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "15px",
                cursor: "pointer", transition: "all .3s",
                boxShadow: plan.highlighted ? "0 8px 30px rgba(0,0,0,.25)" : "0 8px 30px rgba(234,10,26,.3)",
              }}>Join Now</button>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ TRAINERS */}
      <section id="trainers" className="sec-pad" style={{
        padding: "120px 60px", position: "relative", overflow: "hidden",
        background: "radial-gradient(60% 70% at 20% 40%, rgba(234,10,26,.10) 0%, transparent 60%), radial-gradient(55% 65% at 82% 60%, rgba(43,79,224,.12) 0%, transparent 60%), rgba(255,255,255,.01)",
      }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto", position: "relative" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <div className="sec-tag fz">Our Trainers</div>
            <h2 className="sec-h2 fz" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: "48px", letterSpacing: "-1px" }}>
              Train With the <span className="grad-text">Best</span>
            </h2>
          </div>
          <div className="trainer-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "30px", maxWidth: "1000px", margin: "0 auto" }}>
            {TRAINERS.map((t, i) => (
              <div key={i} className="trainer-card fz">
                <img src={t.img} alt={t.name} style={{ height: "540px" }} />
                <div className="t-over">
                  <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "17px", marginBottom: "3px" }}>{t.name}</div>
                  <div style={{ color: "#EA0A1A", fontSize: "13px", fontWeight: 600, marginBottom: "12px" }}>{t.specialty}</div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    {[Instagram, Twitter, Facebook].map((Icon, j) => (
                      <div key={j} className="soc-icon"><Icon size={13} color="#fff" /></div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ GALLERY */}
      <section id="gallery" className="sec-pad" style={{ padding: "120px 60px", maxWidth: "1440px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <div className="sec-tag fz">Gallery</div>
          <h2 className="sec-h2 fz" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: "48px", letterSpacing: "-1px" }}>
            Life at <span className="grad-text">DEFY FITNESS</span>
          </h2>
        </div>
        <div className="gal-grid fz">
          {GALLERY.map((src, i) => (
            <div key={i} className="gal-item">
              <img src={src} alt={`DEFY FITNESS gallery ${i + 1}`} loading="lazy" />
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ TESTIMONIALS */}
      <section id="testimonials" className="sec-pad" style={{ padding: "120px 60px", background: "linear-gradient(135deg, rgba(234,10,26,.05) 0%, transparent 100%)" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <div className="sec-tag fz">Testimonials</div>
            <h2 className="sec-h2 fz" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: "48px", letterSpacing: "-1px" }}>
              Real Results, <span className="grad-text">Real People</span>
            </h2>
          </div>

          <div className="glass fz" style={{ padding: "52px 56px", textAlign: "center", border: "1px solid rgba(255,255,255,.08)" }}>
            <div style={{ display: "flex", justifyContent: "center", gap: "4px", marginBottom: "22px" }}>
              {Array(5).fill(null).map((_, i) => <Star key={i} size={20} color="#EA0A1A" fill="#EA0A1A" />)}
            </div>
            <p style={{ fontSize: "18px", lineHeight: 1.75, color: "rgba(255,255,255,.82)", fontStyle: "italic", marginBottom: "34px" }}>
              "{TESTIMONIALS[activeTesti].review}"
            </p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "14px" }}>
              <img src={TESTIMONIALS[activeTesti].img} alt={TESTIMONIALS[activeTesti].name}
                style={{ width: "54px", height: "54px", borderRadius: "50%", objectFit: "cover", border: "2px solid #EA0A1A" }} />
              <div style={{ textAlign: "left" }}>
                <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "15px" }}>{TESTIMONIALS[activeTesti].name}</div>
                <div style={{ color: "rgba(255,255,255,.45)", fontSize: "13px" }}>{TESTIMONIALS[activeTesti].role}</div>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "18px", marginTop: "28px" }}>
            {[ChevronLeft, ChevronRight].map((Icon, i) => (
              <button key={i} onClick={() => setActiveTesti(p => i === 0 ? (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length : (p + 1) % TESTIMONIALS.length)}
                style={{ width: "42px", height: "42px", borderRadius: "50%", background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.1)", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all .3s" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#EA0A1A"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,.07)"}
              ><Icon size={17} /></button>
            )).flatMap((btn, i) => i === 0 ? [btn, (
              <div key="dots" style={{ display: "flex", gap: "7px" }}>
                {TESTIMONIALS.map((_, i) => (
                  <button key={i} onClick={() => setActiveTesti(i)} style={{
                    width: i === activeTesti ? "26px" : "7px", height: "7px", borderRadius: "50px",
                    background: i === activeTesti ? "#EA0A1A" : "rgba(255,255,255,.22)", border: "none", cursor: "pointer", transition: "all .35s",
                  }} />
                ))}
              </div>
            )] : [btn])}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ ACHIEVEMENTS */}
      <section ref={achievRef} className="sec-pad" style={{ padding: "100px 60px", position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(140deg, #EA0A1A 0%, #B0121A 100%)",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&h=600&fit=crop&auto=format')",
          backgroundSize: "cover", backgroundPosition: "center", opacity: .08,
        }} />
        <div className="achiev-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "40px", maxWidth: "1440px", margin: "0 auto", position: "relative", textAlign: "center" }}>
          {ACHIEVEMENTS.map((a, i) => (
            <div key={i}>
              <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 900, fontSize: "64px", lineHeight: 1, marginBottom: "8px" }}>
                <AnimatedCounter target={a.target} suffix={a.suffix} started={countersOn} />
              </div>
              <div style={{ fontSize: "16px", opacity: .85, fontWeight: 500 }}>{a.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ CONTACT */}
      <section id="contact" className="sec-pad" style={{ padding: "120px 60px", background: "rgba(255,255,255,.01)" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <div className="sec-tag fz">Contact Us</div>
            <h2 className="sec-h2 fz" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: "48px", letterSpacing: "-1px" }}>
              Let&apos;s <span className="grad-text">Talk</span>
            </h2>
          </div>
          <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "56px" }}>
            {/* Form */}
            <div className="glass fz" style={{ padding: "48px", border: "1px solid rgba(255,255,255,.07)" }}>
              <h3 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "24px", marginBottom: "28px" }}>Send a Message</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {[{ ph: "Your Full Name", type: "text" }, { ph: "Email Address", type: "email" }, { ph: "Phone Number", type: "tel" }].map(f => (
                  <input key={f.ph} type={f.type} placeholder={f.ph} style={{
                    width: "100%", padding: "15px 18px",
                    background: "rgba(255,255,255,.055)", border: "1px solid rgba(255,255,255,.09)",
                    borderRadius: "12px", color: "#fff", fontSize: "15px", fontFamily: "'Inter', sans-serif",
                  }} />
                ))}
                <textarea placeholder="Your Message" rows={5} style={{
                  width: "100%", padding: "15px 18px",
                  background: "rgba(255,255,255,.055)", border: "1px solid rgba(255,255,255,.09)",
                  borderRadius: "12px", color: "#fff", fontSize: "15px", resize: "vertical", fontFamily: "'Inter', sans-serif",
                }} />
                <button className="red-btn" style={{ padding: "16px", fontSize: "16px" }}>
                  Send Message <ArrowRight size={15} style={{ display: "inline", marginLeft: "8px", verticalAlign: "middle" }} />
                </button>
              </div>
            </div>

            {/* Info */}
            <div className="fz" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div>
                <h3 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "24px", marginBottom: "14px" }}>Get In Touch</h3>
                <p style={{ color: "rgba(255,255,255,.5)", lineHeight: 1.8, fontSize: "15px" }}>
                  Have questions? Our team is ready to help you start your transformation journey. Reach out any time — we&apos;re open 24/7.
                </p>
              </div>
              {[
                { Icon: MapPin, label: "Address", value: "123 Power Street, Athletic District, New York, NY 10001" },
                { Icon: Phone, label: "Phone", value: "+1 (555) 123-4567" },
                { Icon: Mail, label: "Email", value: "info@defyfitness.com" },
                { Icon: Clock, label: "Hours", value: "Monday – Sunday: Open 24 Hours" },
              ].map(({ Icon, label, value }) => (
                <div key={label} className="glass" style={{ padding: "18px 22px", border: "1px solid rgba(255,255,255,.07)", display: "flex", gap: "14px", alignItems: "flex-start" }}>
                  <div style={{ width: "42px", height: "42px", borderRadius: "12px", background: "rgba(234,10,26,.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon size={18} color="#EA0A1A" />
                  </div>
                  <div>
                    <div style={{ color: "rgba(255,255,255,.4)", fontSize: "11px", fontWeight: 600, letterSpacing: ".8px", textTransform: "uppercase", marginBottom: "3px" }}>{label}</div>
                    <div style={{ fontSize: "14.5px", color: "rgba(255,255,255,.82)" }}>{value}</div>
                  </div>
                </div>
              ))}
              {/* Map placeholder */}
              <div style={{ height: "170px", borderRadius: "16px", background: "#161616", border: "1px solid rgba(255,255,255,.07)", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "8px" }}>
                <MapPin size={30} color="rgba(234,10,26,.5)" />
                <div style={{ color: "rgba(255,255,255,.3)", fontSize: "13px" }}>Interactive Map</div>
                <div style={{ color: "rgba(255,255,255,.2)", fontSize: "11px" }}>123 Power Street, New York</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ FOOTER */}
      <footer style={{ padding: "80px 60px 40px", borderTop: "1px solid rgba(255,255,255,.05)" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
          <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1.5fr", gap: "56px", marginBottom: "60px" }}>
            {/* Brand */}
            <div>
              <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 900, fontSize: "26px", marginBottom: "6px", letterSpacing: "1px" }}>
                <span style={{ color: "#2B4FE0" }}>DEFY</span> <span style={{ color: "#EA0A1A" }}>FITNESS</span>
              </div>
              <div style={{ color: "rgba(255,255,255,.35)", fontSize: "11px", fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "16px" }}>
                When Others Say You Can't
              </div>
              <p style={{ color: "rgba(255,255,255,.45)", fontSize: "14px", lineHeight: 1.8, maxWidth: "260px", marginBottom: "22px" }}>
                Your transformation starts here. Premium equipment, elite coaching, and a community that drives you every single day.
              </p>
              <div style={{ display: "flex", gap: "10px" }}>
                {[Instagram, Twitter, Facebook, Youtube].map((Icon, i) => (
                  <div key={i} style={{
                    width: "36px", height: "36px", borderRadius: "10px",
                    background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.08)",
                    display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all .3s",
                  }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "#EA0A1A"; el.style.borderColor = "#EA0A1A"; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "rgba(255,255,255,.05)"; el.style.borderColor = "rgba(255,255,255,.08)"; }}
                  ><Icon size={15} color="#fff" /></div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "15px", marginBottom: "18px" }}>Quick Links</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {["Home", "About Us", "Trainers", "Membership", "Gallery", "Contact"].map(l => (
                  <a key={l} href="#" style={{ color: "rgba(255,255,255,.45)", fontSize: "14px", textDecoration: "none", transition: "color .2s" }}
                    onMouseEnter={e => (e.target as HTMLElement).style.color = "#EA0A1A"}
                    onMouseLeave={e => (e.target as HTMLElement).style.color = "rgba(255,255,255,.45)"}
                  >{l}</a>
                ))}
              </div>
            </div>

            {/* Programs */}
            <div>
              <h4 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "15px", marginBottom: "18px" }}>Programs</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {PROGRAMS.map(p => (
                  <a key={p.name} href="#" style={{ color: "rgba(255,255,255,.45)", fontSize: "14px", textDecoration: "none", transition: "color .2s" }}
                    onMouseEnter={e => (e.target as HTMLElement).style.color = "#EA0A1A"}
                    onMouseLeave={e => (e.target as HTMLElement).style.color = "rgba(255,255,255,.45)"}
                  >{p.name}</a>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "15px", marginBottom: "18px" }}>Contact</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {[
                  { Icon: MapPin, text: "123 Power Street, Athletic District, NY 10001" },
                  { Icon: Phone, text: "+1 (555) 123-4567" },
                  { Icon: Mail, text: "info@defyfitness.com" },
                  { Icon: Clock, text: "Open 24/7 — Every Day" },
                ].map(({ Icon, text }) => (
                  <div key={text} style={{ display: "flex", gap: "10px", color: "rgba(255,255,255,.45)", fontSize: "13.5px", alignItems: "flex-start" }}>
                    <Icon size={15} color="#EA0A1A" style={{ flexShrink: 0, marginTop: "2px" }} />
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,.05)", paddingTop: "28px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "14px" }}>
            <div style={{ color: "rgba(255,255,255,.28)", fontSize: "13px" }}>© 2026 DEFY FITNESS. All rights reserved.</div>
            <div style={{ display: "flex", gap: "22px" }}>
              {["Privacy Policy", "Terms & Conditions", "Cookie Policy"].map(l => (
                <a key={l} href="#" style={{ color: "rgba(255,255,255,.28)", fontSize: "13px", textDecoration: "none", transition: "color .2s" }}
                  onMouseEnter={e => (e.target as HTMLElement).style.color = "#EA0A1A"}
                  onMouseLeave={e => (e.target as HTMLElement).style.color = "rgba(255,255,255,.28)"}
                >{l}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
