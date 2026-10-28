'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Destination } from "@/components/destination-card";
import {

    ArrowRightIcon,

    CheckIcon,

} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { date } from "better-auth";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

const perks = [
    "Free cancellation up to 7 days",
    "Travel insurance included",
    "24/7 customer support",
];


export default function BookingCard({ Destination }: { Destination: Destination }) {
    const { data: session, } = authClient.useSession()
    const user = session?.user;

    const handleBooking = async (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();
        const departureDate = event.currentTarget.departureDate.value;
        console.log(departureDate)
        const data={
            username: user?.name,
            email: user?.email,
            image: user?.image,
            ...Destination,
            departureDate: departureDate,
            dateBooked: new Date().toISOString(),
        }
        console.log(data)

         const token = await getTokenFromClient();

        const res= await fetch('http://localhost:8000/bookings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
        const result = await res.json()
        console.log(result)

    }
     

    return (
        <div>
            <Card className="h-fit border-zinc-200 bg-white py-0 shadow-sm lg:sticky lg:top-6 self-start">
                <CardContent className="space-y-4 px-5 py-5">
                    <div>
                        <p className="text-sm text-zinc-500">
                            Starting from
                        </p>
                        <p className="font-display mt-1 text-3xl font-medium text-brand">
                            ${Destination.price}
                        </p>
                        <p className="mt-1 text-sm text-zinc-500">
                            per person
                        </p>
                    </div>

                    <Separator className="bg-zinc-200" />
                    <form onSubmit={handleBooking} className="space-y-3">
                        <Input
                            type="date"
                            name="departureDate"
                            defaultValue={Destination.departureDate}
                            className="border-0 bg-zinc-100 text-sm text-zinc-700"
                        />

                        <Button type="submit" className="w-full bg-brand hover:bg-brand/90">
                            Book Now
                            <ArrowRightIcon className="h-4 w-4" />
                        </Button>
                    </form>
                    <ul className="space-y-2.5 pt-1">
                        {perks.map((perk) => (
                            <li
                                key={perk}
                                className="flex items-center gap-2 text-sm text-zinc-600"
                            >
                                <CheckIcon className="h-4 w-4 shrink-0 text-emerald-500" />
                                {perk}
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </div>
    );
};
