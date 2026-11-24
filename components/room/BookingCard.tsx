"use client";

import { useState } from "react";

interface BookingCardProps {
  pricePerNight: number;
  rating: number;
  reviewCount: number;
}

const BookingCard = ({ pricePerNight, rating, reviewCount }: BookingCardProps) => {
  const [guests, setGuests] = useState(1);

  const handleBooking = () => window.alert(`Reserva simulada para ${guests} huésped${guests === 1 ? "" : "es"}`);

  return (
    <div className="sticky top-24 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-baseline justify-between">
        <span className="text-xl font-semibold text-gray-900">{pricePerNight}€ <span className="text-base font-normal text-gray-500">/ noche</span></span>
        <span className="flex items-center gap-1 text-sm text-gray-900">★ {rating.toFixed(2)}</span>
      </div>
      <div className="mb-4 space-y-2">
        <div className="flex gap-2">
          <div className="flex-1 rounded-lg border border-gray-200 px-3 py-2">
            <p className="text-xs font-medium text-gray-500">Llegada</p>
            <p className="text-sm text-gray-400">Seleccionar</p>
          </div>
          <div className="flex-1 rounded-lg border border-gray-200 px-3 py-2">
            <p className="text-xs font-medium text-gray-500">Salida</p>
            <p className="text-sm text-gray-400">Seleccionar</p>
          </div>
        </div>
        <div className="flex items-center justify-between rounded-lg border border-gray-200 px-3 py-2">
          <div>
            <p className="text-xs font-medium text-gray-500">Huéspedes</p>
            <p className="text-sm text-gray-700">{guests} huésped{guests === 1 ? "" : "es"}</p>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => setGuests((v) => Math.max(1, v - 1))} disabled={guests === 1}
              className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-300 disabled:opacity-40" aria-label="Reducir huéspedes">−</button>
            <span className="w-4 text-center text-sm text-gray-900">{guests}</span>
            <button type="button" onClick={() => setGuests((v) => Math.min(10, v + 1))} disabled={guests === 10}
              className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-300 disabled:opacity-40" aria-label="Aumentar huéspedes">+</button>
          </div>
        </div>
      </div>
      <button type="button" onClick={handleBooking} className="w-full rounded-lg bg-rose-500 py-3 font-semibold text-white transition hover:bg-rose-600">Reservar</button>
      <p className="mt-2 text-center text-xs text-gray-400">No se te cobrará aún</p>
      <div className="mt-4 space-y-2 text-sm text-gray-600">
        <div className="flex justify-between"><span>{pricePerNight}€ x 1 noche</span><span>{pricePerNight}€</span></div>
        <div className="flex justify-between"><span>{reviewCount} reseñas</span><span>—</span></div>
        <div className="flex justify-between border-t border-gray-200 pt-2 font-semibold text-gray-900"><span>Total</span><span>{pricePerNight}€</span></div>
      </div>
    </div>
  );
};

export default BookingCard;
