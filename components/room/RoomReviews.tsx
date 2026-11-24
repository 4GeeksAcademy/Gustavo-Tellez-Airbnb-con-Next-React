interface RoomReviewsProps {
  rating: number;
  reviewCount: number;
}

const RoomReviews = ({ rating, reviewCount }: RoomReviewsProps) => {
  return (
    <div className="border-b border-gray-200 pb-4">
      <h2 className="mb-3 text-lg font-semibold text-gray-900">
        ★ {rating.toFixed(2)} · {reviewCount} reseñas
      </h2>
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <span className="text-gray-400">Los huéspedes destacan la limpieza, la ubicación y la amabilidad del anfitrión.</span>
      </div>
    </div>
  );
}

export default RoomReviews;
