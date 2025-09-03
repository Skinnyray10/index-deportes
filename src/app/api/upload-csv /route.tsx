import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabaseClient"
import * as Papa from "papaparse"

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get("file") as File | null

    // ✅ Validar si no hay archivo
    if (!file) {
      return NextResponse.json({ message: "No se subió archivo" }, { status: 400 })
    }

    // ✅ Validar que sea CSV
    if (!file.name.endsWith(".csv")) {
      return NextResponse.json({ message: "Solo se permiten archivos CSV" }, { status: 400 })
    }

    // ✅ Leer archivo como texto
    const text = await file.text()

    // ✅ Parsear CSV a JSON
    const { data, errors } = Papa.parse(text, { header: true })

    if (errors.length > 0) {
      return NextResponse.json({ message: "Error al leer CSV", errors }, { status: 400 })
    }

    // ✅ Insertar datos en Supabase
    const { error } = await supabase.from("partidos").insert(data)

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ message: "Error al insertar en Supabase", error }, { status: 500 })
    }

    return NextResponse.json({ message: "✅ Partidos cargados correctamente 🚀", rows: data.length })
  } catch (err) {
    console.error("Unexpected error:", err)
    return NextResponse.json({ message: "Error inesperado", error: `${err}` }, { status: 500 })
  }
}
