import { CustomHooks } from "@/types";
import { create } from "zustand";

export const useSearchStore = create<CustomHooks.useSearchStore>((set, get) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));