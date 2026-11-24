"use client";

import { useRouter } from "next/navigation";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = value.trim();
    if (query) {
      router.push(`/catalog?q=${encodeURIComponent(query)}`);
    } else {
      router.push("/catalog");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative flex items-center">
      <span className="absolute left-3 text-gray-400">🔍</span>
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Buscar alojamientos..."
        className="w-full rounded-full border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-gray-300 focus:bg-white"
      />
    </form>
  );
}