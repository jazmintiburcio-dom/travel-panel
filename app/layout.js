export const metadata = {
  title: "Navidad y Año Nuevo en Argentina",
  description: "Sitio de viaje personalizado — 23 dic 2025 al 7 ene 2026",
  openGraph: {
    title: "Navidad y Año Nuevo en Argentina",
    description: "Guía de viaje familiar · 23 dic 2025 — 7 ene 2026",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/icon.png" type="image/png" />
      </head>
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
