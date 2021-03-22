import React from "react";
import styled from "styled-components";

import LandingPage from "./LandingPage";

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

function Body() {
  return (
    <Container>
      <LandingPage />
    </Container>
  );
}

export default Body;
