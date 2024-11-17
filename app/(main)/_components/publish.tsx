"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { api } from "@/convex/_generated/api";
import useOrigin from "@/hooks/use-origin";
import { PublishProps } from "@/types";
import { useMutation } from "convex/react";
import { Check, Copy, Globe } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function Publish({ initialData }: PublishProps) {
  const origin = useOrigin();
  const update = useMutation(api.documents.update);
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const url = `${origin}/preview/${initialData._id}`;

  const onPublish = () => {
    setIsSubmitting(true);

    const promise = update({
      id: initialData._id,
      isPublished: true,
    }).finally(() => setIsSubmitting(false));

    toast.promise(promise, {
      loading: "Publishing...",
      success: "Note published!",
      error: "Failed to publish note.",
    });
  };

  const onUnpublish = () => {
    setIsSubmitting(true);

    const promise = update({
      id: initialData._id,
      isPublished: false,
    }).finally(() => setIsSubmitting(false));

    toast.promise(promise, {
      loading: "UnPublishing...",
      success: "Note unpublished!",
      error: "Failed to unpublish note.",
    });
  };

  const onCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button size="sm" variant="ghost">
            Publish
            {initialData.isPublished && (
              <Globe className="text-sky-500 size-4" />
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-72" align="end" alignOffset={8} forceMount>
          {initialData.isPublished ? (
            <div className="space-y-4">
              <div className="flex items-center gap-x-2">
                <Globe className="text-sky-500 animate-pulse size-4" />
                <p className="text-xs font-mediu text-sky-500">
                  This note is live on web.
                </p>
              </div>
              <div className="flex items-center">
                <input
                  className="flex-1 px-2 text-xs border rounded-l-md h-8 bg-muted truncate"
                  value={url}
                  disabled
                />
                <Button
                  onClick={onCopy}
                  disabled={copied}
                  className="h-8 rounded-l-none"
                >
                  {copied ? (
                    <Check className="size-4" />
                  ) : (
                    <Copy className="size-4" />
                  )}
                </Button>
              </div>

              <Button
                size="sm"
                className="w-full text-xs"
                disabled={isSubmitting}
                onClick={onUnpublish}
              >
                Unpublish
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <Globe className="size-8 text-muted-foreground mb-2" />
              <p className="text-sm font-medium mb-2">Publish this note</p>
              <span className="text-xs text-muted-foreground mb-4">
                Share your work with others
              </span>
              <Button
                disabled={isSubmitting}
                onClick={onPublish}
                className="w-full text-xs font-semibold"
                size="sm"
              >
                Publish
              </Button>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}
