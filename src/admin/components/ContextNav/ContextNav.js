import React, { useState } from "react";
import styled from "styled-components";

import _Icon from "../Icons/Icon";

const Container = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const Icon = styled(_Icon)`
  margin-left: 0.5rem;
  font-size: 2.5rem;
`;

const ItemContainer = styled.ul`
  position: absolute;
  top: 100%;
  right: 0;
  opacity: 0;
  background: red;
  overflow: hidden;
  margin: 0;
  width: 300px;
  ${({ isOpen }) =>
    isOpen &&
    `
        opacity: 1;
        `}
`;

function ContextNav({ items }) {
  const [isNavOpen, setNavOpen] = useState(false);

  return (
    <Container>
      <Icon
        iconName="more_vert"
        onClick={() => setNavOpen((state) => !state)}
      />
      {isNavOpen && (
        <ItemContainer isOpen={isNavOpen}>
          {items.map((item) => (
            <li key={item.title} onClick={item.onSelect}>
              {item.title}
            </li>
          ))}
        </ItemContainer>
      )}
    </Container>
  );
}

export default ContextNav;
