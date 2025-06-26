import { create } from "zustand";

interface SnackbarState {
  open: boolean;
  message: string;
  setSnackbar: (msg: string, b: boolean) => void;
  closeSnackbar: () => void;
  alertType: boolean;
}

export const useSnackbarStore = create<SnackbarState>((set) => ({
  alertType: true,
  open: false,
  message: "",
  setSnackbar: (msg: string, b: boolean) =>
    set({ open: true, message: msg, alertType: b }),
  closeSnackbar: () =>
    set({ open: false, message: "" }),
}));
