import React from "react";
import styled from "styled-components";

import AddGuest from "./AddGuest";

const Container = styled.aside`
  background: #4164a0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* border-right: 1px solid blue; */
  box-shadow: inset -1px 0 rgba(0, 0, 0, 0.5), 0 10px 100px rgba(0, 0, 0, 0.5);
`;

function Sidebar() {
  return (
    <Container>
      <div>Guest 1 Guest 2</div>
      <AddGuest />
    </Container>
  );
}

export default Sidebar;
