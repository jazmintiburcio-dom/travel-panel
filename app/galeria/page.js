"use client";

import { useEffect, useState } from "react";
import { Camera, ExternalLink } from "lucide-react";
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

const ALBUM_URL = "https://photos.app.goo.gl/xDuRYy1iMX7vbEv56";
const FOTOS_POR_SECCION = 6;

const SECCIONES = [
  { carpeta: "01-llegada",           titulo: "Llegada",                 subtitulo: "23 · 24 dic" },
  { carpeta: "02-navidad",           titulo: "Navidad",                 subtitulo: "25 dic"      },
  { carpeta: "03-temaiken",          titulo: "Bioparque Temaikèn",      subtitulo: "26 dic"      },
  { carpeta: "04-paseo-mendoza",     titulo: "Paseo Mendoza",           subtitulo: "27 dic"      },
  { carpeta: "05-san-telmo",         titulo: "San Telmo",               subtitulo: "28 dic"      },
  { carpeta: "06-barrio-chino",      titulo: "Barrio Chino",            subtitulo: "29 dic"      },
  { carpeta: "07-recoleta",          titulo: "Recoleta",                subtitulo: "02 ene"      },
  { carpeta: "08-tigre-delta",       titulo: "Tigre · Delta del Paraná",subtitulo: "03 ene"      },
  { carpeta: "09-caminito",          titulo: "Caminito · La Boca",      subtitulo: "01 ene"      },
  { carpeta: "10-san-antonio-de-areco", titulo: "San Antonio de Areco", subtitulo: "04 ene"      },
  { carpeta: "11-despedida",         titulo: "Despedida",               subtitulo: "05 · 07 ene" },
];

const CSS = `
  *, *::before, *::after { box-sizing: border-box; }
  body { margin: 0; }

  .foto-item {
    overflow: hidden;
    border-radius: 6px;
    background: #2D1F3A;
    aspect-ratio: 9/16;
  }
  .foto-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.4s ease;
  }
  .foto-item:hover img {
    transform: scale(1.04);
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .fade-up { animation: fadeUp 0.5s ease both; }
`;

function SeccionFotos({ seccion, isDesktop, index }) {
  const fotos = Array.from({ length: FOTOS_POR_SECCION }, (_, i) =>
    `/${seccion.carpeta}/foto_${i + 1}.webp`
  );

  return (
    <div className="fade-up" style={{ marginBottom: "64px", animationDelay: `${index * 60}ms` }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "baseline", gap: "14px", marginBottom: "20px" }}>
        <h2 style={{ fontFamily: t.fontDisplay, fontSize: isDesktop ? "28px" : "22px", fontStyle: "italic", color: t.accent, margin: 0, fontWeight: 400 }}>
          {seccion.titulo}
        </h2>
        <span style={{ fontFamily: t.fontUI, fontSize: "10px", letterSpacing: "0.16em", textTransform: "uppercase", color: t.textMuted, fontWeight: 600 }}>
          {seccion.subtitulo}
        </span>
      </div>

      {/* Grid de fotos */}
      <div style={{
        display: "grid",
        gridTemplateColumns: isDesktop ? "repeat(6, 1fr)" : "repeat(2, 1fr)",
        gap: "6px",
      }}>
        {fotos.map((src, i) => (
          <div key={i} className="foto-item">
            <img src={src} alt={`${seccion.titulo} · foto ${i + 1}`} loading="lazy" />
          </div>
        ))}
      </div>

      {/* Separador */}
      <div style={{ height: "1px", background: t.border, marginTop: "48px", opacity: 0.5 }} />
    </div>
  );
}

export default function GaleriaPage() {
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
      <NavBar currentPath="/galeria" />

      {/* HERO */}
      <div style={{ background: t.bgDark, padding: isDesktop ? "72px 0 60px" : "52px 0 44px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px" }}>
          <p style={{ fontFamily: t.fontUI, fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(201,184,212,0.45)", margin: "0 0 8px", fontWeight: 600 }}>
            Álbum del viaje
          </p>
          <h1 style={{ fontFamily: t.fontDisplay, fontSize: isDesktop ? "52px" : "34px", color: "#F7F3EE", margin: "0 0 12px", fontWeight: 400, lineHeight: 1.1 }}>
            Navidad y Año Nuevo<br />en Argentina
          </h1>
          <p style={{ fontFamily: t.fontBody, fontSize: "18px", color: "rgba(201,184,212,0.5)", margin: "0 0 32px", lineHeight: 1.6, maxWidth: "480px" }}>
            Una selección de momentos del viaje, organizados por lugar.
          </p>

          <a
            href={ALBUM_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: "10px",
              background: t.accentLight, color: t.bgDeep,
              padding: "13px 22px", borderRadius: "10px",
              fontFamily: t.fontUI, fontSize: "11px", letterSpacing: "0.14em",
              textTransform: "uppercase", fontWeight: 700, textDecoration: "none",
            }}
          >
            <Camera size={14} strokeWidth={2} />
            Ver álbum completo · Google Photos
          </a>
        </div>
      </div>

      {/* SECCIONES */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: isDesktop ? "56px 24px 80px" : "36px 24px 60px" }}>
        {SECCIONES.map((seccion, i) => (
          <SeccionFotos key={seccion.carpeta} seccion={seccion} isDesktop={isDesktop} index={i} />
        ))}
      </div>
    </div>
  );
}
