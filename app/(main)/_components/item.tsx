"use client";

import { cn } from "@/lib/utils";
import { NavigationItemProps } from "@/types";
import { ChevronDown, ChevronRight } from "lucide-react";

export default function NavigationItem({
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
}: NavigationItemProps) {
  const ChevronIcon = expanded ? ChevronDown : ChevronRight;

  return (
    <div
      onClick={onClick}
      role="button"
      style={{
        paddingLeft: level ? `${level * 12 + 12}px` : "12px",
      }}
      className={cn(
        "group min-h-[27px] text-sm py-2 px-4 w-full font-medium cursor-pointer",
        "hover:bg-primary/5 flex items-center text-muted-foreground",
        active && "bg-primary/5 text-primary"
      )}
    >
      {!!id && (
        <div
          role="button"
          className="h-full rounded-s hover:bg-neutral-300 dark:bg-neutral-600 mr-1"
        >
          <ChevronIcon className="size-4 shrink-0 text-muted-foreground" />
        </div>
      )}

      {documentIcon ? (
        <div className="shrink-0 mr-2 text-lg ">{documentIcon}</div>
      ) : (
        <Icon className="shrink-0 size-4 mr-2 text-muted-foreground" />
      )}

      <span className="truncate text-neutral-600">{label}</span>
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
    </div>
  );
}
