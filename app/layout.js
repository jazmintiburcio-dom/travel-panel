export const metadata = {
  title: "Navidad y Año Nuevo en Argentina",
  description: "Sitio de viaje personalizado — 23 dic 2025 al 7 ene 2026",
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
