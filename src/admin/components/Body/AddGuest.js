import React from "react";
import styled from "styled-components";

import GuestForm from "../GuestForm/GuestForm";
import Header from "../Header/Header";

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const _GuestForm = styled(GuestForm)`
  padding: 2rem;
`;

function AddGuest() {
  return (
    <Container>
      <Header>Add Guest</Header>
      <_GuestForm />
    </Container>
  );
}

export default AddGuest;
