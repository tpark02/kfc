import { Snackbar, Alert } from "@mui/material";
import { useSnackbarStore } from "../store/userSnackBarStore";

const GlobalSnackbar = () => {
  const { open, message, closeSnackbar } = useSnackbarStore();

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={closeSnackbar}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert onClose={closeSnackbar} severity="success" sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default GlobalSnackbar;
