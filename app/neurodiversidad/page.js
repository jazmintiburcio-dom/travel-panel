"use client";

import { useEffect, useState, useRef } from "react";
import { Heart, Clock, TreePine, Shield, Headphones, Smile, Eye, CheckCircle, Minus } from "lucide-react";
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
  fontDisplay: "'Playfair Display', Georgia, serif",
  fontBody:    "'Cormorant Garamond', 'Times New Roman', serif",
  fontUI:      "'DM Sans', sans-serif",
};

const PRINCIPIOS = [
  {
    icono: Clock,
    titulo: "Ritmos tranquilos",
    texto: "Los horarios son amplios y flexibles. No hay apuro por llegar, quedarse o salir. El tiempo del grupo manda.",
  },
  {
    icono: TreePine,
    titulo: "Espacios con calma",
    texto: "Se priorizan lugares con sombra, naturaleza y posibilidad de pausa. Se evitan ambientes muy saturados de estímulos cuando es posible.",
  },
  {
    icono: Minus,
    titulo: "Alternancia",
    texto: "Se alterna entre actividades estructuradas y tiempo libre. Después de una salida demandante, hay un momento de descanso.",
  },
  {
    icono: Heart,
    titulo: "Sin obligaciones",
    texto: "Cada actividad puede ajustarse u omitirse. Quedarse en casa un día también es una buena decisión.",
  },
];

const SUGERENCIAS = [
  "Anticipar descansos antes y después de actividades demandantes.",
  "Respetar las señales de cansancio o saturación sensorial del grupo.",
  "Adaptar los tiempos de permanencia en cada lugar sin presión.",
  "Comunicar el plan del día con anticipación para reducir la incertidumbre.",
  "El descanso también forma parte del viaje — no es tiempo perdido.",
  "Tener siempre una salida disponible si el entorno se vuelve difícil.",
];

const KIT = [
  {
    icono: Headphones,
    nombre: "Auriculares de cancelación de ruido",
    nota: "Especialmente útil en San Telmo, el Centro y el Bioparque.",
  },
  {
    icono: Smile,
    nombre: "Juguetes sensoriales (fidgets)",
    nota: "Para momentos de espera, trayectos largos o espacios ruidosos.",
  },
  {
    icono: Eye,
    nombre: "Agenda visual del día",
    nota: "Anticipar las actividades al grupo reduce la ansiedad por lo desconocido.",
  },
  {
    icono: Shield,
    nombre: "Bocadillos conocidos y seguros",
    nota: "Llevar algo familiar para los momentos donde la comida disponible no sea una opción.",
  },
  {
    icono: Heart,
    nombre: "Elemento de confort personal",
    nota: "Lo que cada persona necesite para sentirse segura y regulada.",
  },
];

const LUGARES_AMIGABLES = [
  { lugar: "Jardín Japonés de Escobar",   motivo: "Tranquilo, verde, sin multitudes. Ritmo propio." },
  { lugar: "Bosques de Palermo",          motivo: "Espacio abierto, sin estructura fija, libertad de movimiento." },
  { lugar: "Vivero Rauscher",             motivo: "Naturaleza, calma, sin ruido ni estímulos intensos." },
  { lugar: "Museo Prohibido No Tocar",    motivo: "Diseñado para explorar con el cuerpo. Muy sensory-friendly." },
  { lugar: "Delta del Paraná (Tigre)",    motivo: "Ritmo lento, naturaleza, silencio relativo en el río." },
  { lugar: "San Antonio de Areco",        motivo: "Espacio abierto, aire libre, actividades sin horarios estrictos." },
];

const CSS = `
  *, *::before, *::after { box-sizing: border-box; }
  body { margin: 0; }

  .principle-card { transition: transform 0.25s, box-shadow 0.25s; }
  .principle-card:hover { transform: translateY(-3px); box-shadow: 0 12px 36px rgba(30,18,40,0.1); }

  .kit-item { transition: background 0.2s; }
  .kit-item:hover { background: rgba(61,38,69,0.04) !important; }

  .place-row { transition: background 0.15s; }
  .place-row:hover { background: rgba(201,184,212,0.06) !important; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .fade-up { animation: fadeUp 0.5s ease both; }
`;

export default function NeurodiversidadPage() {
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

  return (
    <div style={{ background: t.bg, minHeight: "100svh" }}>
      <NavBar currentPath="/neurodiversidad" />

      {/* HERO */}
      <div style={{ background: t.bgDark, padding: isDesktop ? "72px 0 60px" : "52px 0 44px", overflow: "hidden" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto", padding: "0 24px", display: isDesktop ? "flex" : "block", alignItems: "center", gap: "48px" }}>
          <div style={{ flex: 1 }}>
            <p style={{ fontFamily: t.fontUI, fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(201,184,212,0.45)", margin: "0 0 8px", fontWeight: 600 }}>
              Guía personalizada
            </p>
            <h1 style={{ fontFamily: t.fontDisplay, fontSize: isDesktop ? "50px" : "32px", color: "#F7F3EE", margin: "0 0 16px", fontWeight: 400, lineHeight: 1.15 }}>
              Viajando con neurodiversidad
            </h1>
            <p style={{ fontFamily: t.fontBody, fontSize: isDesktop ? "21px" : "18px", color: "rgba(201,184,212,0.5)", margin: 0, maxWidth: "480px", lineHeight: 1.7 }}>
              Este itinerario fue diseñado teniendo en cuenta las necesidades del grupo. Cada decisión de planificación — horarios, lugares, ritmos — respeta la neurodiversidad como parte natural del viaje.
            </p>
          </div>
          {isDesktop && <img src="/neurodiversidad.hero.webp" alt="" style={{ width: "320px", flexShrink: 0 }} />}
        </div>
      </div>

      <div style={{ maxWidth: "960px", margin: "0 auto", padding: isDesktop ? "56px 24px 80px" : "36px 24px 60px" }}>

        {/* PRINCIPIOS */}
        <p style={{ fontFamily: t.fontDisplay, fontSize: isDesktop ? "30px" : "24px", fontStyle: "italic", color: t.accent, margin: "0 0 8px", fontWeight: 400 }}>
          Principios del itinerario
        </p>
        <p style={{ fontFamily: t.fontBody, fontSize: "17px", color: t.textMuted, margin: "0 0 28px", lineHeight: 1.5 }}>
          Estas decisiones no son restricciones — son el marco que hace que el viaje funcione para todos.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: isDesktop ? "repeat(2, 1fr)" : "1fr", gap: "14px", marginBottom: "52px" }}>
          {PRINCIPIOS.map((p, i) => {
            const IconC = p.icono;
            return (
              <div key={i} className="principle-card fade-up" style={{
                background: "#FFF", borderRadius: "14px", border: `1px solid ${t.border}`,
                padding: "24px", animationDelay: `${i * 60}ms`,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "9px", background: t.bgCard, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <IconC size={16} color={t.accent} strokeWidth={1.4} />
                  </div>
                  <span style={{ fontFamily: t.fontUI, fontSize: "13px", fontWeight: 700, color: t.accent }}>{p.titulo}</span>
                </div>
                <p style={{ fontFamily: t.fontBody, fontSize: "17px", color: t.textMuted, margin: 0, lineHeight: 1.6 }}>{p.texto}</p>
              </div>
            );
          })}
        </div>

        {/* SUGERENCIAS */}
        <div style={{ background: t.bgDark, borderRadius: "16px", padding: isDesktop ? "36px 40px" : "28px 24px", marginBottom: "52px" }}>
          <p style={{ fontFamily: t.fontDisplay, fontSize: isDesktop ? "26px" : "22px", fontStyle: "italic", color: "#F7F3EE", margin: "0 0 24px", fontWeight: 400 }}>
            Sugerencias prácticas
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {SUGERENCIAS.map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <CheckCircle size={15} color={t.accentLight} strokeWidth={1.4} style={{ flexShrink: 0, marginTop: "3px" }} />
                <span style={{ fontFamily: t.fontBody, fontSize: "18px", color: "rgba(201,184,212,0.65)", lineHeight: 1.55 }}>{s}</span>
              </div>
            ))}
          </div>
        </div>

        {/* KIT SENSORIAL */}
        <p style={{ fontFamily: t.fontDisplay, fontSize: isDesktop ? "30px" : "24px", fontStyle: "italic", color: t.accent, margin: "0 0 8px", fontWeight: 400 }}>
          Kit sensorial recomendado
        </p>
        <p style={{ fontFamily: t.fontBody, fontSize: "17px", color: t.textMuted, margin: "0 0 20px", lineHeight: 1.5 }}>
          Elementos que conviene llevar siempre a mano durante las salidas.
        </p>
        <div style={{ background: "#FFF", borderRadius: "14px", border: `1px solid ${t.border}`, overflow: "hidden", marginBottom: "52px" }}>
          {KIT.map((item, i) => {
            const IconC = item.icono;
            return (
              <div key={i} className="kit-item" style={{
                display: "flex", alignItems: "flex-start", gap: "16px",
                padding: "18px 22px",
                borderBottom: i < KIT.length - 1 ? `1px solid ${t.border}` : "none",
                background: "transparent",
              }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: t.bgCard, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <IconC size={15} color={t.accent} strokeWidth={1.4} />
                </div>
                <div>
                  <p style={{ fontFamily: t.fontUI, fontSize: "12px", fontWeight: 700, color: t.accent, margin: "0 0 3px" }}>{item.nombre}</p>
                  <p style={{ fontFamily: t.fontBody, fontSize: "16px", color: t.textMuted, margin: 0, lineHeight: 1.5 }}>{item.nota}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* LUGARES MÁS AMIGABLES */}
        <p style={{ fontFamily: t.fontDisplay, fontSize: isDesktop ? "30px" : "24px", fontStyle: "italic", color: t.accent, margin: "0 0 8px", fontWeight: 400 }}>
          Lugares más amigables del itinerario
        </p>
        <p style={{ fontFamily: t.fontBody, fontSize: "17px", color: t.textMuted, margin: "0 0 20px", lineHeight: 1.5 }}>
          Algunos destinos del viaje son especialmente accesibles para el grupo.
        </p>
        <div style={{ background: t.bgDark, borderRadius: "14px", overflow: "hidden" }}>
          {LUGARES_AMIGABLES.map((lugar, i) => (
            <div key={i} className="place-row" style={{
              display: isDesktop ? "flex" : "block",
              alignItems: "center", gap: "24px",
              padding: "18px 24px",
              borderBottom: i < LUGARES_AMIGABLES.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
              background: "transparent",
            }}>
              <span style={{ fontFamily: t.fontUI, fontSize: "12px", fontWeight: 700, color: "#F7F3EE", minWidth: isDesktop ? "220px" : undefined, display: "block", marginBottom: isDesktop ? 0 : "4px" }}>
                {lugar.lugar}
              </span>
              <span style={{ fontFamily: t.fontBody, fontSize: "16px", color: "rgba(201,184,212,0.5)", lineHeight: 1.5 }}>
                {lugar.motivo}
              </span>
            </div>
          ))}
        </div>

        {/* Nota final */}
        <div style={{ marginTop: "48px", textAlign: "center", padding: "32px 24px" }}>
          <Heart size={20} color={t.accentLight} strokeWidth={1.2} style={{ display: "block", margin: "0 auto 14px", opacity: 0.6 }} />
          <p style={{ fontFamily: t.fontDisplay, fontSize: isDesktop ? "22px" : "18px", fontStyle: "italic", color: t.accent, margin: "0 0 8px", fontWeight: 400 }}>
            Viajar bien es viajar juntos, respetando a cada uno.
          </p>
          <p style={{ fontFamily: t.fontUI, fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: t.border, margin: 0 }}>
            JT Digital Studio
          </p>
        </div>

      </div>
    </div>
  );
}
