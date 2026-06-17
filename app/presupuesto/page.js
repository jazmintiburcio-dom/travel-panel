"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, Home, Car, Zap, Users, ShoppingBag, Info } from "lucide-react";
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
  green:       "#3A8A5C",
  fontDisplay: "'Playfair Display', Georgia, serif",
  fontBody:    "'Cormorant Garamond', 'Times New Roman', serif",
  fontUI:      "'DM Sans', sans-serif",
};

const PERSONAS = 7;

// ============================================================
// DATOS
// ============================================================
const FIJOS = [
  { concepto: "Hospedaje (Airbnb)",   detalle: "15 noches · Barrio La Candelaria, Escobar",  total: 1100 },
  { concepto: "Alquiler de vehículo", detalle: "14 días · Grupo EE.UU.",                     total: 1500 },
  { concepto: "Logística vehículo",   detalle: "Gasolina + peajes + estacionamientos (est.)", total: 231  },
];

const ACTIVIDADES = [
  { concepto: "Bioparque Temaikèn",        precioPP: 42, personas: PERSONAS },
  { concepto: "Día de campo (La Caballería de Keen)", precioPP: 28, personas: PERSONAS },
  { concepto: "Museo Prohibido No Tocar",  precioPP: 9,  personas: PERSONAS },
  { concepto: "Jardín Japonés de Escobar", precioPP: 2,  personas: PERSONAS },
  { concepto: "Tigre · Paseo en lancha",   precioPP: 15, personas: PERSONAS },
];

const VARIABLES = [
  { concepto: "Comidas fuera",      detalle: `~$15/pp × 9 comidas × ${PERSONAS} personas`, total: 945  },
  { concepto: "Extras / souvenirs", detalle: `~$75/pp × ${PERSONAS} personas`,             total: 525  },
];

const TOTAL_FIJOS      = FIJOS.reduce((s, r) => s + r.total, 0);
const TOTAL_ACT        = ACTIVIDADES.reduce((s, r) => s + r.precioPP * r.personas, 0);
const TOTAL_VAR        = VARIABLES.reduce((s, r) => s + r.total, 0);
const TOTAL_GENERAL    = TOTAL_FIJOS + TOTAL_ACT + TOTAL_VAR;

const fmt = (n) => `$${n.toLocaleString("en-US")}`;
const pct = (n) => `${Math.round((n / TOTAL_GENERAL) * 100)}%`;

// ============================================================
// CSS
// ============================================================
const CSS = `
  *, *::before, *::after { box-sizing: border-box; }
  body { margin: 0; }

  .table-row { transition: background 0.15s; }
  .table-row:hover { background: rgba(61,38,69,0.04) !important; }

  .bar-fill { transition: width 1.1s cubic-bezier(0.22,1,0.36,1); }

  .total-card { transition: transform 0.25s, box-shadow 0.25s; }
  .total-card:hover { transform: translateY(-3px); box-shadow: 0 16px 48px rgba(30,18,40,0.12); }
`;

// ============================================================
// BAR CHART
// ============================================================
function BarChart({ isDesktop }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 200); }, []);

  const items = [
    { label: "Fijos",       valor: TOTAL_FIJOS, color: t.accent      },
    { label: "Actividades", valor: TOTAL_ACT,   color: t.gold        },
    { label: "Variables",   valor: TOTAL_VAR,   color: t.accentLight },
  ];
  const max = Math.max(...items.map(i => i.valor));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
      {items.map((item, i) => (
        <div key={i}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
            <span style={{ fontFamily: t.fontUI, fontSize: "11px", fontWeight: 600, color: t.accent, letterSpacing: "0.08em" }}>{item.label}</span>
            <span style={{ fontFamily: t.fontUI, fontSize: "11px", color: t.textMuted }}>{fmt(item.valor)} · {pct(item.valor)}</span>
          </div>
          <div style={{ height: "8px", background: t.border, borderRadius: "4px", overflow: "hidden" }}>
            <div className="bar-fill" style={{
              height: "100%", borderRadius: "4px",
              background: item.color,
              width: mounted ? `${(item.valor / max) * 100}%` : "0%",
            }} />
          </div>
        </div>
      ))}
    </div>
  );
}

// ============================================================
// TABLA
// ============================================================
function SectionTable({ titulo, icono, filas, subtotal, isDesktop, accentRow }) {
  return (
    <div style={{ background: "#FFF", borderRadius: "14px", border: `1px solid ${t.border}`, overflow: "hidden", marginBottom: "16px", overflowX: "auto" }}>
      {/* Header */}
      <div style={{ padding: "18px 22px", borderBottom: `1px solid ${t.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "34px", height: "34px", borderRadius: "8px", background: t.bgCard, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {icono}
          </div>
          <div>
            <p style={{ fontFamily: t.fontUI, fontSize: "13px", fontWeight: 700, color: t.accent, margin: 0, letterSpacing: "0.02em" }}>{titulo}</p>
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <p style={{ fontFamily: t.fontUI, fontSize: "9px", letterSpacing: "0.14em", textTransform: "uppercase", color: t.textMuted, margin: "0 0 2px" }}>Subtotal</p>
          <p style={{ fontFamily: t.fontDisplay, fontSize: "20px", color: t.accent, margin: 0, fontWeight: 400 }}>{fmt(subtotal)}</p>
        </div>
      </div>

      {/* Filas */}
      <div>
        {filas.map((fila, i) => (
          <div key={i} className="table-row" style={{
            display: "grid",
            gridTemplateColumns: isDesktop ? "1fr auto auto" : "1fr auto",
            gap: "12px",
            padding: "14px 22px",
            borderBottom: i < filas.length - 1 ? `1px solid ${t.border}` : "none",
            alignItems: "center",
            background: "transparent",
          }}>
            <div>
              <p style={{ fontFamily: t.fontUI, fontSize: "12px", fontWeight: 600, color: t.text, margin: "0 0 2px" }}>{fila.concepto}</p>
              {fila.detalle && (
                <p style={{ fontFamily: t.fontBody, fontSize: "14px", color: t.textMuted, margin: 0 }}>{fila.detalle}</p>
              )}
            </div>
            {isDesktop && fila.precioPP !== undefined && (
              <div style={{ textAlign: "right" }}>
                <p style={{ fontFamily: t.fontUI, fontSize: "9px", color: t.textMuted, margin: "0 0 2px", letterSpacing: "0.1em", textTransform: "uppercase" }}>×{fila.personas} pp</p>
                <p style={{ fontFamily: t.fontUI, fontSize: "11px", color: t.textMuted, margin: 0 }}>{fmt(fila.precioPP)}/pp</p>
              </div>
            )}
            <div style={{ textAlign: "right", minWidth: "70px" }}>
              <p style={{ fontFamily: t.fontUI, fontSize: "14px", fontWeight: 700, color: accentRow ? t.alert : t.accent, margin: 0 }}>
                {fmt(fila.total ?? fila.precioPP * fila.personas)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


// ============================================================
// ROOT
// ============================================================
export default function PresupuestoPage() {
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
      <NavBar currentPath="/presupuesto" />

      {/* HERO */}
      <div style={{ background: t.bgDark, padding: isDesktop ? "72px 0 60px" : "52px 0 44px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url(/Presupuesto.hero.webp)`, backgroundSize: "cover", backgroundPosition: "center", opacity: 0.35 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(30,18,40,0.75) 0%, rgba(30,18,40,0.88) 100%)" }} />
        <div style={{ maxWidth: "960px", margin: "0 auto", padding: "0 24px", position: "relative" }}>
          {/* Texto */}
          <p style={{ fontFamily: t.fontUI, fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(201,184,212,0.45)", margin: "0 0 8px", fontWeight: 600 }}>
            Estimado · {PERSONAS} personas
          </p>
          <h1 style={{ fontFamily: t.fontDisplay, fontSize: isDesktop ? "46px" : "34px", color: "#F7F3EE", margin: "0 0 10px", fontWeight: 400, lineHeight: 1.1 }}>
            Presupuesto del viaje
          </h1>
          <p style={{ fontFamily: t.fontBody, fontSize: "17px", color: "rgba(201,184,212,0.5)", margin: "0 0 32px", lineHeight: 1.5 }}>
            Moneda de referencia: USD · Tipo de cambio fijo definido al inicio del viaje.
          </p>

          {/* Tarjetas a ancho completo */}
          <div style={{ display: "grid", gridTemplateColumns: isDesktop ? "repeat(4, 1fr)" : "repeat(2, 1fr)", gap: "10px" }}>
            {[
              { label: "Costos fijos",  valor: TOTAL_FIJOS,   color: t.accentLight, pct: pct(TOTAL_FIJOS) },
              { label: "Actividades",   valor: TOTAL_ACT,     color: t.gold,        pct: pct(TOTAL_ACT)   },
              { label: "Variables",     valor: TOTAL_VAR,     color: t.accentLight, pct: pct(TOTAL_VAR)   },
              { label: "TOTAL",         valor: TOTAL_GENERAL, color: t.gold,        pct: null, total: true },
            ].map((item, i) => (
              <div className="total-card" key={i} style={{
                background: item.total ? "rgba(10,5,18,0.92)" : "rgba(20,10,30,0.82)",
                border: `1px solid ${item.total ? "rgba(201,168,76,0.35)" : "rgba(201,184,212,0.12)"}`,
                borderRadius: "10px",
                padding: "16px",
              }}>
                <p style={{ fontFamily: t.fontUI, fontSize: "8px", letterSpacing: "0.16em", textTransform: "uppercase", color: item.total ? "rgba(201,168,76,0.5)" : "rgba(201,184,212,0.4)", margin: "0 0 6px", fontWeight: 600 }}>
                  {item.label}
                </p>
                <p style={{ fontFamily: t.fontDisplay, fontSize: item.total ? "26px" : "20px", color: item.color, margin: 0, fontWeight: 400, lineHeight: 1 }}>
                  {fmt(item.valor)}
                </p>
                {item.pct && (
                  <p style={{ fontFamily: t.fontUI, fontSize: "9px", color: "rgba(201,184,212,0.3)", margin: "5px 0 0" }}>{item.pct} del total</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CONTENIDO */}
      <div style={{ maxWidth: "960px", margin: "0 auto", padding: isDesktop ? "48px 24px 80px" : "32px 24px 60px" }}>

        {/* Gráfico + nota */}
        <div style={{ display: isDesktop ? "grid" : "flex", gridTemplateColumns: "1fr 1fr", flexDirection: "column", gap: "24px", marginBottom: "36px" }}>
          <div style={{ background: "#FFF", borderRadius: "14px", border: `1px solid ${t.border}`, padding: "24px" }}>
            <p style={{ fontFamily: t.fontUI, fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: t.textMuted, margin: "0 0 20px", fontWeight: 600 }}>
              Distribución del gasto
            </p>
            <BarChart isDesktop={isDesktop} />
          </div>

          <div style={{ background: t.bgCard, borderRadius: "14px", border: `1px solid ${t.border}`, padding: "24px", display: "flex", flexDirection: "column", gap: "14px" }}>
            <p style={{ fontFamily: t.fontUI, fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: t.textMuted, margin: 0, fontWeight: 600 }}>
              Datos del grupo
            </p>
            {[
              { label: "Personas",          valor: `${PERSONAS} viajeros`                  },
              { label: "Duración",          valor: "16 días · 15 noches"                    },
              { label: "Alojamiento",       valor: "Airbnb · La Candelaria, Escobar"        },
              { label: "Transporte",        valor: "Vehículo rentado · 14 días"             },
              { label: "Costo por persona", valor: fmt(Math.round(TOTAL_GENERAL / PERSONAS)) },
            ].map((row, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", paddingBottom: i < 4 ? "12px" : 0, borderBottom: i < 4 ? `1px solid ${t.border}` : "none" }}>
                <span style={{ fontFamily: t.fontBody, fontSize: "16px", color: t.textMuted }}>{row.label}</span>
                <span style={{ fontFamily: t.fontUI, fontSize: "12px", fontWeight: 600, color: t.accent }}>{row.valor}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tablas */}
        <SectionTable
          titulo="Costos Fijos"
          icono={<Home size={15} color={t.accent} strokeWidth={1.4} />}
          filas={FIJOS}
          subtotal={TOTAL_FIJOS}
          isDesktop={isDesktop}
        />
        <SectionTable
          titulo="Actividades"
          icono={<Zap size={15} color={t.gold} strokeWidth={1.4} />}
          filas={ACTIVIDADES}
          subtotal={TOTAL_ACT}
          isDesktop={isDesktop}
        />
        <SectionTable
          titulo="Gastos Variables"
          icono={<ShoppingBag size={15} color={t.accentLight} strokeWidth={1.4} />}
          filas={VARIABLES}
          subtotal={TOTAL_VAR}
          isDesktop={isDesktop}
        />

        {/* TOTAL FINAL */}
        <div style={{
          background: t.bgDark,
          borderRadius: "14px",
          padding: "28px 26px",
          display: "flex", flexDirection: "column", gap: "16px",
        }}>
          <div>
            <p style={{ fontFamily: t.fontUI, fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(201,184,212,0.4)", margin: "0 0 4px", fontWeight: 600 }}>
              Total estimado del viaje
            </p>
            <p style={{ fontFamily: t.fontDisplay, fontSize: isDesktop ? "44px" : "36px", color: "#F7F3EE", margin: 0, fontWeight: 400, lineHeight: 1 }}>
              {fmt(TOTAL_GENERAL)}
            </p>
          </div>
          <div>
            <p style={{ fontFamily: t.fontUI, fontSize: "9px", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(201,184,212,0.35)", margin: "0 0 4px" }}>
              Estimado por persona
            </p>
            <p style={{ fontFamily: t.fontDisplay, fontSize: "26px", color: t.gold, margin: 0, fontWeight: 400 }}>
              {fmt(Math.round(TOTAL_GENERAL / PERSONAS))}
            </p>
          </div>
        </div>

        {/* Nota aclaratoria */}
        <div style={{ marginTop: "20px", display: "flex", alignItems: "flex-start", gap: "10px", padding: "16px 18px", background: t.bgCard, borderRadius: "10px", border: `1px solid ${t.border}` }}>
          <Info size={14} color={t.textMuted} strokeWidth={1.4} style={{ flexShrink: 0, marginTop: "2px" }} />
          <p style={{ fontFamily: t.fontBody, fontSize: "16px", color: t.textMuted, margin: 0, lineHeight: 1.6 }}>
            Este presupuesto es orientativo. Los montos pueden variar según consumos reales, clima y decisiones del grupo durante el viaje.
          </p>
        </div>
      </div>
    </div>
  );
}
