import { useQuery } from "react-query";

/**
 * Returns all the email templates currently available on the server.
 * @returns {Object} { isLoading, error, templates: <Array> }
 */
function useEmailTemplates() {
  const { isLoading, error, data } = useQuery(
    "emailTemplates",
    () => fetch("/api/admin/email/templates").then((res) => res.json()),
    {
      refetchOnWindowFocus: false,
    }
  );

  return { isLoading, error, templates: data ? data : [] };
}

export default useEmailTemplates;
