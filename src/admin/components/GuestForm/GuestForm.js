import React from "react";
import styled from "styled-components";

import FormElement from "./FormElement";

const Container = styled.div``;

function GuestForm() {
  return (
    <Container>
      <FormElement id="email" label="Email" required type="email" />
      <FormElement id="firstName" label="First Name" required />
      <FormElement id="lastName" label="Last Name" required />
    </Container>
  );
}

export default GuestForm;
