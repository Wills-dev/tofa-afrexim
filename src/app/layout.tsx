import type { Metadata } from "next";

import "../styles/globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "TOFA AFREXIM",
  description:
    "TOFA connects Africa's trade ecosystem in partnership with Afrexim Bank, empowering businesses to unlock opportunities and drive continental growth.",
  openGraph: {
    title: "TOFA - Connecting Africa's Trade Ecosystem",
    description:
      "TOFA partners with Afrexim Bank and African Trade Gateway to connect Africa's trade ecosystem, empowering businesses across the continent to unlock opportunities and drive continental trade growth.",
    images: [
      {
        url: "/hero-preview.jpg",
        width: 1200,
        height: 630,
        alt: "TOFA connecting African businesses through trade ecosystem",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TOFA - Connecting Africa's Trade Ecosystem",
    description:
      "TOFA partners with Afrexim Bank and African Trade Gateway to connect Africa's trade ecosystem, empowering businesses across the continent to unlock opportunities and drive continental trade growth.",
    images: ["/hero-preview.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
