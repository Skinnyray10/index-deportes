"use client"

import Link from "next/link"
import { useState } from "react"

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="bg-green-700 text-white p-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-lg font-bold">Liga Deportiva</h1>

        {/* Menú en desktop */}
        <ul className="hidden md:flex gap-6">
          <li><Link href="/">Inicio</Link></li>
          <li><Link href="/equipos">Equipos</Link></li>
          <li><Link href="/calendario">Calendario</Link></li>
          <li><Link href="/resultados">Resultados</Link></li>
          <li><Link href="/partidos">Partidos</Link> </li>
        </ul>

        {/* Botón hamburguesa en móviles */}
        <button
          className="md:hidden flex flex-col gap-1"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="w-6 h-0.5 bg-white"></span>
          <span className="w-6 h-0.5 bg-white"></span>
          <span className="w-6 h-0.5 bg-white"></span>
          <span className="w-6 h-05 bg-white"></span>
        </button>
      </div>

      {/* Menú desplegable en móvil */}
      {menuOpen && (
        <ul className="md:hidden mt-4 flex flex-col gap-3">
          <li><Link href="/" onClick={() => setMenuOpen(false)}>Inicio</Link></li>
          <li><Link href="/equipos" onClick={() => setMenuOpen(false)}>Equipos</Link></li>
          <li><Link href="/calendario" onClick={() => setMenuOpen(false)}>Calendario</Link></li>
          <li><Link href="/resultados" onClick={() => setMenuOpen(false)}>Resultados</Link></li>
          <li><Link href="/partidos" onClick={() => setMenuOpen(false)}>Partidos</Link></li> 
        </ul>
      )}
    </nav>
  )
}


