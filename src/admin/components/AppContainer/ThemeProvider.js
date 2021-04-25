import React from "react";
import { ThemeProvider } from "styled-components";

function HitchedThemeProvider({ children }) {
  return (
    <ThemeProvider
      theme={{
        fonts: {
          primary: "'Source Sans Pro', sans-serif",
        },
        colors: {
          primary: "#503047",
          secondary: "#597641",
          red: "#C05746",
        },
        queries: {
          medium: `(min-width: 640px)`,
          large: `(min-width: 1024px)`,
        },
      }}
    >
      {children}
    </ThemeProvider>
  );
}

export default HitchedThemeProvider;
