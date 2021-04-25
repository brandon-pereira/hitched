import React from "react";
import styled from "styled-components";

import useCurrentView from "../../hooks/useCurrentView";

const _Header = styled.header`
  color: #fff;
  font-size: 2rem;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.primary};
`;

function Header({ children }) {
  const { setMode } = useCurrentView();

  return (
    <_Header>
      <button onClick={() => setMode("NONE")}>Back</button>
      {children}
    </_Header>
  );
}

export default Header;
