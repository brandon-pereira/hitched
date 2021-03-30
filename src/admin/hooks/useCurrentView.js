import { useState } from "react";

import createSharedHook from "./internal/createdSharedHook";

export const VIEW_MODES = {
  NONE: "NONE",
  ADD_GUEST: "ADD_GUEST",
  EDIT_GUEST: "EDIT_GUEST",
};

function useCurrentView() {
  const [guestId, setGuestId] = useState(undefined);

  let mode;
  if (guestId === "add-guest") {
    mode = VIEW_MODES.ADD_GUEST;
  } else if (!guestId) {
    mode = VIEW_MODES.NONE;
  } else {
    mode = VIEW_MODES.EDIT_GUEST;
  }

  return { mode, guestId, setGuestId };
}

const { Provider, useConsumer } = createSharedHook(useCurrentView);

export { Provider };
export default useConsumer;
