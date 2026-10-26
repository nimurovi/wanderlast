import Link from "next/link";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "My Bookings", href: "/my-bookings" },
  { label: "My Profile", href: "/profile" },
];

const supportLinks = [
  { label: "Help Center", href: "/help" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
];

export function Footer() {
  return (
    <footer className="bg-zinc-950 text-white">
      <div className="mx-auto max-w-6xl px-6 pt-24 pb-12">
        <div>
          <div className="font-sans text-5xl font-bold leading-none tracking-tight sm:text-7xl md:text-8xl">
            Wanderlast
          </div>
          <p className="mt-5 text-base text-zinc-300">
            Your gateway to extraordinary travel experiences around the world.
          </p>
        </div>

        <div className="mt-14 grid gap-10 sm:grid-cols-2 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div>
            <h3 className="text-sm font-semibold tracking-wide">
              NEWSLETTER
            </h3>
            <p className="mt-3 text-xs text-zinc-400">
              Subscribe for exclusive travel deals and inspiration.
            </p>
            <div className="mt-4 flex max-w-xs items-center bg-zinc-700">
              <input
                type="email"
                placeholder="Enter email"
                aria-label="Email address"
                className="h-11 min-w-0 flex-1 bg-transparent px-3.5 text-sm text-white outline-none placeholder:text-zinc-300"
              />
              <button
                type="button"
                aria-label="Subscribe"
                className="px-3.5 text-white transition-colors hover:text-brand"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path d="M7 7h10v10" />
                  <path d="M7 17 17 7" />
                </svg>
              </button>
            </div>
          </div>

          <nav aria-label="Quick links">
            <h3 className="text-sm font-semibold tracking-wide">
              QUICK LINKS
            </h3>
            <ul className="mt-5 space-y-4 text-[15px] text-zinc-400">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Support">
            <h3 className="text-sm font-semibold tracking-wide">SUPPORT</h3>
            <ul className="mt-5 space-y-4 text-[15px] text-zinc-400">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-sm font-semibold tracking-wide">
              CONTACT US
            </h3>
            <ul className="mt-5 space-y-4 text-[15px] text-zinc-400">
              <li>
                <a
                  href="tel:7869011622"
                  className="transition-colors hover:text-white"
                >
                  786 901 1622
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@wandarland.com"
                  className="transition-colors hover:text-white"
                >
                  info@wandarland.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col-reverse items-center justify-between gap-6 border-t border-zinc-800 pt-5 sm:flex-row">
          <p className="text-xs text-zinc-500">
            © 2026 Wanderlust. All rights reserved.
          </p>
          <div className="flex items-center gap-8 text-zinc-400">
            <a
              href="#"
              aria-label="X"
              className="transition-colors hover:text-white"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="transition-colors hover:text-white"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.935-2.063-2.08 0-1.145.92-2.078 2.063-2.078 1.144 0 2.063.933 2.063 2.078 0 1.145-.92 2.08-2.063 2.08zm1.778 13.019H3.559V9h3.556v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="transition-colors hover:text-white"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <path d="M17.5 6.5h.01" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
