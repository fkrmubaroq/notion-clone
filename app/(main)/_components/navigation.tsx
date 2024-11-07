"use client";

import { api } from "@/convex/_generated/api";
import { cn } from "@/lib/utils";
import { useMutation, useQuery } from "convex/react";
import { ChevronsLeft, MenuIcon, PlusCircle, Search, Settings } from "lucide-react";
import { usePathname } from "next/navigation";
import { ElementRef, useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useMediaQuery } from "usehooks-ts";
import Item from "./item";
import UserItem from "./user-item";

export default function Navigation() {
  const pathname = usePathname();
  const isResizingRef = useRef(false);

  const isMobile = useMediaQuery("(max-width: 768px)");
  const documents = useQuery(api.documents.get);
  const create = useMutation(api.documents.create);

  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const navbarRef = useRef<ElementRef<"div">>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

  const resetWidth = useCallback(() => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(false);
      setIsResetting(true);
      sidebarRef.current.style.width = isMobile ? "100%" : "260px";
      navbarRef.current.style.setProperty(
        "width",
        isMobile ? "0" : "calc(100% - 260px)"
      );
      navbarRef.current.style.setProperty("left", isMobile ? "100%" : "260px");
      setTimeout(() => setIsResetting(false), 300);
    }
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      onCollapse();
    } else {
      resetWidth();
    }
  }, [isMobile, resetWidth]);

  useEffect(() => {
    if (isMobile) {
      onCollapse();
    }
  }, [pathname, isMobile]);

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    isResizingRef.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isResizingRef.current) return;
    let newWidth = event.clientX;
    if (newWidth < 260) newWidth = 260;
    if (newWidth > 480) newWidth = 480;

    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
      navbarRef.current.style.setProperty("left", `${newWidth}px`);
      navbarRef.current.style.setProperty(
        "width",
        `calc(100 % - ${newWidth}px)`
      );
    }
  };

  const handleMouseUp = () => {
    isResizingRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };


  const onCollapse = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(true);
      setIsResetting(true);

      sidebarRef.current.style.width = "0";
      navbarRef.current.style.setProperty("width", "100%");
      navbarRef.current.style.setProperty("left", "0");
      setTimeout(() => setIsResetting(false), 300);
    }
  };


  const handleCreate = () => {
    const promise = create({
      title: "Untitled"
    });

    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New note created!",
      error: "Failed to create a new note",
    })

  }

  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          "group/sidebar h-full bg-secondary",
          "overflow-y-auto relative flex w-60 flex-col z-[9999]",
          {
            "transition-all ease-in-out duration-500": isResetting,
            "w-0": isMobile,
          }
        )}
      >
        <div
          onClick={onCollapse}
          role="button"
          className={cn(
            "size-6 text-muted-foreground rounded-sm hover:bg-neutral-300 ",
            "dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0",
            "group-hover/sidebar:opacity-100 transition",
            isMobile && "opacity-100"
          )}
        >
          <ChevronsLeft className="size-5 text-gray-400" />
        </div>
        <div>
          <UserItem />
          <Item
            label="Search"
            icon={Search}
            isSearch
            onClick={() => { }}
          />

          <Item
            label="Settings"
            icon={Settings}
            onClick={() => { }}
          />

          <Item
            onClick={handleCreate}
            label="New page"
            icon={PlusCircle}
          />
        </div>

        <div className="mt-4 ">
          {documents?.map((document, key) => <p key={key}>{document.title}</p>)}
        </div>

        <div
          onMouseDown={handleMouseDown}
          onDoubleClick={resetWidth}
          className={cn(
            "opacity-0 group-hover/sidebar:opacity-100 transition ",
            "cursor-ew-resize absolute h-full w-[2px] bg-primary/10 right-0 top-0"
          )}
        />
      </aside>
      <div
        ref={navbarRef}
        className={cn("absolute top-0 z-[9999] left-60 w-[calc(100%-260px)]", {
          "transition-all ease-in-out duration-500": isResetting,
          "left-0 w-full": isMobile,
        })}
      >
        <nav className="bg-transparent px-3 py-2 w-full">
          {isCollapsed && (
            <MenuIcon
              onClick={resetWidth}
              role="button"
              className="size-7 text-muted-foreground"
            />
          )}
        </nav>
      </div>
    </>
  );
}
