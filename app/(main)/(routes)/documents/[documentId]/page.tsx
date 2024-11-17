"use client";

import Cover from "@/components/cover";
import Toolbar from "@/components/toolbar";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { DocumentIdPageProps } from "@/types";
import { useMutation, useQuery } from "convex/react";
import { use, useMemo } from "react";

import dynamic from "next/dynamic";


export default function DocumentByIdPage({ params }: DocumentIdPageProps) {
  const Editor = useMemo(() => dynamic(() => import("@/components/editor"), {
    ssr: false
  }), []);

  const { documentId } = use(params);
  const update = useMutation(api.documents.update);

  const document = useQuery(api.documents.getById, {
    documentId,
  });

  const onChangeEditor = (content: string) => {
    update({
      id: documentId,
      content,
    });
  };


  if (document === undefined) {
    return (
      <div>
        <Cover.Skeleton />
        <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
          <div className="space-y-4 pl-8 pt-4">
            <Skeleton className="h-14 w-1/2" />
            <Skeleton className="h-4 w-[80%]" />
            <Skeleton className="h-4 w-[40%]" />
            <Skeleton className="h-4 w-[60%]" />
          </div>
        </div>
      </div>
    );
  }

  if (document === null) {
    return <div>Not found</div>;
  }

  return (
    <div className="pb-40">
      <Cover url={document.coverImage} />
      <div className="md:max-w-3xl lg:md-max-4xl mx-auto">
        <Toolbar initialData={document} />
        <Editor
          onChange={onChangeEditor}
          initialContent={document.content || ""}
        />
      </div>
    </div>
  );
}
