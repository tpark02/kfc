import { Box, TextField, Typography } from "@mui/material";

export default function ThemeTest() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h6" color="text.primary">Theme Test</Typography>
      <TextField label="Test Input" fullWidth />
    </Box>
  );
}