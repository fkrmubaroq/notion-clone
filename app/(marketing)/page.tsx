import { cn } from "@/lib/utils"
import HeroSection from "./_components/hero-section"
import Navbar from "./_components/navbar"

export default function MarketingPage() {
    return <div className="min-h-full flex flex-col">
        <Navbar />
        <div className={cn(
            "flex flex-col ",
            "md:justify-start text-center gap-y-8 flex-1",
            "px-6 pb-10 pt-28"
        )}>
            <HeroSection />
        </div>
    </div>
}
