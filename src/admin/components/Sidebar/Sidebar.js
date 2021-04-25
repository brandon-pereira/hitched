import React from "react";
import styled from "styled-components";
import useGuests from "../../hooks/useGuests";
import useCurrentView, { VIEW_MODES } from "../../hooks/useCurrentView";

import AddGuest from "./AddGuest";
import SendEmail from "./SendEmail";
import Filters from "./Filters";
import SidebarItem from "./Item";

const Container = styled.aside`
  margin: 2rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
`;

const ItemContainer = styled.ul`
  flex: 1 0 0;
  overflow-y: auto;
  padding: 0;
  margin: 0;
  border-radius: 1rem;
`;

function Sidebar() {
  const { isLoading, error, guests } = useGuests();
  const { setGuestId, setMode } = useCurrentView();

  return (
    <Container>
      <Filters />
      <ItemContainer>
        {guests.map((guest) => (
          <SidebarItem
            key={guest._id}
            {...guest}
            onClick={() => {
              setMode(VIEW_MODES.EDIT_GUEST);
              setGuestId(guest._id);
            }}
          />
        ))}
      </ItemContainer>
      <SendEmail />
      <AddGuest />
    </Container>
  );
}

export default Sidebar;
