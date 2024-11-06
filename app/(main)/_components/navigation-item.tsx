"use client";

import { NavigationItemProps } from "@/types";
import clsx from "clsx";

export default function NavigationItem({
  label,
  onClick,
  icon: Icon,
}: NavigationItemProps) {
  return (
    <div
      onClick={onClick}
      role="button"
      style={{ paddingLeft: "" }}
      className={clsx(
        "group min-h-[27px] text-sm py-2 px-2 w-full font-medium cursor-pointer",
        "hover:bg-primary/5 flex items-center text-muted-foreground"
      )}
    >
      <Icon className="shrink-0 h-[18px] mr-2 text-muted-foreground" />
      <span className="truncate">{label}</span>
    </div>
  );
}
