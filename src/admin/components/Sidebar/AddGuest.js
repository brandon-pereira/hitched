import React from "react";
import styled from "styled-components";

const Container = styled.button`
  background: transparent;
  color: #fff;
  border: none;
  text-align: left;
  border-top: 1px solid rgba(0, 0, 0, 0.5);
  font-family: inherit;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  cursor: pointer;
`;

function AddGuest() {
  return <Container>Add Guestaaa</Container>;
}

export default AddGuest;
