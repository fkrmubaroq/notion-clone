"use client";

import { api } from "@/convex/_generated/api";
import { useCoverImageStore } from "@/hooks/use-cover-image";
import { UIToolbar } from "@/types";
import { useMutation } from "convex/react";
import { ImageIcon, Smile, X } from "lucide-react";
import { ElementRef, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import IconPicker from "./icon-picker";
import { Button } from "./ui/button";

export default function Toolbar({
  initialData,
  preview,
}: UIToolbar.ToolbarProps) {
  const inputRef = useRef<ElementRef<"textarea">>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialData.title);
  const update = useMutation(api.documents.update);
  const removeIcon = useMutation(api.documents.removeIcon);
  const coverImage = useCoverImageStore();

  const enableInput = () => {
    if (preview) return;
    setIsEditing(true);
    setTimeout(() => {
      setValue(initialData.title);
      inputRef.current?.focus();
    }, 0);
  };

  const disableInput = () => setIsEditing(false);

  const onInput = (value: string) => {
    setValue(value);
    update({
      id: initialData._id,
      title: value || "Untitled",
    });
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      disableInput();
    }
  };

  const onIconSelect = (icon: string) => {
    update({
      id: initialData._id,
      icon,
    });
  };

  const onIconRemove = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    removeIcon({
      id: initialData._id,
    });
  };

  return (
    <>
      <div className="pl-[54px] group relative">
        {!!initialData.icon && !preview && (
          <div className="flex relative items-center gap-x-2 group/icon pt-6">
            <IconPicker onChange={onIconSelect}>
              <p className="text-6xl hover:opacity-75 transition">
                {initialData.icon}
              </p>
            </IconPicker>
            <Button
              className="rounded-full !px-0 absolute !size-4 top-5 left-16 opacity-0 group-hover/icon:opacity-100 transition"
              size="icon"
              variant="ghost"
              onClick={onIconRemove}
            >
              <X className="size-1" />
            </Button>
          </div>
        )}

        {!!initialData.icon && preview && (
          <p className="text-6xl pt-6">{initialData.icon}</p>
        )}

        <div className="opacity-0 group-hover:opacity-100 flex items-center gap-x-1 py-4">
          {!initialData.icon && !preview && (
            <IconPicker asChild onChange={onIconSelect}>
              <Button
                className="text-muted-foreground text-xs"
                variant="ghost"
                size="sm"
              >
                <Smile className="size-4" />
                Add icon
              </Button>
            </IconPicker>
          )}

          {!initialData.coverImage && !preview && (
            <Button
              className="text-muted-foreground text-xs"
              variant="ghost"
              size="sm"
              onClick={coverImage.onOpen}
            >
              <ImageIcon className="size-4 " />
              Add cover
            </Button>
          )}
        </div>

        {isEditing && !preview ? (
          <TextareaAutosize
            ref={inputRef}
            onBlur={disableInput}
            onKeyDown={onKeyDown}
            value={value}
            onChange={(e) => {
              onInput(e.target.value);
            }}
            className="text-5xl bg-transparent font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF] resize-none"
          />
        ) : (
          <div
            onClick={enableInput}
            className="pb-[11.5px] text-5xl font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF]"
          >
            {initialData.title}
          </div>
        )}
      </div>
    </>
  );
}
