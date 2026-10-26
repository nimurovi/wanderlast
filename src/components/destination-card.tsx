import Image from "next/image";
import { ArrowUpRight, CalendarDays, MapPin, Star } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export type Destination = {
  _id: string;
  destinationName: string;
  country: string;
  category: string;
  price: string;
  duration: string;
  departureDate: string;
  imageUrl: string;
  description: string;
};

export function DestinationCard({ destination }: { destination: Destination }) {
  return (
    <Card className="group/card-destination gap-0 border-zinc-200 bg-white p-0 py-0 shadow-sm transition-shadow hover:shadow-md">
      <div className="relative aspect-[4/3] overflow-hidden rounded-t-xl">
        <Image
          src={destination.imageUrl}
          alt={destination.destinationName}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover/card-destination:scale-105"
        />
        <span className="absolute top-3 right-3 flex items-center gap-1 rounded-md bg-white px-2 py-1 text-sm font-semibold text-zinc-900 shadow-sm">
          4.5
          <Star className="h-3.5 w-3.5 fill-zinc-900 text-zinc-900" />
        </span>
      </div>

      <CardContent className="space-y-2.5 px-4 pt-3 pb-4">
        <div className="flex items-center gap-1.5 text-sm text-zinc-500">
          <MapPin className="h-4 w-4" />
          {destination.country}
        </div>

        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-display text-lg font-medium tracking-tight text-zinc-900">
            {destination.destinationName}
          </h3>
          <p className="shrink-0 font-semibold text-zinc-900">
            ${destination.price}
            <span className="text-sm font-normal text-zinc-500">/Person</span>
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-sm text-zinc-500">
          <CalendarDays className="h-4 w-4" />
          {destination.duration}
        </div>

        <Link
          href={`/destinations/${destination._id}`}
          className="inline-flex items-center gap-1 text-sm font-bold tracking-wide text-brand uppercase hover:underline"
        >
          Book Now
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </CardContent>
    </Card>
  );
}
