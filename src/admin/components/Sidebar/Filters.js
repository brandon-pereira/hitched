import React from "react";
import styled from "styled-components";

import useFilterBy, { FILTER_METHODS } from "../../hooks/useFilterBy";
import useSortBy, { SORT_METHODS } from "../../hooks/useSortBy";

const Container = styled.div`
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 1rem;
  margin: 0 0 1rem;
  color: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  display: flex;
  overflow: hidden;
`;

const Filter = styled.select`
  appearance: none;
  color: #fff;
  flex: 1;
  background: rgba(0, 0, 0, 0.3);
  color: #fff;
  border: none;
  text-align: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  border-right: 1px solid rgba(0, 0, 0, 0.5);
  font-family: inherit;
  padding: 1rem;
  font-size: 1.2rem;
  cursor: pointer;
`;

function Filters() {
  const [filterBy, setFilterBy] = useFilterBy();
  return (
    <Container>
      <Filter
        value={filterBy}
        onChange={(e) => {
          setFilterBy(e.target.value);
        }}
      >
        <option disabled>Filter By</option>
        <option value={FILTER_METHODS.ALL}>Filter By</option>
        <option value={FILTER_METHODS.CONFIRMED}>Confirmed</option>
        <option value={FILTER_METHODS.DECLINED}>Declined</option>
        <option value={FILTER_METHODS.PENDING}>Pending</option>
      </Filter>
      <Filter>
        <option disabled>Sort By</option>
        <option value={SORT_METHODS.ATTENDING}>Attending</option>
        <option value={SORT_METHODS.FIRST_NAME}>First Name</option>
        <option value={SORT_METHODS.LAST_NAME}>Last Name</option>
      </Filter>
    </Container>
  );
}

export default Filters;
