import axios from "axios";

import useGuests from "./useGuests";

function useSendEmails() {
  const { guests } = useGuests();
  const send = ({ templateId, sendTo }) => {
    const emails = guests.map((g) => g.email);
    axios.post("/api/admin/email", {
      emails,
      templateId,
    });
  };

  return send;
}

export default useSendEmails;
