import { useMemo, useState } from "react";
import { useQuery } from "react-query";
import useSortBy from "./useSortBy";
import useFilterBy from "./useFilterBy";
import createSharedHook from "./internal/createdSharedHook";

function useGuestList() {
  const [sortBy, setSortBy] = useSortBy();
  const [filterBy, setFilterBy] = useFilterBy();
  const { isLoading, error, data } = useQuery("guestList", () =>
    fetch("/api/admin/guests").then((res) => res.json())
  );

  console.log(data);
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

  return { isLoading, stats, error, guests };
}

const { Provider, useConsumer } = createSharedHook(useGuestList);

export { Provider };
export default useConsumer;
