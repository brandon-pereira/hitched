import axios from "axios";
import { useQuery } from "react-query";

/**
 * Returns all the email templates currently available on the server.
 * @returns {Object} { isLoading, error, templates: <Array> }
 */
function useEmailTemplates() {
  const { isLoading, error, isError, data } = useQuery(
    "emailTemplates",
    () => axios.get("/api/admin/email/templates"),
    { retry: false, refetchOnWindowFocus: false }
  );

  return { isLoading, error, templates: data ? data : [] };
}

export default useEmailTemplates;
