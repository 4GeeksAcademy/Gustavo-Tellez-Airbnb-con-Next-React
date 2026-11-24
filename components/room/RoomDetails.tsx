interface RoomDetailsProps {
  guests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
}

const RoomDetails = ({ guests, bedrooms, beds, bathrooms }: RoomDetailsProps) => {
  return (
    <div className="border-b border-gray-200 pb-4">
      <h2 className="mb-2 text-lg font-semibold text-gray-900">Detalles</h2>
      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
        <span>👤 {guests} huéspedes</span>
        <span>🛏️ {bedrooms} habitaciones</span>
        <span>🛌 {beds} camas</span>
        <span>🚿 {bathrooms} baños</span>
      </div>
    </div>
  );
}

export default RoomDetails;
