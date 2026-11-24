export default function ShareSaveButtons() {
  return (
    <div className="flex items-center gap-3">
      <button className="flex items-center gap-1 text-sm font-medium text-gray-700 underline underline-offset-2 hover:text-gray-900">
        🔗 Compartir
      </button>
      <button className="flex items-center gap-1 text-sm font-medium text-gray-700 underline underline-offset-2 hover:text-gray-900">
        ♥ Guardar
      </button>
    </div>
  );
}