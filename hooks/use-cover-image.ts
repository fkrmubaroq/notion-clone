import { CustomHooks } from "@/types";
import { create } from "zustand";

export const useCoverImageStore = create<CustomHooks.useCoverImageStore>(
  (set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true, url: undefined }),
    onClose: () => set({ isOpen: false, url: undefined }),
    onReplace: (url: string) => set({ isOpen: true, url }),
  })
);
