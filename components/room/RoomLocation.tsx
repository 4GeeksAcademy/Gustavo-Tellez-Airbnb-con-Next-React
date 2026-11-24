interface RoomLocationProps {
  location: string;
}

const RoomLocation = ({ location }: RoomLocationProps) => {
  return (
    <p className="text-sm text-gray-500">
      📍 {location}
    </p>
  );
}

export default RoomLocation;
