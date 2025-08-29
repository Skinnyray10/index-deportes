import { supabase } from "@/lib/supabaseClient"


export default async function PartidosPage() {
  const { data: partidos, error } = await supabase
    .from("partidos")
    .select("*")
    .order("fecha", { ascending: true })

  if (error) {
    console.error("Error cargando partidos:", error.message)
    return <p>❌ Error cargando partidos</p>
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📅 Partidos</h1>
      <ul className="space-y-4">
        {partidos?.map((p) => (
          <li key={p.id} className="border p-4 rounded-lg shadow">
            <p><strong>{p.deporte}</strong></p>
            <p>{p.equipo1} vs {p.equipo2}</p>
            <p>{p.fecha} - {p.hora}</p>
            <p>{p.lugar}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
const { data, error } = await supabase.from("partidos").select("*")
console.log("DATA:", data)
console.log("ERROR:", error)
