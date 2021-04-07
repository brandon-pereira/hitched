import React from "react";
import { ThemeProvider } from "styled-components";

function HitchedThemeProvider({ children }) {
  return (
    <ThemeProvider
      theme={{
        colors: {
          primary: "#503047",
          secondary: "#597641",
          red: "#C05746",
        },
      }}
    >
      {children}
    </ThemeProvider>
  );
}

export default HitchedThemeProvider;
