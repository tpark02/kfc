// store/useConfirmDialogStore.ts
import { create } from "zustand";

interface ConfirmDialogState {
  open: boolean;
  title: string;
  message: string;
  target: string;

  onConfirm: () => void;
  onCancel?: () => void;
  showConfirm: (
    title: string,
    message: string,
    target: string,
    onConfirm: () => void,
    onCancel?: () => void
  ) => void;
  closeConfirm: () => void;
}

export const useConfirmDialogStore = create<ConfirmDialogState>((set) => ({
  open: false,
  title: "",
  message: "",
  target: "",
  onConfirm: () => {},
  onCancel: () => {},
  showConfirm: (title, message, target, onConfirm, onCancel) =>
    set({
      open: true,
      title,
      message,
      target,
      onConfirm,
      onCancel,
    }),
  closeConfirm: () =>
    set({
      open: false,
      title: "",
      message: "",
      target: "",
      onConfirm: () => {},
      onCancel: () => {},
    }),
}));
