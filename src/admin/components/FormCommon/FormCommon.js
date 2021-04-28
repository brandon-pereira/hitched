import styled from "styled-components";

export const Container = styled.form``;

export const Row = styled.div`
  margin-bottom: 0.8rem;
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

export const Submit = styled.button`
  background: ${({ theme }) => theme.colors.secondary};
  color: #fff;
  border: none;
  font-family: inherit;
  font-size: 1.2rem;
  display: block;
  margin: 1.6rem auto 0;
  padding: 0.6rem 3rem;
`;

export const Error = styled.div`
  padding: 1rem;
  color: #fff;
  margin-bottom: 2rem;
  background: ${({ theme }) => theme.colors.red};
`;
