"use client";

import { useState, useEffect } from "react";
import { Plane, Map, Wallet, Camera, FileText, Home, Menu, X, Heart } from "lucide-react";

const t = {
  bg:          "#F7F3EE",
  bgDark:      "#2D1F3A",
  accent:      "#3D2645",
  accentLight: "#C9B8D4",
  gold:        "#C9A84C",
  border:      "#D4C9DC",
  textMuted:   "#6B5E78",
  fontUI:      "'DM Sans', sans-serif",
  fontDisplay: "'Playfair Display', Georgia, serif",
};

const NAV = [
  { label: "Inicio",          href: "/",                icono: Home,     privado: false },
  { label: "Vuelos",          href: "/viaje",           icono: Plane,    privado: true  },
  { label: "Lugares",         href: "/lugares",         icono: Map,      privado: false },
  { label: "Neurodiversidad", href: "/neurodiversidad", icono: Heart,    privado: false },
  { label: "Presupuesto",     href: "/presupuesto",     icono: Wallet,   privado: false },
  { label: "Galería",         href: "/galeria",         icono: Camera,   privado: false },
  { label: "Notas Finales",   href: "/notas-finales",   icono: FileText, privado: false },
];

export default function NavBar({ currentPath = "" }) {
  const [isDesktop, setIsDesktop] = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  useEffect(() => {
    const check = () => {
      setIsDesktop(window.innerWidth >= 768);
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Cerrar menú al hacer click fuera + Esc + scroll lock
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    const onClick = (e) => {
      if (!e.target.closest("#nav-mobile-panel") && !e.target.closest("#nav-hamburger")) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isActive = (href) => {
    if (href === "/") return currentPath === "/";
    return currentPath.startsWith(href);
  };

  return (
    <>
      <style>{`
        .nav-link { transition: color 0.15s, opacity 0.15s; }
        .nav-link:hover { opacity: 0.75; }
        .mobile-link { transition: background 0.15s; }
        .mobile-link:hover { background: rgba(201,184,212,0.08) !important; }
      `}</style>

      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        background: t.bgDark,
        borderBottom: "1px solid rgba(201,184,212,0.1)",
        backdropFilter: "blur(8px)",
      }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px", height: "58px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>

          {/* Logo / Título */}
          <a href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
            <img src="https://flagcdn.com/w40/ar.png" alt="Argentina" style={{ width: "24px", borderRadius: "2px", flexShrink: 0 }} />
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <span style={{ fontFamily: t.fontDisplay, fontSize: "15px", color: "#F7F3EE", fontWeight: 400, letterSpacing: "0.02em", lineHeight: 1 }}>
                Argentina
              </span>
              <span style={{ fontFamily: t.fontUI, fontSize: "8px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(201,184,212,0.4)", fontWeight: 600, lineHeight: 1 }}>
                Navidad · Año Nuevo 2025
              </span>
            </div>
          </a>

          {/* Desktop links */}
          {isDesktop && (
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              {NAV.map((item) => {
                const Icon   = item.icono;
                const active = isActive(item.href);
                return (
                  <a key={item.href} href={item.href} className="nav-link" style={{
                    display: "inline-flex", alignItems: "center", gap: "6px",
                    padding: "7px 12px", borderRadius: "7px",
                    textDecoration: "none",
                    background: active ? "rgba(201,184,212,0.12)" : "transparent",
                    border: active ? "1px solid rgba(201,184,212,0.18)" : "1px solid transparent",
                  }}>
                    <Icon size={13} color={active ? t.accentLight : "rgba(201,184,212,0.35)"} strokeWidth={1.5} />
                    <span style={{
                      fontFamily: t.fontUI, fontSize: "11px",
                      letterSpacing: "0.08em",
                      color: active ? "#F7F3EE" : "rgba(201,184,212,0.5)",
                      fontWeight: active ? 600 : 400,
                    }}>
                      {item.label}
                      {item.privado && <span style={{ marginLeft: "4px", fontSize: "8px", opacity: 0.5 }}>🔒</span>}
                    </span>
                  </a>
                );
              })}
            </div>
          )}

          {/* Mobile hamburger */}
          {!isDesktop && (
            <button id="nav-hamburger" onClick={() => setMenuOpen(!menuOpen)} style={{
              background: "none", border: "none", cursor: "pointer",
              padding: "6px", lineHeight: 0,
            }}>
              {menuOpen
                ? <X    size={22} color={t.accentLight} strokeWidth={1.4} />
                : <Menu size={22} color={t.accentLight} strokeWidth={1.4} />
              }
            </button>
          )}
        </div>
      </nav>

      {/* Mobile dropdown */}
      {!isDesktop && menuOpen && (
        <div id="nav-mobile-panel" style={{
          position: "fixed", top: "58px", left: 0, right: 0, bottom: 0,
          background: t.bgDark,
          zIndex: 99,
          overflowY: "auto",
        }}>
          {NAV.map((item) => {
            const Icon   = item.icono;
            const active = isActive(item.href);
            return (
              <a key={item.href} href={item.href} className="mobile-link" onClick={() => setMenuOpen(false)} style={{
                display: "flex", alignItems: "center", gap: "14px",
                padding: "16px 24px",
                borderBottom: "1px solid rgba(201,184,212,0.06)",
                textDecoration: "none",
                background: active ? "rgba(201,184,212,0.06)" : "transparent",
              }}>
                <Icon size={15} color={active ? t.accentLight : "rgba(201,184,212,0.3)"} strokeWidth={1.4} />
                <span style={{
                  fontFamily: t.fontUI, fontSize: "13px",
                  color: active ? "#F7F3EE" : "rgba(201,184,212,0.5)",
                  fontWeight: active ? 600 : 400, letterSpacing: "0.04em",
                }}>
                  {item.label}
                  {item.privado && <span style={{ marginLeft: "6px", fontSize: "10px", opacity: 0.4 }}>🔒</span>}
                </span>
              </a>
            );
          })}
        </div>
      )}
    </>
  );
}
