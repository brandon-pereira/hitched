import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import App from "./App";
import SharedProviders from "./hooks/internal/SharedProviders";

const queryClient = new QueryClient();

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <SharedProviders>
      <App />
    </SharedProviders>
  </QueryClientProvider>,
  document.querySelector("#root")
);
