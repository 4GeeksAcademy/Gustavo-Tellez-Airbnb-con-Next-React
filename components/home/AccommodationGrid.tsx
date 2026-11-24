import { Accommodation } from "@/types";
import AccommodationCard from "@/components/shared/AccommodationCard";

interface AccommodationGridProps {
  accommodations: Accommodation[];
}

export default function AccommodationGrid({ accommodations }: AccommodationGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {accommodations.map((acc) => (
        <AccommodationCard key={acc.id} accommodation={acc} />
      ))}
    </div>
  );
}