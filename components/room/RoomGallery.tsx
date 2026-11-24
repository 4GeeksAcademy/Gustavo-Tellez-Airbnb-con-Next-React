"use client";

import Image from "next/image";
import { useState } from "react";

interface RoomGalleryProps {
  images: string[];
  title: string;
}

export default function RoomGallery({ images, title }: RoomGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const thumbnails = images.slice(0, 5);

  const showPrevious = () => {
    setCurrentIndex((current) => Math.max(0, current - 1));
  };

  const showNext = () => {
    setCurrentIndex((current) => Math.min(thumbnails.length - 1, current + 1));
  };

  return (
    <div>
      <div className="relative mb-2 aspect-[4/3] overflow-hidden rounded-xl md:aspect-[16/7]">
        <Image
          src={thumbnails[currentIndex]}
          alt={`${title} - Foto ${currentIndex + 1}`}
          fill
          className="object-cover"
        />
        {thumbnails.length > 1 && (
          <>
            <button
              type="button"
              onClick={showPrevious}
              disabled={currentIndex === 0}
              className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-900 shadow disabled:opacity-40"
              aria-label="Foto anterior"
            >
              ←
            </button>
            <button
              type="button"
              onClick={showNext}
              disabled={currentIndex === thumbnails.length - 1}
              className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-900 shadow disabled:opacity-40"
              aria-label="Foto siguiente"
            >
              →
            </button>
          </>
        )}
      </div>
      <div className="grid grid-cols-5 gap-2">
        {thumbnails.map((src, index) => (
          <button
            key={src}
            type="button"
            onClick={() => setCurrentIndex(index)}
            className={`relative aspect-[4/3] overflow-hidden rounded-lg border-2 ${
              index === currentIndex ? "border-rose-500" : "border-transparent"
            }`}
            aria-label={`Mostrar foto ${index + 1}`}
          >
            <Image src={src} alt="" fill className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}