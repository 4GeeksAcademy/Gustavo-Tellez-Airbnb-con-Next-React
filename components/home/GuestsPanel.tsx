"use client";

import GuestRow from "@/components/shared/GuestRow";

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

const GuestsPanel = ({ value, onChange }: GuestsPanelProps) => (
  <div className="absolute left-0 top-full z-40 mt-2 w-80 rounded-2xl border border-gray-200 bg-white p-5 shadow-lg">
    <p className="mb-2 text-sm font-semibold text-gray-900">Viajeros</p>

    <GuestRow label="Adultos" description="A partir de 13 años" value={value.adults} min={1} max={10} onChange={(v) => onChange({ ...value, adults: v })} />
    <div className="border-t border-gray-100" />
    <GuestRow label="Niños" description="De 2 a 12 años" value={value.children} min={0} max={10} onChange={(v) => onChange({ ...value, children: v })} />
    <div className="border-t border-gray-100" />
    <GuestRow label="Bebés" description="Menos de 2 años" value={value.infants} min={0} max={5} onChange={(v) => onChange({ ...value, infants: v })} />
    <div className="border-t border-gray-100" />
    <GuestRow label="Mascotas" description="¿Traes un animal de asistencia?" value={value.pets} min={0} max={5} onChange={(v) => onChange({ ...value, pets: v })} />
  </div>
);

export default GuestsPanel;
