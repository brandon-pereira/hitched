import { useMutation, useQueryClient } from "react-query";

function useAddGuest() {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (data) =>
      fetch("/api/admin/guests", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) => res.json()),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("guestList");
      },
    }
  );

  return mutation;
}

export default useAddGuest;
