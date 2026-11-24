interface FilterSegmentProps {
  label: string;
  value: string;
  isActive: boolean;
  isPlaceholder: boolean;
  onClick: () => void;
  panel: React.ReactNode;
}

const FilterSegment = ({ label, value, isActive, isPlaceholder, onClick, panel }: FilterSegmentProps) => (
  <div
    onClick={onClick}
    className={`relative flex flex-1 cursor-pointer items-center px-6 py-3 text-left transition-colors hover:bg-gray-50 first:rounded-l-full ${isActive ? "bg-gray-50" : ""}`}
  >
    <div className="flex flex-col">
      <span className="text-xs font-semibold text-gray-900">{label}</span>
      <span className={`text-sm ${isPlaceholder ? "text-gray-500" : "text-gray-900"}`}>{value}</span>
    </div>
    {isActive && panel}
  </div>
);

export default FilterSegment;