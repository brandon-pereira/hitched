import { useMemo, useState } from "react";
import { useQuery } from "react-query";
import useSortBy from "./useSortBy";
import useGuests from "./useGuests";
import useFilterBy from "./useFilterBy";
import createSharedHook from "./internal/createdSharedHook";

import filterGuests from "../utilities/filter-guests";

function useSortedGuests() {
  const [sortBy, setSortBy] = useSortBy();
  const [filterBy, setFilterBy] = useFilterBy();
  const { isLoading, error, guests } = useGuests();

  const sortedGuests = useMemo(() => {
    if (guests && guests.length) {
      const _guests = filterGuests(guests, filterBy).sort((a, b) => {
        if (sortBy === "FIRST_NAME") {
          return a.firstName.localeCompare(b.firstName);
        }
        if (sortBy === "LAST_NAME") {
          return a.lastName.localeCompare(b.lastName);
        }

        if (a.isConfirmed && a.isConfirmed !== b.isConfirmed) return -1;
        if (b.isConfirmed && b.isConfirmed !== a.isConfirmed) return 1;
        if (b.isDeclined) return -1;
      });
      return _guests;
    }
    return [];
  }, [guests, sortBy, filterBy]);

  return { isLoading, error, sortedGuests };
}

const { Provider, useConsumer } = createSharedHook(useSortedGuests);

export { Provider };
export default useConsumer;
