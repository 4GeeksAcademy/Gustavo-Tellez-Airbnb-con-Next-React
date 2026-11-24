"use client";

import { useMemo } from "react";

interface DatePanelProps {
  checkIn: string | null;
  checkOut: string | null;
  onChange: (checkIn: string | null, checkOut: string | null) => void;
}

const MONTHS = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

const DAYS = ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"];

function getMonthGrid(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const weeks: (number | null)[][] = [];
  let week: (number | null)[] = [];

  for (let i = 0; i < firstDay; i++) {
    week.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    week.push(day);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }

  if (week.length > 0) {
    while (week.length < 7) {
      week.push(null);
    }
    weeks.push(week);
  }

  return weeks;
}

function toDateString(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export default function DatePanel({
  checkIn,
  checkOut,
  onChange,
}: DatePanelProps) {
  const today = useMemo(() => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth(), day: now.getDate() };
  }, []);

  const months = useMemo(() => {
    const result: { year: number; month: number }[] = [];
    for (let i = 0; i < 2; i++) {
      let m = today.month + i;
      let y = today.year;
      if (m > 11) {
        m -= 12;
        y += 1;
      }
      result.push({ year: y, month: m });
    }
    return result;
  }, [today]);

  const handleDayClick = (year: number, month: number, day: number) => {
    const dateStr = toDateString(year, month, day);

    if (!checkIn || (checkIn && checkOut)) {
      onChange(dateStr, null);
    } else {
      if (dateStr <= checkIn) {
        onChange(dateStr, null);
      } else {
        onChange(checkIn, dateStr);
      }
    }
  };

  const isInRange = (year: number, month: number, day: number) => {
    if (!checkIn) return false;
    const date = toDateString(year, month, day);
    if (checkOut) {
      return date > checkIn && date < checkOut;
    }
    return false;
  };

  const isSelected = (year: number, month: number, day: number, type: "in" | "out") => {
    const date = toDateString(year, month, day);
    if (type === "in") return date === checkIn;
    return date === checkOut;
  };

  const isPast = (year: number, month: number, day: number) => {
    if (year < today.year) return true;
    if (year === today.year && month < today.month) return true;
    if (year === today.year && month === today.month && day < today.day) return true;
    return false;
  };

  return (
    <div className="absolute left-0 top-full z-40 mt-2 rounded-2xl border border-gray-200 bg-white p-5 shadow-lg">
      <p className="mb-4 text-sm font-semibold text-gray-900">Fechas</p>
      <div className="flex gap-8">
        {months.map(({ year, month }) => {
          const grid = getMonthGrid(year, month);
          return (
            <div key={`${year}-${month}`} className="w-64">
              <p className="mb-3 text-center text-sm font-medium text-gray-900">
                {MONTHS[month]} {year}
              </p>
              <div className="grid grid-cols-7 gap-1">
                {DAYS.map((d) => (
                  <div
                    key={d}
                    className="text-center text-xs font-medium text-gray-400"
                  >
                    {d}
                  </div>
                ))}
                {grid.flat().map((day, idx) => {
                  if (day === null) {
                    return <div key={`e-${idx}`} />;
                  }

                  const selectedIn = isSelected(year, month, day, "in");
                  const selectedOut = isSelected(year, month, day, "out");
                  const inRange = isInRange(year, month, day);
                  const past = isPast(year, month, day);

                  return (
                    <button
                      key={`${year}-${month}-${day}`}
                      disabled={past}
                      onClick={() => handleDayClick(year, month, day)}
                      className={`relative flex h-10 w-10 items-center justify-center rounded-full text-sm transition-colors
                        ${past ? "cursor-not-allowed text-gray-300" : "hover:bg-gray-100"}
                        ${selectedIn || selectedOut ? "bg-gray-900 text-white hover:bg-gray-800" : ""}
                        ${inRange ? "bg-gray-100" : ""}
                      `}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-4 border-t border-gray-100 pt-3">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>
            {checkIn
              ? `Entrada: ${checkIn}`
              : "Selecciona fecha de entrada"}
          </span>
          <span>
            {checkOut
              ? `Salida: ${checkOut}`
              : checkIn
              ? "Selecciona fecha de salida"
              : ""}
          </span>
        </div>
      </div>
    </div>
  );
}