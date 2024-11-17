"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { cn } from "@/lib/utils";
import { NavigationItemProps } from "@/types";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import {
  ChevronDown,
  ChevronRight,
  MoreHorizontal,
  Plus,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

export default function Item({
  id,
  label,
  onClick,
  icon: Icon,
  active,
  documentIcon,
  isSearch,
  level = 0,
  onExpand,
  expanded,
  isDocument = false,
}: NavigationItemProps) {
  const [hovered, setHovered] = React.useState(false);
  const { user } = useUser();
  const router = useRouter();
  const create = useMutation(api.documents.create);
  const archive = useMutation(api.documents.archive);

  const onArchive = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    if (!id) return;
    const promise = archive({ id });

    toast.promise(promise, {
      loading: "Moving to trash...",
      success: "Note moved to trash!",
      error: "Failed to archive note.",
    });
  };

  const handleExpand = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    onExpand?.();
  };

  const onCreate = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    if (!id) return;

    const promise = create({ title: "Untitled", parentDocument: id }).then(
      (documentId) => {
        if (!expanded) {
          onExpand?.();
        }
        router.push(`/documents/${documentId}`);
      }
    );

    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New note created!",
      error: "Failed to create a new note",
    });
  };

  const ChevronIcon = expanded ? ChevronDown : ChevronRight;

  return (
    <div
      onClick={onClick}
      role="button"
      style={{
        paddingLeft: level ? `${level * 12 + 12}px` : "12px",
      }}
      onMouseEnter={() => isDocument && setHovered(true)}
      onMouseLeave={() => isDocument && setHovered(false)}
      className={cn(
        "group min-h-[27px] text-sm py-2 px-4 w-full font-medium cursor-pointer",
        "hover:bg-primary/5 flex items-center text-muted-foreground",
        active && "bg-primary/5 text-primary"
      )}
    >
      {!!id && hovered && (
        <div
          role="button"
          className="h-full hover:bg-neutral-300 dark:hover:bg-neutral-600 mr-2"
          onClick={handleExpand}
        >
          <ChevronIcon className="size-4 shrink-0 text-muted-foreground" />
        </div>
      )}

      {!hovered && (
        <>
          {documentIcon ? (
            <div className="shrink-0 size-4 flex justify-center items-center mr-2 text-lg ">
              {documentIcon}
            </div>
          ) : (
            <Icon className="shrink-0 size-4 mr-2 text-muted-foreground" />
          )}
        </>
      )}

      <span className="truncate text-neutral-600 dark:text-neutral-400">
        {label}
      </span>
      {isSearch && (
        <kbd
          className={cn(
            "inline-flex h-5 select-none items-center ",
            "ml-auto pointer-events-none gap-1 rounded border",
            "bg-muted px-1.5 font-mono text-[10px] font-medium ",
            "text-muted-foreground opacity-100"
          )}
        >
          <span>⌘</span>K
        </kbd>
      )}

      {!!id && (
        <div className="ml-auto flex items-center gap-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <div
                role="button"
                className={cn(
                  "opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm",
                  " hover:bg-neutral-300 dark:hover:bg-neutral-600"
                )}
              >
                <MoreHorizontal className="size-4 text-muted-foreground" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-60"
              align="start"
              side="right"
              forceMount
            >
              <DropdownMenuItem className="cursor-pointer" onClick={onArchive}>
                <Trash2 className="size-4" />
                Move to Trash
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <div className="text-xs text-muted-foreground p-1.5">
                Last Edited bg: {user?.fullName}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <div
            role="button"
            onClick={onCreate}
            className={cn(
              "opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm",
              "hover:bg-neutral-300 dark:hover:bg-neutral-600"
            )}
          >
            <Plus className="size-4 text-muted-foreground" />
          </div>
        </div>
      )}
    </div>
  );
}

function ItemSkeleton({ level }: { level?: number }) {
  return (
    <div
      style={{
        paddingLeft: level ? `${level * 12 + 25}px` : "12px",
      }}
      className="flex gap-x-2 py-[3px]"
    >
      <Skeleton className="size-4" />
      <Skeleton className="h-4 w-[30%]" />
    </div>
  );
}

Item.Skeleton = ItemSkeleton;
