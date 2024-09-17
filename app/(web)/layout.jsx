"use client";
import Navbar from "@/components/navbar";
import MobileNavbar from "@/components/new-navbar";
import NewsLetter from "@/components/NewsLetter";
import ReactQueryProvider from "@/components/ReactQuery/ReactQueryProvider";
import { Toaster } from "@/components/ui/toaster";
import { LayoutProvider } from "@/lib/LayoutContext";
import React from "react";

const layout = ({ children }) => {
  return (
    <div>
      <ReactQueryProvider>
        <LayoutProvider>
          <div className="hidden md:block">
            <Navbar />
          </div>
          <div className="block md:hidden">
            <MobileNavbar />
          </div>
          <main className="max-w-5xl w-full mx-auto md:px-20 lg:px-32 px-3">
            <Toaster />
            {children}
          </main>
          <NewsLetter />
        </LayoutProvider>
      </ReactQueryProvider>
    </div>
  );
};

export default layout;
