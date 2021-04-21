import React from "react";
import styled from "styled-components";
import useGuests from "../../hooks/useGuests";
import useCurrentView from "../../hooks/useCurrentView";

import AddGuest from "./AddGuest";
import Filters from "./Filters";
import SidebarItem from "./Item";

const Container = styled.aside`
  margin: 2rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
  const { setGuestId } = useCurrentView();

  return (
    <Container>
      <Filters />
      <ItemContainer>
        {guests.map((guest) => (
          <SidebarItem
            key={guest._id}
            {...guest}
            onClick={() => setGuestId(guest._id)}
          />
        ))}
      </ItemContainer>
      <AddGuest />
    </Container>
  );
}

export default Sidebar;
