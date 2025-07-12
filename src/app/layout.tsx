import type { Metadata } from "next";
import "./globals.scss";

export const metadata: Metadata = {
  title: "mvrDAO - Bounty Board",
  description: "A decentralized bounty board for the mvrDAO community",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
