"use client";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@radix-ui/themes/styles.css";
import { Theme, ThemePanel } from "@radix-ui/themes";
import Header from "@/component/Header";

import React from "react";
import { RecoilRoot } from "recoil";
import { themeRecoil } from "@/recoil/ThemeRecoil";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "...",
};

// or Dynamic metadata
// export async function generateMetadata({ params }) {
//   return {
//     title: '...',
//   }
// }
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RecoilRoot>
          <Theme
            accentColor="blue"
            grayColor="mauve"
            radius="large"
            scaling="90%"
          >
            <Header />
            {children}
            {/* <ThemePanel /> */}
          </Theme>
        </RecoilRoot>
      </body>
    </html>
  );
}
