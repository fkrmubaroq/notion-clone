"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Error() {
  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <Image
        className="dark:hidden"
        src="/write.svg"
        height={300}
        width={300}
        alt="Error"
      />
      <Image
        className="hidden dark:block"
        src="/write-dark.svg"
        height={300}
        width={300}
        alt="Error"
      />
      <h1 className="text-4xl font-bold !mt-0">OOPS!</h1>
      <h2 className="text-xl !mt-1 text-gray-400 !mb-5">Something went wrong!</h2>
      <Button asChild>
        <Link href="/documents">Go back</Link>
      </Button>
    </div>
  );
}
