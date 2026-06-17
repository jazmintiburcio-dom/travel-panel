export const metadata = {
  title: "Navidad y Año Nuevo en Argentina",
  description: "Sitio de viaje personalizado — 23 dic 2025 al 7 ene 2026",
  icons: {
    icon: "https://flagcdn.com/w40/ar.png",
    apple: "https://flagcdn.com/w40/ar.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
