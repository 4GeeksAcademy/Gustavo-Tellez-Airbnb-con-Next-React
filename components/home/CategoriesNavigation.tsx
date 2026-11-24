"use client";

import { Category } from "@/types";
import CategoryItem from "./CategoryItem";

interface CategoriesNavigationProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (id: string | null) => void;
}

export default function CategoriesNavigation({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoriesNavigationProps) {
  return (
    <nav className="mb-6 overflow-x-auto border-b border-gray-200">
      <div className="flex gap-2">
        <CategoryItem
          category={{ id: "todas", label: "Todas", emoji: "🏠" }}
          selected={selectedCategory === null}
          onClick={() => onSelectCategory(null)}
        />
        {categories.map((cat) => (
          <CategoryItem
            key={cat.id}
            category={cat}
            selected={selectedCategory === cat.id}
            onClick={() => onSelectCategory(cat.id)}
          />
        ))}
      </div>
    </nav>
  );
}