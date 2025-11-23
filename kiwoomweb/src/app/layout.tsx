import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Lnb from "@/components/lnb/Lnb";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex">
          <div className="w-64 bg-gray-100 h-screen">
            <Lnb />
          </div>
          <div className="flex-1 bg-white h-screen">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
