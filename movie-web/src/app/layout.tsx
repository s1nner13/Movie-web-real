"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PropsWithChildren, useEffect, useState } from "react";
import { Searchbar } from "./_components/Searchbar";
import { GenreProvider } from "./_components/GenreProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }: PropsWithChildren) {
  const [isDark, setIsDark] = useState<boolean>(
    localStorage.getItem("theme") == "1"
  );
  useEffect(() => {
    localStorage.setItem("theme", isDark ? "1" : "0");
  }, [isDark]);
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased ${
          isDark ? "dark" : ""
        }`}
      >
        <div className=" w-full flex  items-center justify-center">
          <div className=" w-[375px] lg:w-[1440px] flex flex-col items-center justify-center">
            <Searchbar isDark={isDark} setIsDark={setIsDark} />
          </div>
        </div>
        <GenreProvider>{children}</GenreProvider>
      </body>
    </html>
  );
}
