import useAddGuest from "../../hooks/useAddGuest";
import useModifyGuest from "../../hooks/useModifyGuest";

function useGuestFormSubmission(MODE) {
  const add = useAddGuest();
  const modify = useModifyGuest();
  return MODE === "MODIFY" ? modify : add;
}

export default useGuestFormSubmission;
