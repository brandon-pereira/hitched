import React from "react";
import styled from "styled-components";
import useGuestList from "../../hooks/useGuestList";

import AddGuest from "./AddGuest";
import SidebarItem from "./Item";

const Container = styled.aside`
  background: #4164a0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  box-shadow: inset -1px 0 rgba(0, 0, 0, 0.5), 0 10px 100px rgba(0, 0, 0, 0.5);
`;

const ItemContainer = styled.ul`
  flex: 1 0 0;
  overflow-y: scroll;
  padding: 0;
  margin: 0;
`;

function Sidebar() {
  const { isLoading, error, guests } = useGuestList();

  return (
    <Container>
      <ItemContainer>
        {guests.map((user) => (
          <SidebarItem key={user.id} {...user} />
        ))}
      </ItemContainer>
      <AddGuest />
    </Container>
  );
}

export default Sidebar;
