import React from "react";

import { Provider as SortProvider } from "../useSortBy";
import { Provider as FilterProvider } from "../useFilterBy";
import { Provider as GuestListProvider } from "../useGuests";
import { Provider as CurrentViewProvider } from "../useCurrentView";

// Order matters for some of these!
const Providers = [
  SortProvider,
  FilterProvider,
  GuestListProvider,
  CurrentViewProvider,
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
