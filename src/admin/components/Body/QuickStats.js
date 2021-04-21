import React from "react";
import styled from "styled-components";
import useFilterBy, { FILTER_METHODS } from "../../hooks/useFilterBy";
import useGuests from "../../hooks/useGuests";

const Container = styled.div`
  margin: 2rem auto 0;
  display: flex;
  justify-content: space-around;
  width: min(400px, 100%);
`;

const Stat = styled.div`
  flex: 1;
  flex-shrink: 0;
  padding: 1rem;
  text-align: center;
  border-right: 1px solid #ccc;
  &:last-of-type {
    border: none;
  }
  h2 {
    margin: 0 0 0.1rem;
  }
  h3 {
    font-weight: 200;
    margin: 0;
  }
`;

function QuickStats() {
  const { stats, isLoading, error } = useGuests();
  const [, setFilterBy] = useFilterBy();

  if (error) {
    return;
  }
  if (isLoading) {
    return (
      <Container>
        <Stat>
          <h2>&nbsp;</h2>
          <h3>&nbsp;</h3>
        </Stat>
      </Container>
    );
  }
  return (
    <Container>
      <Stat
        onClick={() => {
          setFilterBy(FILTER_METHODS.CONFIRMED);
        }}
      >
        <h2>{stats.confirmed}</h2>
        <h3>Confirmed</h3>
      </Stat>
      <Stat
        onClick={() => {
          setFilterBy(FILTER_METHODS.DECLINED);
        }}
      >
        <h2>{stats.declined}</h2>
        <h3>Declined</h3>
      </Stat>
      <Stat
        onClick={() => {
          setFilterBy(FILTER_METHODS.PENDING);
        }}
      >
        <h2>{stats.pending}</h2>
        <h3>Pending</h3>
      </Stat>
    </Container>
  );
}

export default QuickStats;
