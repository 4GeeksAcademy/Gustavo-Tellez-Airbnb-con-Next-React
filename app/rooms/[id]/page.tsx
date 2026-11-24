"use client";

import { Suspense } from "react";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { accommodations } from "@/data/accommodations";
import LoadingState from "@/components/shared/LoadingState";
import RoomTitle from "@/components/room/RoomTitle";
import RoomLocation from "@/components/room/RoomLocation";
import RoomGallery from "@/components/room/RoomGallery";
import RoomHost from "@/components/room/RoomHost";
import RoomDescription from "@/components/room/RoomDescription";
import RoomDetails from "@/components/room/RoomDetails";
import RoomAmenities from "@/components/room/RoomAmenities";
import BookingCard from "@/components/room/BookingCard";
import RoomRules from "@/components/room/RoomRules";
import RoomReviews from "@/components/room/RoomReviews";
import ShareSaveButtons from "@/components/room/ShareSaveButtons";
import RoomNotFound from "@/components/room/RoomNotFound";
import BackNavigation from "@/components/room/BackNavigation";

function RoomDetailContent() {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);

  const id = params.id as string;
  const accommodation = accommodations.find((a) => a.id === id);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-8">
        <LoadingState count={1} />
      </div>
    );
  }

  if (!accommodation) {
    return <RoomNotFound />;
  }

  const images = [accommodation.image, ...accommodation.images];

  return (
    <div className="mx-auto max-w-5xl px-4 py-6">
      <BackNavigation />
      {/* Header */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <RoomTitle title={accommodation.title} />
          <RoomLocation location={accommodation.location} />
        </div>
        <ShareSaveButtons />
      </div>

      {/* Gallery */}
      <div className="mb-6">
        <RoomGallery images={images} title={accommodation.title} />
      </div>

      {/* Main content + Booking card */}
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Left column */}
        <div className="flex-1 space-y-6">
          <RoomHost host={accommodation.host} />
          <RoomDetails
            guests={accommodation.guests}
            bedrooms={accommodation.bedrooms}
            beds={accommodation.beds}
            bathrooms={accommodation.bathrooms}
          />
          <RoomAmenities amenities={accommodation.amenities} />
          <RoomDescription description={accommodation.description} />
          <RoomRules rules={accommodation.rules} />
          <RoomReviews rating={accommodation.rating} reviewCount={accommodation.reviewCount} />
        </div>

        {/* Right column */}
        <div className="lg:w-96 shrink-0">
          <BookingCard
            pricePerNight={accommodation.pricePerNight}
            rating={accommodation.rating}
            reviewCount={accommodation.reviewCount}
          />
        </div>
      </div>
    </div>
  );
}

export default function RoomDetailPage() {
  return (
    <Suspense fallback={<LoadingState count={1} />}>
      <RoomDetailContent />
    </Suspense>
  );
}