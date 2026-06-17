"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, MapPin, Clock, DollarSign, Calendar, Car } from "lucide-react";
import NavBar from "../components/NavBar";

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
  fontDisplay: "'Playfair Display', Georgia, serif",
  fontBody:    "'Cormorant Garamond', 'Times New Roman', serif",
  fontUI:      "'DM Sans', sans-serif",
};

// ============================================================
// DATOS DE LUGARES
// ============================================================
const PROVINCIA = [
  {
    id: "temaiken",
    nombre: "Bioparque Temaikèn",
    zona: "Escobar, Buenos Aires",
    descripcion: "Bioparque de fauna con propuesta educativa y de conservación. Ofrece encuentros cercanos con animales de distintos ecosistemas, recorridos a pie y área de almuerzo interna. Una experiencia que combina entretenimiento y conciencia ambiental.",
    precio: "$42 USD/persona",
    fechaSugerida: "Day 4 · Viernes 26/12/2025",
    distancia: "~15 min desde Escobar",
    horario: "9:00 AM – 6:00 PM",
    dia: 4,
    foto: "/bioparque-temaiken.webp",
    tags: ["Naturaleza", "Familia", "Animales"],
    mapLink: "https://maps.google.com/?q=Bioparque+Temaiken+Escobar",
  },
  {
    id: "jardin-japones",
    nombre: "Jardín Japonés de Escobar",
    zona: "Escobar, Buenos Aires",
    descripcion: "Jardín temático de inspiración japonesa rodeado de naturaleza serena. Ideal para un paseo tranquilo en familia, con arquitectura tradicional, puentes sobre estanques y vegetación cuidada. Un espacio de calma en pleno verano argentino.",
    precio: "$2 USD/persona",
    fechaSugerida: "Day 8 · Martes 30/12/2025",
    distancia: "~10 min desde Escobar",
    horario: "9:00 AM – 6:00 PM",
    dia: 8,
    foto: "/jard%C3%ADn-japones-escobar.webp",
    tags: ["Naturaleza", "Tranquilo", "Paseo"],
    mapLink: "https://maps.google.com/?q=Jardin+Japones+Escobar",
  },
  {
    id: "tigre",
    nombre: "Tigre · Delta del Paraná",
    zona: "Tigre, Buenos Aires",
    descripcion: "Excursión fluvial al Delta del Paraná desde el pintoresco pueblo de Tigre. Paseo en lancha entre canales bordeados de vegetación subtropical, el Puerto de Frutos para artesanías y gastronomía local. Una de las salidas más memorables del viaje.",
    precio: "$15 USD/persona (lancha)",
    fechaSugerida: "Day 12 · Sábado 03/01/2026",
    distancia: "~40 min desde Escobar",
    horario: "Salidas desde las 10:00 AM",
    dia: 12,
    foto: "/tigre-delta-del-parana.webp",
    tags: ["Naturaleza", "Agua", "Excursión"],
    mapLink: "https://maps.google.com/?q=Puerto+de+Frutos+Tigre",
  },
  {
    id: "areco",
    nombre: "San Antonio de Areco · La Caballería de Keen",
    zona: "San Antonio de Areco, Buenos Aires",
    descripcion: "Experiencia de campo típica argentina en uno de los pueblos gauchos más auténticos de la Provincia. Almuerzo criollo, paseos a caballo, contacto con animales de granja y actividades al aire libre en un establecimiento tradicional.",
    precio: "$28 USD/persona",
    fechaSugerida: "Day 13 · Domingo 04/01/2026",
    distancia: "~1h 20min desde Escobar",
    horario: "Actividad de día completo",
    dia: 13,
    foto: "/san-antonio-de-areco.webp",
    tags: ["Campo", "Gaucho", "Naturaleza"],
    mapLink: "https://maps.google.com/?q=San+Antonio+de+Areco+Buenos+Aires",
  },
  {
    id: "vivero-rauscher",
    nombre: "Vivero Rauscher · Parque de Cactus",
    zona: "Matheu, Escobar",
    descripcion: "Extenso cactario y jardín botánico en las afueras de Escobar. Cientos de especies de cactus y plantas suculentas en un entorno tranquilo y fotogénico. Un paseo diferente, ideal para el último día en la zona.",
    precio: "Entrada libre",
    fechaSugerida: "Day 15 · Martes 06/01/2026",
    distancia: "~20 min desde Escobar",
    horario: "9:00 AM – 5:00 PM",
    dia: 15,
    foto: "/vivero-rauscher.jpg",
    tags: ["Naturaleza", "Botánico", "Foto"],
    mapLink: "https://maps.google.com/?q=Vivero+Rauscher+Matheu+Escobar",
  },
];

const CABA = [
  {
    id: "plaza-mayo",
    nombre: "Plaza de Mayo",
    zona: "Centro Histórico",
    descripcion: "El corazón político e histórico de Argentina. Rodeada por la Casa Rosada, la Catedral Metropolitana y el Cabildo, es el punto de partida obligado para conocer Buenos Aires. Un espacio cargado de historia y vida cotidiana porteña.",
    precio: "Entrada gratuita",
    fechaSugerida: "Day 5 · Sábado 27/12/2025",
    distancia: "~50 min desde Escobar",
    horario: "Abierta las 24 hs",
    dia: 5,
    foto: "/lugar-plaza-mayo.webp",
    tags: ["Historia", "Arquitectura", "Iconic"],
    mapLink: "https://maps.google.com/?q=Plaza+de+Mayo+Buenos+Aires",
  },
  {
    id: "florida-galerias",
    nombre: "Calle Florida · Galerías Pacífico",
    zona: "Centro",
    descripcion: "El paseo peatonal más famoso de Buenos Aires, lleno de comercios, artistas callejeros y movimiento. Las Galerías Pacífico conservan murales históricos pintados en su bóveda central — un tesoro artístico dentro de un espacio comercial.",
    precio: "Entrada gratuita",
    fechaSugerida: "Day 5 · Sábado 27/12/2025",
    distancia: "~50 min desde Escobar",
    horario: "Lun–Sáb 10:00–21:00 · Dom 12:00–20:00",
    dia: 5,
    foto: "/lugar-galerias.webp",
    tags: ["Compras", "Arte", "Paseo"],
    mapLink: "https://maps.google.com/?q=Galerias+Pacifico+Buenos+Aires",
  },
  {
    id: "palermo-soho",
    nombre: "Palermo Soho · Plaza Serrano",
    zona: "Palermo",
    descripcion: "El barrio más vibrante de Buenos Aires: diseño de autor, gastronomía de nivel, bares con identidad y una escena cultural siempre activa. La Plaza Serrano es el punto de encuentro natural, rodeada de restaurantes y terrazas.",
    precio: "Entrada gratuita",
    fechaSugerida: "Day 5 · Sábado 27/12/2025",
    distancia: "~55 min desde Escobar",
    horario: "Activo desde mediodía hasta la noche",
    dia: 5,
    foto: "/palermo-soho.webp",
    tags: ["Gastronomía", "Diseño", "Noche"],
    mapLink: "https://maps.google.com/?q=Plaza+Serrano+Palermo+Buenos+Aires",
  },
  {
    id: "san-telmo",
    nombre: "Barrio San Telmo · Mercado y Feria",
    zona: "San Telmo",
    descripcion: "El barrio más antiguo de Buenos Aires, con adoquines, antigüedades y tango en cada esquina. La feria dominical de la Plaza Dorrego es imperdible, y el Mercado de San Telmo ofrece gastronomía y artesanías bajo un techo histórico de hierro.",
    precio: "Entrada gratuita",
    fechaSugerida: "Day 6 · Domingo 28/12/2025",
    distancia: "~50 min desde Escobar",
    horario: "Mercado: diario 10:00–20:00 · Feria: dom 10:00–17:00",
    dia: 6,
    foto: "/lugar-santelmo.webp",
    tags: ["Historia", "Mercado", "Tango"],
    mapLink: "https://maps.google.com/?q=Mercado+San+Telmo+Buenos+Aires",
  },
  {
    id: "barrio-chino",
    nombre: "Barrio Chino · Belgrano",
    zona: "Belgrano",
    descripcion: "La pequeña Chinatown porteña, concentrada en pocas cuadras del barrio de Belgrano. Supermercados asiáticos, restaurantes de cocina china, japonesa y coreana, y puestos de artesanías. Un contraste cultural y gastronómico muy disfrutable.",
    precio: "Entrada gratuita",
    fechaSugerida: "Day 7 · Lunes 29/12/2025",
    distancia: "~55 min desde Escobar",
    horario: "La mayoría de negocios: 10:00–20:00",
    dia: 7,
    foto: "/barrio-chino.webp",
    tags: ["Gastronomía", "Cultura", "Mercado"],
    mapLink: "https://maps.google.com/?q=Barrio+Chino+Belgrano+Buenos+Aires",
  },
  {
    id: "bosques-palermo",
    nombre: "Bosques de Palermo",
    zona: "Palermo",
    descripcion: "El pulmón verde de Buenos Aires: lagos, praderas, rosedal y decenas de kilómetros de senderos para caminar o pedalear. Ideal para un momento de descanso activo después del almuerzo en Belgrano. Relajado, fotogénico y gratuito.",
    precio: "Entrada gratuita",
    fechaSugerida: "Day 7 · Lunes 29/12/2025",
    distancia: "~50 min desde Escobar",
    horario: "Abierto las 24 hs",
    dia: 7,
    foto: "/bosques-de-Palermo.webp",
    tags: ["Naturaleza", "Bicicleta", "Descanso"],
    mapLink: "https://maps.google.com/?q=Bosques+de+Palermo+Buenos+Aires",
  },
  {
    id: "malba",
    nombre: "MALBA — Museo Latinoamericano",
    zona: "Palermo",
    descripcion: "El museo de arte latinoamericano contemporáneo más importante de Argentina. Colección permanente con Frida Kahlo, Xul Solar y Antonio Berni, más exposiciones temporales de alta calidad. Un espacio moderno con cafetería y librería de diseño.",
    precio: "~$8–10 USD/persona",
    fechaSugerida: "Day 8 · Martes 30/12/2025",
    distancia: "~50 min desde Escobar",
    horario: "Jue–Lun 12:00–20:00 · Mié cerrado",
    dia: 8,
    foto: "/malba-museo.webp",
    tags: ["Arte", "Cultura", "Museo"],
    mapLink: "https://maps.google.com/?q=MALBA+Buenos+Aires",
  },
  {
    id: "caminito",
    nombre: "Caminito · La Boca",
    zona: "La Boca",
    descripcion: "El rincón más colorido y fotogénico de Buenos Aires: casas pintadas con chapa y colores primarios, tango en la calle y murales de Diego Maradona y Carlos Gardel. Un paseo breve pero muy impactante visualmente.",
    precio: "Entrada gratuita",
    fechaSugerida: "Day 10 · Jueves 01/01/2026",
    distancia: "~55 min desde Escobar",
    horario: "Diario 10:00–18:00 (negocios en el barrio)",
    dia: 10,
    foto: "/caminito-la-Boca.webp",
    tags: ["Arte", "Tango", "Foto"],
    mapLink: "https://maps.google.com/?q=Caminito+La+Boca+Buenos+Aires",
  },
  {
    id: "puerto-madero",
    nombre: "Puerto Madero",
    zona: "Puerto Madero",
    descripcion: "El barrio más moderno de Buenos Aires, nacido de la reconversión del antiguo puerto. Paseo junto al río con restaurantes de nivel, el Puente de la Mujer de Calatrava y una mezcla de arquitectura industrial renovada y torres contemporáneas.",
    precio: "Entrada gratuita",
    fechaSugerida: "Day 10 · Jueves 01/01/2026",
    distancia: "~50 min desde Escobar",
    horario: "Abierto las 24 hs · Restaurantes desde 12:00",
    dia: 10,
    foto: "/puerto-madero.webp",
    tags: ["Arquitectura", "Paseo", "Gastronomía"],
    mapLink: "https://maps.google.com/?q=Puerto+Madero+Buenos+Aires",
  },
  {
    id: "recoleta",
    nombre: "Barrio Recoleta",
    zona: "Recoleta",
    descripcion: "El barrio más elegante de Buenos Aires, con arquitectura francesa, plazas arboladas y el famoso Cementerio de la Recoleta — donde descansa Evita Perón. Zona de museos, galerías y cafés históricos como La Biela.",
    precio: "Entrada gratuita",
    fechaSugerida: "Day 11 · Viernes 02/01/2026",
    distancia: "~50 min desde Escobar",
    horario: "Cementerio: 8:00–17:30",
    dia: 11,
    foto: "/barrio-recoleta.webp",
    tags: ["Historia", "Arquitectura", "Cultura"],
    mapLink: "https://maps.google.com/?q=Recoleta+Buenos+Aires",
  },
  {
    id: "museo-prohibido",
    nombre: "Museo Prohibido No Tocar",
    zona: "Recoleta",
    descripcion: "Un museo interactivo donde todo está pensado para ser tocado, manipulado y explorado. Experiencias de física, ilusiones ópticas, sonido y percepción. Excelente para grupos con niños y para personas con neurodiversidad.",
    precio: "$9 USD/persona",
    fechaSugerida: "Day 11 · Viernes 02/01/2026",
    distancia: "~50 min desde Escobar",
    horario: "Mar–Dom 10:00–20:00",
    dia: 11,
    foto: "/museo-prohibido-no-tocar.webp",
    tags: ["Interactivo", "Familia", "Ciencia"],
    mapLink: "https://maps.google.com/?q=Museo+Prohibido+No+Tocar+Buenos+Aires",
  },
];

// ============================================================
// CSS
// ============================================================
const CSS = `
  *, *::before, *::after { box-sizing: border-box; }
  body { margin: 0; }

  .place-card {
    transition: transform 0.28s ease, box-shadow 0.28s ease;
  }
  .place-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 18px 50px rgba(30,18,40,0.13);
  }

  .tab-btn { transition: background 0.2s, color 0.2s; }

  .tag-chip {
    transition: background 0.2s;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .fade-up {
    animation: fadeUp 0.5s ease both;
  }
`;

// ============================================================
// PLACE CARD
// ============================================================
function PlaceCard({ lugar, index }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const hasPrecio = lugar.precio && !lugar.precio.toLowerCase().includes("gratuita") && !lugar.precio.toLowerCase().includes("libre");
  const descripcionCorta = lugar.descripcion.split(". ")[0] + ".";

  return (
    <div className="place-card fade-up" style={{
      background: "#FFFFFF",
      borderRadius: "14px",
      overflow: "hidden",
      border: `1px solid ${t.border}`,
      animationDelay: `${index * 60}ms`,
    }}>
      {/* Foto */}
      <div style={{ height: "200px", background: t.bgCard, position: "relative", overflow: "hidden" }}>
        {lugar.foto && (
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: imgLoaded ? `url(${lugar.foto})` : "none",
            backgroundSize: "cover", backgroundPosition: "center",
            transition: "opacity 0.4s",
            opacity: imgLoaded ? 1 : 0,
          }} />
        )}
        <img
          src={lugar.foto}
          alt=""
          style={{ display: "none" }}
          onLoad={() => setImgLoaded(true)}
        />
        {/* Día badge */}
        <div style={{
          position: "absolute", top: "12px", left: "12px",
          background: "rgba(30,18,40,0.75)", backdropFilter: "blur(6px)",
          borderRadius: "6px", padding: "4px 10px",
        }}>
          <span style={{ fontFamily: t.fontUI, fontSize: "9px", letterSpacing: "0.14em", textTransform: "uppercase", color: t.accentLight, fontWeight: 600 }}>
            Día {lugar.dia}
          </span>
        </div>
        {/* Tags */}
        <div style={{ position: "absolute", bottom: "10px", left: "10px", display: "flex", gap: "5px", flexWrap: "wrap" }}>
          {lugar.tags.map((tag, i) => (
            <span key={i} className="tag-chip" style={{
              fontFamily: t.fontUI, fontSize: "9px", letterSpacing: "0.1em",
              background: "rgba(247,243,238,0.9)",
              color: t.accent, padding: "3px 8px", borderRadius: "4px", fontWeight: 600,
              textTransform: "uppercase",
            }}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Contenido */}
      <div style={{ padding: "20px" }}>
        <p style={{ fontFamily: t.fontUI, fontSize: "9px", letterSpacing: "0.16em", textTransform: "uppercase", color: t.textMuted, margin: "0 0 5px", fontWeight: 600 }}>
          {lugar.zona}
        </p>
        <h3 style={{ fontFamily: t.fontDisplay, fontSize: "20px", color: t.accent, margin: "0 0 10px", fontWeight: 400, lineHeight: 1.2 }}>
          {lugar.nombre}
        </h3>
        <p style={{ fontFamily: t.fontBody, fontSize: "16px", color: t.textMuted, margin: "0 0 12px", lineHeight: 1.6 }}>
          {lugar.descripcion}
        </p>

        {/* Ver más — detalles colapsables */}
        <button onClick={() => setExpanded(!expanded)} style={{
          background: "none", border: "none", cursor: "pointer", padding: "0 0 12px",
          fontFamily: t.fontUI, fontSize: "10px", letterSpacing: "0.12em",
          textTransform: "uppercase", color: t.accent, fontWeight: 600, opacity: 0.55,
          display: "block",
        }}>
          {expanded ? "Ver menos ↑" : "Ver más ↓"}
        </button>

        {expanded && (
          <>
            <div style={{ display: "flex", flexDirection: "column", gap: "7px", paddingTop: "14px", borderTop: `1px solid ${t.border}` }}>
              <MetaRow icon={<Calendar size={12} color={t.accent} strokeWidth={1.5} />} label={lugar.fechaSugerida} />
              <MetaRow icon={<Clock    size={12} color={t.accent} strokeWidth={1.5} />} label={lugar.horario} />
              <MetaRow icon={<Car      size={12} color={t.accent} strokeWidth={1.5} />} label={lugar.distancia} />
              {hasPrecio && (
                <MetaRow icon={<DollarSign size={12} color={t.alert} strokeWidth={1.5} />} label={lugar.precio} highlight />
              )}
              {!hasPrecio && (
                <MetaRow icon={<DollarSign size={12} color="#3A8A5C" strokeWidth={1.5} />} label={lugar.precio} green />
              )}
            </div>
            <a
              href={lugar.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: "5px",
                marginTop: "14px",
                fontFamily: t.fontUI, fontSize: "10px", letterSpacing: "0.12em",
                textTransform: "uppercase", fontWeight: 600,
                color: t.accent, textDecoration: "none", opacity: 0.55,
              }}
            >
              <MapPin size={11} strokeWidth={1.5} />
              Ver en Google Maps
            </a>
          </>
        )}
      </div>
    </div>
  );
}

function MetaRow({ icon, label, highlight, green }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
      <span style={{ flexShrink: 0 }}>{icon}</span>
      <span style={{
        fontFamily: t.fontBody, fontSize: "15px",
        color: highlight ? t.alert : green ? "#3A8A5C" : t.textMuted,
        fontWeight: highlight || green ? 600 : 400,
      }}>
        {label}
      </span>
    </div>
  );
}


// ============================================================
// HERO SECCIÓN
// ============================================================
function Hero({ isDesktop }) {
  return (
    <div style={{ background: t.bgDark, padding: isDesktop ? "72px 0 60px" : "52px 0 44px", position: "relative", overflow: "hidden" }}>
      {isDesktop && <img src="/hero.lugares.webp" alt="" style={{ position: "absolute", right: 0, top: 0, height: "100%", width: "auto", objectFit: "cover", objectPosition: "left center" }} />}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px", position: "relative" }}>
        <p style={{ fontFamily: t.fontUI, fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(201,184,212,0.45)", margin: "0 0 8px", fontWeight: 600 }}>
          Visitas planificadas
        </p>
        <h1 style={{ fontFamily: t.fontDisplay, fontSize: isDesktop ? "52px" : "34px", color: "#F7F3EE", margin: "0 0 14px", fontWeight: 400, lineHeight: 1.1 }}>
          Lugares del viaje
        </h1>
        <p style={{ fontFamily: t.fontBody, fontSize: isDesktop ? "20px" : "18px", color: "rgba(201,184,212,0.55)", margin: 0, maxWidth: "540px", lineHeight: 1.6 }}>
          Una selección de destinos para explorar durante los 16 días en Argentina, organizados por zona.
        </p>

        {/* Stats */}
        <div style={{ display: "flex", gap: isDesktop ? "32px" : "24px", marginTop: "28px", flexWrap: "wrap" }}>
          {[
            { num: PROVINCIA.length, label: "Lugares Provincia" },
            { num: CABA.length,     label: "Lugares CABA"      },
            { num: PROVINCIA.length + CABA.length, label: "Total de visitas" },
          ].map((s, i) => (
            <div key={i}>
              <p style={{ fontFamily: t.fontDisplay, fontSize: "36px", color: t.accentLight, margin: 0, fontWeight: 400, lineHeight: 1 }}>{s.num}</p>
              <p style={{ fontFamily: t.fontUI, fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(201,184,212,0.35)", margin: "4px 0 0" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// ROOT
// ============================================================
export default function LugaresPage() {
  const [tab, setTab]         = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);

    const style = document.createElement("style");
    style.textContent = CSS;
    document.head.appendChild(style);

    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=DM+Sans:wght@400;500;600;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    return () => window.removeEventListener("resize", check);
  }, []);

  const lista = tab === 0 ? CABA : PROVINCIA;
  const cols  = isDesktop ? 3 : 1;

  return (
    <div style={{ background: t.bg, minHeight: "100svh" }}>
      <NavBar currentPath="/lugares" />
      <Hero isDesktop={isDesktop} />

      {/* Tabs */}
      <div style={{ background: t.bg, borderBottom: `1px solid ${t.border}`, position: "sticky", top: "58px", zIndex: 40 }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px", display: "flex", gap: "0" }}>
          {[
            { label: "Buenos Aires · CABA", count: CABA.length },
            { label: "Provincia",           count: PROVINCIA.length },
          ].map((tb, i) => (
            <button key={i} className="tab-btn" onClick={() => setTab(i)} style={{
              padding: "16px 20px 14px",
              background: "none", border: "none", cursor: "pointer",
              fontFamily: t.fontUI, fontSize: "12px", letterSpacing: "0.1em",
              fontWeight: tab === i ? 700 : 400,
              color: tab === i ? t.accent : t.textMuted,
              borderBottom: tab === i ? `2px solid ${t.accent}` : "2px solid transparent",
              display: "flex", alignItems: "center", gap: "7px",
            }}>
              {tb.label}
              <span style={{
                fontFamily: t.fontUI, fontSize: "9px", fontWeight: 700,
                background: tab === i ? t.accent : t.border,
                color: tab === i ? "#F7F3EE" : t.textMuted,
                padding: "2px 7px", borderRadius: "10px",
                transition: "background 0.2s, color 0.2s",
              }}>
                {tb.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Grid de lugares */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: isDesktop ? "48px 24px 80px" : "32px 24px 60px" }}>

        {/* Subtítulo de sección */}
        <div style={{ marginBottom: "32px" }}>
          <h2 style={{ fontFamily: t.fontDisplay, fontSize: isDesktop ? "32px" : "24px", color: t.accent, margin: "0 0 6px", fontWeight: 400, fontStyle: "italic" }}>
            {tab === 0 ? "Ciudad de Buenos Aires" : "Provincia de Buenos Aires"}
          </h2>
          <p style={{ fontFamily: t.fontBody, fontSize: "17px", color: t.textMuted, margin: 0, lineHeight: 1.5 }}>
            {tab === 0
              ? "Recorridos por los barrios más icónicos y culturales de la capital."
              : "Experiencias al aire libre, naturaleza y gastronomía criolla en los alrededores de Escobar."
            }
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: isDesktop ? "repeat(3, 1fr)" : "1fr",
          gap: "20px",
        }}>
          {lista.map((lugar, i) => (
            <PlaceCard key={lugar.id} lugar={lugar} index={i} />
          ))}
        </div>
      </div>

      {/* Footer tip */}
      <div style={{ background: t.bgDark, padding: "36px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", alignItems: "center", gap: "12px" }}>
          <MapPin size={16} color={t.accentLight} strokeWidth={1.2} />
          <p style={{ fontFamily: t.fontBody, fontSize: "17px", color: "rgba(201,184,212,0.5)", margin: 0, lineHeight: 1.5 }}>
            Los tiempos de traslado son aproximados desde Escobar. El itinerario es flexible — cada actividad puede ajustarse u omitirse según la energía del grupo.
          </p>
        </div>
      </div>
    </div>
  );
}
