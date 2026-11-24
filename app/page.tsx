"use client";

import { useState, useEffect, useMemo } from "react";
import { categories } from "@/data/categories";
import { accommodations } from "@/data/accommodations";
import LoadingState from "@/components/shared/LoadingState";
import CategoriesNavigation from "@/components/home/CategoriesNavigation";
import AccommodationGrid from "@/components/home/AccommodationGrid";
import Link from "next/link";
import { useSearch } from "@/components/shared/SearchContext";

const categoryLabelMap: Record<string, string> = {};
for (const cat of categories) {
  categoryLabelMap[cat.id] = cat.label.toLowerCase();
}

export default function Home() {
  const { searchQuery } = useSearch();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const filtered = useMemo(
    () =>
      accommodations.filter((accommodation) => {
        const matchesCategory =
          selectedCategory === null ||
          accommodation.categoryId === selectedCategory;
        const query = searchQuery.trim().toLowerCase();
        const matchesSearch =
          query.length === 0 ||
          accommodation.title.toLowerCase().includes(query) ||
          accommodation.location.toLowerCase().includes(query) ||
          (categoryLabelMap[accommodation.categoryId] || "").includes(query);

        return matchesCategory && matchesSearch;
      }),
    [selectedCategory, searchQuery],
  );
  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8">
        <LoadingState count={8} />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <CategoriesNavigation
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <span className="text-4xl">🏡</span>
          <p className="mt-4 text-lg">Sin alojamientos en esta categoría</p>
          <p className="mt-1 text-sm">
            <Link href="/catalog" className="text-rose-500 hover:underline">
              Ver todos en el catálogo
            </Link>
          </p>
        </div>
      ) : (
        <AccommodationGrid accommodations={filtered} />
      )}
    </div>
  );
}
