'use client';
import React, {useContext} from "react";
import { ThemeContext } from "../../context/ThemeContext";
import Link from "next/link";
import {useTranslations} from 'next-intl';
// icon
import icon from '../../../public/icon.png';

export default function Navbar() {

  const {toggleTheme} = useContext(ThemeContext);
  const t = useTranslations('nav');

  return (
    <div className="max-lg:collapse bg-base-200 shadow-sm w-full">
      <input id="navbar-1-toggle" className="peer hidden" type="checkbox" />
      <label htmlFor="navbar-1-toggle" className="fixed inset-0 hidden max-lg:peer-checked:block"></label>
      <div className="collapse-title navbar">
        <div className="navbar-start">
          <label htmlFor="navbar-1-toggle" className="btn btn-primary lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </label>
          <Link href="/" className="btn btn-primary md:text-xl ml-1">
            {/* <Image src={icon} alt="Resume.AI" width={32} height={32} /> */}
            RESUMEAI
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li><Link href="/generate-resume" className="text-primary">{t('generate-resume')}</Link></li>
            <li><Link href="/cover-letter" className="text-primary">{t('cover-letter')}</Link></li>
          </ul>
        </div>
        <div className="navbar-end">
          <ul className="menu menu-horizontal px-1 hidden lg:flex">
            <li>
            <details>
              <summary>{t('theme')}</summary>
              <ul className="p-2 bg-base-200 w-40 z-1">
                <li><button onClick={() => toggleTheme("light")}>{t('light')}</button></li>
                <li><button onClick={() => toggleTheme("dark")}>{t('dark')}</button></li>
                <li><button onClick={() => toggleTheme("lemonade")}>{t('lemonade')}</button></li>
              </ul>
            </details>
          </li>
          </ul>
          <Link href="/login" className="btn btn-primary">{t('login')}</Link>
        </div>
      </div>

      <div className="collapse-content lg:hidden z-1">
        <ul className="menu">
          <li><Link href="/generate-resume" className="text-primary">{t('generate-resume')}</Link></li>
          <li><Link href="/cover-letter" className="text-primary">{t('cover-letter')}</Link></li>
          <li>
            <details>
              <summary>Themes</summary>
              <ul className="p-2 bg-base-200 w-40 z-1">
                <li><button onClick={() => toggleTheme("light")}>{t('light')}</button></li>
                <li><button onClick={() => toggleTheme("dark")}>{t('dark')}</button></li>
                <li><button onClick={() => toggleTheme("lemonade")}>{t('lemonade')}</button></li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
}