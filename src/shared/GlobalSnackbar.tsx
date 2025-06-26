import { Snackbar, Alert } from "@mui/material";
import { useSnackbarStore } from "../store/userSnackBarStore";

const GlobalSnackbar = () => {
  const { open, message, closeSnackbar, alertType } = useSnackbarStore();

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={closeSnackbar}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        onClose={closeSnackbar}
        severity={alertType ? "info" : "error"}
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default GlobalSnackbar;
