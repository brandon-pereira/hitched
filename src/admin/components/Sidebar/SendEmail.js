import React from "react";
import styled from "styled-components";

import useCurrentView, { VIEW_MODES } from "../../hooks/useCurrentView";
import _Icon from "../Icons/Icon";

const Container = styled.button`
  color: #fff;
  border: none;
  text-align: left;
  font-family: inherit;
  padding: 1rem 1rem;
  font-size: 1.2rem;
  cursor: pointer;
  margin: 1rem 0 0 0;
  border-radius: 1rem 1rem 0 0;
  background: ${({ theme }) => theme.colors.secondary};
`;

const Icon = styled(_Icon)`
  margin-right: 0.5rem;
`;

function SendEmail() {
  const { setMode, setGuestId } = useCurrentView();

  return (
    <Container
      onClick={() => {
        setMode(VIEW_MODES.SEND_EMAIL);
        setGuestId(null);
      }}
    >
      <Icon iconName="mail" />
      Send Email
    </Container>
  );
}

export default SendEmail;
