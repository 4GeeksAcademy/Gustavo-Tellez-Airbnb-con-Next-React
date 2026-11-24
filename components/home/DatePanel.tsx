"use client";

import { useMemo } from "react";
import { MONTHS, DAYS, getMonthGrid, toDateString, isPastDate } from "@/utils/dateUtils";
import DayButton from "@/components/shared/DayButton";

interface DatePanelProps {
  checkIn: string | null;
  checkOut: string | null;
  onChange: (checkIn: string | null, checkOut: string | null) => void;
}

const DatePanel = ({ checkIn, checkOut, onChange }: DatePanelProps) => {
  const today = useMemo(() => { const n = new Date(); return { y: n.getFullYear(), m: n.getMonth(), d: n.getDate() }; }, []);
  const months = useMemo(() => Array.from({ length: 2 }, (_, i) => {
    let m = today.m + i, y = today.y;
    if (m > 11) { m -= 12; y += 1; }
    return { year: y, month: m };
  }), [today]);

  const handleDayClick = (year: number, month: number, day: number) => {
    const s = toDateString(year, month, day);
    if (!checkIn || (checkIn && checkOut)) onChange(s, null);
    else onChange(s <= checkIn ? s : checkIn, s <= checkIn ? null : s);
  };

  const isInRange = (y: number, m: number, d: number) => checkIn ? (checkOut ? toDateString(y, m, d) > checkIn && toDateString(y, m, d) < checkOut : false) : false;
  const isSelected = (y: number, m: number, d: number, t: "in" | "out") => { const s = toDateString(y, m, d); return t === "in" ? s === checkIn : s === checkOut; };

  return (
    <div className="absolute left-0 top-full z-40 mt-2 rounded-2xl border border-gray-200 bg-white p-5 shadow-lg">
      <p className="mb-4 text-sm font-semibold text-gray-900">Fechas</p>
      <div className="flex gap-8">
        {months.map(({ year, month }) => (
          <div key={`${year}-${month}`} className="w-64">
            <p className="mb-3 text-center text-sm font-medium text-gray-900">{MONTHS[month]} {year}</p>
            <div className="grid grid-cols-7 gap-1">
              {DAYS.map((d) => (
                <div key={d} className="text-center text-xs font-medium text-gray-400">{d}</div>
              ))}
              {getMonthGrid(year, month).flat().map((day, idx) =>
                day === null ? <div key={`e-${idx}`} /> : (
                  <DayButton
                    key={`${year}-${month}-${day}`}
                    year={year} month={month} day={day}
                    isPast={isPastDate(year, month, day, { year: today.y, month: today.m, day: today.d })}
                    isSelectedIn={isSelected(year, month, day, "in")}
                    isSelectedOut={isSelected(year, month, day, "out")}
                    isInRange={isInRange(year, month, day)}
                    onClick={handleDayClick}
                  />
                )
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 border-t border-gray-100 pt-3">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>{checkIn ? `Entrada: ${checkIn}` : "Selecciona fecha de entrada"}</span>
          <span>{checkOut ? `Salida: ${checkOut}` : checkIn ? "Selecciona fecha de salida" : ""}</span>
        </div>
      </div>
    </div>
  );
};

export default DatePanel;
