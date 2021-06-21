import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

import useCurrentView, { VIEW_MODES } from "./useCurrentView";

function useAddGuest() {
  const { setMode, setGuestId } = useCurrentView();
  const queryClient = useQueryClient();
  const mutation = useMutation((data) => axios.put("/api/admin/guests", data), {
    onSuccess: (response) => {
      queryClient.invalidateQueries("guestList");
      setGuestId(response.data.guest._id);
      setMode(VIEW_MODES.EDIT_GUEST);
    },
  });

  return mutation;
}

export default useAddGuest;
