import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabaseClient"
import * as Papa from "papaparse"

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get("file") as File | null

    if (!file) {
      return NextResponse.json({ message: "No se subió archivo" }, { status: 400 })
    }

    if (!file.name.toLowerCase().endsWith(".csv")) {
      return NextResponse.json({ message: "Solo se permiten archivos CSV" }, { status: 400 })
    }

    const text = await file.text()
    const { data, errors } = Papa.parse(text, {
      header: true,
      skipEmptyLines: true,
    })

    if (errors.length > 0) {
      return NextResponse.json({ message: "Error al leer CSV", errors }, { status: 400 })
    }

    // Validar formato
    const ok = (data as any[]).filter(
      (r) =>
        r.deporte &&
        r.equipo1 &&
        r.equipo2 &&
        r.fecha &&
        /^\d{4}-\d{2}-\d{2}$/.test(r.fecha) &&
        r.hora &&
        /^\d{2}:\d{2}$/.test(r.hora) &&
        r.lugar
    )

    if (ok.length === 0) {
      return NextResponse.json({ message: "No hay filas válidas en el CSV" }, { status: 400 })
    }

    const { error } = await supabase.from("partidos").insert(ok)

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ message: "Error al insertar en Supabase", error }, { status: 500 })
    }

    return NextResponse.json({
      message: `✅ Se insertaron ${ok.length} partidos`,
    })
  } catch (err: any) {
    return NextResponse.json(
      { message: "❌ Error inesperado", error: String(err) },
      { status: 500 }
    )
  }
}
