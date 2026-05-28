"use client";

import Link from "next/link";
import { useLinkStatus } from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/generate-resume", label: "Generate Resume" },
  { href: "/cover-letter", label: "Cover Letter" },
];

function NavLinkIndicator() {
  const { pending } = useLinkStatus();
  if (!pending) return null;
  return (
    <span
      aria-hidden
      className="ml-1.5 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-zinc-400"
    />
  );
}

function NavLink({ href, label, isActive }) {
  return (
    <Link
      href={href}
      prefetch={true}
      aria-current={isActive ? "page" : undefined}
      className={`text-sm font-medium transition-colors ${
        isActive
          ? "text-black dark:text-zinc-50"
          : "text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-zinc-50"
      }`}
    >
      {label}
      <NavLinkIndicator />
    </Link>
  );
}

export function SiteNav() {
  const pathname = usePathname();
  const router = useRouter();

  // Warm all routes in dev so the first click does not wait on compile.
  useEffect(() => {
    for (const { href } of navLinks) {
      router.prefetch(href);
    }
  }, [router]);

  return (
    <header className="border-b border-zinc-200 bg-white px-6 py-4 dark:border-zinc-800 dark:bg-black">
      <nav className="mx-auto flex max-w-3xl flex-wrap gap-4">
        {navLinks.map(({ href, label }) => (
          <NavLink
            key={href}
            href={href}
            label={label}
            isActive={pathname === href}
          />
        ))}
      </nav>
    </header>
  );
}
