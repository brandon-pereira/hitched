import { useMemo, useState } from "react";
import { useQuery } from "react-query";
import useSortBy from "./useSortBy";
import useFilterBy from "./useFilterBy";
import createSharedHook from "./internal/createdSharedHook";

function useSortedGuests() {
  const [sortBy, setSortBy] = useSortBy();
  const [filterBy, setFilterBy] = useFilterBy();
  const { isLoading, error, data } = useGuests();

  const guests = useMemo(() => {
    if (data && data.guests) {
      const guests = Array.from(data.guests)
        .filter((guest) => {
          if (filterBy === "NONE") {
            return true;
          } else if (filterBy === "CONFIRMED") {
            return guest.isConfirmed;
          } else if (filterBy === "DECLINED") {
            return guest.isDeclined;
          } else {
            return !guest.isConfirmed && !guest.isDeclined;
          }
        })
        .sort((a, b) => {
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
      return guests;
    }
    return [];
  }, [data, sortBy, filterBy]);

    return {
      confirmed: undefined,
      declined: undefined,
      pending: undefined,
    };
  }, [data]);

  return { isLoading, error, guests };
}

const { Provider, useConsumer } = createSharedHook(useGuests);

export { Provider };
export default useConsumer;
