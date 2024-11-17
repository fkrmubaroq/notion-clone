"use client";

import { api } from "@/convex/_generated/api";
import { useSearchStore } from "@/hooks/use-search";
import useSensorKeyboard from "@/hooks/use-sensor-keyboard";
import { useUser } from "@clerk/clerk-react";
import { useQuery } from "convex/react";
import { File } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";

export default function SearchCommand() {
  const { user } = useUser();
  const router = useRouter();
  const documents = useQuery(api.documents.getSearch);
  const [isMounted, setIsMounted] = useState(false);

  const [toggle, isOpen, onClose] = useSearchStore(
    useShallow((store) => [store.toggle, store.isOpen, store.onClose])
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useSensorKeyboard(
    ["k"],
    (key) => {
      toggle();
    },
    { usingCtrl: true }
  );

  const onSelect = (id: string) => {
    router.push(`/documents/${id}`);
    onClose();
  };
  if (!isMounted) {
    return null;
  }

  return (
    <CommandDialog open={isOpen} onOpenChange={onClose}>
      <CommandInput placeholder="Search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {documents?.map((document) => (
            <CommandItem
              key={document._id}
              value={`${document._id}-${document.title}`}
              title={document.title}
              onSelect={onSelect}
            >
              {document.icon ? (
                <p className="mr-2 text-lg">{document.icon}</p>
              ) : (
                <File className="mr-2 size-4" />
              )}
              <span>
                {document.title}
              </span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
