'use client';
import Image from "next/image";
import Link from "next/link";
import { UserIcon } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "./ui/button";

const navLinks = [
  { label: "Home", href: "/", active: true },
  { label: "Destinations", href: "/destinations" },
  { label: "My Bookings", href: "/my-bookings" },
  { label: "Add Destination", href: "/add-destination" },
];

const authLinks = [
  { label: "Login", href: "/login" },
  { label: "Sign Up", href: "/signup" },
];

export function Navbar() {
  const { data: session, } = authClient.useSession()
  const user = session?.user;

  const handleLogout = async () => {
    await authClient.signOut();
  };

  return (
    <header className="border-b bg-white">
      <div className="grid h-16 grid-cols-[1fr_auto_1fr] items-center px-6 lg:px-8">
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-semibold transition-colors hover:text-brand ${link.active ? "text-brand" : "text-zinc-800"
                }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link href="/" className="justify-self-center">
          <Image
            src="/images/Wanderlast.png"
            alt="Wanderlast"
            width={240}
            height={40}
            priority
            className="h-6 w-auto"
          />
        </Link>

        <div className="flex items-center justify-end gap-5">
          {user ?

            <Popover>
              <PopoverTrigger render={<Avatar>
                <AvatarImage src={user?.image as string} />
                <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
              </Avatar>}>
                Open Popover
              </PopoverTrigger>
              <PopoverContent>
                <PopoverHeader>
                  <PopoverTitle>{user?.name}</PopoverTitle>
                  <PopoverDescription>{user?.email}</PopoverDescription>
                  <Button variant="outline" onClick={handleLogout}>
                    Logout
                  </Button>
                </PopoverHeader>
              </PopoverContent>
            </Popover>
            : <>
              {authLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-semibold text-zinc-800 transition-colors hover:text-brand"
                >
                  {link.label}
                </Link>
              ))}
            </>

          }

        </div>
      </div>
    </header>
  );
}
