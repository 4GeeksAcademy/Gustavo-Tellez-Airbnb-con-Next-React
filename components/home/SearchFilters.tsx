"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import DestinationPanel from "./DestinationPanel";
import DatePanel from "./DatePanel";
import GuestsPanel, { type GuestCounts } from "./GuestsPanel";
import FilterSegment from "@/components/shared/FilterSegment";
import SearchButton from "@/components/shared/SearchButton";

type PanelType = "destination" | "dates" | "guests" | null;

const defaultGuests: GuestCounts = { adults: 1, children: 0, infants: 0, pets: 0 };

const totalGuests = (g: GuestCounts) => g.adults + g.children;

const SearchFilters = () => {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  const [activePanel, setActivePanel] = useState<PanelType>(null);
  const [destination, setDestination] = useState("Cualquier destino");
  const [checkIn, setCheckIn] = useState<string | null>(null);
  const [checkOut, setCheckOut] = useState<string | null>(null);
  const [guests, setGuests] = useState<GuestCounts>(defaultGuests);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setActivePanel(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const togglePanel = (panel: PanelType) => setActivePanel((prev) => (prev === panel ? null : panel));

  const handleSearch = () => {
    const q = destination === "Cualquier destino" ? "" : destination;
    router.push(`/catalog?q=${encodeURIComponent(q)}`);
  };

  const fmt = (d: string) => new Date(d).toLocaleDateString("es", { day: "numeric", month: "short" });
  const dateLabel = checkIn && checkOut ? `${fmt(checkIn)} - ${fmt(checkOut)}` : checkIn ? `${fmt(checkIn)} - ¿?` : null;

  const guestsCount = totalGuests(guests);
  const extras = [guests.infants > 0 && `${guests.infants} bebés`, guests.pets > 0 && `${guests.pets} mascotas`].filter(Boolean);
  const guestsLabel = guestsCount > 0 ? extras.length > 0 ? `${guestsCount} viajeros, ${extras.join(", ")}` : guestsCount === 1 ? "1 viajero" : `${guestsCount} viajeros` : null;

  return (
    <div ref={containerRef} className="relative mx-auto max-w-3xl px-4 py-4">
      <div className="flex items-center divide-x divide-gray-200 rounded-full border border-gray-200 bg-white shadow-sm">
        <FilterSegment
          label="Destino" value={destination}
          isActive={activePanel === "destination"}
          isPlaceholder={destination === "Cualquier destino"}
          onClick={() => togglePanel("destination")}
          panel={<DestinationPanel value={destination} onSelect={(city) => { setDestination(city); setActivePanel(null); }} />}
        />
        <FilterSegment
          label="Fechas" value={dateLabel || "¿Cuándo?"}
          isActive={activePanel === "dates"} isPlaceholder={!dateLabel}
          onClick={() => togglePanel("dates")}
          panel={<DatePanel checkIn={checkIn} checkOut={checkOut} onChange={(inDate, outDate) => { setCheckIn(inDate); setCheckOut(outDate); }} />}
        />
        <FilterSegment
          label="Viajeros" value={guestsLabel || "¿Quién?"}
          isActive={activePanel === "guests"} isPlaceholder={!guestsLabel}
          onClick={() => togglePanel("guests")}
          panel={<GuestsPanel value={guests} onChange={setGuests} />}
        />
        <SearchButton onClick={handleSearch} />
      </div>
    </div>
  );
};

export default SearchFilters;
