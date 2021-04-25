import { Redshift } from "aws-sdk";
import React from "react";
import styled from "styled-components";

import GlobalStyle from "./GlobalStyle";
import ThemeProvider from "./ThemeProvider";

const Container = styled.div`
  background: #fff;
  display: grid;
  height: 100vh;
  width: 100vw;
  grid-template-columns: 1fr 0fr;
  grid-template-rows: 1fr;
  ${({ theme }) => `
    @media ${theme.queries.medium} {
      grid-template-columns: 33vw 1fr;
    }
  `}
`;

function AppContainer({ children }) {
  return (
    <ThemeProvider role="main">
      <GlobalStyle />
      <Container>{children}</Container>
    </ThemeProvider>
  );
}

export default AppContainer;
