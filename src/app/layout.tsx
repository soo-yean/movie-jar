import type { Metadata } from "next";
// import { Geist, Geist_Mono, Quicksand } from "next/font/google";
import { Quicksand } from "next/font/google";

import { Toaster } from "react-hot-toast";
import "./globals.css";
import TopNav from "@/components/navbar/TopNav";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Movie Jar",
  description: "For Adam and Soo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        // className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col bg-pink-50`}
        className={`${quicksand.className} antialiased flex flex-col bg-pink-50`}
      >
        <TopNav />
        <main className="flex-grow">
          {children}
          <Toaster
            position="top-center"
            containerStyle={{
              top: 100,
              left: 20,
              bottom: 20,
              right: 20,
            }}
            toastOptions={{
              style: {
                background: "#ffe5ec",
                color: "#c9184a",
                fontWeight: "bold",
                borderRadius: "12px",
                border: "1px solid #ffb3c1",
              },
            }}
          />
        </main>
      </body>
    </html>
  );
}
