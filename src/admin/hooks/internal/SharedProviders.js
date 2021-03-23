import React from "react";

import { Provider as SortProvider } from "../useSortBy";
import { Provider as FilterProvider } from "../useFilterBy";

// Order matters for some of these!
const Providers = [
  SortProvider,
  FilterProvider,
  //   CompletedTasksProvider,
].reverse();

function SharedProviders({ children }) {
  return React.cloneElement(
    Providers.reduce(
      (acc, provider) => React.createElement(provider, {}, acc),
      children
    )
  );
}

export default SharedProviders;
