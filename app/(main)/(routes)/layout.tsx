"use client";

import SearchCommand from "@/components/search-command";
import Spinner from "@/components/spinner";
import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";
import Navigation from "../_components/navigation";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useConvexAuth();

  if (isLoading) {
    return (
      <div className="h-full flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return redirect("/");
  }

  return (
    <div className="w-full h-full flex dark:bg-[#1f1f1f]">
      <Navigation />
      <main className="flex-1 h-full overflow-y-auto">
        <SearchCommand />
        {children}
      </main>
    </div>
  );
}
