"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabaseClient"

// 🔹 Definimos el tipo de partido según tu tabla en Supabase
type Partido = {
  id: number
  deporte: string
  equipo1: string
  equipo2: string
  fecha: string
  hora: string
  lugar: string
}

export default function PartidosPage() {
  const [partidos, setPartidos] = useState<Partido[]>([])
  const [categoria, setCategoria] = useState("")

  const categorias = [
    "Voleibol femenil",
    "Voleibol varonil",
    "Tochito varonil",
    "2do softbol",
    "Fútbol rápido",
    "Fútbol 7x7 femenil",
  ]

  // 🔎 Consultar partidos en Supabase
  useEffect(() => {
    const fetchData = async () => {
      let query = supabase.from("partidos").select("*").order("fecha", { ascending: true })
      if (categoria) query = query.eq("deporte", categoria)
      const { data, error } = await query

      if (!error && data) setPartidos(data as Partido[])
    }
    fetchData()
  }, [categoria])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">📅 Partidos</h1>

      {/* 🔹 Tabs de categorías */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setCategoria("")}
          className={`px-4 py-2 rounded-lg ${
            categoria === "" ? "bg-green-700 text-white" : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Todas
        </button>
        {categorias.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoria(cat)}
            className={`px-4 py-2 rounded-lg ${
              categoria === cat ? "bg-green-700 text-white" : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 📋 Tabla de partidos */}
      {partidos.length > 0 ? (
        <table className="w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Deporte</th>
              <th className="p-2 border">Equipo 1</th>
              <th className="p-2 border">Equipo 2</th>
              <th className="p-2 border">Fecha</th>
              <th className="p-2 border">Hora</th>
              <th className="p-2 border">Lugar</th>
            </tr>
          </thead>
          <tbody>
            {partidos.map((p) => (
              <tr key={p.id} className="text-center">
                <td className="p-2 border">{p.deporte}</td>
                <td className="p-2 border">{p.equipo1}</td>
                <td className="p-2 border">{p.equipo2}</td>
                <td className="p-2 border">{p.fecha}</td>
                <td className="p-2 border">{p.hora}</td>
                <td className="p-2 border">{p.lugar}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500">No hay partidos en esta categoría.</p>
      )}
    </div>
  )
}
