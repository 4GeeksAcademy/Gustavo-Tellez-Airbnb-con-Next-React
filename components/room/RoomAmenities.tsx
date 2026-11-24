import { Amenity } from "@/types";

interface RoomAmenitiesProps {
  amenities: Amenity[];
}

export default function RoomAmenities({ amenities }: RoomAmenitiesProps) {
  return (
    <div className="border-b border-gray-200 pb-4">
      <h2 className="mb-3 text-lg font-semibold text-gray-900">Servicios</h2>
      <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
        {amenities.map((amenity, i) => (
          <div key={i} className="flex items-center gap-2">
            <span>{amenity.emoji}</span>
            <span>{amenity.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}