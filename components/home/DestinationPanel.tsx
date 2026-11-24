"use client";

interface DestinationPanelProps {
  value: string;
  onSelect: (city: string) => void;
}

const cities = [
  "Cualquier destino",
  "Madrid",
  "Barcelona",
  "Sevilla",
  "Valencia",
  "Granada",
  "Málaga",
  "Bilbao",
  "París",
  "Roma",
  "Lisboa",
];

const DestinationPanel = ({
  value,
  onSelect,
}: DestinationPanelProps) => {
  return (
    <div className="absolute left-0 top-full z-40 mt-2 w-72 rounded-2xl border border-gray-200 bg-white p-4 shadow-lg">
      <p className="mb-3 text-sm font-semibold text-gray-900">Destino</p>
      <div className="flex flex-col gap-1">
        {cities.map((city) => (
          <button
            key={city}
            onClick={() => onSelect(city)}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors hover:bg-gray-100 ${
              value === city
                ? "font-medium text-gray-900"
                : "text-gray-600"
            }`}
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-base">
              {city === "Cualquier destino" ? "🌍" : "📍"}
            </span>
            <span>{city}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default DestinationPanel;
