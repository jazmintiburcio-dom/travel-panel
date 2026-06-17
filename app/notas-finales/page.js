"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import NavBar from "../components/NavBar";

const t = {
  bg:          "#F7F3EE",
  bgDark:      "#2D1F3A",
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

export default function NotasFinalesPage() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);

    const style = document.createElement("style");
    style.textContent = "*, *::before, *::after { box-sizing: border-box; } body { margin: 0; }";
    document.head.appendChild(style);

    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=DM+Sans:wght@400;500;600;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div style={{ background: t.bg, minHeight: "100svh" }}>
      <NavBar currentPath="/notas-finales" />

      {/* HERO */}
      <div style={{ background: t.bgDark, padding: isDesktop ? "72px 0 60px" : "52px 0 44px", overflow: "hidden" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto", padding: "0 24px", display: isDesktop ? "flex" : "block", alignItems: "center", gap: "48px" }}>
          <div style={{ flex: 1 }}>
            <Heart size={24} color={t.accentLight} strokeWidth={1.2} style={{ marginBottom: "16px", opacity: 0.7 }} />
            <h1 style={{ fontFamily: t.fontDisplay, fontSize: isDesktop ? "48px" : "32px", color: "#F7F3EE", margin: "0 0 24px", fontWeight: 400, lineHeight: 1.2 }}>
              Cierre del viaje
            </h1>
            <p style={{ fontFamily: t.fontBody, fontSize: isDesktop ? "20px" : "18px", color: "rgba(201,184,212,0.55)", margin: "0 0 12px", lineHeight: 1.5 }}>
              Este viaje fue planificado como una experiencia familiar flexible, priorizando el bienestar del grupo, el disfrute compartido y un ritmo tranquilo.
            </p>
            <p style={{ fontFamily: t.fontBody, fontSize: isDesktop ? "20px" : "18px", color: "rgba(201,184,212,0.55)", margin: "0 0 12px", lineHeight: 1.5 }}>
              La guía funciona como acompañamiento y referencia, no como una agenda rígida.
            </p>
            <p style={{ fontFamily: t.fontBody, fontSize: isDesktop ? "20px" : "18px", color: "rgba(201,184,212,0.45)", margin: 0, lineHeight: 1.5 }}>
              El objetivo principal es disfrutar, descansar, conectar y crear recuerdos sin presión.
            </p>
          </div>
          {isDesktop && <img src="/notas.finales.hero.webp" alt="" style={{ width: "300px", flexShrink: 0 }} />}
        </div>
      </div>

      {/* CITA FINAL */}
      <div style={{ maxWidth: "680px", margin: "0 auto", padding: isDesktop ? "80px 24px 40px" : "56px 24px 32px", textAlign: "center" }}>
        <div style={{ background: t.bgDark, borderRadius: "20px", padding: isDesktop ? "64px 56px" : "48px 28px" }}>
          <p style={{ fontFamily: t.fontDisplay, fontSize: isDesktop ? "30px" : "24px", color: "#F7F3EE", margin: "0 0 20px", fontWeight: 400, lineHeight: 1.55, fontStyle: "italic" }}>
            "Este viaje no busca hacerlo todo,<br />sino{" "}
            <span style={{ color: t.accentLight }}>vivirlo bien.</span>"
          </p>
          <p style={{ fontFamily: t.fontBody, fontSize: isDesktop ? "19px" : "17px", color: "rgba(201,184,212,0.45)", margin: "0 0 8px", lineHeight: 1.65 }}>
            La planificación es una base, no una exigencia.
          </p>
          <p style={{ fontFamily: t.fontBody, fontSize: isDesktop ? "19px" : "17px", color: "rgba(201,184,212,0.45)", margin: "0 0 40px", lineHeight: 1.65 }}>
            Lo más importante es el bienestar del grupo y el disfrute compartido.
          </p>
          <div style={{ width: "40px", height: "1px", background: "rgba(201,184,212,0.2)", margin: "0 auto 32px" }} />
          <p style={{ fontFamily: t.fontDisplay, fontSize: isDesktop ? "24px" : "20px", color: t.gold, margin: "0 0 16px", fontWeight: 400 }}>
            Buen viaje de regreso a casa.
          </p>
          <Heart size={16} color={t.accentLight} strokeWidth={1.2} style={{ opacity: 0.5 }} />
        </div>
      </div>

      {/* FIRMA */}
      <div style={{ textAlign: "center", padding: isDesktop ? "0 24px 80px" : "0 24px 60px" }}>
        <p style={{ fontFamily: t.fontUI, fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: t.border, margin: "0 0 4px" }}>
          Elaborado por
        </p>
        <p style={{ fontFamily: t.fontDisplay, fontSize: "16px", color: t.textMuted, margin: "0 0 2px", fontWeight: 400, fontStyle: "italic" }}>
          Jazmin Tiburcio · JT Digital Studio
        </p>
        <p style={{ fontFamily: t.fontUI, fontSize: "10px", color: t.border, margin: 0, letterSpacing: "0.08em" }}>
          Guía de viaje personalizada
        </p>
      </div>
    </div>
  );
}
