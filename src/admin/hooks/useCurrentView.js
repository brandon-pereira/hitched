import { useState } from "react";

import createSharedHook from "./internal/createdSharedHook";

export const VIEW_MODES = {
  NONE: "NONE",
  ADD_GUEST: "ADD_GUEST",
  SEND_EMAIL: "SEND_EMAIL",
  EDIT_GUEST: "EDIT_GUEST",
};

function useCurrentView() {
  const [guestId, setGuestId] = useState(null);
  const [mode, setMode] = useState(VIEW_MODES.NONE);

  return { mode, guestId, setMode, setGuestId };
}

const { Provider, useConsumer } = createSharedHook(useCurrentView);

export { Provider };
export default useConsumer;
