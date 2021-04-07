import styled from "styled-components";

export const Container = styled.form`
  padding: 3rem;
`;

export const Row = styled.div`
  margin-top: 0.8rem;
  display: flex;
`;

export const Column = styled.div`
  flex: 1;
  flex-shrink: 0;
  margin-right: 1rem;
  &:last-of-type {
    margin-right: 0;
  }
`;
