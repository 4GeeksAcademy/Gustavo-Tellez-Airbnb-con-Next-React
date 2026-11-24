"use client";

export interface GuestCounts {
  adults: number;
  children: number;
  infants: number;
  pets: number;
}

interface GuestsPanelProps {
  value: GuestCounts;
  onChange: (guests: GuestCounts) => void;
}

interface GuestRowProps {
  label: string;
  description: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}

function GuestRow({ label, description, value, min, max, onChange }: GuestRowProps) {
  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <p className="text-sm font-medium text-gray-900">{label}</p>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          disabled={value <= min}
          onClick={() => onChange(value - 1)}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition-colors hover:border-gray-900 disabled:opacity-30"
        >
          −
        </button>
        <span className="w-6 text-center text-sm font-medium text-gray-900">
          {value}
        </span>
        <button
          type="button"
          disabled={value >= max}
          onClick={() => onChange(value + 1)}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition-colors hover:border-gray-900 disabled:opacity-30"
        >
          +
        </button>
      </div>
    </div>
  );
}

export default function GuestsPanel({ value, onChange }: GuestsPanelProps) {
  return (
    <div className="absolute left-0 top-full z-40 mt-2 w-80 rounded-2xl border border-gray-200 bg-white p-5 shadow-lg">
      <p className="mb-2 text-sm font-semibold text-gray-900">Viajeros</p>

      <GuestRow
        label="Adultos"
        description="A partir de 13 años"
        value={value.adults}
        min={1}
        max={10}
        onChange={(v) => onChange({ ...value, adults: v })}
      />

      <div className="border-t border-gray-100" />

      <GuestRow
        label="Niños"
        description="De 2 a 12 años"
        value={value.children}
        min={0}
        max={10}
        onChange={(v) => onChange({ ...value, children: v })}
      />

      <div className="border-t border-gray-100" />

      <GuestRow
        label="Bebés"
        description="Menos de 2 años"
        value={value.infants}
        min={0}
        max={5}
        onChange={(v) => onChange({ ...value, infants: v })}
      />

      <div className="border-t border-gray-100" />

      <GuestRow
        label="Mascotas"
        description="¿Traes un animal de asistencia?"
        value={value.pets}
        min={0}
        max={5}
        onChange={(v) => onChange({ ...value, pets: v })}
      />
    </div>
  );
}