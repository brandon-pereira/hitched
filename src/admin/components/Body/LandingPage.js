import React from "react";
import styled from "styled-components";

import NewWeds from "../../components/Icons/NewWeds";
import QuickStats from "./QuickStats";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  svg {
    width: min(20vw, 400px);
    margin-top: -10rem;
  }
  h1 {
    margin: 0.6rem 0 1rem;
    padding: 0;
  }
  h2 {
    margin: 0;
    width: 300px;
    text-align: center;
    font-weight: 200;
  }
`;

function LandingPage() {
  return (
    <>
      <QuickStats />
      <Container>
        <NewWeds />
        <h1>Hitched</h1>
        <h2>Click a Guest or "Add Guest" from the sidebar to begin.</h2>
      </Container>
    </>
  );
}

export default LandingPage;
