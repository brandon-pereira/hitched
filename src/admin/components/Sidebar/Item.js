import React from "react";
import styled from "styled-components";

const Container = styled.li`
  background: #eee;
  color: #222;
  padding: 1rem 0.5rem 1rem 1.5rem;
  position: relative;
  margin-bottom: 0.2rem;
  border-radius: 1rem;
  overflow: hidden;
`;

const TheirName = styled.span`
  font-size: 1.2rem;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: bold;
`;

const PlusOneName = styled.span`
  font-size: 1.1rem;
`;

const AttendingBadge = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 0.5rem;
  background: #1b98f5;
  ${({ isDeclined }) =>
    isDeclined &&
    `
    background: #E6425E;
  `}
  ${({ isConfirmed }) =>
    isConfirmed &&
    `
    background: #00D84A;
  `};
`;

function SidebarItem({
  firstName,
  lastName,
  plusOne,
  isDeclined,
  isConfirmed,
}) {
  return (
    <Container>
      <AttendingBadge isConfirmed={isConfirmed} isDeclined={isDeclined} />
      <TheirName>
        {firstName} {lastName}
      </TheirName>
      <PlusOneName>
        {plusOne ? plusOne.firstName + " " + plusOne.lastName : "N/A"}
      </PlusOneName>
    </Container>
  );
}

export default SidebarItem;
