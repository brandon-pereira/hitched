import { useMemo, useState } from "react";
import { useQuery } from "react-query";

const SORT_METHODS = {
  ATTENDING: "ATTENDING",
  FIRST_NAME: "FIRST_NAME",
};

function useGuestList() {
  const [sortBy, setSortBy] = useState(SORT_METHODS.ATTENDING);
  const [filterBy, setFilterBy] = useState(undefined);
  const { isLoading, error, data } = useQuery("repoData", () =>
    fetch("/api/admin/guests").then((res) => res.json())
  );

  const guests = useMemo(() => {
    if (data && data.guests) {
      const guests = Array.from(data.guests);
      guests.sort((a, b) => {
        if (sortBy === SORT_METHODS.FIRST_NAME) {
          return a.firstName.localeCompare(b.firstName);
        }
        if (sortBy === SORT_METHODS.FIRST_NAME) {
          return a.lastName.localeCompare(b.lastName);
        }

        if (a.isConfirmed && a.isConfirmed !== b.isConfirmed) return -1;
        if (b.isConfirmed && b.isConfirmed !== a.isConfirmed) return 1;
        if (b.isDeclined) return -1;
      });
      return guests;
    }
    return [];
  }, [data, sortBy]);

  return { isLoading, error, guests };
}

export default useGuestList;
