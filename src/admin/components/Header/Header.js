import React from "react";
import styled from "styled-components";

import useCurrentView from "../../hooks/useCurrentView";
import _Icon from "../Icons/Icon";
import ContextNav from "../ContextNav/ContextNav";

const _Header = styled.header`
  color: #fff;
  font-size: 2rem;
  margin: 1rem 1rem 0;
  border-radius: 1rem;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
`;

const Title = styled.div`
  flex: 1;
`;

const Icon = styled(_Icon)`
  margin-right: 0.1rem;
  font-size: 2rem;
  cursor: pointer;
`;

function Header({ children, contextNav }) {
  const { setMode } = useCurrentView();

  return (
    <_Header>
      <Icon iconName="arrow_back_ios" onClick={() => setMode("NONE")}>
        Back
      </Icon>
      <Title>{children}</Title>
      {contextNav && <ContextNav items={contextNav} />}
    </_Header>
  );
}

export default Header;
