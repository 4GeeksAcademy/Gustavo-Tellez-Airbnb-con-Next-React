"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { accommodations } from "@/data/accommodations";
import { categories } from "@/data/categories";
import LoadingState from "@/components/shared/LoadingState";
import ResultsHeader from "@/components/catalog/ResultsHeader";
import ResultsCounter from "@/components/catalog/ResultsCounter";
import SortingControl from "@/components/catalog/SortingControl";
import AccommodationList from "@/components/catalog/AccommodationList";
import MapPlaceholder from "@/components/catalog/MapPlaceholder";
import { useSearch } from "@/components/shared/SearchContext";

const categoryLabelMap: Record<string, string> = {};
for (const cat of categories) categoryLabelMap[cat.id] = cat.label.toLowerCase();

const CatalogContent = () => {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get("q") || "";
  const { searchQuery } = useSearch();
  const activeQuery = searchQuery.trim() || queryParam;

  const [sortOrder, setSortOrder] = useState<"none" | "price-asc" | "price-desc" | "rating">("none");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  const filteredAndSorted = useMemo(() => {
    let result = [...accommodations];
    if (activeQuery.trim()) {
      const q = activeQuery.trim().toLowerCase();
      result = result.filter(
        (a) => a.title.toLowerCase().includes(q) || a.location.toLowerCase().includes(q) || (categoryLabelMap[a.categoryId] || "").includes(q)
      );
    }
    switch (sortOrder) {
      case "price-asc": result.sort((a, b) => a.pricePerNight - b.pricePerNight); break;
      case "price-desc": result.sort((a, b) => b.pricePerNight - a.pricePerNight); break;
      case "rating": result.sort((a, b) => b.rating - a.rating); break;
    }
    return result;
  }, [activeQuery, sortOrder]);

  if (isLoading) return <div className="mx-auto max-w-7xl px-4 py-8"><LoadingState count={4} /></div>;

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <ResultsHeader total={filteredAndSorted.length} query={activeQuery || undefined} />
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <ResultsCounter current={filteredAndSorted.length} total={accommodations.length} />
        <SortingControl sortOrder={sortOrder} onChange={setSortOrder} />
      </div>
      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="flex-1"><AccommodationList accommodations={filteredAndSorted} /></div>
        <div className="lg:w-96 shrink-0"><MapPlaceholder /></div>
      </div>
    </div>
  );
}

const CatalogPage = () => (
  <Suspense fallback={<LoadingState count={4} />}>
    <CatalogContent />
  </Suspense>
);

export default CatalogPage;
