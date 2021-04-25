import { Redshift } from "aws-sdk";
import React from "react";
import styled from "styled-components";

import GlobalStyle from "./GlobalStyle";
import ThemeProvider from "./ThemeProvider";

import useCurrentView from "../../hooks/useCurrentView";

const Container = styled.div`
  background: #fff;
  display: grid;
  height: 100vh;
  width: 100vw;
  grid-template-columns: ${({ step }) => (step === 0 ? "1fr 0;" : "0 1fr;")};
  grid-template-rows: 1fr;
  ${({ theme }) => `
    @media ${theme.queries.medium} {
      grid-template-columns: 33vw 1fr;
    }
  `}
`;

function AppContainer({ children }) {
  const { mode } = useCurrentView();
  return (
    <ThemeProvider role="main">
      <GlobalStyle />
      <Container step={mode === "NONE" ? 0 : 1}>{children}</Container>
    </ThemeProvider>
  );
}

export default AppContainer;
