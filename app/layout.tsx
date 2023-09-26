"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/component/Header";
import React from "react";
import { RecoilRoot } from "recoil";

import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";

const inter = Inter({ subsets: ["latin"] });

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
          </Theme>
        </RecoilRoot>
      </body>
    </html>
  );
}
