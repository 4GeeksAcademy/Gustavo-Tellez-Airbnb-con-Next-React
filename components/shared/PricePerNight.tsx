interface PricePerNightProps {
  price: number;
}

export default function PricePerNight({ price }: PricePerNightProps) {
  return (
    <span className="font-semibold text-gray-900">
      {price}€ <span className="font-normal text-gray-500">/ noche</span>
    </span>
  );
}