import { Accommodation } from "@/types";
import AccommodationCard from "@/components/shared/AccommodationCard";

interface AccommodationListProps {
  accommodations: Accommodation[];
}

export default function AccommodationList({ accommodations }: AccommodationListProps) {
  return (
    <div className="space-y-4">
      {accommodations.map((acc) => (
        <div key={acc.id} className="flex flex-col gap-4 sm:flex-row">
          <div className="w-full sm:w-72 shrink-0">
            <AccommodationCard accommodation={acc} />
          </div>
          <div className="flex flex-col justify-between py-2">
            <div>
              <p className="text-sm text-gray-500">{acc.location}</p>
              <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                {acc.amenities.slice(0, 3).map((a) => a.label).join(" · ")}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}