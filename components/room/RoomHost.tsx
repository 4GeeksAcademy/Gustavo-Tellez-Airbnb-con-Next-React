import { Host } from "@/types";

interface RoomHostProps {
  host: Host;
}

const RoomHost = ({ host }: RoomHostProps) => {
  return (
    <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-lg font-bold text-rose-600">
        {host.name.charAt(0)}
      </div>
      <div>
        <p className="font-semibold text-gray-900">Anfitrión: {host.name}</p>
        <p className="text-sm text-gray-500">Se unió en {host.joined}</p>
      </div>
    </div>
  );
}

export default RoomHost;
