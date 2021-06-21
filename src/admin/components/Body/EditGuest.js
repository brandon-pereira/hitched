import React, { useMemo } from "react";
import styled from "styled-components";

import useCurrentView, { VIEW_MODES } from "../../hooks/useCurrentView";
import useDeleteGuest from "../../hooks/useDeleteGuest";
import useGuests from "../../hooks/useGuests";

import GuestForm from "../GuestForm/GuestForm";
import Header from "../Header/Header";

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const _GuestForm = styled(GuestForm)`
  padding: 2rem;
`;

function EditGuest() {
  const { guestId, setMode, setGuestId } = useCurrentView();
  const { guests } = useGuests();
  const { mutate: deleteGuest } = useDeleteGuest();

  const guest = useMemo(
    () => guests.find((g) => g._id === guestId),
    [guests, guestId]
  );

  return (
    <Container>
      <Header
        contextNav={
          guest
            ? [
                {
                  title: "Email Guest",
                  onSelect: () => {
                    setMode(VIEW_MODES.SEND_EMAIL);
                  },
                },
                {
                  title: "Delete Guest",
                  onSelect: () => {
                    deleteGuest(guest);
                  },
                },
              ]
            : undefined
        }
      >
        Edit Guest
      </Header>
      <_GuestForm initialGuest={guest} />
    </Container>
  );
}

export default EditGuest;
