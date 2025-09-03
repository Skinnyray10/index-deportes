"use client"

import { useState } from "react"

export default function AdminPage() {
  const [file, setFile] = useState<File | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [isError, setIsError] = useState(false)

  const handleUpload = async () => {
    if (!file) {
      setMessage("⚠️ Por favor selecciona un archivo CSV primero.")
      setIsError(true)
      return
    }

    const formData = new FormData()
    formData.append("file", file)

    try {
      const res = await fetch("/api/upload-csv", {
        method: "POST",
        body: formData,
      })

      const result = await res.json()

      if (res.ok) {
        setMessage(result.message || "✅ Partidos cargados correctamente.")
        setIsError(false)
      } else {
        setMessage(result.message || "❌ Error al cargar los partidos.")
        setIsError(true)
      }
    } catch (err) {
      console.error(err)
      setMessage("❌ Error inesperado en el servidor.")
      setIsError(true)
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📤 Subir partidos (CSV)</h1>

      <input
        type="file"
        accept=".csv"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="mb-4 block"
      />

      <button
        onClick={handleUpload}
        className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800"
      >
        Subir
      </button>

      {/* Mensaje de resultado */}
      {message && (
        <div
          className={`mt-4 p-3 rounded-lg ${
            isError ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
          }`}
        >
          {message}
        </div>
      )}
    </div>
  )
}
