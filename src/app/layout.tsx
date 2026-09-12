import type { Metadata } from "next";
import { Bricolage_Grotesque, Onest, Reem_Kufi, Vazirmatn } from "next/font/google";
import "./globals.css";
import { LocaleProvider } from "@/i18n/locale-provider";
import { ar } from "@/content/ar";
import { en } from "@/content/en";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-bricolage",
});
const onest = Onest({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-onest",
});
// Reem Kufi's geometric kufic has the same squared, signwritten quality as
// the slogan painted on their showroom wall.
const reem = Reem_Kufi({
  subsets: ["arabic", "latin"],
  weight: ["400", "600", "700"],
  variable: "--font-reem",
});
const vazir = Vazirmatn({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600"],
  variable: "--font-vazir",
});

export const metadata: Metadata = {
  title: "Al Rowad Auto — No waiting, just driving | Cairo & Fayoum",
  description:
    "New cars from five origins across three branches, on immediate delivery. Autostrad, Nasr City and Fayoum.",
  metadataBase: new URL("https://al-rowad-auto-site.vercel.app"),
  icons: { icon: "/mark.svg" },
  openGraph: {
    title: "Al Rowad Auto — No waiting, just driving",
    description: "Five origins, three branches, immediate delivery.",
    images: ["/media/showroom-actyon.jpg"],
    locale: "ar_EG",
    type: "website",
  },
  other: { "theme-color": "#f2efe9" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // translate="no": the page ships hand-written Arabic and English, and
    // Chrome's auto-translate rewrites `lang`, which would also break every
    // [dir="rtl"] correction if the CSS were keyed off language instead.
    <html
      lang="ar"
      dir="rtl"
      translate="no"
      className={`notranslate ${bricolage.variable} ${onest.variable} ${reem.variable} ${vazir.variable}`}
    >
      <body className="bg-paper text-ink antialiased">
        {/* Sections roll in with an intersection observer, so without
            scripting every one of them would stay at opacity 0. */}
        <noscript>
          <style>{`[data-roll],[data-rule]{opacity:1!important;transform:none!important;animation:none!important}`}</style>
        </noscript>
        <LocaleProvider dictionaries={{ ar, en }} defaultLocale="ar">
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}
