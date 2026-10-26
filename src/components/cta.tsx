import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

export function CallToAction() {
  return (
    <section className="relative flex min-h-[400px] items-center justify-center bg-[url('/images/CTA.png')] bg-cover bg-center bg-no-repeat px-6 py-24">
      <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
      <div className="relative flex flex-col items-center text-center">
        <h2 className="font-display text-4xl font-medium tracking-tight text-white md:text-5xl">
          Ready To Start Your Journey?
        </h2>
        <p className="mt-4 max-w-2xl text-base text-white/90 md:text-lg">
          Join thousands of travelers who have discovered the world with us
        </p>
        <Link
          href="/destinations"
          className="mt-10 inline-flex items-center gap-6 bg-white px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-black transition-colors hover:bg-zinc-100"
        >
          Book Your Trip Today
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
