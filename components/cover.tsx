"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useCoverImageStore } from "@/hooks/use-cover-image";
import { useEdgeStore } from "@/lib/edgestore";
import { cn } from "@/lib/utils";
import { useMutation } from "convex/react";
import { ImageIcon, X } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

export default function Cover({
  url,
  preview,
}: {
  url?: string;
  preview?: boolean;
}) {
  const { edgestore } = useEdgeStore();
  const params = useParams();
  const coverImage = useCoverImageStore();
  const removeCoverImage = useMutation(api.documents.removeCoverImage);

  const onRemove = () => {
    if (!url) return;
    edgestore.publicFiles.delete({
      url,
    });
    removeCoverImage({
      id: params.documentId as Id<"documents">,
    });
  };

  return (
    <div
      className={cn(
        "relative w-full h-[35vh] group",
        !url && "h-[12vh]",
        url && "bg-muted"
      )}
    >
      {!!url && <Image src={url} fill alt="Cover" className="object-cover" />}
      {url && !preview && (
        <div className="opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2">
          <Button
            onClick={() => coverImage.onReplace(url)}
            className="text-muted-foreground text-xs"
            variant="outline"
            size="sm"
          >
            <ImageIcon className="size-4" />
            Change cover
          </Button>

          <Button
            onClick={onRemove}
            className="text-muted-foreground text-xs"
            variant="outline"
            size="sm"
          >
            <X className="size-4" />
            Remove
          </Button>
        </div>
      )}
    </div>
  );
}

function CoverSkeleton() {
  return <Skeleton className="w-full h-[12vh]" />;
}

Cover.Skeleton = CoverSkeleton;
