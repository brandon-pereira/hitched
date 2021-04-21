import { useMemo, useState } from "react";
import { useQuery } from "react-query";
import useSortBy from "./useSortBy";
import useFilterBy from "./useFilterBy";
import createSharedHook from "./internal/createdSharedHook";

function useGuests() {
  const { isLoading, error, data } = useQuery(
    "guestList",
    () => fetch("/api/admin/guests").then((res) => res.json()),
    {
      refetchOnWindowFocus: false,
    }
  );

  const stats = useMemo(() => {
    if (data && data.guests) {
      return Array.from(data.guests).reduce(
        (acc, user) => {
          const entries = (user.plusOne ? 2 : 1) + (user.numberOfKids || 0);
          if (user.isConfirmed) {
            acc.confirmed += entries;
          } else if (user.isDeclined) {
            acc.declined += entries;
          } else {
            acc.pending += entries;
          }
          return acc;
        },
        {
          confirmed: 0,
          declined: 0,
          pending: 0,
        }
      );
    }

    return {
      confirmed: undefined,
      declined: undefined,
      pending: undefined,
    };
  }, [data]);

  return { isLoading, stats, error, guests: data ? data.guests : [] };
}

const { Provider, useConsumer } = createSharedHook(useGuests);

export { Provider };
export default useConsumer;
