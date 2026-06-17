"use client";

import { useState, useEffect, useRef } from "react";
import {
  Menu, X, Lock, ArrowRight, MapPin, Sun, Shirt, Droplets,
  AlertTriangle, CreditCard, Clock, Coins, Car, ChevronRight,
  Plane, Map, Wallet, Camera, MessageCircle, Shield, Phone, Mail,
  Luggage, Plug, Wifi, FileText, DollarSign, Stamp, Heart, Info,
} from "lucide-react";

// ============================================================
// DATOS DEL VIAJE
// ============================================================
const viaje = {
  titulo: "Navidad y Año Nuevo",
  subtitulo: "en Argentina",
  fechas: "23 dic 2025 — 7 ene 2026",
  destinos: ["Buenos Aires", "Escobar"],
  fotos: {
    // Reemplazar con fotos propias de Argentina
    hero:    "/hero-home.webp",
    intro:   "/intro-home.webp",
    strip: [
      { src: "/strip-1.webp", pos: "center 55%" },
      { src: "/strip-2.webp", pos: "center 40%" },
      { src: "/strip-3.webp", pos: "center 30%" },
    ],
  },
  introduccion: {
    texto1: "Este viaje fue pensado para disfrutar juntos, sin apuros y con espacio para el descanso.",
    texto2: "El itinerario combina cultura, naturaleza y experiencias compartidas, respetando los ritmos del grupo.",
    texto3: "Aquí encontrarán el calendario general, las actividades destacadas e información práctica para viajar con tranquilidad desde el primer día.",
  },
  clima: {
    resumen: "Verano austral",
    temperatura: "25°C — 37°C",
    tips: [
      { icono: "shirt",    texto: "Ropa liviana y transpirable" },
      { icono: "droplets", texto: "Protector solar FPS 50+" },
      { icono: "alert",    texto: "Evitar sol directo entre 13:00 y 16:00 hs" },
      { icono: "droplets", texto: "Llevar botella de agua reutilizable" },
    ],
  },
  notas: [
    { icono: "card",  titulo: "Pagos",      texto: "Se aceptan tarjetas en la mayoría de comercios. En ferias y mercados conviene llevar efectivo." },
    { icono: "clock", titulo: "Horarios",   texto: "Almuerzos entre 13:00 y 15:00. Cenas a partir de las 20:30 hs." },
    { icono: "coins", titulo: "Propinas",   texto: "No están incluidas. En restaurantes se suele dejar entre 10% y 15%." },
    { icono: "car",   titulo: "Transporte",      texto: "Se utilizará vehículo rentado como medio principal durante todo el viaje." },
    { icono: "info",  titulo: "Durante el viaje", texto: "No todas las actividades son obligatorias. El descanso también forma parte del itinerario. Se priorizan salidas tranquilas con márgenes de tiempo." },
  ],
  nav: [
    { label: "Vuelos e Itinerario", href: "/viaje",            privado: true,  icono: "plane"   },
    { label: "Lugares",             href: "/lugares",           privado: false, icono: "map"     },
    { label: "Neurodiversidad",     href: "/neurodiversidad",   privado: false, icono: "heart"   },
    { label: "Presupuesto",         href: "/presupuesto",       privado: false, icono: "wallet"  },
    { label: "Galería",             href: "/galeria",           privado: false, icono: "camera"  },
    { label: "Notas Finales",       href: "/notas-finales",     privado: false, icono: "file"    },
  ],
  organizador: {
    nombre: "Jazmín Tiburcio",
    rol: "Organizadora del viaje",
    wa: "5491165370820",
  },
  embajadas: [
    {
      pais: "us",
      nombre: "Embajada de EE.UU. en Argentina",
      direccion: "Av. Colombia 4300, Buenos Aires",
      tel: "+54 11 5777-4354",
      email: "BuenosAirespublicaffairs@state.gov",
      nota: "Línea de emergencia exclusiva para ciudadanos estadounidenses",
    },
    {
      pais: "do",
      nombre: "Embajada de RD en Argentina",
      direccion: "Av. Santa Fe 911, Piso 6, Buenos Aires",
      tel: "+54 11 4312-9378",
      email: "embadomargentina@mirex.gob.do",
      nota: "Lunes a viernes · 9:00 am – 5:00 pm",
    },
  ],
};

// ============================================================
// TEMA
// ============================================================
const t = {
  bg:          "#F7F3EE",
  bgCard:      "#EDE8E1",
  bgDark:      "#2D1F3A",
  bgDeep:      "#1E1228",
  text:        "#1A1018",
  textMuted:   "#6B5E78",
  accent:      "#3D2645",
  accentLight: "#C9B8D4",
  gold:        "#C9A84C",
  border:      "#D4C9DC",
  alert:       "#9B2335",
  green:       "#25D366",
  fontDisplay: "'Playfair Display', Georgia, serif",
  fontBody:    "'Cormorant Garamond', 'Times New Roman', serif",
  fontUI:      "'DM Sans', sans-serif",
};

// ============================================================
// CSS GLOBAL — micro-interacciones y responsivo
// ============================================================
const CSS = `
  *, *::before, *::after { box-sizing: border-box; }
  body { margin: 0; }

  .nav-desktop-link {
    position: relative;
    transition: color 0.2s, opacity 0.2s;
    opacity: 0.75;
  }
  .nav-desktop-link::after {
    content: '';
    position: absolute;
    bottom: -3px; left: 0; right: 100%;
    height: 1px;
    background: ${t.accent};
    transition: right 0.25s ease;
  }
  .nav-desktop-link:hover { opacity: 1; }
  .nav-desktop-link:hover::after { right: 0; }

  .nav-mobile-link { transition: transform 0.2s ease; }
  .nav-mobile-link:hover { transform: translateX(6px); }

  .card-nav {
    transition: transform 0.25s ease, background 0.25s ease, box-shadow 0.25s ease;
  }
  .card-nav:hover {
    transform: translateY(-3px);
    box-shadow: 0 14px 40px rgba(30,18,40,0.18);
  }

  .btn-cta {
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  .btn-cta:hover {
    transform: scale(1.04);
    box-shadow: 0 8px 28px rgba(201,184,212,0.45);
  }

  .foto-strip-item {
    transition: transform 0.4s ease, opacity 0.4s ease;
    overflow: hidden;
  }
  .foto-strip-item:hover .foto-strip-inner {
    transform: scale(1.06);
  }
  .foto-strip-inner {
    transition: transform 0.4s ease;
    width: 100%; height: 100%;
    background-size: cover;
    background-position: center;
  }

  .nota-card {
    transition: background 0.2s ease, transform 0.2s ease;
  }
  .nota-card:hover {
    background: ${t.bgCard} !important;
    transform: translateX(4px);
  }

  .embajada-btn {
    transition: background 0.2s ease, border-color 0.2s ease, transform 0.15s ease;
  }
  .embajada-btn:hover {
    background: rgba(255,255,255,0.08) !important;
    transform: translateX(3px);
  }

  .fade-up {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.65s ease, transform 0.65s ease;
  }
  .fade-up.visible {
    opacity: 1;
    transform: translateY(0);
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .hero-text-1 { animation: fadeIn 0.8s ease 0.1s both; }
  .hero-text-2 { animation: fadeIn 0.8s ease 0.3s both; }
  .hero-text-3 { animation: fadeIn 0.8s ease 0.5s both; }
  .hero-text-4 { animation: fadeIn 0.8s ease 0.7s both; }
`;

// ============================================================
// HOOKS
// ============================================================
function useBreakpoint() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isDesktop;
}

function useBgImage(src) {
  const [url, setUrl] = useState(null);
  useEffect(() => {
    if (!src) return;
    const img = new window.Image();
    img.onload  = () => setUrl(src);
    img.onerror = () => setUrl(null);
    img.src = src;
  }, [src]);
  return url;
}

function useFadeUp(ref, dep) {
  useEffect(() => {
    if (!ref.current) return;
    const els = ref.current.querySelectorAll(".fade-up");
    if (!els.length) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.08 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [dep]);
}

// ============================================================
// ICON RESOLVER
// ============================================================
function Icon({ name, size = 22, color, strokeWidth = 1.2 }) {
  const c = color || t.accent;
  const p = { size, color: c, strokeWidth, style: { flexShrink: 0 } };
  const icons = {
    menu:     <Menu          {...p} />,
    x:        <X             {...p} />,
    lock:     <Lock          {...p} />,
    arrow:    <ArrowRight    {...p} />,
    pin:      <MapPin        {...p} />,
    sun:      <Sun           {...p} />,
    shirt:    <Shirt         {...p} />,
    droplets: <Droplets      {...p} />,
    alert:    <AlertTriangle {...p} color={t.alert} />,
    card:     <CreditCard    {...p} />,
    clock:    <Clock         {...p} />,
    coins:    <Coins         {...p} />,
    car:      <Car           {...p} />,
    chevron:  <ChevronRight  {...p} />,
    plane:    <Plane         {...p} />,
    map:      <Map           {...p} />,
    wallet:   <Wallet        {...p} />,
    camera:   <Camera        {...p} />,
    file:     <FileText      {...p} />,
    heart:    <Heart         {...p} />,
    info:     <Info          {...p} />,
    whatsapp: <MessageCircle {...p} />,
    shield:   <Shield        {...p} />,
    phone:    <Phone         {...p} />,
    mail:     <Mail          {...p} />,
  };
  return icons[name] || null;
}

function SectionLabel({ children, light = false }) {
  return (
    <p style={{
      fontFamily: t.fontUI, fontSize: "11px",
      letterSpacing: "0.22em", textTransform: "uppercase",
      color: light ? "rgba(201,184,212,0.55)" : t.accent,
      margin: "0 0 24px", fontWeight: 600,
    }}>
      {children}
    </p>
  );
}

// ============================================================
// NAVBAR
// ============================================================
function NavBar({ isDesktop }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (isDesktop) return;
    if (!open) { document.body.style.overflow = ""; return; }
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, isDesktop]);

  if (isDesktop) {
    return (
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(247,243,238,0.96)" : "rgba(247,243,238,0.85)",
        backdropFilter: "blur(18px)",
        borderBottom: `1px solid ${scrolled ? t.border : "transparent"}`,
        transition: "background 0.3s, border-color 0.3s",
      }}>
        <div style={{
          maxWidth: "1200px", margin: "0 auto",
          padding: "0 48px", height: "68px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <span style={{ fontFamily: t.fontDisplay, fontSize: "13px", letterSpacing: "0.18em", textTransform: "uppercase", color: t.accent, fontWeight: 400 }}>
            {viaje.titulo}
          </span>
          <div style={{ display: "flex", gap: "36px", alignItems: "center" }}>
            {viaje.nav.map((item, i) => (
              <a key={i} href={item.href} className="nav-desktop-link" style={{
                display: "inline-flex", alignItems: "center", gap: "7px",
                fontFamily: t.fontUI, fontSize: "11px",
                letterSpacing: "0.14em", textTransform: "uppercase",
                color: t.accent, textDecoration: "none", fontWeight: 500,
              }}>
                {item.label}
                {item.privado && <Icon name="lock" size={11} color={t.gold} strokeWidth={1.4} />}
              </a>
            ))}
          </div>
        </div>
      </nav>
    );
  }

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: open ? t.bgDark : "rgba(247,243,238,0.94)",
        backdropFilter: "blur(14px)",
        borderBottom: `1px solid ${open ? "transparent" : t.border}`,
        transition: "background 0.3s ease",
      }}>
        <div style={{ maxWidth: "480px", margin: "0 auto", padding: "0 20px", height: "58px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontFamily: t.fontDisplay, fontSize: "12px", letterSpacing: "0.15em", textTransform: "uppercase", color: open ? "#F7F3EE" : t.accent, fontWeight: 400 }}>
            {viaje.titulo}
          </span>
          <button onClick={() => setOpen(!open)} style={{ background: "none", border: "none", cursor: "pointer", padding: "8px", lineHeight: 0 }}>
            {open ? <Icon name="x" size={22} color="#F7F3EE" /> : <Icon name="menu" size={22} color={t.accent} />}
          </button>
        </div>
      </nav>
      {open && (
        <div style={{ position: "fixed", top: "58px", left: 0, right: 0, bottom: 0, background: t.bgDark, overflowY: "auto", zIndex: 100, padding: "16px 24px 44px" }}>
          {viaje.nav.map((item, i) => (
            <a key={i} href={item.href} className="nav-mobile-link" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 0", borderBottom: "1px solid rgba(255,255,255,0.07)", textDecoration: "none" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <Icon name={item.icono} size={18} color="rgba(201,184,212,0.55)" strokeWidth={1.2} />
                <span style={{ fontFamily: t.fontDisplay, fontSize: "22px", color: "#F7F3EE", fontWeight: 400 }}>{item.label}</span>
              </div>
              {item.privado
                ? <Icon name="lock" size={17} color={t.gold} strokeWidth={1.3} />
                : <Icon name="chevron" size={17} color="rgba(201,184,212,0.3)" strokeWidth={1.3} />
              }
            </a>
          ))}
        </div>
      )}
    </>
  );
}

// ============================================================
// HERO
// ============================================================
function Hero({ isDesktop }) {
  const heroUrl = useBgImage(viaje.fotos.hero);

  return (
    <section style={{ position: "relative", height: isDesktop ? "100svh" : "75svh", minHeight: isDesktop ? "700px" : "500px", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${t.bgDark} 0%, #4A2D5E 100%)` }} />
      {heroUrl && (
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `url(${heroUrl})`,
          backgroundSize: "cover", backgroundPosition: "center 30%",
          opacity: 0.5, transition: "opacity 1s ease",
        }} />
      )}
      <div style={{
        position: "absolute", inset: 0,
        background: isDesktop
          ? "linear-gradient(to right, rgba(30,18,40,0.92) 0%, rgba(30,18,40,0.55) 55%, rgba(30,18,40,0.15) 100%)"
          : "linear-gradient(to bottom, rgba(30,18,40,0.1) 0%, rgba(30,18,40,0.35) 45%, rgba(30,18,40,0.97) 100%)",
      }} />

      {/* Contenido hero desktop */}
      {isDesktop ? (
        <div style={{ position: "absolute", inset: 0, maxWidth: "1200px", margin: "0 auto", padding: "0 80px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div className="hero-text-1" style={{ display: "flex", gap: "10px", marginBottom: "28px" }}>
            {viaje.destinos.map((d, i) => (
              <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontFamily: t.fontUI, fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: t.accentLight, border: "1px solid rgba(201,184,212,0.3)", padding: "6px 14px", borderRadius: "20px" }}>
                <Icon name="pin" size={10} color={t.accentLight} strokeWidth={1.5} />
                {d}
              </span>
            ))}
          </div>
          <h1 className="hero-text-2" style={{ fontFamily: t.fontDisplay, fontSize: "clamp(52px, 6vw, 88px)", fontWeight: 400, color: "#F7F3EE", lineHeight: 1.02, margin: "0 0 4px", maxWidth: "640px" }}>
            {viaje.titulo}
          </h1>
          <h2 className="hero-text-3" style={{ fontFamily: t.fontDisplay, fontSize: "clamp(52px, 6vw, 88px)", fontWeight: 400, fontStyle: "italic", color: t.accentLight, lineHeight: 1.02, margin: "0 0 28px", maxWidth: "640px" }}>
            {viaje.subtitulo}
          </h2>
          <p className="hero-text-3" style={{ fontFamily: t.fontUI, fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(247,243,238,0.45)", margin: "0 0 44px" }}>
            {viaje.fechas}
          </p>
          <div className="hero-text-4" style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <a href="/viaje" className="btn-cta" style={{ display: "inline-flex", alignItems: "center", gap: "10px", background: t.accentLight, color: t.bgDark, fontFamily: t.fontUI, fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", textDecoration: "none", padding: "16px 32px", borderRadius: "40px", fontWeight: 600 }}>
              Ver itinerario
              <Icon name="arrow" size={15} color={t.bgDark} strokeWidth={1.5} />
            </a>
            <a href="/lugares" style={{ fontFamily: t.fontUI, fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(247,243,238,0.55)", textDecoration: "none", transition: "color 0.2s" }}>
              Explorar lugares
            </a>
          </div>
        </div>
      ) : (
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0 24px 48px", maxWidth: "480px", margin: "0 auto" }}>
          <div className="hero-text-1" style={{ display: "flex", gap: "8px", marginBottom: "22px", flexWrap: "wrap" }}>
            {viaje.destinos.map((d, i) => (
              <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontFamily: t.fontUI, fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: t.accentLight, border: "1px solid rgba(201,184,212,0.3)", padding: "5px 13px", borderRadius: "20px" }}>
                <Icon name="pin" size={10} color={t.accentLight} strokeWidth={1.5} />
                {d}
              </span>
            ))}
          </div>
          <h1 className="hero-text-2" style={{ fontFamily: t.fontDisplay, fontSize: "clamp(40px, 11vw, 56px)", fontWeight: 400, color: "#F7F3EE", lineHeight: 1.05, margin: "0 0 6px" }}>
            {viaje.titulo}
          </h1>
          <h2 className="hero-text-3" style={{ fontFamily: t.fontDisplay, fontSize: "clamp(40px, 11vw, 56px)", fontWeight: 400, fontStyle: "italic", color: t.accentLight, lineHeight: 1.05, margin: "0 0 22px" }}>
            {viaje.subtitulo}
          </h2>
          <p className="hero-text-3" style={{ fontFamily: t.fontUI, fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(247,243,238,0.5)", margin: "0 0 38px" }}>
            {viaje.fechas}
          </p>
          <a href="/viaje" className="btn-cta" style={{ display: "inline-flex", alignItems: "center", gap: "10px", background: t.accentLight, color: t.bgDark, fontFamily: t.fontUI, fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", textDecoration: "none", padding: "16px 28px", borderRadius: "40px", fontWeight: 500 }}>
            Ver itinerario
            <Icon name="arrow" size={15} color={t.bgDark} strokeWidth={1.5} />
          </a>
        </div>
      )}
    </section>
  );
}

// ============================================================
// INTRODUCCIÓN
// ============================================================
function Introduccion({ isDesktop }) {
  const ref = useRef(null);
  useFadeUp(ref, isDesktop);
  const introUrl = useBgImage(viaje.fotos.intro);

  if (isDesktop) {
    return (
      <section ref={ref} style={{ background: t.bg, padding: "96px 0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 80px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>
          <div className="fade-up">
            <SectionLabel>Sobre este viaje</SectionLabel>
            <div style={{ width: "40px", height: "1px", background: t.accent, marginBottom: "36px" }} />
            <p style={{ fontFamily: t.fontBody, fontSize: "26px", lineHeight: 1.65, color: t.text, margin: "0 0 20px", fontWeight: 400 }}>
              {viaje.introduccion.texto1}
            </p>
            <p style={{ fontFamily: t.fontBody, fontSize: "20px", lineHeight: 1.7, color: t.textMuted, margin: "0 0 20px" }}>
              {viaje.introduccion.texto2}
            </p>
            <p style={{ fontFamily: t.fontBody, fontSize: "20px", lineHeight: 1.7, color: t.textMuted, margin: 0 }}>
              {viaje.introduccion.texto3}
            </p>
          </div>
          <div className="fade-up" style={{ transitionDelay: "0.15s" }}>
            <div style={{ position: "relative", height: "460px", borderRadius: "4px", overflow: "hidden", background: `linear-gradient(135deg, ${t.bgDark} 0%, #4A2D5E 100%)` }}>
              {introUrl && (
                <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${introUrl})`, backgroundSize: "cover", backgroundPosition: "center", opacity: 0.75, transition: "transform 0.6s ease" }} />
              )}
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(30,18,40,0.4), transparent)" }} />
              <div style={{ position: "absolute", bottom: "24px", left: "24px" }}>
                <p style={{ fontFamily: t.fontUI, fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(247,243,238,0.6)", margin: 0 }}>
                  Buenos Aires · Argentina
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} style={{ background: t.bg, padding: "64px 24px", maxWidth: "480px", margin: "0 auto" }}>
      <div className="fade-up">
        <SectionLabel>Sobre este viaje</SectionLabel>
        <div style={{ width: "36px", height: "1px", background: t.accent, marginBottom: "32px" }} />
        <p style={{ fontFamily: t.fontBody, fontSize: "23px", lineHeight: 1.65, color: t.text, margin: "0 0 18px", fontWeight: 400 }}>
          {viaje.introduccion.texto1}
        </p>
        <p style={{ fontFamily: t.fontBody, fontSize: "19px", lineHeight: 1.7, color: t.textMuted, margin: "0 0 18px" }}>
          {viaje.introduccion.texto2}
        </p>
        <p style={{ fontFamily: t.fontBody, fontSize: "19px", lineHeight: 1.7, color: t.textMuted, margin: 0 }}>
          {viaje.introduccion.texto3}
        </p>
      </div>
    </section>
  );
}

// ============================================================
// NAVEGACIÓN
// ============================================================
function Navegacion({ isDesktop }) {
  const ref = useRef(null);
  useFadeUp(ref, isDesktop);

  if (isDesktop) {
    return (
      <section ref={ref} style={{ background: t.bgDark, padding: "80px 0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 80px" }}>
          <div className="fade-up" style={{ marginBottom: "48px" }}>
            <SectionLabel light>Secciones del viaje</SectionLabel>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
            {viaje.nav.map((item, i) => (
              <a key={i} href={item.href} className="card-nav fade-up" style={{
                display: "flex", flexDirection: "column", justifyContent: "space-between",
                padding: "28px 24px 24px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "8px", textDecoration: "none",
                minHeight: "160px", transitionDelay: `${i * 0.08}s`,
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <Icon name={item.icono} size={22} color="rgba(201,184,212,0.6)" strokeWidth={1.2} />
                  {item.privado
                    ? <Icon name="lock" size={15} color={t.gold} strokeWidth={1.3} />
                    : <Icon name="chevron" size={15} color="rgba(201,184,212,0.25)" strokeWidth={1.3} />
                  }
                </div>
                <div>
                  <span style={{ fontFamily: t.fontUI, fontSize: "9px", color: "rgba(247,243,238,0.2)", letterSpacing: "0.1em", display: "block", marginBottom: "8px" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span style={{ fontFamily: t.fontDisplay, fontSize: "20px", color: "#F7F3EE", fontWeight: 400, lineHeight: 1.2, display: "block" }}>
                    {item.label}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} style={{ background: t.bgDark, padding: "48px 24px", maxWidth: "480px", margin: "0 auto" }}>
      <div className="fade-up">
        <SectionLabel light>Secciones del viaje</SectionLabel>
      </div>
      {viaje.nav.map((item, i) => (
        <a key={i} href={item.href} className="nav-mobile-link fade-up" style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "20px 0", borderBottom: "1px solid rgba(255,255,255,0.07)",
          textDecoration: "none", transitionDelay: `${i * 0.08}s`,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <span style={{ fontFamily: t.fontUI, fontSize: "10px", color: "rgba(247,243,238,0.2)", minWidth: "22px" }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <Icon name={item.icono} size={19} color="rgba(201,184,212,0.5)" strokeWidth={1.2} />
            <span style={{ fontFamily: t.fontDisplay, fontSize: "21px", color: "#F7F3EE", fontWeight: 400 }}>
              {item.label}
            </span>
          </div>
          {item.privado
            ? <Icon name="lock" size={17} color={t.gold} strokeWidth={1.3} />
            : <Icon name="chevron" size={17} color="rgba(201,184,212,0.3)" strokeWidth={1.3} />
          }
        </a>
      ))}
    </section>
  );
}

// ============================================================
// FOTO STRIP
// ============================================================
function useBgImages(items) {
  const srcs = items.map(item => typeof item === "string" ? item : item.src);
  const [urls, setUrls] = useState(srcs.map(() => null));
  useEffect(() => {
    srcs.forEach((src, i) => {
      const img = new window.Image();
      img.onload  = () => setUrls(prev => { const n = [...prev]; n[i] = src; return n; });
      img.onerror = () => {};
      img.src = src;
    });
  }, []);
  return urls;
}

function FotoStrip({ isDesktop }) {
  const urls = useBgImages(viaje.fotos.strip);

  if (isDesktop) {
    return (
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "3px" }}>
        {viaje.fotos.strip.map((item, i) => (
          <div key={i} className="foto-strip-item" style={{ position: "relative", background: `linear-gradient(135deg, ${t.bgDark}, #4A2D5E)`, aspectRatio: "3/4", overflow: "hidden" }}>
            {urls[i] && (
              <div className="foto-strip-inner" style={{ backgroundImage: `url(${urls[i]})`, backgroundSize: "cover", backgroundPosition: item.pos || "center", opacity: 0.9 }} />
            )}
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(30,18,40,0.35), transparent 60%)" }} />
          </div>
        ))}
      </div>
    );
  }

  const url = urls[0];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2px" }}>
      {viaje.fotos.strip.map((item, i) => (
        <div key={i} style={{ position: "relative", background: `linear-gradient(135deg, ${t.bgDark}, #4A2D5E)`, aspectRatio: "3/4", overflow: "hidden" }}>
          {urls[i] && (
            <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${urls[i]})`, backgroundSize: "cover", backgroundPosition: item.pos || "center", opacity: 0.85 }} />
          )}
        </div>
      ))}
    </div>
  );
}

// ============================================================
// CLIMA
// ============================================================
function Clima({ isDesktop }) {
  const ref = useRef(null);
  useFadeUp(ref, isDesktop);

  return (
    <section ref={ref} style={{ background: t.bgCard, padding: isDesktop ? "80px 0" : "64px 24px" }}>
      <div style={{ maxWidth: isDesktop ? "1200px" : "480px", margin: "0 auto", padding: isDesktop ? "0 80px" : "0" }}>
        <div className="fade-up">
          <SectionLabel>Clima y vestimenta</SectionLabel>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "16px", marginBottom: "8px" }}>
            <Icon name="sun" size={34} color={t.accent} strokeWidth={1} />
            <div>
              <h2 style={{ fontFamily: t.fontDisplay, fontSize: "30px", fontWeight: 400, color: t.accent, margin: "0 0 4px", lineHeight: 1.1 }}>
                {viaje.clima.resumen}
              </h2>
              <p style={{ fontFamily: t.fontUI, fontSize: "14px", color: t.accent, margin: 0, opacity: 0.65 }}>
                {viaje.clima.temperatura}
              </p>
            </div>
          </div>
          <div style={{ width: "36px", height: "1px", background: t.border, margin: "28px 0" }} />
          <div style={{ display: "grid", gridTemplateColumns: isDesktop ? "repeat(2, 1fr)" : "1fr", gap: isDesktop ? "20px" : "16px" }}>
            {viaje.clima.tips.map((tip, i) => (
              <div key={i} className="fade-up" style={{ display: "flex", alignItems: "flex-start", gap: "14px", transitionDelay: `${i * 0.1}s` }}>
                <Icon name={tip.icono} size={20} color={tip.icono === "alert" ? t.alert : t.accent} strokeWidth={1.3} />
                <p style={{ fontFamily: t.fontBody, fontSize: "19px", color: tip.icono === "alert" ? t.alert : t.text, margin: 0, lineHeight: 1.55, fontWeight: tip.icono === "alert" ? 500 : 400 }}>
                  {tip.texto}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// NOTAS PRÁCTICAS
// ============================================================
function Notas({ isDesktop }) {
  const ref = useRef(null);
  useFadeUp(ref, isDesktop);

  return (
    <section ref={ref} style={{ background: t.bg, padding: isDesktop ? "80px 0" : "64px 24px" }}>
      <div style={{ maxWidth: isDesktop ? "1200px" : "480px", margin: "0 auto", padding: isDesktop ? "0 80px" : "0" }}>
        <div className="fade-up">
          <SectionLabel>Notas prácticas</SectionLabel>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: isDesktop ? "repeat(2, 1fr)" : "1fr", gap: isDesktop ? "0 48px" : "0" }}>
          {viaje.notas.map((nota, i) => (
            <div key={i} className="nota-card fade-up" style={{
              display: "flex", alignItems: "flex-start", gap: "16px",
              padding: "24px 16px 24px 0",
              borderBottom: `1px solid ${t.border}`,
              transitionDelay: `${i * 0.08}s`,
            }}>
              <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: t.bgCard, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                <Icon name={nota.icono} size={20} color={t.accent} strokeWidth={1.2} />
              </div>
              <div>
                <p style={{ fontFamily: t.fontUI, fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: t.accent, margin: "0 0 6px", fontWeight: 600 }}>
                  {nota.titulo}
                </p>
                <p style={{ fontFamily: t.fontBody, fontSize: "18px", color: t.text, margin: 0, lineHeight: 1.65 }}>
                  {nota.texto}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// ANTES DE PARTIR
// ============================================================
const MALETA = [
  { icono: Shirt,         texto: "Ropa liviana de algodón o lino" },
  { icono: Droplets,      texto: "Protector solar FPS 50+ y repelente" },
  { icono: Droplets,      texto: "Botella de agua reutilizable" },
  { icono: Shirt,         texto: "Prenda liviana extra (lugares con AC)" },
  { icono: Sun,           texto: "Gafas de sol y sombrero" },
  { icono: Car,           texto: "Calzado cómodo para caminar" },
  { icono: AlertTriangle, texto: "Medicación personal y analgésicos" },
];

const MANO = [
  { icono: FileText,   texto: "Pasaporte vigente (mín. 6 meses)" },
  { icono: FileText,   texto: "Documentos del viaje impresos o en teléfono" },
  { icono: CreditCard, texto: "Tarjetas de crédito / débito" },
  { icono: DollarSign, texto: "Efectivo en USD para gastos iniciales" },
  { icono: Phone,      texto: "Teléfono cargado con datos móviles" },
  { icono: Plug,       texto: "Adaptador Tipo I (tres pines en Y)" },
  { icono: FileText,   texto: "Recetas médicas si aplica" },
];

const INFO_LLEGADA = [
  {
    icono: Stamp,
    titulo: "Trámites en Ezeiza (EZE)",
    items: [
      "Control de pasaportes: presentar pasaporte + responder preguntas de duración y motivo del viaje.",
      "Retiro de equipaje: identificar maletas en cinta transportadora.",
      "Aduana: declarar artículos específicos si aplica. El proceso es rápido sin productos restringidos.",
    ],
  },
  {
    icono: DollarSign,
    titulo: "Divisas y pagos",
    items: [
      "Casas de cambio y ATM disponibles en el aeropuerto.",
      "Se recomienda llevar algo de efectivo en USD para gastos iniciales.",
      "Tarjetas aceptadas en la mayoría de comercios de Buenos Aires.",
    ],
  },
  {
    icono: Wifi,
    titulo: "Conectividad",
    items: [
      "Wi-Fi gratuito disponible en el aeropuerto de Ezeiza.",
      "SIM local disponible en el aeropuerto para datos móviles durante el viaje.",
      "Cobertura 4G/LTE en Buenos Aires y zona de Escobar.",
    ],
  },
  {
    icono: Plug,
    titulo: "Enchufe · Tipo I",
    items: [
      "Argentina usa enchufes Tipo I — tres pines planos en forma de Y.",
      "Diferente al estándar de EE.UU. (Tipo A/B) y República Dominicana.",
      "Llevar adaptador universal o comprar uno en el aeropuerto.",
    ],
  },
];

function AntesDePartir({ isDesktop }) {
  const ref = useRef(null);
  useFadeUp(ref, isDesktop);

  return (
    <section ref={ref} style={{ background: t.bgDark, padding: isDesktop ? "96px 0" : "64px 24px" }}>
      <div style={{ maxWidth: isDesktop ? "1200px" : "480px", margin: "0 auto", padding: isDesktop ? "0 80px" : "0" }}>

        <div className="fade-up" style={{ marginBottom: "52px" }}>
          <SectionLabel light>Antes de partir</SectionLabel>
          <h2 style={{ fontFamily: t.fontDisplay, fontSize: isDesktop ? "44px" : "30px", color: "#F7F3EE", margin: 0, fontWeight: 400, lineHeight: 1.15 }}>
            Todo listo para el viaje
          </h2>
        </div>

        {/* Checklists maleta + mano */}
        <div className="fade-up" style={{ display: "grid", gridTemplateColumns: isDesktop ? "1fr 1fr" : "1fr", gap: "20px", marginBottom: "48px" }}>
          {/* Maleta */}
          <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(201,184,212,0.1)", borderRadius: "12px", overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "18px 20px", borderBottom: "1px solid rgba(201,184,212,0.08)" }}>
              <Luggage size={16} color={t.accentLight} strokeWidth={1.4} />
              <span style={{ fontFamily: t.fontUI, fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: t.accentLight, fontWeight: 700 }}>Maleta</span>
            </div>
            <div style={{ padding: "8px 0" }}>
              {MALETA.map((item, i) => {
                const IconC = item.icono;
                return (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "11px 20px", borderBottom: i < MALETA.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                    <IconC size={13} color="rgba(201,184,212,0.4)" strokeWidth={1.4} style={{ flexShrink: 0 }} />
                    <span style={{ fontFamily: t.fontBody, fontSize: "17px", color: "rgba(247,243,238,0.6)", lineHeight: 1.4 }}>{item.texto}</span>
                  </div>
                );
              })}
            </div>
          </div>
          {/* Equipaje de mano */}
          <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(201,184,212,0.1)", borderRadius: "12px", overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "18px 20px", borderBottom: "1px solid rgba(201,184,212,0.08)" }}>
              <Wallet size={16} color={t.gold} strokeWidth={1.4} />
              <span style={{ fontFamily: t.fontUI, fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: t.gold, fontWeight: 700 }}>Equipaje de mano</span>
            </div>
            <div style={{ padding: "8px 0" }}>
              {MANO.map((item, i) => {
                const IconC = item.icono;
                return (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "11px 20px", borderBottom: i < MANO.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                    <IconC size={13} color="rgba(201,168,76,0.4)" strokeWidth={1.4} style={{ flexShrink: 0 }} />
                    <span style={{ fontFamily: t.fontBody, fontSize: "17px", color: "rgba(247,243,238,0.6)", lineHeight: 1.4 }}>{item.texto}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Info llegada */}
        <div style={{ display: "grid", gridTemplateColumns: isDesktop ? "repeat(2, 1fr)" : "1fr", gap: "16px" }}>
          {INFO_LLEGADA.map((card, i) => {
            const IconC = card.icono;
            return (
              <div key={i} className="fade-up" style={{
                background: "rgba(255,255,255,0.03)", border: "1px solid rgba(201,184,212,0.08)",
                borderRadius: "12px", padding: "20px", transitionDelay: `${i * 0.08}s`,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
                  <div style={{ width: "32px", height: "32px", borderRadius: "7px", background: "rgba(201,184,212,0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <IconC size={14} color={t.accentLight} strokeWidth={1.4} />
                  </div>
                  <span style={{ fontFamily: t.fontUI, fontSize: "11px", fontWeight: 700, color: "#F7F3EE", letterSpacing: "0.02em" }}>{card.titulo}</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
                  {card.items.map((item, j) => (
                    <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                      <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "rgba(201,184,212,0.3)", flexShrink: 0, marginTop: "8px" }} />
                      <span style={{ fontFamily: t.fontBody, fontSize: "16px", color: "rgba(201,184,212,0.5)", lineHeight: 1.5 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// FOOTER
// ============================================================
function Footer({ isDesktop }) {
  const ref = useRef(null);
  useFadeUp(ref, isDesktop);
  const { nombre, rol, wa } = viaje.organizador;
  const waUrl = `https://wa.me/${wa}?text=Hola%20${encodeURIComponent(nombre)}%2C%20tengo%20una%20consulta%20sobre%20el%20viaje.`;

  return (
    <footer ref={ref} style={{ background: t.bgDark }}>
      {/* Cierre poético */}
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", padding: "64px 24px 48px", textAlign: "center" }}>
        <div style={{ width: "1px", height: "52px", background: "rgba(201,184,212,0.18)", margin: "0 auto 36px" }} />
        <p className="fade-up" style={{ fontFamily: t.fontDisplay, fontSize: isDesktop ? "52px" : "34px", fontStyle: "italic", color: "#F7F3EE", margin: "0 0 8px", fontWeight: 400 }}>
          Buen viaje
        </p>
        <p className="fade-up" style={{ fontFamily: t.fontBody, fontSize: "20px", fontStyle: "italic", color: t.accentLight, margin: "0 0 16px", opacity: 0.8, transitionDelay: "0.1s" }}>
          {viaje.subtitulo}
        </p>
        <p className="fade-up" style={{ fontFamily: t.fontUI, fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(247,243,238,0.28)", margin: 0, transitionDelay: "0.2s" }}>
          {viaje.fechas}
        </p>
      </div>

      {/* Contacto + Embajadas */}
      <div style={{ maxWidth: isDesktop ? "1200px" : "480px", margin: "0 auto", padding: isDesktop ? "56px 80px 64px" : "0 24px 52px", display: isDesktop ? "grid" : "block", gridTemplateColumns: isDesktop ? "1fr 1fr" : undefined, gap: isDesktop ? "80px" : undefined }}>

        {/* WhatsApp */}
        <div style={{ paddingTop: isDesktop ? 0 : "36px", borderBottom: isDesktop ? "none" : "1px solid rgba(255,255,255,0.07)", paddingBottom: isDesktop ? 0 : "36px" }}>
          <div className="fade-up">
            <SectionLabel light>Contacto del viaje</SectionLabel>
            <p style={{ fontFamily: t.fontDisplay, fontSize: "22px", color: "#F7F3EE", margin: "0 0 2px", fontWeight: 400 }}>{nombre}</p>
            <p style={{ fontFamily: t.fontUI, fontSize: "11px", color: "rgba(201,184,212,0.45)", margin: "0 0 24px" }}>{rol}</p>
            <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn-cta" style={{ display: "flex", alignItems: "center", gap: "14px", padding: "18px 20px", background: "rgba(37,211,102,0.1)", border: "1px solid rgba(37,211,102,0.2)", borderRadius: "12px", textDecoration: "none" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "rgba(37,211,102,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name="whatsapp" size={19} color={t.green} strokeWidth={1.3} />
              </div>
              <div>
                <p style={{ fontFamily: t.fontUI, fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(37,211,102,0.55)", margin: "0 0 2px" }}>WhatsApp</p>
                <p style={{ fontFamily: t.fontUI, fontSize: "15px", color: "#F7F3EE", margin: 0 }}>Escribir al organizador</p>
              </div>
            </a>
          </div>
        </div>

        {/* Embajadas */}
        <div style={{ paddingTop: isDesktop ? 0 : "36px" }}>
          <div className="fade-up" style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
            <Icon name="shield" size={16} color={t.gold} strokeWidth={1.3} />
            <SectionLabel light>Contactos de emergencia</SectionLabel>
          </div>
          {viaje.embajadas.map((emb, i) => (
            <div key={i} className="fade-up" style={{ padding: "20px 0", borderBottom: i < viaje.embajadas.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none", transitionDelay: `${i * 0.1}s` }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                <img
                  src={`https://flagcdn.com/w40/${emb.pais}.png`}
                  srcSet={`https://flagcdn.com/w80/${emb.pais}.png 2x`}
                  width={30} height={20}
                  alt={emb.nombre}
                  style={{ borderRadius: "3px", objectFit: "cover", flexShrink: 0 }}
                />
                <div>
                  <p style={{ fontFamily: t.fontDisplay, fontSize: "16px", color: "#F7F3EE", margin: "0 0 2px", fontWeight: 400 }}>{emb.nombre}</p>
                  <p style={{ fontFamily: t.fontUI, fontSize: "10px", color: "rgba(201,184,212,0.4)", margin: 0 }}>{emb.direccion}</p>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
                <a href={`tel:${emb.tel.replace(/[\s-]/g, "")}`} className="embajada-btn" style={{ display: "flex", alignItems: "center", gap: "10px", padding: "11px 14px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "8px", textDecoration: "none" }}>
                  <Icon name="phone" size={14} color={t.accentLight} strokeWidth={1.3} />
                  <span style={{ fontFamily: t.fontUI, fontSize: "13px", color: t.accentLight }}>{emb.tel}</span>
                </a>
                <a href={`mailto:${emb.email}`} className="embajada-btn" style={{ display: "flex", alignItems: "center", gap: "10px", padding: "11px 14px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "8px", textDecoration: "none" }}>
                  <Icon name="mail" size={14} color={t.accentLight} strokeWidth={1.3} />
                  <span style={{ fontFamily: t.fontUI, fontSize: "12px", color: "rgba(201,184,212,0.55)", wordBreak: "break-all" }}>{emb.email}</span>
                </a>
              </div>
              <p style={{ fontFamily: t.fontUI, fontSize: "11px", color: "rgba(247,243,238,0.28)", margin: "10px 0 0", fontStyle: "italic" }}>{emb.nota}</p>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ============================================================
// ROOT
// ============================================================
export default function TravelHome() {
  const isDesktop = useBreakpoint();

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = CSS;
    document.head.appendChild(style);

    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=DM+Sans:wght@400;500;600&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  return (
    <div style={{ background: t.bg, minHeight: "100vh" }}>
      <NavBar isDesktop={isDesktop} />
      <div style={{ paddingTop: isDesktop ? "68px" : "58px" }}>
        <Hero isDesktop={isDesktop} />
        <Introduccion isDesktop={isDesktop} />
        <Navegacion isDesktop={isDesktop} />
        <FotoStrip isDesktop={isDesktop} />
        <Clima isDesktop={isDesktop} />
        <Notas isDesktop={isDesktop} />
        <AntesDePartir isDesktop={isDesktop} />
        <Footer isDesktop={isDesktop} />
      </div>
    </div>
  );
}
