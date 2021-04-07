import React from "react";
import styled from "styled-components";

import GuestForm from "../GuestForm/GuestForm";

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Header = styled.header`
  background: ${({ theme }) => theme.colors.primary};
`;

const _GuestForm = styled(GuestForm)`
  padding: 2rem;
`;

function AddGuest() {
  return (
    <Container>
      <Header>LOL</Header>
      <_GuestForm />
    </Container>
  );
}

export default AddGuest;
