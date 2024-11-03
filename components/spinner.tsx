import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { Loader } from "lucide-react";

const spinnerVariants = cva(
  "text-muted-foreground animate-spin",
  {
    variants: {
      size: {
        default: "size-4 ",
        sm: "size-2",
        lg: "size-8",
        icon: "size-10",
      },
      defaultVariants: {
        size: "default"
      }
    }
  }
)

type SpinnerProps = VariantProps<typeof spinnerVariants>;

export default function Spinner({ size }: SpinnerProps) {
  return <Loader className={cn(spinnerVariants({ size }))} />;
}