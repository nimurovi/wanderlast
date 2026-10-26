import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

const searchFields = [
  { label: "Location", placeholder: "Address, City Or Zip" },
  { label: "Date/Duration", placeholder: "Anytime/3 Days" },
  { label: "Budget", placeholder: "$0-$3000" },
  { label: "People", placeholder: "5-10" },
];

export function Banner() {
  return (
    <section className="relative flex min-h-[600px] flex-col bg-[url('/images/Banner.png')] bg-cover bg-center bg-no-repeat">
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-20 text-center">
        <h1 className="font-display text-5xl font-semibold leading-[1.1] tracking-tight text-white md:text-6xl lg:text-7xl">
          Discover Your
          <br />
          Next Adventure
        </h1>
        <p className="mt-6 max-w-2xl text-base text-white/90 md:text-lg">
          Explore breathtaking destinations and create unforgettable memories
          with our curated travel experiences.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/destinations"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-brand px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-brand/90"
          >
            Explore Now
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
          <Link
            href="/destinations"
            className="inline-flex items-center justify-center rounded-md bg-white/20 px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white backdrop-blur-sm transition-colors hover:bg-white/30"
          >
            View Destination
          </Link>
        </div>
      </div>

      <div className="flex w-full flex-col border-t border-white/20 bg-black/30 backdrop-blur-sm sm:flex-row">
        {searchFields.map((field) => (
          <div
            key={field.label}
            className="flex-1 border-b border-white/20 px-8 py-4 text-left sm:border-b-0 sm:border-r"
          >
            <div className="text-[15px] font-semibold text-white">
              {field.label}
            </div>
            <div className="mt-0.5 text-xs text-white/70">
              {field.placeholder}
            </div>
          </div>
        ))}
        <button
          type="button"
          className="bg-brand px-12 py-4 text-[15px] font-semibold text-white transition-colors hover:bg-brand/90 sm:w-auto"
        >
          Search
        </button>
      </div>
    </section>
  );
}
