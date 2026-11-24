import Image from "next/image";

interface AccommodationImageProps {
  src: string;
  alt: string;
}

export default function AccommodationImage({ src, alt }: AccommodationImageProps) {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
}