import React from "react";
import styled from "styled-components";

import useCurrentView from "../../hooks/useCurrentView";

import LandingPage from "./LandingPage";
import GuestForm from "../GuestForm/GuestForm";

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

function Body() {
  const { mode } = useCurrentView();
  console.log(mode);
  return (
    <Container>
      {mode === "NONE" && <LandingPage />}
      {mode === "ADD_GUEST" && <GuestForm />}
      {mode === "EDIT_GUEST" && <div>Edit</div>}
    </Container>
  );
}

export default Body;
