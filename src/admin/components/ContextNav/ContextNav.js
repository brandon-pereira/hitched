import React, { useRef, useState } from "react";
import styled from "styled-components";

import _Icon from "../Icons/Icon";

import useOnClickOutside from "../../hooks/useOnClickOutside";

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
  z-index: 999;
  top: 100%;
  right: 0;
  opacity: 0;
  background: #eee;
  box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(0, 0, 0, 0.1);
  overflow: hidden;
  font-size: 1.2rem;
  list-style: none;
  padding: 0;
  margin: 0;
  color: #555;
  font-weight: bold;
  margin: 0;
  width: 10rem;
  transition: all 0.2s;
  transform: translate(0, -10px);
  pointer-events: none;
  ${({ isOpen }) =>
    isOpen &&
    `
    pointer-events:all;
      transform: translate(0px, 0);
      opacity: 1;
        `}
`;

const Item = styled.li`
  padding: 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  cursor: pointer;
  &:hover {
    background: rgba(255, 255, 255, 0.5);
  }
  &:last-of-type {
    border-bottom: none;
  }
`;

function ContextNav({ items }) {
  const [isNavOpen, setNavOpen] = useState(false);
  const ref = useRef();
  useOnClickOutside(
    ref,

    () => setNavOpen(false)
  );
  return (
    <Container>
      <Icon
        iconName="more_vert"
        onClick={() => setNavOpen((state) => !state)}
      />

      <ItemContainer ref={ref} isOpen={isNavOpen}>
        {items.map((item) => (
          <Item key={item.title} onClick={item.onSelect}>
            {item.title}
          </Item>
        ))}
      </ItemContainer>
    </Container>
  );
}

export default ContextNav;
