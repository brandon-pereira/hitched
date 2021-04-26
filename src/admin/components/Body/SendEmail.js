import React from "react";
import styled from "styled-components";

import Header from "../../components/Header/Header";
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
      <Header>Send Email</Header>
      Hello World
    </>
  );
}

export default LandingPage;
