"use client";

import Image from "next/image";
import Link from "next/link";

import {
    CalendarDaysIcon,
    CheckCircle2Icon,
    ClockIcon,
    EyeIcon,
    TagIcon,
    Trash2Icon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
export type Booking = {
    _id: string;
    destinationName: string;
    country?: string;
    price: string;
    departureDate: string;
    imageUrl: string;
    dateBooked?: string;
    status?: string;
};

function formatDepartureDate(value?: string) {
    if (!value) return "Not set";

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;

    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

export function MyBookingCard({ booking }: { booking: Booking }) {
    const status = booking.status ?? "Confirmed";
    const isConfirmed = status.toLowerCase() === "confirmed";
    const router = useRouter();
    const handleCancelBooking = async () => {
        try {
            const response = await fetch(
                `http://localhost:8000/my-bookings/${booking._id}`,
                {
                    method: "DELETE",
                }
            );
            const result = await response.json();
            console.log(result);

            if (!response.ok) {
                throw new Error("Failed to cancel booking");
            }

            router.push("/my-bookings");
            router.refresh();
        } catch (error) {
            console.error("Error cancelling booking:", error);
        }
    };


    // const handleCancelBooking = async () => {

    //         const response = await fetch(`http://localhost:8000/bookings/${booking._id}`, {
    //             method: "DELETE",
    //         });
    //         const result = await response.json();
    //          console.log(result);
    //         redirect("/my-bookings");

    //     }
    return (
        <Card className="gap-0 border-zinc-200 bg-white py-0 shadow-sm ring-zinc-200">
            <CardContent className="px-0">
                <div className="flex flex-col gap-5 p-4 sm:flex-row sm:p-5">
                    <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-lg sm:w-64">
                        <Image
                            src={booking.imageUrl}
                            alt={booking.destinationName}
                            fill
                            sizes="(max-width: 640px) 100vw, 256px"
                            className="object-cover"
                        />
                    </div>

                    <div className="flex flex-1 flex-col">
                        <div>
                            <Badge
                                variant="outline"
                                className={
                                    isConfirmed
                                        ? "h-6 border-emerald-200 bg-emerald-50 px-2.5 text-[0.8rem] font-semibold text-emerald-600"
                                        : "h-6 border-amber-200 bg-amber-50 px-2.5 text-[0.8rem] font-semibold text-amber-600"
                                }
                            >
                                {isConfirmed ? (
                                    <CheckCircle2Icon data-icon="inline-start" />
                                ) : (
                                    <ClockIcon data-icon="inline-start" />
                                )}
                                {isConfirmed ? "Confirmed" : status}
                            </Badge>
                        </div>

                        <h2 className="mt-2 text-2xl font-bold tracking-tight text-zinc-900">
                            {booking.destinationName}
                        </h2>

                        <div className="mt-3 space-y-2 text-sm text-zinc-500">
                            <p className="flex items-center gap-2">
                                <CalendarDaysIcon className="h-4 w-4 shrink-0" />
                                Departure: {formatDepartureDate(booking.departureDate)}
                            </p>
                            <p className="flex items-center gap-2">
                                <TagIcon className="h-4 w-4 shrink-0" />
                                Booking ID: {booking._id}
                            </p>
                        </div>

                        <div className="mt-auto flex flex-col gap-4 pt-5 sm:flex-row sm:items-center sm:justify-between">
                            <p className="font-display text-3xl font-medium text-brand">
                                ${booking.price}
                            </p>

                            <div className="flex items-center gap-3">
                                <AlertDialog>
                                    <AlertDialogTrigger
                                        render={
                                            <Button
                                                onClick={handleCancelBooking}
                                                type="button"
                                                variant="outline"
                                                className="border-rose-200 bg-white text-rose-500 hover:border-rose-300 hover:bg-rose-50 hover:text-rose-600"
                                            >
                                                <Trash2Icon className="h-4 w-4" />
                                                Cancel
                                            </Button>
                                        }
                                    />
                                    {/* <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>
                                                Cancel this booking?
                                            </AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Your trip to {booking.destinationName} will be
                                                cancelled. This action cannot be undone.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>
                                                Keep Booking
                                            </AlertDialogCancel>
                                            <AlertDialogAction onClick={handleCancelBooking} variant="destructive">
                                                Yes, Cancel Booking
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent> */}
                                </AlertDialog>

                                <Button
                                    type="button"
                                    render={
                                        <Link href={`/destinations/${booking._id}`} />
                                    }
                                    className="bg-brand text-white hover:bg-brand/90"
                                >
                                    <EyeIcon className="h-4 w-4" />
                                    View
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
