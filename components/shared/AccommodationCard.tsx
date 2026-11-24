import Link from "next/link";
import { Accommodation } from "@/types";
import AccommodationImage from "./AccommodationImage";
import AccommodationInfo from "./AccommodationInfo";

interface AccommodationCardProps {
  accommodation: Accommodation;
}

export default function AccommodationCard({ accommodation }: AccommodationCardProps) {
  return (
    <Link href={`/rooms/${accommodation.id}`} className="group block">
      <AccommodationImage src={accommodation.image} alt={accommodation.title} />
      <AccommodationInfo
        title={accommodation.title}
        price={accommodation.pricePerNight}
        rating={accommodation.rating}
        reviewCount={accommodation.reviewCount}
      />
    </Link>
  );
}