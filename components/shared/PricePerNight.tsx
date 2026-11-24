interface PricePerNightProps {
  price: number;
}

const PricePerNight = ({ price }: PricePerNightProps) => {
  return (
    <span className="font-semibold text-gray-900">
      {price}€ <span className="font-normal text-gray-500">/ noche</span>
    </span>
  );
}

export default PricePerNight;
