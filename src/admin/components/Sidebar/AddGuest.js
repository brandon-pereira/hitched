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
  margin: 1px 0 1rem;
  border-radius: 0 0 1rem 1rem;
  background: ${({ theme }) => theme.colors.primary};
`;

const Icon = styled(_Icon)`
  margin-right: 0.5rem;
`;

function AddGuest() {
  const { setMode, setGuestId } = useCurrentView();

  return (
    <Container
      onClick={() => {
        setMode(VIEW_MODES.ADD_GUEST);
        setGuestId(null);
      }}
    >
      <Icon iconName="add" />
      Add Guest
    </Container>
  );
}

export default AddGuest;
