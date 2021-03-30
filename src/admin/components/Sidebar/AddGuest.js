import React from "react";
import styled from "styled-components";

const Container = styled.button`
  color: #fff;
  border: none;
  text-align: left;
  font-family: inherit;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  cursor: pointer;
  margin: 1rem 0 0 0;
  border-radius: 1rem;
  background: #503047;
`;

function AddGuest() {
  return <Container>Add Guest</Container>;
}

export default AddGuest;
