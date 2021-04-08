import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

function useAddGuest() {
  const queryClient = useQueryClient();
  const mutation = useMutation((data) => axios.put("/api/admin/guests", data), {
    onSuccess: () => {
      queryClient.invalidateQueries("guestList");
    },
  });

  return mutation;
}

export default useAddGuest;
