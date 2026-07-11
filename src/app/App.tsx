import { useState, useEffect, useRef } from "react";
import {
  Dumbbell, Users, CreditCard, Target, MapPin, Phone, Mail, Clock,
  Instagram, Twitter, Facebook, Youtube, ChevronLeft, ChevronRight,
  Star, Menu, X, Check, ArrowRight, Zap, TrendingUp, Award,
} from "lucide-react";

// ─── Data ───────────────────────────────────────────────────────────────────

const NAV_LINKS = ["Home", "About Us", "Programs", "Trainers", "Membership", "Gallery", "Testimonials", "Blog", "Contact"];

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
  { name: "Marcus Rivera", specialty: "Strength & Conditioning", img: "https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?w=400&h=500&fit=crop&auto=format" },
  { name: "Sarah Chen", specialty: "Yoga & Flexibility", img: "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&h=500&fit=crop&auto=format" },
  { name: "Jake Thompson", specialty: "CrossFit & HIIT", img: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=400&h=500&fit=crop&auto=format" },
  { name: "Aisha Patel", specialty: "Nutrition & Weight Loss", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop&auto=format" },
];

const GALLERY = [
  { src: "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=600&fit=crop&auto=format", tall: true },
  { src: "https://images.unsplash.com/photo-1583454155184-870a1f63aebc?w=600&fit=crop&auto=format", tall: false },
  { src: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&fit=crop&auto=format", tall: true },
  { src: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=600&fit=crop&auto=format", tall: false },
  { src: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600&fit=crop&auto=format", tall: true },
  { src: "https://images.unsplash.com/photo-1607962837359-5e7e89f86776?w=600&fit=crop&auto=format", tall: false },
  { src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&fit=crop&auto=format", tall: false },
  { src: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&fit=crop&auto=format", tall: true },
];

const TESTIMONIALS = [
  {
    name: "James Wilson", role: "Member since 2022", rating: 5,
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&auto=format",
    review: "FITZONE completely transformed my life. In just 8 months I lost 40 lbs and gained confidence I never knew I had. The trainers are world-class and the community is incredibly supportive.",
  },
  {
    name: "Emily Rodriguez", role: "Member since 2021", rating: 5,
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&auto=format",
    review: "The Premium membership is absolutely worth every penny. The personalized nutrition plan combined with my trainer Marcus has helped me hit PRs I never thought possible. Best gym in the city, period.",
  },
  {
    name: "David Park", role: "Member since 2023", rating: 5,
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&auto=format",
    review: "Modern equipment, spotless facilities, and trainers who genuinely care about your progress. I drive 30 minutes out of my way just to train here. FITZONE is in a league of its own.",
  },
];

const ACHIEVEMENTS = [
  { target: 5000, suffix: "+", label: "Active Members" },
  { target: 25, suffix: "+", label: "Expert Trainers" },
  { target: 47, suffix: "", label: "Awards Won" },
  { target: 98, suffix: "%", label: "Success Rate" },
];

const BLOGS = [
  { title: "5 Compound Lifts That Will Change Your Body Forever", date: "July 8, 2026", category: "Training", img: "https://images.unsplash.com/photo-1556817411-31ae72fa3ea0?w=600&h=400&fit=crop&auto=format" },
  { title: "The Science of Protein Timing for Maximum Muscle Growth", date: "July 3, 2026", category: "Nutrition", img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&h=400&fit=crop&auto=format" },
  { title: "How to Break Through Any Fitness Plateau in 30 Days", date: "June 28, 2026", category: "Mindset", img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop&auto=format" },
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
  const [bmiH, setBmiH] = useState("");
  const [bmiW, setBmiW] = useState("");
  const [bmiResult, setBmiResult] = useState<null | { val: number; cat: string; color: string }>(null);
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

  const calcBMI = () => {
    const h = parseFloat(bmiH) / 100, w = parseFloat(bmiW);
    if (!h || !w || h <= 0 || w <= 0) return;
    const val = Math.round((w / (h * h)) * 10) / 10;
    const cat = val < 18.5 ? "Underweight" : val < 25 ? "Normal Weight" : val < 30 ? "Overweight" : "Obese";
    const color = val < 18.5 ? "#60A5FA" : val < 25 ? "#34D399" : val < 30 ? "#FBBF24" : "#FF3B30";
    setBmiResult({ val, cat, color });
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#0D0D0D", color: "#fff", overflowX: "hidden" }}>
      {/* ── Global styles ── */}
      <style>{`
        *{box-sizing:border-box}
        html{scroll-behavior:smooth}
        ::-webkit-scrollbar{width:5px}
        ::-webkit-scrollbar-track{background:#0D0D0D}
        ::-webkit-scrollbar-thumb{background:#FF3B30;border-radius:3px}

        .fz{opacity:0;transform:translateY(36px);transition:opacity .65s ease,transform .65s ease}
        .fz-vis{opacity:1;transform:translateY(0)}
        .fz:nth-child(2){transition-delay:.08s}
        .fz:nth-child(3){transition-delay:.16s}
        .fz:nth-child(4){transition-delay:.24s}
        .fz:nth-child(5){transition-delay:.32s}
        .fz:nth-child(6){transition-delay:.40s}

        .glass{background:rgba(255,255,255,.04);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.08);border-radius:16px}

        .red-btn{background:#FF3B30;color:#fff;border:none;border-radius:50px;padding:14px 32px;font-family:'Poppins',sans-serif;font-weight:700;font-size:15px;cursor:pointer;transition:all .3s;box-shadow:0 0 24px rgba(255,59,48,.4);letter-spacing:.4px}
        .red-btn:hover{transform:translateY(-3px);box-shadow:0 10px 36px rgba(255,59,48,.6)}

        .ghost-btn{background:transparent;color:#fff;border:2px solid rgba(255,255,255,.3);border-radius:50px;padding:12px 30px;font-family:'Poppins',sans-serif;font-weight:600;font-size:15px;cursor:pointer;transition:all .3s}
        .ghost-btn:hover{border-color:#FF3B30;color:#FF3B30;transform:translateY(-3px)}

        .sec-tag{display:inline-block;background:rgba(255,59,48,.12);color:#FF3B30;border:1px solid rgba(255,59,48,.3);border-radius:50px;padding:5px 16px;font-size:12px;font-weight:600;font-family:'Poppins',sans-serif;letter-spacing:1.2px;text-transform:uppercase;margin-bottom:14px}

        .grad-text{background:linear-gradient(130deg,#FF3B30 0%,#FF8C70 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}

        .prog-card{position:relative;border-radius:16px;overflow:hidden;cursor:pointer}
        .prog-card img{width:100%;height:280px;object-fit:cover;transition:transform .5s ease;display:block}
        .prog-card:hover img{transform:scale(1.08)}
        .prog-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(13,13,13,.96) 0%,rgba(13,13,13,.45) 55%,transparent 100%);display:flex;flex-direction:column;justify-content:flex-end;padding:24px}

        .feat-card{border-radius:16px;padding:36px 28px;transition:all .3s;cursor:pointer;border:1px solid rgba(255,255,255,.07)}
        .feat-card:hover{transform:translateY(-8px);background:rgba(255,59,48,.07)!important;border-color:rgba(255,59,48,.3)!important;box-shadow:0 24px 64px rgba(255,59,48,.14)}
        .feat-icon{width:54px;height:54px;border-radius:14px;background:rgba(255,59,48,.12);display:flex;align-items:center;justify-content:center;margin-bottom:18px;transition:all .3s}
        .feat-card:hover .feat-icon{background:#FF3B30}

        .trainer-card{position:relative;border-radius:16px;overflow:hidden}
        .trainer-card img{width:100%;height:380px;object-fit:cover;transition:transform .5s}
        .trainer-card:hover img{transform:scale(1.05)}
        .t-over{position:absolute;inset:0;background:linear-gradient(to top,rgba(13,13,13,.92) 0%,transparent 55%);display:flex;flex-direction:column;justify-content:flex-end;padding:22px;transition:background .35s}
        .trainer-card:hover .t-over{background:linear-gradient(to top,rgba(255,59,48,.75) 0%,rgba(13,13,13,.35) 100%)}

        .gal-item{border-radius:12px;overflow:hidden;margin-bottom:14px;break-inside:avoid;cursor:pointer}
        .gal-item img{width:100%;display:block;transition:transform .4s}
        .gal-item:hover img{transform:scale(1.06)}

        .blog-card{border-radius:16px;overflow:hidden;transition:all .3s;cursor:pointer}
        .blog-card:hover{transform:translateY(-6px);box-shadow:0 24px 56px rgba(0,0,0,.5)}
        .blog-card .bi{overflow:hidden}
        .blog-card img{width:100%;height:220px;object-fit:cover;display:block;transition:transform .5s}
        .blog-card:hover img{transform:scale(1.07)}

        .plan-card{border-radius:20px;padding:40px 32px;transition:all .3s}
        .plan-card.plain{border:1px solid rgba(255,255,255,.08)}
        .plan-card.plain:hover{transform:translateY(-6px);border-color:rgba(255,59,48,.4)!important}
        .plan-card.hot{background:linear-gradient(140deg,#FF3B30 0%,#c9241a 100%);transform:scale(1.04);box-shadow:0 32px 80px rgba(255,59,48,.4)}

        .soc-icon{width:32px;height:32px;border-radius:8px;background:rgba(255,255,255,.12);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .3s;flex-shrink:0}
        .soc-icon:hover{background:#FF3B30}

        input::placeholder,textarea::placeholder{color:rgba(255,255,255,.3)}
        input:focus,textarea:focus{border-color:rgba(255,59,48,.5)!important;outline:none}
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
          .gal-cols{columns:3!important}
          .achiev-grid{grid-template-columns:repeat(2,1fr)!important}
          .blog-grid{grid-template-columns:1fr!important}
        }
        @media(max-width:640px){
          .nav-links-d{display:none!important}
          .ham{display:flex!important}
          .hero-h1{font-size:38px!important}
          .hero-pad{padding:0 24px!important;padding-top:110px!important}
          .sec-pad{padding:80px 24px!important}
          .hero-stats{grid-template-columns:1fr 1fr!important}
          .trainer-grid{grid-template-columns:1fr!important}
          .prog-grid{grid-template-columns:1fr!important}
          .footer-grid{grid-template-columns:1fr!important}
          .gal-cols{columns:2!important}
          .newsletter-form{flex-direction:column!important}
        }
      `}</style>

      {/* ══════════════════════════════════════════════════════════ NAVBAR */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        padding: navSolid ? "14px 60px" : "22px 60px",
        background: navSolid ? "rgba(13,13,13,.97)" : "transparent",
        backdropFilter: navSolid ? "blur(24px)" : "none",
        borderBottom: navSolid ? "1px solid rgba(255,255,255,.05)" : "none",
        transition: "all .4s ease",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ flexShrink: 0 }}>
  <img src="/logo.png" alt="FitZoneGym Logo" style={{ height: "100px", mixBlendMode: "screen", filter: "contrast(1.2) brightness(1.1)", objectFit: "contain" }} />
</div>

        <div className="nav-links-d" style={{ display: "flex", gap: "28px" }}>
          {NAV_LINKS.map(l => (
            <a key={l} href={`#${l.toLowerCase().replace(" ", "-")}`} style={{
              color: "rgba(255,255,255,.65)", fontSize: "13.5px", fontWeight: 500,
              textDecoration: "none", transition: "color .2s", fontFamily: "'Poppins', sans-serif",
            }}
              onMouseEnter={e => (e.target as HTMLElement).style.color = "#FF3B30"}
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
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(120deg, rgba(13,13,13,.97) 0%, rgba(13,13,13,.78) 55%, rgba(255,59,48,.12) 100%)" }} />

        <div className="hero-pad" style={{ position: "relative", maxWidth: "1440px", margin: "0 auto", padding: "0 60px", paddingTop: "130px", width: "100%" }}>
          <div className="sec-tag">
            #1 Premium Fitness Club
          </div>

          <h1 className="hero-h1" style={{
            fontFamily: "'Poppins', sans-serif", fontWeight: 900, fontSize: "82px",
            lineHeight: 1.04, letterSpacing: "-2.5px", maxWidth: "820px", marginBottom: "22px",
          }}>
            Transform Your Body.<br />
            <span className="grad-text">Transform Your Life.</span>
          </h1>

          <p style={{ color: "rgba(255,255,255,.6)", fontSize: "18px", maxWidth: "500px", lineHeight: 1.75, marginBottom: "38px" }}>
            Join thousands of members who have already changed their lives at FITZONE — world-class coaches, elite equipment, and a community that drives you to your peak.
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
                <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: "26px", color: "#FF3B30" }}>{s.value}</div>
                <div style={{ color: "rgba(255,255,255,.45)", fontSize: "11px", marginTop: "3px", fontWeight: 500, letterSpacing: ".4px" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: "36px", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
          <div style={{ width: "1px", height: "56px", background: "linear-gradient(to bottom, transparent, #FF3B30)", animation: "pulse-line 2s infinite" }} />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ ABOUT */}
      <section id="about-us" className="sec-pad" style={{ padding: "130px 60px", maxWidth: "1440px", margin: "0 auto" }}>
        <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>
          <div className="fz" style={{ position: "relative" }}>
            <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=700&fit=crop&auto=format" alt="FITZONE gym interior"
              style={{ width: "100%", height: "580px", objectFit: "cover", borderRadius: "20px", display: "block" }} />
            <div style={{
              position: "absolute", bottom: "28px", right: "-24px",
              background: "#FF3B30", borderRadius: "16px", padding: "22px 28px",
              boxShadow: "0 24px 60px rgba(255,59,48,.45)",
              animation: "drift 4s ease-in-out infinite",
            }}>
              <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 900, fontSize: "40px", color: "#fff", lineHeight: 1 }}>10+</div>
              <div style={{ color: "rgba(255,255,255,.8)", fontSize: "13px", fontWeight: 500, marginTop: "4px" }}>Years of Excellence</div>
            </div>
          </div>

          <div className="fz">
            <div className="sec-tag">About FITZONE</div>
            <h2 className="sec-h2" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: "46px", lineHeight: 1.13, marginBottom: "18px", letterSpacing: "-1px" }}>
              We Build Champions,<br /><span className="grad-text">Not Just Bodies</span>
            </h2>
            <p style={{ color: "rgba(255,255,255,.58)", lineHeight: 1.8, marginBottom: "14px", fontSize: "15.5px" }}>
              Since 2014, FITZONE has been the training ground for thousands of athletes, everyday heroes, and people ready to reinvent themselves. We combine elite coaching with cutting-edge facilities to deliver results that last.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", margin: "28px 0" }}>
              {[
                { Icon: Zap, title: "Our Mission", text: "Empower every member to achieve peak physical and mental performance." },
                { Icon: TrendingUp, title: "Our Vision", text: "To be the world's most transformative fitness community." },
              ].map(({ Icon, title, text }, i) => (
                <div key={i} className="glass" style={{ padding: "20px" }}>
                  <Icon size={20} color="#FF3B30" style={{ marginBottom: "8px" }} />
                  <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "14px", marginBottom: "6px" }}>{title}</div>
                  <div style={{ color: "rgba(255,255,255,.5)", fontSize: "13px", lineHeight: 1.6 }}>{text}</div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "34px" }}>
              {["Certified & Experienced Trainers", "Modern High-Tech Equipment", "Personalized Workout Plans", "Expert Nutrition Guidance"].map(item => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: "22px", height: "22px", borderRadius: "50%", background: "rgba(255,59,48,.14)", border: "1px solid rgba(255,59,48,.4)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Check size={11} color="#FF3B30" />
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
              The FITZONE <span className="grad-text">Difference</span>
            </h2>
          </div>
          <div className="feat-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "18px" }}>
            {FEATURES.map(({ Icon, title, desc }, i) => (
              <div key={i} className="feat-card glass fz" style={{ background: "rgba(255,255,255,.035)" }}>
                <div className="feat-icon"><Icon size={22} color="#FF3B30" /></div>
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
                  background: "none", border: "1px solid rgba(255,59,48,.6)", color: "#FF3B30",
                  borderRadius: "50px", padding: "7px 18px", fontSize: "13px", fontWeight: 600,
                  cursor: "pointer", fontFamily: "'Poppins', sans-serif", transition: "all .3s", width: "fit-content",
                }}
                  onMouseEnter={e => { const el = e.target as HTMLElement; el.style.background = "#FF3B30"; el.style.color = "#fff"; }}
                  onMouseLeave={e => { const el = e.target as HTMLElement; el.style.background = "none"; el.style.color = "#FF3B30"; }}
                >Learn More</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ BMI CALCULATOR */}
      <section className="sec-pad" style={{ padding: "100px 60px", background: "linear-gradient(135deg, rgba(255,59,48,.05) 0%, transparent 100%)" }}>
        <div style={{ maxWidth: "640px", margin: "0 auto", textAlign: "center" }}>
          <div className="sec-tag fz">BMI Calculator</div>
          <h2 className="sec-h2 fz" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: "44px", letterSpacing: "-1px", marginBottom: "10px" }}>
            Know Your <span className="grad-text">Numbers</span>
          </h2>
          <p className="fz" style={{ color: "rgba(255,255,255,.5)", marginBottom: "44px", fontSize: "15px", lineHeight: 1.7 }}>
            Calculate your Body Mass Index to understand where you stand and how we can help you reach your goals.
          </p>
          <div className="glass fz" style={{ padding: "48px 44px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "18px" }}>
              {[
                { label: "HEIGHT (CM)", val: bmiH, set: setBmiH, ph: "e.g. 175" },
                { label: "WEIGHT (KG)", val: bmiW, set: setBmiW, ph: "e.g. 75" },
              ].map(({ label, val, set, ph }) => (
                <div key={label}>
                  <label style={{ display: "block", color: "rgba(255,255,255,.45)", fontSize: "11.5px", marginBottom: "9px", fontWeight: 600, letterSpacing: ".8px", textAlign: "left" }}>{label}</label>
                  <input type="number" value={val} onChange={e => set(e.target.value)} placeholder={ph} style={{
                    width: "100%", padding: "15px 18px",
                    background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)",
                    borderRadius: "12px", color: "#fff", fontSize: "16px", fontFamily: "'Inter', sans-serif",
                  }} />
                </div>
              ))}
            </div>
            <button className="red-btn" style={{ width: "100%", padding: "16px", fontSize: "16px" }} onClick={calcBMI}>
              Calculate My BMI
            </button>
            {bmiResult && (
              <div style={{
                marginTop: "24px", padding: "28px", background: "rgba(255,255,255,.04)",
                borderRadius: "14px", border: `1px solid ${bmiResult.color}35`,
              }}>
                <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 900, fontSize: "58px", color: bmiResult.color, lineHeight: 1 }}>
                  {bmiResult.val}
                </div>
                <div style={{ fontSize: "17px", fontWeight: 700, color: bmiResult.color, marginBottom: "8px", fontFamily: "'Poppins', sans-serif" }}>
                  {bmiResult.cat}
                </div>
                <div style={{ color: "rgba(255,255,255,.5)", fontSize: "13.5px", lineHeight: 1.6 }}>
                  {bmiResult.cat === "Normal Weight"
                    ? "You're in a healthy range — let's build on this foundation together."
                    : "Our trainers will craft a personalized plan to get you to your ideal weight."}
                </div>
              </div>
            )}
          </div>
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
                  background: plan.highlighted ? "rgba(255,255,255,.2)" : "rgba(255,59,48,.14)",
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
                    <Check size={15} color={plan.highlighted ? "#fff" : "#FF3B30"} style={{ flexShrink: 0, marginTop: "2px" }} />
                    <span style={{ fontSize: "14px", color: plan.highlighted ? "rgba(255,255,255,.9)" : "rgba(255,255,255,.7)" }}>{f}</span>
                  </div>
                ))}
              </div>
              <button style={{
                width: "100%", padding: "14px",
                background: plan.highlighted ? "#fff" : "#FF3B30",
                color: plan.highlighted ? "#FF3B30" : "#fff",
                border: "none", borderRadius: "50px",
                fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "15px",
                cursor: "pointer", transition: "all .3s",
                boxShadow: plan.highlighted ? "0 8px 30px rgba(0,0,0,.25)" : "0 8px 30px rgba(255,59,48,.3)",
              }}>Join Now</button>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ TRAINERS */}
      <section id="trainers" className="sec-pad" style={{ padding: "120px 60px", background: "rgba(255,255,255,.01)" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <div className="sec-tag fz">Our Trainers</div>
            <h2 className="sec-h2 fz" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: "48px", letterSpacing: "-1px" }}>
              Train With the <span className="grad-text">Best</span>
            </h2>
          </div>
          <div className="trainer-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "18px" }}>
            {TRAINERS.map((t, i) => (
              <div key={i} className="trainer-card fz">
                <img src={t.img} alt={t.name} />
                <div className="t-over">
                  <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "17px", marginBottom: "3px" }}>{t.name}</div>
                  <div style={{ color: "#FF3B30", fontSize: "13px", fontWeight: 600, marginBottom: "12px" }}>{t.specialty}</div>
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
            Life at <span className="grad-text">FITZONE</span>
          </h2>
        </div>
        <div className="gal-cols fz" style={{ columns: "4", columnGap: "14px" }}>
          {GALLERY.map((img, i) => (
            <div key={i} className="gal-item">
              <img src={img.src} alt={`FITZONE gallery ${i + 1}`}
                style={{ height: img.tall ? "280px" : "195px", objectFit: "cover" }} />
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ TESTIMONIALS */}
      <section id="testimonials" className="sec-pad" style={{ padding: "120px 60px", background: "linear-gradient(135deg, rgba(255,59,48,.05) 0%, transparent 100%)" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <div className="sec-tag fz">Testimonials</div>
            <h2 className="sec-h2 fz" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: "48px", letterSpacing: "-1px" }}>
              Real Results, <span className="grad-text">Real People</span>
            </h2>
          </div>

          <div className="glass fz" style={{ padding: "52px 56px", textAlign: "center", border: "1px solid rgba(255,255,255,.08)" }}>
            <div style={{ display: "flex", justifyContent: "center", gap: "4px", marginBottom: "22px" }}>
              {Array(5).fill(null).map((_, i) => <Star key={i} size={20} color="#FF3B30" fill="#FF3B30" />)}
            </div>
            <p style={{ fontSize: "18px", lineHeight: 1.75, color: "rgba(255,255,255,.82)", fontStyle: "italic", marginBottom: "34px" }}>
              "{TESTIMONIALS[activeTesti].review}"
            </p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "14px" }}>
              <img src={TESTIMONIALS[activeTesti].img} alt={TESTIMONIALS[activeTesti].name}
                style={{ width: "54px", height: "54px", borderRadius: "50%", objectFit: "cover", border: "2px solid #FF3B30" }} />
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
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#FF3B30"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,.07)"}
              ><Icon size={17} /></button>
            )).flatMap((btn, i) => i === 0 ? [btn, (
              <div key="dots" style={{ display: "flex", gap: "7px" }}>
                {TESTIMONIALS.map((_, i) => (
                  <button key={i} onClick={() => setActiveTesti(i)} style={{
                    width: i === activeTesti ? "26px" : "7px", height: "7px", borderRadius: "50px",
                    background: i === activeTesti ? "#FF3B30" : "rgba(255,255,255,.22)", border: "none", cursor: "pointer", transition: "all .35s",
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
          background: "linear-gradient(140deg, #FF3B30 0%, #c9241a 100%)",
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

      {/* ══════════════════════════════════════════════════════════ BLOG */}
      <section id="blog" className="sec-pad" style={{ padding: "120px 60px", maxWidth: "1440px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <div className="sec-tag fz">Latest Blog</div>
          <h2 className="sec-h2 fz" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: "48px", letterSpacing: "-1px" }}>
            Fuel Your <span className="grad-text">Knowledge</span>
          </h2>
        </div>
        <div className="blog-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "22px" }}>
          {BLOGS.map((b, i) => (
            <div key={i} className="blog-card glass fz" style={{ border: "1px solid rgba(255,255,255,.07)" }}>
              <div className="bi"><img src={b.img} alt={b.title} /></div>
              <div style={{ padding: "24px" }}>
                <div style={{ display: "flex", gap: "10px", marginBottom: "12px", alignItems: "center" }}>
                  <span style={{ background: "rgba(255,59,48,.13)", color: "#FF3B30", borderRadius: "50px", padding: "3px 12px", fontSize: "11.5px", fontWeight: 600 }}>{b.category}</span>
                  <span style={{ color: "rgba(255,255,255,.35)", fontSize: "12px" }}>{b.date}</span>
                </div>
                <h3 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "16.5px", lineHeight: 1.45, marginBottom: "16px" }}>{b.title}</h3>
                <button style={{ background: "none", border: "none", color: "#FF3B30", fontWeight: 600, fontSize: "14px", cursor: "pointer", padding: 0, display: "flex", alignItems: "center", gap: "6px", fontFamily: "'Poppins', sans-serif" }}>
                  Read More <ArrowRight size={13} />
                </button>
              </div>
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
                { Icon: Mail, label: "Email", value: "info@fitzonegym.com" },
                { Icon: Clock, label: "Hours", value: "Monday – Sunday: Open 24 Hours" },
              ].map(({ Icon, label, value }) => (
                <div key={label} className="glass" style={{ padding: "18px 22px", border: "1px solid rgba(255,255,255,.07)", display: "flex", gap: "14px", alignItems: "flex-start" }}>
                  <div style={{ width: "42px", height: "42px", borderRadius: "12px", background: "rgba(255,59,48,.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon size={18} color="#FF3B30" />
                  </div>
                  <div>
                    <div style={{ color: "rgba(255,255,255,.4)", fontSize: "11px", fontWeight: 600, letterSpacing: ".8px", textTransform: "uppercase", marginBottom: "3px" }}>{label}</div>
                    <div style={{ fontSize: "14.5px", color: "rgba(255,255,255,.82)" }}>{value}</div>
                  </div>
                </div>
              ))}
              {/* Map placeholder */}
              <div style={{ height: "170px", borderRadius: "16px", background: "#161616", border: "1px solid rgba(255,255,255,.07)", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "8px" }}>
                <MapPin size={30} color="rgba(255,59,48,.5)" />
                <div style={{ color: "rgba(255,255,255,.3)", fontSize: "13px" }}>Interactive Map</div>
                <div style={{ color: "rgba(255,255,255,.2)", fontSize: "11px" }}>123 Power Street, New York</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ NEWSLETTER */}
      <section className="sec-pad" style={{ padding: "120px 60px", position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "url('https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1920&h=700&fit=crop&auto=format')",
          backgroundSize: "cover", backgroundPosition: "center 40%",
        }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(13,13,13,.9)" }} />
        <div style={{ position: "relative", maxWidth: "580px", margin: "0 auto", textAlign: "center" }}>
          <div className="sec-tag fz">Newsletter</div>
          <h2 className="sec-h2 fz" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: "46px", letterSpacing: "-1px", marginBottom: "14px" }}>
            Get Weekly <span className="grad-text">Fitness Tips</span>
          </h2>
          <p className="fz" style={{ color: "rgba(255,255,255,.5)", marginBottom: "38px", lineHeight: 1.75, fontSize: "15px" }}>
            Join 5,000+ members receiving expert training advice, nutrition guides, and exclusive member offers every week.
          </p>
          <div className="newsletter-form fz" style={{ display: "flex", gap: "12px", maxWidth: "480px", margin: "0 auto" }}>
            <input type="email" placeholder="Enter your email address" style={{
              flex: 1, padding: "15px 20px",
              background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.14)",
              borderRadius: "50px", color: "#fff", fontSize: "15px", fontFamily: "'Inter', sans-serif",
            }} />
            <button className="red-btn" style={{ whiteSpace: "nowrap" }}>Subscribe</button>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ FOOTER */}
      <footer style={{ padding: "80px 60px 40px", borderTop: "1px solid rgba(255,255,255,.05)" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
          <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1.5fr", gap: "56px", marginBottom: "60px" }}>
            {/* Brand */}
            <div>
              <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 900, fontSize: "26px", marginBottom: "14px" }}>
                <span style={{ color: "#FF3B30" }}>FIT</span>ZONE
                <span style={{ color: "rgba(255,255,255,.3)", fontSize: "10px", marginLeft: "6px", fontWeight: 500, letterSpacing: "2px" }}>GYM</span>
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
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "#FF3B30"; el.style.borderColor = "#FF3B30"; }}
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
                    onMouseEnter={e => (e.target as HTMLElement).style.color = "#FF3B30"}
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
                    onMouseEnter={e => (e.target as HTMLElement).style.color = "#FF3B30"}
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
                  { Icon: Mail, text: "info@fitzonegym.com" },
                  { Icon: Clock, text: "Open 24/7 — Every Day" },
                ].map(({ Icon, text }) => (
                  <div key={text} style={{ display: "flex", gap: "10px", color: "rgba(255,255,255,.45)", fontSize: "13.5px", alignItems: "flex-start" }}>
                    <Icon size={15} color="#FF3B30" style={{ flexShrink: 0, marginTop: "2px" }} />
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,.05)", paddingTop: "28px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "14px" }}>
            <div style={{ color: "rgba(255,255,255,.28)", fontSize: "13px" }}>© 2026 FITZONE GYM. All rights reserved.</div>
            <div style={{ display: "flex", gap: "22px" }}>
              {["Privacy Policy", "Terms & Conditions", "Cookie Policy"].map(l => (
                <a key={l} href="#" style={{ color: "rgba(255,255,255,.28)", fontSize: "13px", textDecoration: "none", transition: "color .2s" }}
                  onMouseEnter={e => (e.target as HTMLElement).style.color = "#FF3B30"}
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
