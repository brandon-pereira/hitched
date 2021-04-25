import React from "react";
import styled from "styled-components";

import useCurrentView from "../../hooks/useCurrentView";
import _Icon from "../Icons/Icon";

const _Header = styled.header`
  color: #fff;
  font-size: 2rem;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.primary};
`;

const Icon = styled(_Icon)`
  margin-right: 0.5rem;
  font-size: 1rem;
`;

function Header({ children }) {
  const { setMode } = useCurrentView();

  return (
    <_Header>
      <_Icon iconName="arrow_back_ios" onClick={() => setMode("NONE")}>
        Back
      </_Icon>
      {children}
    </_Header>
  );
}

export default Header;
