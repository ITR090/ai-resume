'use client';
import React, {useContext, useTransition} from "react";
import { ThemeContext } from "../../context/ThemeContext";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {useLocale, useTranslations} from 'next-intl';
// icon
import icon from '../../../public/icon.png';

const themes = ["light", "dark", "lemonade"];

// daisyUI focus-based dropdowns close when focus leaves them
const closeDropdown = () => document.activeElement?.blur();

export default function Navbar() {

  const {theme, toggleTheme} = useContext(ThemeContext);
  const t = useTranslations('nav');
  const pathname = usePathname();
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const links = [
    { href: "/generate-resume", label: t('generate-resume') },
    { href: "/cover-letter", label: t('cover-letter') },
  ];

  const switchLanguage = () => {
    const next = locale === "ar" ? "en" : "ar";
    // Same cookie src/i18n/request.js reads
    document.cookie = `locale=${next}; path=/; max-age=31536000; samesite=lax`;
    startTransition(() => router.refresh());
  };

  const selectTheme = (value) => {
    toggleTheme(value);
    closeDropdown();
  };

  const themeMenu = themes.map((value) => (
    <li key={value}>
      <button type="button" className={theme === value ? "menu-active" : ""} onClick={() => selectTheme(value)}>
        {t(value)}
      </button>
    </li>
  ));

  return (
    <header className="sticky top-0 z-40 border-b border-base-300 bg-base-100/80 backdrop-blur">
      <nav className="navbar mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="navbar-start">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
            {/* <Image src={icon} alt="" width={32} height={32} className="rounded-lg" /> */}
            <span>Resume<span className="text-primary">.AI</span></span>
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-1 px-1">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={pathname === link.href ? "menu-active" : ""}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="navbar-end gap-1">
          <button type="button" onClick={switchLanguage} disabled={isPending} className="btn btn-ghost btn-sm" aria-label={t('language')}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="size-5" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802" />
            </svg>
            <span className="hidden sm:inline">{locale === "ar" ? "English" : "العربية"}</span>
          </button>

          <div className="dropdown dropdown-end hidden lg:block">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-sm" aria-label={t('theme')}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="size-5" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 0 0 5.304 0l6.401-6.402M6.75 21A3.75 3.75 0 0 1 3 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 0 0 3.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008Z" />
              </svg>
              {t('theme')}
            </div>
            <ul tabIndex={0} className="menu dropdown-content z-50 mt-2 w-40 rounded-box border border-base-300 bg-base-100 p-2 shadow-lg">
              {themeMenu}
            </ul>
          </div>

          {/* Mobile menu */}
          <div className="dropdown dropdown-end lg:hidden">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-square" aria-label="Menu">
              <svg xmlns="http://www.w3.org/2000/svg" className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
            </div>
            <ul tabIndex={0} className="menu dropdown-content z-50 mt-2 w-56 rounded-box border border-base-300 bg-base-100 p-2 shadow-lg">
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} onClick={closeDropdown} className={pathname === link.href ? "menu-active" : ""}>
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="menu-title mt-2">{t('theme')}</li>
              {themeMenu}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
