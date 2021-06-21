import React, { useEffect, useMemo } from "react";
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
import useGuests from "../../hooks/useGuests";
import useCurrentView from "../../hooks/useCurrentView";
import { FILTER_METHODS } from "../../hooks/useFilterBy";

function EmailForm({ className }) {
  const { guestId } = useCurrentView();
  const { guests } = useGuests();
  const guest = useMemo(() => guests.find((g) => g._id === guestId), [guestId]);
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useForm({
    defaultValues: guest
      ? { sendTo: "SPECIFIC", specificGuests: [guest.email] }
      : undefined,
  });
  const { error, templates } = useEmailTemplates();
  const {
    mutate: sendEmails,
    isError: isSendError,
    error: sendError,
  } = useSendEmails();
  const sendTo = watch("sendTo");
  const onSubmit = (data) => {
    sendEmails(data);
    // mutate(data);
  };

  if (error) {
    return (
      <Container className={className}>
        <Error>{_get(error, "message", "Unexpected Error Occurred")}</Error>
      </Container>
    );
  }

  return (
    <Container className={className} onSubmit={handleSubmit(onSubmit)}>
      {sendError && (
        <Error>
          {_get(
            sendError,
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
            error={errors.sendTo}
            label="Send To"
            type="select"
          >
            <option value={FILTER_METHODS.ALL}>All</option>
            <option value={FILTER_METHODS.CONFIRMED}>Accepted</option>
            <option value={FILTER_METHODS.PENDING}>Pending</option>
            <option value={FILTER_METHODS.DECLINED}>Declined</option>
            <option value="SPECIFIC">Specific</option>
          </FormElement>
        </Column>
      </Row>
      {sendTo === "SPECIFIC" && (
        <Row>
          <Column>
            <FormElement
              id="specificGuests"
              {...register("specificGuests", {
                required: true,
              })}
              error={errors.specificGuests}
              label="Select Guest(s)"
              type="select"
              multiple
            >
              {guests.map((g) => (
                <option key={g._id} value={g.email}>
                  {g.firstName} {g.lastName}
                </option>
              ))}
            </FormElement>
          </Column>
        </Row>
      )}
      <Row>
        <Column>
          <FormElement
            id="subject"
            {...register("subject", {
              required: true,
              min: 1,
              max: 200,
            })}
            error={errors.subject}
            label="Subject Line"
            type="input"
          />
        </Column>
      </Row>
      {templates.length && (
        <Row>
          <Column>
            <FormElement
              {...register("templateId", {
                required: true,
              })}
              defaultValue={templates[0].templateId}
              id="templateId"
              label="Template"
              type="select"
              error={errors.templateId}
            >
              {templates.map((template) => (
                <option key={template.templateId} value={template.templateId}>
                  {template.title}
                </option>
              ))}
            </FormElement>
          </Column>
        </Row>
      )}
      <Row>
        <Column>
          <FormElement
            type="checkbox"
            id="sendCalendarAttachment"
            {...register("sendCalendarAttachment", {})}
            label="Send Calendar Attachment"
          />
        </Column>
      </Row>
      <Submit type="submit">Send</Submit>
    </Container>
  );
}

export default EmailForm;
