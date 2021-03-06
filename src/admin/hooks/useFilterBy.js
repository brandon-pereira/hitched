import { useState } from "react";

import createSharedHook from "./internal/createdSharedHook";

export const FILTER_METHODS = {
  ALL: "ALL",
  CONFIRMED: "CONFIRMED",
  DECLINED: "DECLINED",
  PENDING: "PENDING",
};

function useFilterBy() {
  const [filterBy, setFilterBy] = useState(FILTER_METHODS.ALL);

  // we can add validation of setFilterBy here if needed

  return [filterBy, setFilterBy];
}

const { Provider, useConsumer } = createSharedHook(useFilterBy);

export { Provider };
export default useConsumer;
