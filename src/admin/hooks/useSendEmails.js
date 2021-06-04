import axios from "axios";
import { useMutation } from "react-query";

import useGuests from "./useGuests";

import filterGuests from "../utilities/filterGuests";

function useSendEmails() {
  const { guests } = useGuests();
  const mutation = useMutation(({ templateId, sendTo }) => {
    const emails = filterGuests(guests, sendTo).map((g) => g.email);
    if (!emails || !emails.length) {
      throw new Error("No Recipients to send to!");
      return;
    }
    if (!templateId) {
      throw new Error("No template defined");
      return;
    }
    console.info("sending emails to", emails);
    axios.post("/api/admin/email", {
      emails,
      templateId,
    });
  });

  console.log(mutation);
  return mutation;
}

export default useSendEmails;
