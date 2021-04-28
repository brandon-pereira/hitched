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
// import useGuestFormSubmission from "./useGuestFormSubmission";
// import useDeleteGuest from "../../hooks/useDeleteGuest";/

function GuestForm({ className, initialGuest }) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useForm();
  const hasAdditionalGuests = watch("hasAdditionalGuests");
  const isModifying = Boolean(initialGuest);
  const { mutate, isError, error, reset: resetSubmission } = {};

  useEffect(() => {
    if (initialGuest && (initialGuest.plusOne || initialGuest.numberOfKids)) {
      initialGuest.hasAdditionalGuests = true;
    }
    reset(initialGuest);
    // resetSubmission();
  }, [initialGuest]);

  const onSubmit = (data) => {
    // mutate(data);
  };

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
          <FormElement id="sendTo" label="Send To" type="select">
            <option>Accepted</option>
            <option>Pending</option>
            <option>Declined</option>
            <option>Specific</option>
          </FormElement>
        </Column>
        <Column>
          <FormElement id="template" label="Template" type="select">
            <option>Invite</option>
            <option>Invite Part Two</option>
          </FormElement>
        </Column>
      </Row>
      <Submit type="submit">{isModifying ? "Modify" : "Create"}</Submit>
      {isModifying && (
        <button onClick={() => deleteGuest(initialGuest)} type="button">
          DELETE
        </button>
      )}
    </Container>
  );
}

export default GuestForm;
