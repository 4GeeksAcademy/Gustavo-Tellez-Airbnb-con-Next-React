"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import DestinationPanel from "./DestinationPanel";
import DatePanel from "./DatePanel";
import GuestsPanel, { type GuestCounts } from "./GuestsPanel";

type PanelType = "destination" | "dates" | "guests" | null;

const defaultGuests: GuestCounts = {
  adults: 1,
  children: 0,
  infants: 0,
  pets: 0,
};

function totalGuests(guests: GuestCounts) {
  return guests.adults + guests.children;
}

export default function SearchFilters() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  const [activePanel, setActivePanel] = useState<PanelType>(null);
  const [destination, setDestination] = useState("Cualquier destino");
  const [checkIn, setCheckIn] = useState<string | null>(null);
  const [checkOut, setCheckOut] = useState<string | null>(null);
  const [guests, setGuests] = useState<GuestCounts>(defaultGuests);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setActivePanel(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const togglePanel = (panel: PanelType) => {
    setActivePanel((prev) => (prev === panel ? null : panel));
  };

  const handleSearch = () => {
    const q = destination === "Cualquier destino" ? "" : destination;
    router.push(`/catalog?q=${encodeURIComponent(q)}`);
  };

  const dateLabel = (() => {
    if (checkIn && checkOut) {
      const d1 = new Date(checkIn).toLocaleDateString("es", {
        day: "numeric",
        month: "short",
      });
      const d2 = new Date(checkOut).toLocaleDateString("es", {
        day: "numeric",
        month: "short",
      });
      return `${d1} - ${d2}`;
    }
    if (checkIn) {
      const d1 = new Date(checkIn).toLocaleDateString("es", {
        day: "numeric",
        month: "short",
      });
      return `${d1} - ¿?`;
    }
    return null;
  })();

  const guestsLabel = (() => {
    const total = totalGuests(guests);
    if (total === 0) return null;
    if (total === 1) return "1 viajero";
    const extras: string[] = [];
    if (guests.infants > 0) extras.push(`${guests.infants} bebés`);
    if (guests.pets > 0) extras.push(`${guests.pets} mascotas`);
    const base = `${total} viajeros`;
    return extras.length > 0 ? `${base}, ${extras.join(", ")}` : base;
  })();

  return (
    <div ref={containerRef} className="relative mx-auto max-w-3xl px-4 py-4">
      <div className="flex items-center divide-x divide-gray-200 rounded-full border border-gray-200 bg-white shadow-sm">
        {/* Destino */}
        <div
          onClick={() => togglePanel("destination")}
          className={`relative flex flex-1 cursor-pointer items-center px-6 py-3 text-left transition-colors hover:bg-gray-50 first:rounded-l-full ${
            activePanel === "destination" ? "bg-gray-50" : ""
          }`}
        >
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-gray-900">Destino</span>
            <span
              className={`text-sm ${
                destination === "Cualquier destino"
                  ? "text-gray-500"
                  : "text-gray-900"
              }`}
            >
              {destination}
            </span>
          </div>
          {activePanel === "destination" && <DestinationPanel value={destination} onSelect={(city) => { setDestination(city); setActivePanel(null); }} />}
        </div>

        {/* Fechas */}
        <div
          onClick={() => togglePanel("dates")}
          className={`relative flex flex-1 cursor-pointer items-center px-6 py-3 text-left transition-colors hover:bg-gray-50 ${
            activePanel === "dates" ? "bg-gray-50" : ""
          }`}
        >
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-gray-900">Fechas</span>
            <span className={`text-sm ${dateLabel ? "text-gray-900" : "text-gray-500"}`}>
              {dateLabel || "¿Cuándo?"}
            </span>
          </div>
          {activePanel === "dates" && (
            <DatePanel
              checkIn={checkIn}
              checkOut={checkOut}
              onChange={(inDate, outDate) => {
                setCheckIn(inDate);
                setCheckOut(outDate);
              }}
            />
          )}
        </div>

        {/* Viajeros */}
        <div
          onClick={() => togglePanel("guests")}
          className={`relative flex flex-1 cursor-pointer items-center px-6 py-3 text-left transition-colors hover:bg-gray-50 ${
            activePanel === "guests" ? "bg-gray-50" : ""
          }`}
        >
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-gray-900">Viajeros</span>
            <span className={`text-sm ${guestsLabel ? "text-gray-900" : "text-gray-500"}`}>
              {guestsLabel || "¿Quién?"}
            </span>
          </div>
          {activePanel === "guests" && (
            <GuestsPanel
              value={guests}
              onChange={setGuests}
            />
          )}
        </div>

        {/* Buscar */}
        <div className="flex items-center px-2">
          <button
            onClick={handleSearch}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-500 text-white transition-colors hover:bg-rose-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 w-4"
            >
              <path
                fillRule="evenodd"
                d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}