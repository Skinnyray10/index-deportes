import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Liga Deportiva",
  description: "Calendario, equipos y resultados",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-gray-100 text-gray-900">
        <nav className="bg-green-700 text-white p-4 flex gap-6">
          <Link href="/">Inicio</Link>
          <Link href="/equipos">Equipos</Link>
          <Link href="/calendario">Calendario</Link>
          <Link href="/resultados">Resultados</Link>
        </nav>
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
