interface DayButtonProps {
  year: number;
  month: number;
  day: number;
  isPast: boolean;
  isSelectedIn: boolean;
  isSelectedOut: boolean;
  isInRange: boolean;
  onClick: (year: number, month: number, day: number) => void;
}

const DayButton = ({ year, month, day, isPast, isSelectedIn, isSelectedOut, isInRange, onClick }: DayButtonProps) => (
  <button
    disabled={isPast}
    onClick={() => onClick(year, month, day)}
    className={`relative flex h-10 w-10 items-center justify-center rounded-full text-sm transition-colors
      ${isPast ? "cursor-not-allowed text-gray-300" : "hover:bg-gray-100"}
      ${isSelectedIn || isSelectedOut ? "bg-gray-900 text-white hover:bg-gray-800" : ""}
      ${isInRange ? "bg-gray-100" : ""}
    `}
  >
    {day}
  </button>
);

export default DayButton;