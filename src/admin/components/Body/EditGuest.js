import React, { useMemo } from "react";
import styled from "styled-components";

import useCurrentView from "../../hooks/useCurrentView";
import useGuests from "../../hooks/useGuests";

import GuestForm from "../GuestForm/GuestForm";

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Header = styled.header`
  color: #fff;
  font-size: 2rem;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.primary};
`;

const _GuestForm = styled(GuestForm)`
  padding: 2rem;
`;

function EditGuest() {
  const { guestId } = useCurrentView();
  const { guests } = useGuests();
  const guest = useMemo(() => guests.find((g) => g._id === guestId), [guestId]);

  return (
    <Container>
      <Header>Edit Guest</Header>
      <_GuestForm initialGuest={guest} />
    </Container>
  );
}

export default EditGuest;
