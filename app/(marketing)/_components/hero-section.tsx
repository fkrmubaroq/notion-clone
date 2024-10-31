"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SignInButton } from "@clerk/nextjs";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function HeroSection() {
    return <section className="flex items-center">
        <div className="flex flex-col gap-y-8 w-full lg:max-w-2xl">
            <Tagline />
            <TrustedTeams />
        </div>
        <HeroImage />
    </section>
}

function Tagline() {
    return <div className=" space-y-4 md:text-left w-full md:w-auto">
        <h1 className={cn(
            "text-3xl sm:text-4xl md:text-5xl font-bold",
        )}>
            Write. Plan. Collaborate.
        </h1>
        <h3 className="text-base md:text-lg font-medium text-gray-400 md:max-w-sm">
            Notion is the connected workspace where better, faster work happens
        </h3>

        <SignInButton mode="modal">
            <Button size="sm">
                Get Notion Free
                <ArrowRight className="size-4" />
            </Button>
        </SignInButton>
    </div>
}

function HeroImage() {
    return <div className="md:flex items-center hidden max-w-lg mx-auto">
        <Image src="/hero.svg" width={500} height={500} alt="hero" className="scale-125 w-full h-full object-cover" />
    </div>
}

const listTeams = [
    "/logo-vendor/logo-affirm.svg",
    "/logo-vendor/logo-netflix.svg",
    "/logo-vendor/logo-discord.svg",
    "/logo-vendor/logo-figma.svg",
]
function TrustedTeams() {
    return <div className="md:text-left text-center">
        <div className="text-sm text-gray-400 font-normal">Trusted by teams at</div>
        <div className="flex items-center flex-wrap gap-2 md:justify-start justify-center">
            {
                listTeams.map((item, index) => (
                    <Image src={item} alt="team" className="object-contain md:size-[6.25rem] size-20" width={100} height={100} key={index} />
                ))
            }
        </div>
    </div>
}