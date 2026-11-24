interface RoomDescriptionProps {
  description: string;
}

export default function RoomDescription({ description }: RoomDescriptionProps) {
  return (
    <div className="border-b border-gray-200 pb-4">
      <h2 className="mb-2 text-lg font-semibold text-gray-900">Descripción</h2>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}