"use client";

import { useState, useEffect } from "react";
import { Eye, EyeOff, Lock, ChevronLeft, Plane, Car, Home, Utensils, Wine, Waves, PawPrint, Coffee, Landmark, ShoppingBag, TreePine, Bike, Flower2, Palette, Sparkles, Building2, Brain, Ship, Wheat, Luggage, Heart, Leaf, Key, Star, Package, MapPin } from "lucide-react";
import NavBar from "../components/NavBar";

const PASSWORD = "argentina2025";

// Mapa emoji → Lucide icon (para limpiar el sistema de iconografía)
function ActIcon({ emoji, size = 15, color }) {
  const c = color || "#6B5E78";
  const p = { size, color: c, strokeWidth: 1.4, style: { flexShrink: 0, marginTop: "2px" } };
  const map = {
    "✈️": <Plane      {...p} />,
    "🚗": <Car        {...p} />,
    "🏡": <Home       {...p} />,
    "🥩": <Utensils   {...p} />,
    "🍽️": <Utensils   {...p} />,
    "🥂": <Wine       {...p} />,
    "🏊": <Waves      {...p} />,
    "🐾": <PawPrint   {...p} />,
    "🍦": <Coffee     {...p} />,
    "🏛️": <Landmark   {...p} />,
    "🚶": <MapPin     {...p} />,
    "🛍️": <ShoppingBag {...p} />,
    "🧺": <Package    {...p} />,
    "🏮": <Star       {...p} />,
    "🌳": <TreePine   {...p} />,
    "🚲": <Bike       {...p} />,
    "🌸": <Flower2    {...p} />,
    "🎨": <Palette    {...p} />,
    "🎆": <Sparkles   {...p} />,
    "🌉": <Building2  {...p} />,
    "🧠": <Brain      {...p} />,
    "⛵": <Ship       {...p} />,
    "🌾": <Wheat      {...p} />,
    "🐎": <Star       {...p} />,
    "🧳": <Luggage    {...p} />,
    "❤️": <Heart      {...p} color="#9B2335" />,
    "🌵": <Leaf       {...p} />,
    "🌿": <Leaf       {...p} />,
    "🔑": <Key        {...p} />,
    "🎉": <Sparkles   {...p} />,
  };
  return map[emoji] || null;
}

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

// Ciudades por código IATA
const CIUDADES = {
  SDQ: { nombre: "Santo Domingo",  pais: "República Dominicana" },
  BOG: { nombre: "Bogotá",         pais: "Colombia"             },
  EZE: { nombre: "Buenos Aires",   pais: "Argentina"            },
  JFK: { nombre: "New York",       pais: "Estados Unidos"       },
};

// ============================================================
// VUELOS
// ============================================================
const vuelos = [
  {
    pais: "do",
    grupo: "Grupo República Dominicana",
    llegada: {
      aerolinea: "Avianca",
      origen: "SDQ", destino: "EZE", via: "BOG",
      aeropuerto: "Ezeiza · Ministro Pistarini",
      saleDe: "SDQ", saleFecha: "Lun 22/12/2025", saleHora: "17:45",
      llegaA: "EZE", llegaFecha: "Mar 23/12/2025", llegaHora: "5:50 AM",
      terminal: "Terminal 1 (SDQ)",
      vuelos: ["AV251", "AV87"],
      segmentos: [
        { tipo: "salida",  codigo: "AV251", origen: "SDQ", terminal: "Terminal 1",  fecha: "Lun 22/12/2025", hora: "17:45"   },
        { tipo: "escala",  codigo: "AV87",  origen: "BOG", terminal: "Terminal IA", fecha: "Lun 22/12/2025", hora: "21:30"   },
        { tipo: "llegada", codigo: "AV87",  origen: "EZE", terminal: "",            fecha: "Mar 23/12/2025", hora: "5:50 AM" },
      ],
    },
    salida: {
      aerolinea: "Avianca",
      origen: "EZE", destino: "SDQ", via: "BOG",
      aeropuerto: "Santo Domingo · Las Américas",
      saleDe: "EZE", saleFecha: "Mar 06/01/2026", saleHora: "1:40 AM",
      llegaA: "SDQ", llegaFecha: "Mar 06/01/2026", llegaHora: "11:25 AM",
      terminal: "Terminal P (EZE)",
      vuelos: ["AV218", "AV208"],
      segmentos: [
        { tipo: "salida",  codigo: "AV218", origen: "EZE", terminal: "Terminal P",  fecha: "Mar 06/01/2026", hora: "1:40 AM"  },
        { tipo: "escala",  codigo: "AV208", origen: "BOG", terminal: "Terminal 1",  fecha: "Mar 06/01/2026", hora: "7:50 AM"  },
        { tipo: "llegada", codigo: "AV208", origen: "SDQ", terminal: "",            fecha: "Mar 06/01/2026", hora: "11:25 AM" },
      ],
    },
  },
  {
    pais: "us",
    grupo: "Grupo Estados Unidos",
    llegada: {
      aerolinea: "American Airlines",
      origen: "JFK", destino: "EZE", via: null,
      aeropuerto: "Ezeiza · Ministro Pistarini",
      saleDe: "JFK", saleFecha: "Mar 23/12/2025", saleHora: "10:10 PM",
      llegaA: "EZE", llegaFecha: "Mié 24/12/2025", llegaHora: "10:50 AM",
      terminal: "",
      vuelos: ["AA 953"],
      segmentos: [
        { tipo: "salida",  codigo: "AA 953", origen: "JFK", terminal: "", fecha: "Mar 23/12/2025", hora: "10:10 PM" },
        { tipo: "llegada", codigo: "AA 953", origen: "EZE", terminal: "", fecha: "Mié 24/12/2025", hora: "10:50 AM" },
      ],
    },
    salida: {
      aerolinea: "American Airlines",
      origen: "EZE", destino: "JFK", via: null,
      aeropuerto: "New York · JFK Kennedy Airport",
      saleDe: "EZE", saleFecha: "Mié 07/01/2026", saleHora: "9:00 PM",
      llegaA: "JFK", llegaFecha: "Jue 08/01/2026", llegaHora: "5:50 AM",
      terminal: "",
      vuelos: ["AA 954"],
      segmentos: [
        { tipo: "salida",  codigo: "AA 954", origen: "EZE", terminal: "", fecha: "Mié 07/01/2026", hora: "9:00 PM"  },
        { tipo: "llegada", codigo: "AA 954", origen: "JFK", terminal: "", fecha: "Jue 08/01/2026", hora: "5:50 AM"  },
      ],
    },
  },
];

// ============================================================
// CALENDARIO
// ============================================================
const calendario = [
  {
    dia: 1, diaSemana: "Mar", fecha: "23 · 12 · 2025",
    titulo: "Llegada · Grupo República Dominicana",
    iconos: ["✈️", "🚗", "🏡"],
    actividades: [
      { emoji: "✈️", texto: "Llegada en EZE · Vuelo AV87 · 5:50 AM", bold: true },
      { emoji: "🚗", texto: "Traslado Ezeiza → Escobar con los anfitriones" },
      { emoji: "🏡", texto: "Instalación y descanso en casa" },
    ],
  },
  {
    dia: 2, diaSemana: "Mié", fecha: "24 · 12 · 2025",
    titulo: "Llegada · Grupo EE.UU. · Nochebuena",
    iconos: ["✈️", "🚗", "🥩", "🥂"],
    actividades: [
      { emoji: "✈️", texto: "Llegada en EZE · Vuelo AA 953 · 10:50 AM", bold: true },
      { emoji: "🚗", texto: "Retiro del vehículo rentado en Ezeiza" },
      { emoji: "🚗", texto: "Traslado hacia Escobar" },
      { emoji: "🥩", texto: "Nochebuena en casa · Asado y comida en familia" },
      { emoji: "🥂", texto: "Brindis de Navidad" },
    ],
  },
  {
    dia: 3, diaSemana: "Jue", fecha: "25 · 12 · 2025",
    titulo: "Navidad · Día en casa",
    iconos: ["🏡", "🏊", "🍽️"],
    actividades: [
      { emoji: "🏡", texto: "Día completo en casa" },
      { emoji: "🏊", texto: "Piscina y descanso" },
      { emoji: "🍽️", texto: "Comidas caseras en familia" },
    ],
  },
  {
    dia: 4, diaSemana: "Vie", fecha: "26 · 12 · 2025",
    titulo: "Bioparque Temaikèn",
    iconos: ["🐾", "🍽️", "🍦"],
    actividades: [
      { emoji: "🚗", texto: "Salida hacia Temaikèn" },
      { emoji: "🐾", texto: "Visita al Bioparque Temaikèn · $42 USD/pp" },
      { emoji: "🍽️", texto: "Almuerzo dentro del parque" },
      { emoji: "🍦", texto: "Helado en plaza Maschwitz / Villanueva" },
      { emoji: "🚗", texto: "Regreso a Escobar" },
    ],
  },
  {
    dia: 5, diaSemana: "Sáb", fecha: "27 · 12 · 2025",
    titulo: "Buenos Aires · Centro e Historia",
    iconos: ["🚗", "🏛️", "🚶", "🛍️"],
    actividades: [
      { emoji: "🚗", texto: "Salida hacia Buenos Aires centro" },
      { emoji: "🏛️", texto: "Plaza de Mayo · Casa Rosada · Catedral Metropolitana" },
      { emoji: "🚶", texto: "Calle Florida y Galerías Pacífico" },
      { emoji: "🛍️", texto: "Palermo Soho · Plaza Serrano" },
      { emoji: "🚗", texto: "Regreso a Escobar" },
    ],
  },
  {
    dia: 6, diaSemana: "Dom", fecha: "28 · 12 · 2025",
    titulo: "San Telmo · Feria y Mercado",
    iconos: ["🚗", "🛍️", "🍽️", "🧺"],
    actividades: [
      { emoji: "🚗", texto: "Salida hacia San Telmo" },
      { emoji: "🛍️", texto: "Mercado de antigüedades · Feria dominical" },
      { emoji: "🍽️", texto: "Almuerzo en el Mercado de San Telmo" },
      { emoji: "🧺", texto: "Plaza Dorrego · Arte urbano y murales" },
      { emoji: "🚗", texto: "Regreso a Escobar" },
    ],
  },
  {
    dia: 7, diaSemana: "Lun", fecha: "29 · 12 · 2025",
    titulo: "Barrio Chino · Bosques de Palermo",
    iconos: ["🚗", "🏮", "🌳", "🚲"],
    actividades: [
      { emoji: "🚗", texto: "Salida hacia Belgrano" },
      { emoji: "🏮", texto: "Barrio Chino · Mercados y gastronomía asiática" },
      { emoji: "🍽️", texto: "Almuerzo local en Belgrano" },
      { emoji: "🌳", texto: "Bosques de Palermo · Lagos y espacios verdes" },
      { emoji: "🚲", texto: "Paseo en bicicleta o caminata" },
      { emoji: "🚗", texto: "Regreso a Escobar" },
    ],
  },
  {
    dia: 8, diaSemana: "Mar", fecha: "30 · 12 · 2025",
    titulo: "Jardín Japonés de Escobar · MALBA",
    iconos: ["🌸", "🍽️", "🎨", "🏡"],
    actividades: [
      { emoji: "🌸", texto: "Visita al Jardín Japonés de Escobar · $2 USD/pp" },
      { emoji: "🍽️", texto: "Almuerzo dentro del predio" },
      { emoji: "🚗", texto: "Traslado hacia Palermo" },
      { emoji: "🎨", texto: "MALBA – Museo Latinoamericano de Buenos Aires · Puertos" },
      { emoji: "🏡", texto: "Regreso a casa y descanso" },
    ],
  },
  {
    dia: 9, diaSemana: "Mié", fecha: "31 · 12 · 2025",
    titulo: "Nochevieja · Celebración de Año Nuevo",
    iconos: ["🥂", "🎆"],
    actividades: [
      { emoji: "🏡", texto: "Día tranquilo en casa · Preparación para la noche" },
      { emoji: "🍽️", texto: "Cena especial de Año Nuevo en familia" },
      { emoji: "🥂", texto: "Brindis de medianoche" },
      { emoji: "🎆", texto: "Celebración y fuegos artificiales" },
    ],
  },
  {
    dia: 10, diaSemana: "Jue", fecha: "01 · 01 · 2026",
    titulo: "Año Nuevo · Caminito y Puerto Madero",
    iconos: ["🚗", "🎨", "🍽️", "🌉"],
    actividades: [
      { emoji: "🚗", texto: "Salida hacia La Boca – Caminito", bold: true },
      { emoji: "🎨", texto: "Recorrido breve por Caminito" },
      { emoji: "🍽️", texto: "Almuerzo en la calle de Caminito" },
      { emoji: "🚗", texto: "Traslado hacia Puerto Madero" },
      { emoji: "🌉", texto: "Paseo por Puerto Madero" },
    ],
  },
  {
    dia: 11, diaSemana: "Vie", fecha: "02 · 01 · 2026",
    titulo: "Recoleta · Museo Prohibido No Tocar",
    iconos: ["🧠", "🎨", "🍽️", "🚗"],
    actividades: [
      { emoji: "🚗", texto: "Salida hacia el barrio de Recoleta", bold: true },
      { emoji: "🧠", texto: "Visita al Museo Prohibido No Tocar · $9 USD/pp" },
      { emoji: "🍽️", texto: "Almuerzo dentro del predio" },
      { emoji: "🚗", texto: "Regreso a Escobar por la tarde" },
    ],
  },
  {
    dia: 12, diaSemana: "Sáb", fecha: "03 · 01 · 2026",
    titulo: "Tigre · Delta del Paraná",
    iconos: ["🚗", "⛵", "🛍️", "🍽️"],
    actividades: [
      { emoji: "🚗", texto: "Salida hacia Tigre", bold: true },
      { emoji: "⛵", texto: "Paseo en lancha por el Delta del Paraná · $15 USD/pp" },
      { emoji: "🛍️", texto: "Recorrido por el Puerto de Frutos" },
      { emoji: "🍽️", texto: "Almuerzo dentro del predio" },
      { emoji: "🚗", texto: "Regreso a Escobar por la tarde" },
    ],
  },
  {
    dia: 13, diaSemana: "Dom", fecha: "04 · 01 · 2026",
    titulo: "San Antonio de Areco · Día de campo",
    iconos: ["🌾", "🐂", "🚗"],
    actividades: [
      { emoji: "🚗", texto: "Salida hacia San Antonio de Areco", bold: true },
      { emoji: "🌾", texto: "La Caballería de Keen · Día de campo · $28 USD/pp" },
      { emoji: "🍽️", texto: "Almuerzo criollo y actividades al aire libre" },
      { emoji: "🐎", texto: "Paseos a caballo y contacto con animales de granja" },
      { emoji: "🚗", texto: "Regreso a Escobar por la tarde" },
    ],
  },
  {
    dia: 14, diaSemana: "Lun", fecha: "05 · 01 · 2026",
    titulo: "Salida internacional · Grupo República Dominicana",
    iconos: ["🏡", "🧳", "✈️", "❤️"],
    grupoBadge: "do",
    actividades: [
      { emoji: "🏡", texto: "Día libre en casa · Descanso y tiempo compartido" },
      { emoji: "🧳", texto: "Preparación final de equipaje" },
      { emoji: "🚗", texto: "Traslado al Aeropuerto Internacional de Ezeiza (EZE)", bold: true },
      { emoji: "✈️", texto: "Salida grupo RD · Vuelo AV218 · 1:40 AM (madrugada del 6)" },
      { emoji: "❤️", texto: "Despedida del grupo" },
    ],
  },
  {
    dia: 15, diaSemana: "Mar", fecha: "06 · 01 · 2026",
    titulo: "Escobar · Paseo de despedida",
    iconos: ["🌵", "🌿", "🍦", "🚗"],
    actividades: [
      { emoji: "🌵", texto: "Visita al Vivero Rauscher – Parque de Cactus (Matheu)" },
      { emoji: "🌿", texto: "Recorrido libre por el cactario y áreas verdes" },
      { emoji: "🍦", texto: "Helado y paseo por la plaza de Maschwitz / Villanueva" },
      { emoji: "🏡", texto: "Regreso a casa · Descanso y cierre del viaje" },
    ],
  },
  {
    dia: 16, diaSemana: "Mié", fecha: "07 · 01 · 2026",
    titulo: "Salida internacional · Grupo Estados Unidos",
    iconos: ["🏡", "🧳", "✈️", "🔑", "❤️"],
    grupoBadge: "us",
    actividades: [
      { emoji: "🏡", texto: "Día de descanso y preparación final" },
      { emoji: "🧳", texto: "Preparación final de equipaje" },
      { emoji: "🚗", texto: "Traslado al Aeropuerto Internacional de Ezeiza (EZE)", bold: true },
      { emoji: "🔑", texto: "Devolución del vehículo rentado en el aeropuerto" },
      { emoji: "✈️", texto: "Salida grupo EE.UU. · Vuelo AA 954 · 9:00 PM" },
      { emoji: "❤️", texto: "Despedida del grupo" },
    ],
  },
];

// ============================================================
// CSS
// ============================================================
const CSS = `
  *, *::before, *::after { box-sizing: border-box; }
  body { margin: 0; }

  .boarding-pass {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  .boarding-pass:hover {
    transform: translateY(-4px) rotate(0.3deg);
    box-shadow: 0 20px 60px rgba(0,0,0,0.35);
  }

  .day-card {
    transition: box-shadow 0.25s, transform 0.25s;
  }
  .day-card:hover {
    box-shadow: 0 12px 40px rgba(30,18,40,0.1);
    transform: translateY(-2px);
  }

  .tab-btn { transition: background 0.2s, color 0.2s; }

  .password-input { outline: none; transition: border-color 0.2s; }
  .password-input:focus { border-color: #C9B8D4 !important; }

  @keyframes shake {
    0%,100% { transform: translateX(0); }
    20%,60%  { transform: translateX(-6px); }
    40%,80%  { transform: translateX(6px); }
  }
`;

// ============================================================
// BARCODE SVG decorativo
// ============================================================
function Barcode({ color = "#C9B8D4" }) {
  const bars = [3,1,2,1,4,1,2,3,1,2,1,3,2,1,3,1,2,1,4,2,1,2,3,1,2,1,3,1,2];
  let x = 0;
  const rects = [];
  bars.forEach((w, i) => {
    if (i % 2 === 0) {
      rects.push(<rect key={i} x={x} y={0} width={w} height={44} fill={color} opacity={0.7} />);
    }
    x += w + 1;
  });

  return (
    <svg width="64" height="44" viewBox={`0 0 ${x} 44`} preserveAspectRatio="none" style={{ width: "64px", height: "44px" }}>
      {rects}
    </svg>
  );
}

// ============================================================
// BOARDING PASS
// ============================================================
function BoardingPass({ grupo, vuelo, tipo }) {
  const isLlegada   = tipo === "llegada";
  const accentColor = isLlegada ? t.accentLight : t.gold;
  const borderColor = isLlegada ? "rgba(201,184,212,0.18)" : "rgba(201,168,76,0.18)";
  const bgStripe    = isLlegada ? "rgba(201,184,212,0.06)" : "rgba(201,168,76,0.06)";
  const ciudadOrig  = CIUDADES[vuelo.origen]  || { nombre: vuelo.origen,  pais: "" };
  const ciudadDest  = CIUDADES[vuelo.destino] || { nombre: vuelo.destino, pais: "" };

  return (
    <div className="boarding-pass" style={{
      display: "flex",
      background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.03) 100%)",
      border: `1px solid ${borderColor}`,
      borderRadius: "16px",
      overflow: "hidden",
      position: "relative",
    }}>

      {/* ── CUERPO PRINCIPAL ── */}
      <div style={{ flex: 1, padding: "22px 22px 18px" }}>

        {/* Fila 1: aerolínea + badge dirección */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <img
              src={`https://flagcdn.com/w40/${grupo.pais}.png`}
              srcSet={`https://flagcdn.com/w80/${grupo.pais}.png 2x`}
              width={26} height={17}
              alt={grupo.grupo}
              style={{ borderRadius: "3px", objectFit: "cover" }}
            />
            <div>
              <p style={{ fontFamily: t.fontUI, fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#F7F3EE", margin: 0, fontWeight: 700 }}>
                {vuelo.aerolinea.toUpperCase()}
              </p>
              <p style={{ fontFamily: t.fontUI, fontSize: "9px", color: "rgba(201,184,212,0.4)", margin: 0, letterSpacing: "0.04em" }}>
                {grupo.grupo}
              </p>
            </div>
          </div>
          <span style={{
            fontFamily: t.fontUI, fontSize: "9px", fontWeight: 700,
            letterSpacing: "0.18em", textTransform: "uppercase",
            color: accentColor,
            border: `1px solid ${accentColor}`,
            padding: "3px 10px", borderRadius: "4px",
            opacity: 0.85,
          }}>
            {isLlegada ? "↓ LLEGADA" : "↑ SALIDA"}
          </span>
        </div>

        {/* Fila 2: IATA grande FROM → TO */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
          {/* Origen */}
          <div>
            <p style={{ fontFamily: t.fontDisplay, fontSize: "44px", color: "#F7F3EE", margin: 0, lineHeight: 1, fontWeight: 400, letterSpacing: "-0.02em" }}>
              {vuelo.origen}
            </p>
            <p style={{ fontFamily: t.fontUI, fontSize: "10px", color: "rgba(247,243,238,0.35)", margin: "3px 0 0", letterSpacing: "0.02em" }}>
              {ciudadOrig.nombre}
            </p>
          </div>

          {/* Línea de vuelo */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "5px" }}>
            {vuelo.via && (
              <span style={{ fontFamily: t.fontUI, fontSize: "8px", letterSpacing: "0.12em", color: "rgba(201,184,212,0.4)", textTransform: "uppercase" }}>
                vía {vuelo.via}
              </span>
            )}
            <div style={{ width: "100%", position: "relative", height: "1px", background: "rgba(255,255,255,0.1)" }}>
              <div style={{ position: "absolute", left: 0, top: "-3px", width: "6px", height: "6px", borderRadius: "50%", background: "rgba(255,255,255,0.2)" }} />
              <Plane size={14} color="rgba(255,255,255,0.35)" style={{ position: "absolute", top: "-7px", left: "50%", transform: "translateX(-50%)" }} />
              <div style={{ position: "absolute", right: 0, top: "-3px", width: "6px", height: "6px", borderRadius: "50%", background: "rgba(255,255,255,0.2)" }} />
            </div>
            {!vuelo.via && <span style={{ fontFamily: t.fontUI, fontSize: "8px", color: "rgba(201,184,212,0.25)", letterSpacing: "0.1em" }}>DIRECTO</span>}
          </div>

          {/* Destino */}
          <div style={{ textAlign: "right" }}>
            <p style={{ fontFamily: t.fontDisplay, fontSize: "44px", color: "#F7F3EE", margin: 0, lineHeight: 1, fontWeight: 400, letterSpacing: "-0.02em" }}>
              {vuelo.destino}
            </p>
            <p style={{ fontFamily: t.fontUI, fontSize: "10px", color: "rgba(247,243,238,0.35)", margin: "3px 0 0", letterSpacing: "0.02em" }}>
              {ciudadDest.nombre}
            </p>
          </div>
        </div>

        {/* Fila 3: Horarios destacados */}
        <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 0", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)", marginBottom: "14px" }}>
          <div>
            <p style={{ fontFamily: t.fontUI, fontSize: "8px", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(201,184,212,0.4)", margin: "0 0 3px" }}>Sale</p>
            <p style={{ fontFamily: t.fontDisplay, fontSize: "30px", color: t.alert, margin: 0, lineHeight: 1, fontWeight: 400 }}>
              {vuelo.saleHora}
            </p>
            <p style={{ fontFamily: t.fontUI, fontSize: "9px", color: "rgba(247,243,238,0.3)", margin: "3px 0 0" }}>{vuelo.saleFecha}</p>
          </div>
          <div style={{ textAlign: "center", alignSelf: "center" }}>
            <p style={{ fontFamily: t.fontUI, fontSize: "8px", letterSpacing: "0.1em", color: "rgba(201,184,212,0.25)", margin: 0, textTransform: "uppercase" }}>
              {vuelo.via ? "con escala" : "sin escala"}
            </p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ fontFamily: t.fontUI, fontSize: "8px", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(201,184,212,0.4)", margin: "0 0 3px" }}>Llega</p>
            <p style={{ fontFamily: t.fontDisplay, fontSize: "30px", color: accentColor, margin: 0, lineHeight: 1, fontWeight: 400 }}>
              {vuelo.llegaHora}
            </p>
            <p style={{ fontFamily: t.fontUI, fontSize: "9px", color: "rgba(247,243,238,0.3)", margin: "3px 0 0" }}>{vuelo.llegaFecha}</p>
          </div>
        </div>

        {/* Fila 4: Detalles técnicos */}
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          <div>
            <p style={{ fontFamily: t.fontUI, fontSize: "8px", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(201,184,212,0.35)", margin: "0 0 2px" }}>
              {vuelo.vuelos.length > 1 ? "Vuelos" : "Vuelo"}
            </p>
            <p style={{ fontFamily: t.fontUI, fontSize: "12px", color: "rgba(247,243,238,0.75)", margin: 0, fontWeight: 600, letterSpacing: "0.04em" }}>
              {vuelo.vuelos.join(" · ")}
            </p>
          </div>
          {vuelo.terminal && (
            <div>
              <p style={{ fontFamily: t.fontUI, fontSize: "8px", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(201,184,212,0.35)", margin: "0 0 2px" }}>Terminal</p>
              <p style={{ fontFamily: t.fontUI, fontSize: "12px", color: "rgba(247,243,238,0.75)", margin: 0, fontWeight: 600 }}>
                {vuelo.terminal}
              </p>
            </div>
          )}
          <div>
            <p style={{ fontFamily: t.fontUI, fontSize: "8px", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(201,184,212,0.35)", margin: "0 0 2px" }}>Aeropuerto</p>
            <p style={{ fontFamily: t.fontUI, fontSize: "12px", color: "rgba(247,243,238,0.75)", margin: 0, fontWeight: 600 }}>
              {vuelo.aeropuerto}
            </p>
          </div>
        </div>
      </div>

      {/* ── PERFORACIÓN ── */}
      <div style={{ width: "17px", position: "relative", flexShrink: 0 }}>
        {/* Muescas superior e inferior */}
        <div style={{ position: "absolute", top: "-1px",  left: "-8px", width: "16px", height: "16px", borderRadius: "50%", background: t.bgDeep }} />
        <div style={{ position: "absolute", bottom: "-1px", left: "-8px", width: "16px", height: "16px", borderRadius: "50%", background: t.bgDeep }} />
        {/* Línea punteada */}
        <div style={{
          position: "absolute", left: "8px", top: "12px", bottom: "12px", width: "1px",
          backgroundImage: "repeating-linear-gradient(to bottom, rgba(255,255,255,0.14) 0px, rgba(255,255,255,0.14) 5px, transparent 5px, transparent 10px)",
        }} />
      </div>

      {/* ── STUB ── */}
      <div style={{ width: "84px", flexShrink: 0, padding: "22px 14px 18px", background: bgStripe, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
        <div style={{ textAlign: "center" }}>
          <p style={{ fontFamily: t.fontUI, fontSize: "7px", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(201,184,212,0.35)", margin: "0 0 4px" }}>Fecha</p>
          <p style={{ fontFamily: t.fontDisplay, fontSize: "13px", color: accentColor, margin: 0, fontWeight: 400, lineHeight: 1.2 }}>
            {vuelo.saleFecha.split(" ").slice(1).join(" ")}
          </p>
        </div>
        <div style={{ textAlign: "center" }}>
          <p style={{ fontFamily: t.fontUI, fontSize: "7px", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(201,184,212,0.35)", margin: "0 0 4px" }}>
            {vuelo.vuelos.length > 1 ? "1er vuelo" : "Vuelo"}
          </p>
          <p style={{ fontFamily: t.fontUI, fontSize: "12px", color: "#F7F3EE", margin: 0, fontWeight: 700, letterSpacing: "0.04em" }}>
            {vuelo.vuelos[0]}
          </p>
        </div>
        <Barcode color={accentColor} />
        <p style={{ fontFamily: t.fontUI, fontSize: "7px", color: "rgba(201,184,212,0.3)", margin: 0, letterSpacing: "0.1em", textAlign: "center" }}>
          {vuelo.origen} → {vuelo.destino}
        </p>
      </div>
    </div>
  );
}

// ============================================================
// NOTA LOGÍSTICA
// ============================================================
function NotaLogistica() {
  return (
    <div style={{ background: "rgba(201,168,76,0.07)", border: "1px solid rgba(201,168,76,0.18)", borderRadius: "10px", padding: "18px 20px", marginTop: "32px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
        <Car size={15} color={t.gold} strokeWidth={1.3} />
        <p style={{ fontFamily: t.fontUI, fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: t.gold, margin: 0, fontWeight: 700 }}>
          Logística de transporte
        </p>
      </div>
      {[
        "El grupo de República Dominicana será retirado en Ezeiza por los anfitriones.",
        "El vehículo rentado se retira en Ezeiza al momento de la llegada del grupo de EE.UU.",
        "El vehículo se usa como medio principal de traslado durante todo el viaje.",
        "La devolución del vehículo se realiza en Ezeiza el día de salida del grupo de EE.UU.",
      ].map((txt, i) => (
        <p key={i} style={{ fontFamily: t.fontBody, fontSize: "16px", color: "rgba(247,243,238,0.6)", margin: i < 3 ? "0 0 7px" : 0, lineHeight: 1.5 }}>
          · {txt}
        </p>
      ))}
    </div>
  );
}

// ============================================================
// PASSWORD GATE
// ============================================================
function PasswordGate({ onUnlock }) {
  const [value, setValue] = useState("");
  const [show, setShow]   = useState(false);
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (value === PASSWORD) {
      sessionStorage.setItem("viaje_auth", "1");
      onUnlock();
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  }

  return (
    <div style={{ minHeight: "100svh", background: t.bgDark, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
      <div style={{ width: "100%", maxWidth: "380px", textAlign: "center" }}>
        <div style={{ width: "52px", height: "52px", borderRadius: "50%", background: "rgba(201,184,212,0.1)", border: "1px solid rgba(201,184,212,0.2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 28px" }}>
          <Lock size={22} color={t.accentLight} strokeWidth={1.2} />
        </div>
        <p style={{ fontFamily: t.fontDisplay, fontSize: "28px", color: "#F7F3EE", margin: "0 0 6px", fontWeight: 400 }}>
          Sección privada
        </p>
        <p style={{ fontFamily: t.fontUI, fontSize: "11px", color: "rgba(201,184,212,0.45)", letterSpacing: "0.1em", margin: "0 0 36px" }}>
          Vuelos e Itinerario · Navidad y Año Nuevo en Argentina
        </p>
        <form onSubmit={handleSubmit}>
          <div style={{ position: "relative", marginBottom: "16px" }}>
            <input
              className="password-input"
              type={show ? "text" : "password"}
              value={value}
              onChange={e => { setValue(e.target.value); setError(false); }}
              placeholder="Contraseña"
              style={{
                width: "100%", padding: "14px 48px 14px 18px",
                background: "rgba(255,255,255,0.05)",
                border: `1px solid ${error ? t.alert : "rgba(201,184,212,0.18)"}`,
                borderRadius: "10px",
                fontFamily: t.fontUI, fontSize: "15px", color: "#F7F3EE",
                animation: shake ? "shake 0.4s ease" : "none",
              }}
            />
            <button type="button" onClick={() => setShow(!show)} style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", padding: 0, lineHeight: 0 }}>
              {show ? <EyeOff size={18} color="rgba(201,184,212,0.4)" strokeWidth={1.3} /> : <Eye size={18} color="rgba(201,184,212,0.4)" strokeWidth={1.3} />}
            </button>
          </div>
          {error && <p style={{ fontFamily: t.fontUI, fontSize: "12px", color: t.alert, margin: "0 0 16px", textAlign: "left" }}>Contraseña incorrecta.</p>}
          <button type="submit" style={{ width: "100%", padding: "15px", background: t.accentLight, color: t.bgDark, border: "none", borderRadius: "10px", fontFamily: t.fontUI, fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 700, cursor: "pointer" }}>
            Ingresar
          </button>
        </form>
        <a href="/" style={{ display: "inline-flex", alignItems: "center", gap: "6px", marginTop: "28px", fontFamily: t.fontUI, fontSize: "11px", color: "rgba(201,184,212,0.3)", textDecoration: "none", letterSpacing: "0.1em" }}>
          <ChevronLeft size={14} color="rgba(201,184,212,0.3)" />
          Volver al inicio
        </a>
      </div>
    </div>
  );
}


// ============================================================
// DAY CARD
// ============================================================
function DayCard({ day, index }) {
  return (
    <div className="day-card" style={{ background: index % 2 === 0 ? t.bg : t.bgCard, borderRadius: "12px", padding: "26px 22px", marginBottom: "10px", border: `1px solid ${t.border}` }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "16px" }}>
        <div>
          <p style={{ fontFamily: t.fontUI, fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: t.accent, margin: "0 0 4px", fontWeight: 600, opacity: 0.55 }}>{day.diaSemana}</p>
          <div style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
            <span style={{ fontFamily: t.fontDisplay, fontSize: "40px", fontWeight: 400, color: t.accent, lineHeight: 1 }}>{String(day.dia).padStart(2, "0")}</span>
            <span style={{ fontFamily: t.fontUI, fontSize: "11px", color: t.textMuted, letterSpacing: "0.06em" }}>{day.fecha}</span>
          </div>
        </div>
        {day.grupoBadge && (
          <img src={`https://flagcdn.com/w40/${day.grupoBadge}.png`} srcSet={`https://flagcdn.com/w80/${day.grupoBadge}.png 2x`} width={26} height={17} alt="" style={{ borderRadius: "2px", objectFit: "cover" }} />
        )}
      </div>
      <p style={{ fontFamily: t.fontDisplay, fontSize: "19px", fontStyle: "italic", color: t.accent, margin: "0 0 14px", lineHeight: 1.2, fontWeight: 400 }}>{day.titulo}</p>
      <div style={{ width: "28px", height: "1px", background: t.border, marginBottom: "14px" }} />
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {day.actividades.map((act, i) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "9px" }}>
            <ActIcon emoji={act.emoji} color={act.bold ? t.accent : t.accentLight} />
            <p style={{ fontFamily: t.fontBody, fontSize: "17px", color: act.bold ? t.text : t.textMuted, margin: 0, lineHeight: 1.5, fontWeight: act.bold ? 600 : 400 }}>{act.texto}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// SECCIÓN VUELOS
// ============================================================
function SeccionVuelos({ isDesktop }) {
  const [tab, setTab] = useState(0);
  const g = vuelos[tab];

  return (
    <section style={{ background: t.bgDark, padding: isDesktop ? "72px 0" : "52px 0" }}>
      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "0 24px" }}>
        <p style={{ fontFamily: t.fontUI, fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(201,184,212,0.45)", margin: "0 0 6px", fontWeight: 600 }}>Aéreos</p>
        <h2 style={{ fontFamily: t.fontDisplay, fontSize: isDesktop ? "38px" : "28px", color: "#F7F3EE", margin: "0 0 32px", fontWeight: 400 }}>
          Llegadas y salidas
        </h2>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "28px" }}>
          {vuelos.map((g, i) => (
            <button key={i} className="tab-btn" onClick={() => setTab(i)} style={{
              display: "flex", alignItems: "center", gap: "8px",
              padding: "9px 16px", borderRadius: "8px", border: "none", cursor: "pointer",
              background: tab === i ? "rgba(201,184,212,0.15)" : "rgba(255,255,255,0.04)",
              color: tab === i ? "#F7F3EE" : "rgba(201,184,212,0.4)",
              fontFamily: t.fontUI, fontSize: "11px", letterSpacing: "0.1em", fontWeight: tab === i ? 600 : 400,
            }}>
              <img src={`https://flagcdn.com/w20/${g.pais}.png`} width={16} height={11} alt="" style={{ borderRadius: "2px" }} />
              {g.grupo.replace("Grupo ", "")}
            </button>
          ))}
        </div>

        {/* Boarding passes */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <BoardingPass grupo={g} vuelo={g.llegada} tipo="llegada" />
          <BoardingPass grupo={g} vuelo={g.salida}  tipo="salida"  />
        </div>

        <NotaLogistica />
      </div>
    </section>
  );
}

// ============================================================
// SECCIÓN CALENDARIO
// ============================================================
function SeccionCalendario({ isDesktop }) {
  return (
    <section style={{ background: t.bg, padding: isDesktop ? "72px 0" : "52px 0" }}>
      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "0 24px" }}>
        <p style={{ fontFamily: t.fontUI, fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: t.accent, margin: "0 0 6px", fontWeight: 600, opacity: 0.55 }}>Calendario</p>
        <h2 style={{ fontFamily: t.fontDisplay, fontSize: isDesktop ? "38px" : "28px", color: t.accent, margin: "0 0 8px", fontWeight: 400 }}>
          Itinerario día a día
        </h2>
        <p style={{ fontFamily: t.fontBody, fontSize: "17px", color: t.textMuted, margin: "0 0 36px", lineHeight: 1.6 }}>
          Propuesta flexible — no una agenda rígida. Prioriza el disfrute, la calma y la adaptación al momento.
        </p>
        <div style={isDesktop ? { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" } : {}}>
          {calendario.map((day, i) => <DayCard key={i} day={day} index={i} />)}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// ROOT
// ============================================================
export default function ViajePrivado() {
  const [auth, setAuth]       = useState(false);
  const [loading, setLoading] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setAuth(sessionStorage.getItem("viaje_auth") === "1");
    setLoading(false);

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

  if (loading) return <div style={{ minHeight: "100svh", background: t.bgDark }} />;
  if (!auth)   return <PasswordGate onUnlock={() => setAuth(true)} />;

  return (
    <div style={{ background: t.bg, minHeight: "100svh" }}>
      <NavBar currentPath="/viaje" />
      <SeccionVuelos isDesktop={isDesktop} />
      <SeccionCalendario isDesktop={isDesktop} />
    </div>
  );
}
