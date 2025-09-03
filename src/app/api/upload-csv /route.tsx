import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabaseClient"
import Papa from "papaparse"

export async function POST(req: Request) {
  const formData = await req.formData()
  const file = formData.get("file") as File | null

  if (!file) {
    return NextResponse.json({ message: "No se subió archivo" }, { status: 400 })
  }

  const text = await file.text()

  // Parsear el CSV a JSON
  const { data } = Papa.parse(text, { header: true })

  // Insertar en Supabase
  const { error } = await supabase.from("partidos").insert(data)

  if (error) {
    return NextResponse.json({ message: "Error al insertar", error }, { status: 500 })
  }

  return NextResponse.json({ message: "Partidos cargados correctamente 🚀" })
}
