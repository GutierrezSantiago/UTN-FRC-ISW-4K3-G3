import React from "react";
import "../styles/globals.css";
import Header from "@/components/layout/Header";

export default function Page({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className="flex min-h-screen max-w-[100vw] flex-col overflow-x-hidden">
        <main className="max-w-screen mb-[70px] flex grow md:mb-[100px] bg-[#CAF0F8]">
          {children}
        </main>
        <Header />
      </body>
    </html>
  );
}
