interface RoomRatingProps {
  rating: number;
  reviewCount: number;
}

const RoomRating = ({ rating, reviewCount }: RoomRatingProps) => {
  return (
    <div className="flex items-center gap-1 text-sm text-gray-900">
      <span className="text-rose-500">★</span>
      <span className="font-semibold">{rating.toFixed(2)}</span>
      <span className="text-gray-400">·</span>
      <span className="text-gray-500">{reviewCount} reseñas</span>
    </div>
  );
}

export default RoomRating;
