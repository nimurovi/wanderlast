"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    quote:
      '"The Bali Trip Was Absolutely Magical! Every Detail Was Perfectly Planned. The Resorts Were Luxurious And The Cultural Experiences Were Unforgettable."',
    name: "Michael Chen",
    location: "Singapore",
    photo: "/images/person2.png",
  },
  {
    quote:
      '"Swiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable. Highly Recommend!"',
    name: "Sarah Johnson",
    location: "New York, USA",
    photo: "/images/person1.png",
  },
  {
    quote:
      '"The Kyoto Cherry Blossom Tour Was A Dream Come True. Every Temple Visit And Food Tour Was Thoughtfully Curated And Completely Authentic."',
    name: "Emily Rodriguez",
    location: "Madrid, Spain",
  },
  {
    quote:
      '"Booking Was Effortless And Our Local Guide Was Fantastic. We Discovered Hidden Gems We Never Would Have Found On Our Own."',
    name: "David Kim",
    location: "Seoul, South Korea",
  },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("");
}

export function Testimonials() {
  return (
    <section className="bg-white px-6 py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <Carousel opts={{ align: "start", loop: true }} className="w-full">
          <div className="relative">
            <div className="pr-32">
              <h2 className="font-display text-4xl font-medium tracking-tight text-zinc-900 md:text-5xl">
                What Travelers Say
              </h2>
              <p className="mt-2 text-sm text-zinc-500 md:text-base">
                Real experiences from our happy travelers
              </p>
            </div>
            <CarouselPrevious className="size-12 left-auto right-16" />
            <CarouselNext className="size-12 right-0" />
          </div>

          <CarouselContent className="mt-10 gap-4">
            {testimonials.map((testimonial) => (
              <CarouselItem
                key={testimonial.name}
                className="lg:basis-1/2"
              >
                <figure className="flex h-full gap-5 rounded-lg border border-zinc-200 bg-white p-6">
                  <div className="flex min-w-0 flex-1 flex-col">
                    <blockquote className="font-display text-[15px] leading-snug text-zinc-900">
                      {testimonial.quote}
                    </blockquote>
                    <figcaption className="mt-auto pt-6">
                      <div className="text-sm font-medium text-brand">
                        — {testimonial.name}
                      </div>
                      <div className="mt-0.5 text-xs text-zinc-400">
                        {testimonial.location}
                      </div>
                    </figcaption>
                  </div>
                  {testimonial.photo ? (
                    <Image
                      src={testimonial.photo}
                      alt={testimonial.name}
                      width={208}
                      height={240}
                      className="h-48 w-40 shrink-0 object-cover sm:h-60 sm:w-52"
                    />
                  ) : (
                    <div
                      aria-hidden="true"
                      className="flex h-48 w-40 shrink-0 items-center justify-center bg-brand/10 sm:h-60 sm:w-52"
                    >
                      <span className="font-display text-3xl font-medium text-brand">
                        {initials(testimonial.name)}
                      </span>
                    </div>
                  )}
                </figure>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
