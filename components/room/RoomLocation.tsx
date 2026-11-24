interface RoomLocationProps {
  location: string;
}

export default function RoomLocation({ location }: RoomLocationProps) {
  return (
    <p className="text-sm text-gray-500">
      📍 {location}
    </p>
  );
}