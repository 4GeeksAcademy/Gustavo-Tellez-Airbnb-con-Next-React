interface RatingProps {
  rating: number;
  reviewCount?: number;
}

export default function Rating({ rating, reviewCount }: RatingProps) {
  return (
    <span className="flex items-center gap-1 text-sm text-gray-700">
      <span className="text-rose-500">★</span>
      <span className="font-semibold">{rating.toFixed(1)}</span>
      {reviewCount !== undefined && (
        <span className="text-gray-500">· {reviewCount} reseñas</span>
      )}
    </span>
  );
}