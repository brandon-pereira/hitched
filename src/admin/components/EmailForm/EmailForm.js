import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import _get from "lodash.get";

import FormElement from "../FormElement/FormElement";
import {
  Column,
  Container,
  Submit,
  Error,
  Row,
} from "../FormCommon/FormCommon";
import useEmailTemplates from "../../hooks/useEmailTemplates";
import useSendEmails from "../../hooks/useSendEmails";

function EmailForm({ className }) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useForm();
  const { error, templates } = useEmailTemplates();
  const sendEmails = useSendEmails();
  const hasAdditionalGuests = watch("hasAdditionalGuests");
  const {
    mutate,
    isError,
    error: errorSubmission,
    reset: resetSubmission,
  } = {};
  const onSubmit = (data) => {
    sendEmails(data);
    // mutate(data);
  };

  console.log(error);
  if (error) {
    return (
      <Container className={className}>
        <Error>{_get(error, "message", "Unexpected Error Occurred")}</Error>
      </Container>
    );
  }

  return (
    <Container className={className} onSubmit={handleSubmit(onSubmit)}>
      {isError && (
        <Error>
          {_get(
            error,
            "response.data.error.message",
            "Unexpected Error Occurred"
          )}
        </Error>
      )}
      <Row>
        <Column>
          <FormElement
            id="sendTo"
            {...register("sendTo", {
              required: true,
            })}
            error={errors.email}
            label="Send To"
            type="select"
          >
            <option value="accepted">Accepted</option>
            <option value="pending">Pending</option>
            <option value="declined">Declined</option>
            <option value="specific">Specific</option>
          </FormElement>
        </Column>
      </Row>
      <Row>
        <Column>
          <FormElement
            {...register("templateId", {
              required: true,
            })}
            id="templateId"
            label="Template"
            type="select"
          >
            {templates.map((template) => (
              <option key={template.templateId} value={template.templateId}>
                {template.title}
              </option>
            ))}
          </FormElement>
        </Column>
      </Row>
      <Submit type="submit">Send</Submit>
    </Container>
  );
}

export default EmailForm;
