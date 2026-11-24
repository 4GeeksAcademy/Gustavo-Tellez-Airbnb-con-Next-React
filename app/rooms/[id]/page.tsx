"use client";

import { Suspense, useState, useEffect } from "react";
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

const RoomDetailContent = () => {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const id = params.id as string;
  const accommodation = accommodations.find((a) => a.id === id);

  useEffect(() => { const t = setTimeout(() => setIsLoading(false), 500); return () => clearTimeout(t); }, []);

  if (isLoading) return <div className="mx-auto max-w-5xl px-4 py-8"><LoadingState count={1} /></div>;
  if (!accommodation) return <RoomNotFound />;

  const { image, images: extraImages, title, location, host, guests, bedrooms, beds, bathrooms, amenities, description, rules, rating, pricePerNight, reviewCount } = accommodation;
  const allImages = [image, ...extraImages];

  return (
    <div className="mx-auto max-w-5xl px-4 py-6">
      <BackNavigation />
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div><RoomTitle title={title} /><RoomLocation location={location} /></div>
        <ShareSaveButtons />
      </div>
      <div className="mb-6"><RoomGallery images={allImages} title={title} /></div>
      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="flex-1 space-y-6">
          <RoomHost host={host} />
          <RoomDetails guests={guests} bedrooms={bedrooms} beds={beds} bathrooms={bathrooms} />
          <RoomAmenities amenities={amenities} />
          <RoomDescription description={description} />
          <RoomRules rules={rules} />
          <RoomReviews rating={rating} reviewCount={reviewCount} />
        </div>
        <div className="lg:w-96 shrink-0">
          <BookingCard pricePerNight={pricePerNight} rating={rating} reviewCount={reviewCount} />
        </div>
      </div>
    </div>
  );
};

const RoomDetailPage = () => <Suspense fallback={<LoadingState count={1} />}><RoomDetailContent /></Suspense>;

export default RoomDetailPage;