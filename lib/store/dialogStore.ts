import { create } from "zustand";

interface DialogState {
  isOpen: boolean;
  toggle: () => void;
}

export const useDialogStore = create<DialogState>()((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));
