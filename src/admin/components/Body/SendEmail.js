import React, { useMemo } from "react";
import styled from "styled-components";

import useCurrentView from "../../hooks/useCurrentView";
import useGuests from "../../hooks/useGuests";
import EmailForm from "../EmailForm/EmailForm";
import Header from "../Header/Header";

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const _EmailForm = styled(EmailForm)`
  padding: 2rem;
`;

function SendEmailContainer() {
  return (
    <Container>
      <Header>Send Email</Header>
      <_EmailForm />
    </Container>
  );
}

export default SendEmailContainer;
