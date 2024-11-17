"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { UINavbar } from "@/types";
import { useQuery } from "convex/react";
import { MenuIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { Banner } from "./banner";
import Menu from "./menu";
import Publish from "./publish";
import Title from "./title";

export default function Navbar({
  isCollapsed,
  onResetWidth,
}: UINavbar.NavbarMainProps) {
  const params = useParams();
  const document = useQuery(api.documents.getById, {
    documentId: params?.documentId as Id<"documents">,
  });

  if (document === undefined) {
      return <nav className="bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex items-center">
        <Title.Skeleton />
      </nav>;
  }
  return (
    <>
      <nav className="bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex items-center gap-x-4">
        {isCollapsed && (
          <MenuIcon
            role="button"
            onClick={onResetWidth}
            className="size-4 text-muted-foreground"
          />
        )}

        <div className="flex justify-between items-center w-full">
          <Title initialData={document} />
          <div className="flex items-center gap-x-2">
            <Publish initialData={document} />
            <Menu documentId={document._id} />
          </div>
        </div>
      </nav>
      {document.isArchived && (
        <Banner documentId={document._id} />
      )}
    </>
  );
}
