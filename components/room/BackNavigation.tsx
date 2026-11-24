"use client";

import { useRouter } from "next/navigation";

const BackNavigation = () => {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="mb-4 flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900"
    >
      ← Volver
    </button>
  );
}

export default BackNavigation;
