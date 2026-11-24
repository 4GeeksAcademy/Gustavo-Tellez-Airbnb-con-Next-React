import Link from "next/link";

export default function RoomNotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-gray-500">
      <span className="text-5xl">🏡</span>
      <h1 className="mt-4 text-2xl font-semibold text-gray-900">Alojamiento no encontrado</h1>
      <p className="mt-2 text-gray-500">
        El alojamiento que buscas no existe o ha sido eliminado.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-lg bg-rose-500 px-6 py-2 font-medium text-white transition hover:bg-rose-600"
      >
        Volver al inicio
      </Link>
    </div>
  );
}