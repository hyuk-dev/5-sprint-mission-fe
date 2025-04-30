// src/core/lib/config/theme.ts

import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    mode: "light", // 혹시 dark mode 계획 있으면 여기서 switch 가능
    primary: {
      main: "#3692FF", // Panda CSS 색상
      contrastText: "#fff",
    },
    secondary: {
      main: "#FFB13A", // 예시 색상, 필요하면 맞춰도 되고
    },
    background: {
      default: "#ffffff",
      paper: "#f9f9f9",
    },
  },
  typography: {
    fontFamily: `"Pretendard", "Roboto", "Helvetica", "Arial", sans-serif`,
    h1: { fontWeight: 700, fontSize: "2.5rem" },
    h2: { fontWeight: 700, fontSize: "2rem" },
    h3: { fontWeight: 600, fontSize: "1.75rem" },
    h4: { fontWeight: 600, fontSize: "1.5rem" },
    h5: { fontWeight: 500, fontSize: "1.25rem" },
    h6: { fontWeight: 500, fontSize: "1rem" },
    body1: { fontSize: "1rem" },
    body2: { fontSize: "0.875rem" },
    button: { textTransform: "none", fontWeight: 500 }, // 버튼 글씨 자동 대문자 방지
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: `"Pretendard", "Roboto", "Helvetica", "Arial", sans-serif`,
        },
      },
    },
  },
});
