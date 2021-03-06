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
