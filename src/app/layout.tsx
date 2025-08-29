import "./globals.css"
import Navbar from "./components/Navbar"

export const metadata = {
  title: "Liga Deportiva",
  description: "Calendario, equipos y resultados",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-gray-100 text-gray-900">
        <Navbar />
        <main className="p-6 max-w-6xl mx-auto">{children}</main>
      </body>
    </html>
  )
}
