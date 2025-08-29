export default function LigasPage() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-4">Ligas Deportivas</h1>
      <p className="text-lg text-gray-600">
        Aquí encontrarás información sobre todas las ligas deportivas de la empresa.
      </p>

      <ul className="mt-6 list-disc list-inside space-y-2">
        <li>Fútbol</li>
        <li>Voleibol</li>
        <li>Básquetbol</li>
        <li>Softball</li>
        <li>Tochito</li>
      </ul>
    </main>
  )
}
