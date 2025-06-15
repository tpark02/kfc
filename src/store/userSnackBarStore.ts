import { create } from "zustand";

interface SnackbarState {
  open: boolean;
  message: string;
  setSnackbar: (msg: string) => void;
  closeSnackbar: () => void;
}

export const useSnackbarStore = create<SnackbarState>((set) => ({
  open: false,
  message: "",
  setSnackbar: (msg: string) =>
    set({ open: true, message: msg }),
  closeSnackbar: () =>
    set({ open: false, message: "" }),
}));
