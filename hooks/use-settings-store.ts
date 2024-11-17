import { type CustomHooks } from "@/types";
import { create } from "zustand";


export const useSettingsStore = create<CustomHooks.useSettingsStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));