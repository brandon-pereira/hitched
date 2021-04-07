import React from "react";
import styled from "styled-components";

import GlobalStyle from "./GlobalStyle";
import ThemeProvider from "./ThemeProvider";

const Container = styled.div`
  background: #fff;
  display: grid;
  height: 100vh;
  width: 100vw;
  grid-template-columns: 33vw 1fr;
  grid-template-rows: 1fr;
`;

function AppContainer({ children }) {
  return (
    <Container role="main">
      <GlobalStyle />
      <ThemeProvider>{children}</ThemeProvider>
    </Container>
  );
}

export default AppContainer;
