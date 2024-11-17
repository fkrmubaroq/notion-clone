"use client";

import ConfirmModal from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { cn } from "@/lib/utils";
import { UIBanner } from "@/types";
import { useMutation } from "convex/react";
import { CornerUpLeft, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const Banner = ({ documentId }: UIBanner.BannerProps) => {
  const router = useRouter();

  const remove = useMutation(api.documents.remove);
  const restore = useMutation(api.documents.restore);

  const onRemove = () => {
    const promise = remove({ id: documentId });
    toast.promise(promise, {
      loading: "Deleting note...",
      success: "Note deleted!",
      error: "Failed to delete note.",
    })
    router.push("/documents");

  };

  const onRestore = () => {
    const promise = restore({ id: documentId });
    toast.promise(promise, {
      loading: "Restoring note...",
      success: "Note restored!",
      error: "Failed to restore note.",
    });
  };

  return (
    <div
      className={cn(
        "w-full bg-red-500 text-white text-center text-s p-2",
        "flex items-center gap-x-2 justify-center"
      )}
    >
      <p className="text-white text-sm">
        This page is in the Trash, . It will automatically be deleted in 30 days
      </p>
      <Button
        size="sm"
        onClick={onRestore}
        variant="outline"
        className={cn(
          "border-white bg-transparent hover:bg-primary/5 text-white hover:text-white",
          "p-1 px-2 h-auto font-normal"
        )}
      >
        <CornerUpLeft className="size-4" />
        Restore page
      </Button>

      <ConfirmModal onConfirm={onRemove}>
        <Button
          size="sm"
          variant="outline"
          className={cn(
            "border-white bg-transparent hover:bg-primary/5 text-white hover:text-white",
            "p-1 px-2 h-auto font-normal"
          )}
        >
          <Trash2 className="size-4" />
          Delete from trash
        </Button>
      </ConfirmModal>
    </div>
  );
};
