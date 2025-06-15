import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box,
} from "@mui/material";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  target: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  title,
  message,
  target,
  onConfirm,
  onCancel,
}) => {
  console.log("target : ", target);
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      PaperProps={{
        sx: {
          width: "50vw", // or use percentages like "80vw"
          height: "auto", // or "auto" for dynamic height
          borderRadius: 2,
        },
      }}
    >
      <DialogTitle
        sx={{
          background: "#333",
          color: "yellow",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)", // subtle hint line
          textAlign: "center",
        }}
      >
        {title}
      </DialogTitle>
      <DialogContent sx={{ background: "#333" }}>
        <DialogContentText>
          <div
            style={{
              textAlign: "center",
              whiteSpace: "pre-line",
              marginTop: "20px",
              color: "white",
            }}
          >
            {message}
            <div
              style={{
                color: "var(--yellow)",
                marginTop: "20px",
                fontWeight: "bold",
                fontSize: "20px",
              }}
            >
              {target}
            </div>
          </div>
        </DialogContentText>
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: "center",
          background: "#333",
          color: "yellow",
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          position: "relative",
          padding: 0,
        }}
      >
        <Button
          onClick={onConfirm}
          sx={{
            color: "white",
            flex: "1",
            height: "100%",
          }}
        >
          Confirm
        </Button>
        <Box
          sx={{
            width: "1px",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            height: "auto",
            alignSelf: "stretch",
          }}
        />
        <Button
          onClick={onCancel}
          sx={{
            color: "red",
            height: "100%",
            flex: "1",
          }}
          autoFocus
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
