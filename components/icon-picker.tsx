"use client";
import EmojiPicker, { Theme } from "emoji-picker-react";

import { IconPickerProps } from "@/types";
import { useTheme } from "next-themes";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export default function IconPicker({
  onChange,
  children,
  asChild,
}: IconPickerProps) {
  const { resolvedTheme } = useTheme();
  const themeMap = {
    dark: Theme.DARK,
    light: Theme.LIGHT,
  };
  const currentTheme = (resolvedTheme || "light") as keyof typeof themeMap;

  const theme = themeMap[currentTheme];

  return (
    <Popover>
      <PopoverTrigger asChild={asChild}>{children}</PopoverTrigger>
      <PopoverContent className="p-0 w-full border-none shadow-none">
        <EmojiPicker
          reactionsDefaultOpen={false}
          height={400}
          skinTonesDisabled
          lazyLoadEmojis
          theme={theme}
          onEmojiClick={(data) => onChange(data.emoji)}
        />
      </PopoverContent>
    </Popover>
  );
}
