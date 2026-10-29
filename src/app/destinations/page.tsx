import React from 'react';

import {
  DestinationCard,
  type Destination,
} from "@/components/destination-card";

const allDestinationPage = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/destinations`,{
        cache: 'no-store'
    })
    const data: Destination[] = await res.json()

    return (
        <div className="min-h-screen bg-white px-6 py-16 sm:px-12">
            <h1 className="font-display text-4xl font-medium tracking-tight text-zinc-900 md:text-5xl">
                Explore All Destinations
            </h1>
            <p className="mt-3 text-sm text-zinc-500 md:text-base">
                Find your perfect travel experience from our curated collection
            </p>

            <p className="mt-10 text-sm text-zinc-500">
                Showing {data.length} destinations
            </p>

            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {data.map((destination) => (
                    <DestinationCard
                        key={destination._id}
                        destination={destination}
                    />
                ))}
            </div>
        </div>
    );
};

export default allDestinationPage;
