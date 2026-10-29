import Link from "next/link";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

import { Button } from "@/components/ui/button";
import { MyBookingCard, type Booking } from "@/components/booking/MyBookingCard";
import { getTokenFromServer } from "@/lib/getTokenFromServer";

const MyBookingPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(), // you need to pass the headers object.
    });
    const user = session?.user;
    const token= await getTokenFromServer()
    const bookings: Booking[] = user?.email
        ? await fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-bookings/${user.email}`,{
            headers: {
                "Authorization": `Bearer ${token}`
            }   
        }).then((res) =>
              res.json()
          )
        : [];

    const bookingList = Array.isArray(bookings) ? bookings : [];

    return (
        <div className="min-h-screen bg-white px-6 py-12 sm:px-12">
            <div className="mx-auto max-w-5xl">
                <h1 className="font-display text-4xl font-medium tracking-tight text-zinc-900 md:text-5xl">
                    My Bookings
                </h1>
                <p className="mt-3 text-sm text-zinc-500 md:text-base">
                    Manage and view your upcoming travel plans
                </p>

                {!user ? (
                    <div className="mt-16 flex flex-col items-start gap-4">
                        <p className="text-sm text-zinc-500">
                            Please log in to see your bookings.
                        </p>
                        <Button
                            render={<Link href="/login" />}
                            className="bg-brand text-white hover:bg-brand/90"
                        >
                            Log In
                        </Button>
                    </div>
                ) : bookingList.length === 0 ? (
                    <div className="mt-16 flex flex-col items-start gap-4">
                        <p className="text-sm text-zinc-500">
                            You haven&apos;t booked any trips yet.
                        </p>
                        <Button
                            render={<Link href="/destinations" />}
                            className="bg-brand text-white hover:bg-brand/90"
                        >
                            Explore Destinations
                        </Button>
                    </div>
                ) : (
                    <div className="mt-8 space-y-6">
                        {bookingList.map((booking) => (
                            <MyBookingCard key={booking._id} booking={booking} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyBookingPage;
