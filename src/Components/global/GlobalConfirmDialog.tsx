// components/global/GlobalConfirmDialog.tsx
import ConfirmDialog from "../ConfirmDialog";
import { useConfirmDialogStore } from "../../store/useConfirmDialogStore";

const GlobalConfirmDialog = () => {
  const { open, title, message, target, onConfirm, onCancel, closeConfirm } =
    useConfirmDialogStore();

  return (
    <ConfirmDialog
      open={open}
      title={title}
      message={message}
      target={target}
      onConfirm={() => {
        onConfirm();
        closeConfirm();
      }}
      onCancel={() => {
        onCancel?.();
        closeConfirm();
      }}
    />
  );
};

export default GlobalConfirmDialog;
