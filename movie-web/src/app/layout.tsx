"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PropsWithChildren, Suspense, useEffect, useState } from "react";
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
  const [isReady, setIsReady] = useState(false);
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    setIsDark(localStorage.getItem("theme") == "1");
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) return;
    localStorage.setItem("theme", isDark ? "1" : "0");
  }, [isDark, isReady]);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased ${
          isDark ? "dark" : ""
        }`}
      >
        <Suspense>
          <div className=" w-full flex  items-center justify-center">
            <div className=" w-[375px] lg:w-[1440px] flex flex-col items-center justify-center">
              <Searchbar isDark={isDark} setIsDark={setIsDark} />
            </div>
          </div>
          <GenreProvider>{children}</GenreProvider>
        </Suspense>
      </body>
    </html>
  );
}
