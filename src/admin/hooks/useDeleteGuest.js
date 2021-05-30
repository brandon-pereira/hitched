import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

function useDeleteGuest() {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (data) => {
      const confirmation = confirm(
        `Are you sure you want to remove guest "${data.firstName}"?`
      );
      if (confirmation) {
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
