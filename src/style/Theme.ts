import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: "black" }, // custom variant
          style: {
            backgroundColor: "#000", // 완전한 black
            color: "#fff",
            "&:hover": {
              backgroundColor: "#333", // hover는 조금만 밝게
            },
          },          
        },
      ],
    },
  },
});
