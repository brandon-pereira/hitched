import { useState } from "react";

import createSharedHook from "./internal/createdSharedHook";

export const SORT_METHODS = {
  ATTENDING: "ATTENDING",
  FIRST_NAME: "FIRST_NAME",
  LAST_NAME: "LAST_NAME",
};

function useSortBy() {
  const [sortBy, setSortBy] = useState(SORT_METHODS.ATTENDING);

  // we can add validation of setSortBy here if needed

  return [sortBy, setSortBy];
}

const { Provider, useConsumer } = createSharedHook(useSortBy);

export { Provider };
export default useConsumer;
