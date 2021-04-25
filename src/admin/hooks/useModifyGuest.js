import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

function useModifyGuest() {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (data) => axios.post("/api/admin/guests", data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("guestList");
      },
    }
  );

  return mutation;
}

export default useModifyGuest;
