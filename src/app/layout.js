import { Geist, Geist_Mono, IBM_Plex_Sans_Arabic } from "next/font/google";
import Script from "next/script";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import "./globals.css";
// ui components
import NavBar from "@/components/ui/nav-bar";
import Footer from "@/components/ui/footer";
// context
import ClientThemeWrapper from "@/context/ClientThemeWapper";
import { ThemeProvider } from "@/context/ThemeContext";
import { ToastProvider } from "@/context/ToastContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const plexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Resume.AI - Resume Builder",
  description:
    "Tailor your resume and cover letter to any job description with AI and improve your ATS compatibility.",
};

// Apply the saved theme before first paint to avoid a flash of the wrong theme.
const themeScript = `try{var t=localStorage.getItem("theme");if(t)document.documentElement.setAttribute("data-theme",t)}catch(e){}`;

export default async function RootLayout({ children }) {
  const locale = await getLocale();
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={dir}
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${plexArabic.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-base-100 text-base-content">
        <Script id="theme-init" strategy="beforeInteractive">
          {themeScript}
        </Script>
        <NextIntlClientProvider>
          <ToastProvider>
            <ThemeProvider>
              <ClientThemeWrapper>
                <NavBar />
                {children}
                <Footer />
              </ClientThemeWrapper>
            </ThemeProvider>
          </ToastProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
