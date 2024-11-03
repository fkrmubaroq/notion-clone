"use client";

import Spinner from "@/components/spinner";
import { ModeToggle } from "@/components/toggle-theme";
import { Button } from "@/components/ui/button";
import { useScrollTop } from "@/hooks/element";
import { cn } from "@/lib/utils";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { Authenticated, useConvexAuth } from "convex/react";
import Image from "next/image";

export default function Navbar() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const scrolled = useScrollTop();

  return (
    <div
      className={cn(
        "z-50 bg-background fixed justify-between top-0 flex items-center w-full p-3 ",
        scrolled && "shadow-sm border-b border-solid"
      )}
    >
      <Logo />
      <div className="flex items-center gap-x-2">
        {isLoading && <Spinner />}
        {!isAuthenticated && !isLoading && (
          <>
            <SignInButton mode="modal">
              <Button variant="ghost" size="sm">
                Login
              </Button>
            </SignInButton>
          </>
        )}

        <Authenticated>
          <UserInfo />
        </Authenticated>
        <ModeToggle />
      </div>
    </div>
  );
}

function UserInfo() {
  const { user } = useUser();
  return (
    <div className="flex items-center gap-x-2">
      <span className="text-gray-500">{user?.firstName || ""}</span>
      <UserButton />
    </div>
  );
}

function Logo() {
  return (
    <div className="flex items-center gap-x-2">
      <Image src="/logo.png" alt="logo" width={30} height={30} />
      <div>Notion</div>
    </div>
  );
}
