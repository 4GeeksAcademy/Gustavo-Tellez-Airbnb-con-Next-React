import PricePerNight from "./PricePerNight";
import Rating from "./Rating";

interface AccommodationInfoProps {
  title: string;
  price: number;
  rating: number;
  reviewCount?: number;
}

const AccommodationInfo = ({
  title,
  price,
  rating,
  reviewCount,
}: AccommodationInfoProps) => {
  return (
    <div className="mt-2 space-y-1">
      <h3 className="font-medium text-gray-900 truncate">{title}</h3>
      <Rating rating={rating} reviewCount={reviewCount} />
      <PricePerNight price={price} />
    </div>
  );
}

export default AccommodationInfo;
