"use client";

import React, { useEffect } from "react";
import Navbar from "@/app/components/Navbar";
import Sidebar from "@/app/components/Sidebar";
import StoreProvider, { useAppSelector } from "./redux";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  // Properly toggle classes
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("dark", "light");
    root.classList.add(isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  return (
    <div className="flex w-full min-h-screen bg-gray-50 text-gray-900">
      <Sidebar />
      <div
        className={`flex flex-col flex-1 transition-all ${
          isSidebarCollapsed ? "md:pl-24" : "md:pl-72"
        }`}
      >
        <Navbar />
        <main className="p-6 flex-1">{children}</main>
      </div>
    </div>
  );
};

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </StoreProvider>
  );
};

export default DashboardWrapper;
