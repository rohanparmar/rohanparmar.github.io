import type { Metadata, Viewport } from "next";
import { Newsreader } from "next/font/google";
import { siteMeta } from "@/constants/site";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500"],
  variable: "--font-serif",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#f6f4ee",
  colorScheme: "light",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteMeta.url),
  title: {
    default: siteMeta.title,
    template: "%s — Rohan Parmar",
  },
  description: siteMeta.description,
  authors: [{ name: siteMeta.name, url: siteMeta.url }],
  creator: siteMeta.name,
  category: "technology",
  keywords: ["Rohan Parmar", "Docula", "Mecka", "software engineer"],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteMeta.url,
    title: siteMeta.title,
    description: siteMeta.description,
    siteName: siteMeta.name,
    locale: "en_CA",
  },
  twitter: {
    card: "summary",
    title: siteMeta.title,
    description: siteMeta.description,
  },
  manifest: "/manifest.webmanifest",
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteMeta.name,
  url: siteMeta.url,
  jobTitle: "Software engineer",
  description: siteMeta.description,
  sameAs: [siteMeta.github, siteMeta.linkedin],
  worksFor: {
    "@type": "Organization",
    name: "Mecka",
    url: siteMeta.mecka,
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Simon Fraser University",
    url: "https://www.sfu.ca/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${newsreader.variable} font-serif`}>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
