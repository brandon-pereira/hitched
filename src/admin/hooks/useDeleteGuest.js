import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

import useCurrentView, { VIEW_MODES } from "./useCurrentView";

function useDeleteGuest() {
  const { setMode, setGuestId } = useCurrentView();
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (data) => {
      const confirmation = confirm(
        `Are you sure you want to remove guest "${data.firstName}"?`
      );
      if (confirmation) {
        setMode(VIEW_MODES.NONE);
        setGuestId(null);
        axios.delete("/api/admin/guests/" + data._id);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("guestList");
      },
    }
  );

  return mutation;
}

export default useDeleteGuest;
