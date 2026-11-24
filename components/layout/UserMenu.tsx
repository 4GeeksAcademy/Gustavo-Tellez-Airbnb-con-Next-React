export default function UserMenu() {
  return (
    <div className="flex items-center gap-2 text-gray-500">
      <button className="rounded-full p-2 transition hover:bg-gray-100" aria-label="Idioma">
        🌐
      </button>
      <button className="rounded-full p-2 transition hover:bg-gray-100" aria-label="Perfil">
        👤
      </button>
      <button className="rounded-full p-2 transition hover:bg-gray-100" aria-label="Menú">
        ☰
      </button>
    </div>
  );
}