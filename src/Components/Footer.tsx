import { Box, Container, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: theme.palette.background,
        py: 3,
        mt: "auto",
        textAlign: "center",
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" color="textSecondary">
          © {new Date().getFullYear()} Daniel Park
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
