import Image from "next/image";
import Link from "next/link";
import { getTokenFromServer } from "@/lib/getTokenFromServer";
import {
    ArrowLeftIcon,

    CalendarDaysIcon,
    CheckIcon,
    MapPinIcon,

    StarIcon,

} from "lucide-react";



import EditDestinationDialog from "@/components/EditDestinationDialog";
import DeleteDestinationDialog from "@/components/DeleteDestinationDialog";
import BookingCard from "@/components/booking/BookingCard";



const highlights = [
    "Luxury beachfront accommodation",
    "Visit Uluwatu Temple at sunset",
    "Traditional Balinese spa treatment",
    "Private beach dinner experience",
    "Sunrise trek to Mount Batur",
];




const destinationDetailsPage = async (props: PageProps<"/destinations/[id]">) => {
    const { id } = await props.params;

    const jwtToken = await getTokenFromServer();
    console.log("jwtToken", jwtToken?.token)

    const res = await fetch(`http://localhost:8000/destinations/${id}`, {
        headers: {
            authorization:  `Bearer ${jwtToken?.token}` // Include the JWT token in the Authorization header
        }
    });
    const Destination = await res.json();

    return (
        <div className="min-h-screen bg-white px-6 py-10 sm:px-12">
            <div className="mx-auto max-w-5xl">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <Link
                        href="/destinations"
                        className="flex items-center gap-2 text-sm font-medium text-zinc-700 hover:text-zinc-900"
                    >
                        <ArrowLeftIcon className="h-4 w-4" />
                        Back to Destinations
                    </Link>

                    <div className="flex gap-3">

                        <EditDestinationDialog destination={Destination}></EditDestinationDialog>
                        <DeleteDestinationDialog destination={Destination}></DeleteDestinationDialog>
                    </div>
                </div>

                <div className="relative mt-6 aspect-[12/5] w-full overflow-hidden rounded-xl">
                    <Image
                        src={Destination.imageUrl}
                        alt={Destination.destinationName}
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 1024px"
                        className="object-cover"
                    />
                </div>

                <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_300px]">
                    <div>
                        <div className="flex items-center gap-1.5 text-sm text-zinc-500">
                            <MapPinIcon className="h-4 w-4" />
                            {Destination.country}
                        </div>

                        <h1 className="font-display mt-2 text-4xl font-medium tracking-tight text-zinc-900">
                            {Destination.destinationName}
                        </h1>

                        <div className="mt-3 flex flex-wrap items-center gap-5 text-sm">
                            <span className="flex items-center gap-1.5 font-semibold text-zinc-900">
                                <StarIcon className="h-4 w-4 fill-emerald-500 text-emerald-500" />
                                4.9
                                <span className="font-normal text-zinc-500">
                                    (234 reviews)
                                </span>
                            </span>
                            <span className="flex items-center gap-1.5 font-semibold text-zinc-900">
                                <CalendarDaysIcon className="h-4 w-4 text-zinc-500" />
                                {Destination.duration.replace(/\//g, " / ")}
                            </span>
                        </div>

                        <h2 className="font-display mt-8 text-2xl font-medium tracking-tight text-zinc-900">
                            Overview
                        </h2>
                        <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                            {Destination.description}
                        </p>

                        <h2 className="font-display mt-8 text-2xl font-medium tracking-tight text-zinc-900">
                            Highlights
                        </h2>
                        <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                            {Destination.description}
                        </p>

                        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                            {highlights.map((highlight) => (
                                <li
                                    key={highlight}
                                    className="flex items-center gap-2 text-sm text-zinc-700"
                                >
                                    <CheckIcon className="h-4 w-4 shrink-0 text-emerald-500" />
                                    {highlight}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <BookingCard Destination={Destination}></BookingCard>
                </div>
            </div>
        </div>
    );
};

export default destinationDetailsPage;
