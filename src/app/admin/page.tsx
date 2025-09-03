"use client"

import { useState } from "react"

export default function AdminPage() {
  const [file, setFile] = useState<File | null>(null)

  const handleUpload = async () => {
    if (!file) return

    const formData = new FormData()
    formData.append("file", file)

    const res = await fetch("/api/upload-csv", {
      method: "POST",
      body: formData,
    })

    const result = await res.json()
    alert(result.message)
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📤 Subir partidos (CSV)</h1>
      <input
        type="file"
        accept=".csv"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="mb-4"
      />
      <button
        onClick={handleUpload}
        className="bg-green-700 text-white px-4 py-2 rounded-lg"
      >
        Subir
      </button>
    </div>
  )
}
