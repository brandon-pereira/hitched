import React from "react";
import styled from "styled-components";
import useGuestList from "../../hooks/useGuestList";

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
  overflow-y: scroll;
  padding: 0;
  margin: 0;
  border-radius: 1rem;
`;

function Sidebar() {
  const { isLoading, error, guests } = useGuestList();

  return (
    <Container>
      <Filters />
      <ItemContainer>
        {guests.map((guest) => (
          <SidebarItem key={guest._id} {...guest} />
        ))}
      </ItemContainer>
      <AddGuest />
    </Container>
  );
}

export default Sidebar;
