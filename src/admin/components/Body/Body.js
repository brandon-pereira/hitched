import React from "react";
import styled from "styled-components";

import useCurrentView from "../../hooks/useCurrentView";

import LandingPage from "./LandingPage";
import AddGuest from "./AddGuest";
import GuestForm from "../GuestForm/GuestForm";

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;

function Body() {
  const { mode } = useCurrentView();

  return (
    <Container>
      {mode === "NONE" && <LandingPage />}
      {mode === "ADD_GUEST" && <AddGuest />}
      {mode === "EDIT_GUEST" && <div>Edit</div>}
    </Container>
  );
}

export default Body;
