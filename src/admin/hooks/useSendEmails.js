import axios from "axios";

function useSendEmails() {
  const send = ({ templateId, guests }) => {
    const emails = guests.map((g) => g.email);
    axios.post("/api/admin/sendEmail", {
      emails,
      templateId,
    });
  };
}

export default useSendEmails;
