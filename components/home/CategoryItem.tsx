import { Category } from "@/types";

interface CategoryItemProps {
  category: Category;
  selected: boolean;
  onClick: () => void;
}

export default function CategoryItem({ category, selected, onClick }: CategoryItemProps) {
  return (
    <button
      onClick={onClick}
      className={`flex shrink-0 flex-col items-center gap-1 border-b-2 px-2 pb-2 pt-2 text-xs transition ${
        selected
          ? "border-gray-900 text-gray-900"
          : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
      }`}
      aria-pressed={selected}
    >
      <span className="text-xl">{category.emoji}</span>
      <span className="whitespace-nowrap font-medium">{category.label}</span>
    </button>
  );
}