export interface Category {
  id: string;
  label: string;
  emoji: string;
}

export interface Host {
  name: string;
  avatar: string;
  joined: string;
}

export interface Amenity {
  id: string;
  label: string;
  emoji: string;
}

export interface Accommodation {
  id: string;
  title: string;
  image: string;
  images: string[];
  pricePerNight: number;
  rating: number;
  reviewCount: number;
  categoryId: string;
  location: string;
  host: Host;
  amenities: Amenity[];
  description: string;
  guests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  rules: string[];
}