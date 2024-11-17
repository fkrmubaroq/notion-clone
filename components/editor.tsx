"use client";

import { useEdgeStore } from "@/lib/edgestore";
import { EditorProps } from "@/types";
import { PartialBlock } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { useTheme } from "next-themes";

export default function Editor({ editable, onChange, initialContent }: EditorProps) {
  const { resolvedTheme } = useTheme();
  const { edgestore } = useEdgeStore();
  const handleUpload = async (file: File) => {
    const response = await edgestore.publicFiles.upload({
      file,
    });

    return response.url;
  };
  const editor = useCreateBlockNote({
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
    uploadFile: handleUpload,
  });

  // Renders the editor instance using a React component.
  return (
    <BlockNoteView
      editable={editable}
      editor={editor}
      onChange={() => {
        onChange?.(JSON.stringify(editor.document));
      }}
      theme={resolvedTheme === "dark" ? "dark" : "light"}
    />
  );
}
