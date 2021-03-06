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
import useGuestFormSubmission from "./useGuestFormSubmission";
import useDeleteGuest from "../../hooks/useDeleteGuest";

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
  const {
    mutate,
    isError,
    error,
    reset: resetSubmission,
  } = useGuestFormSubmission(isModifying ? "MODIFY" : "CREATE");
  const { mutate: deleteGuest } = useDeleteGuest();

  useEffect(() => {
    if (initialGuest && (initialGuest.plusOne || initialGuest.numberOfKids)) {
      initialGuest.hasAdditionalGuests = true;
    }
    if (initialGuest) {
      initialGuest.attendance = getDefaultValueFromGuest(initialGuest);
    }
    reset(initialGuest);
    resetSubmission();
  }, [initialGuest]);

  const onSubmit = (data) => {
    if (data.plusOne && !data.plusOne.firstName && !data.plusOne.lastName) {
      delete data.plusOne;
    }
    if (!data.numberOfKids && data.numberOfKids !== 0) {
      delete data.numberOfKids;
    }
    if (!data.comments) {
      delete data.comments;
    }
    switch (data.attendance) {
      case "ATTENDING":
        data.isConfirmed = true;
        data.isDeclined = false;
        break;
      case "DECLINED":
        data.isConfirmed = false;
        data.isDeclined = true;
        break;
      case "PENDING":
        data.isConfirmed = false;
        data.isDeclined = false;
        break;
    }
    delete data.hasAdditionalGuests;
    mutate(data);
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
          <FormElement
            label="Email"
            {...register("email", {
              required: {
                value: true,
                message: "Email is required.",
              },
              pattern: {
                value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                message: "Email is not formatted correctly.",
              },
            })}
            error={errors.email}
            type="email"
          />
        </Column>
      </Row>
      <Row>
        <Column>
          <FormElement
            id="firstName"
            {...register("firstName", {
              required: {
                value: true,
                message: "First name is required.",
              },
              pattern: {
                value: /^[a-zA-Z\u00C0-\u024F]+$/,
                message: "First Name is not formatted correctly.",
              },
              maxLength: {
                value: 20,
                message: "First name must be less than 20 characters",
              },
              minLength: {
                value: 3,
                message: "First name must be at least 3 characters",
              },
            })}
            label="First Name"
            error={errors.firstName}
          />
        </Column>
        <Column>
          <FormElement
            id="lastName"
            {...register("lastName", {
              required: {
                value: true,
                message: "Last name is required.",
              },
              pattern: {
                value: /^[a-zA-Z\u00C0-\u024F]+$/,
                message: "Last Name is not formatted correctly.",
              },
              maxLength: {
                value: 20,
                message: "Last name must be less than 20 characters",
              },
              minLength: {
                value: 3,
                message: "Last name must be at least 3 characters",
              },
            })}
            error={errors.lastName}
            label="Last Name"
          />
        </Column>
      </Row>
      <Row>
        <Column>
          <FormElement
            type="checkbox"
            id="hasAdditionalGuests"
            {...register("hasAdditionalGuests", {})}
            label="Additional Guests"
          />
        </Column>
      </Row>
      {hasAdditionalGuests && (
        <>
          <Row>
            <Column>
              <FormElement
                id="plusOne.firstName"
                label="Plus One First Name"
                {...register("plusOne.firstName", {
                  maxLength: {
                    value: 20,
                    message: "First name must be less than 20 characters",
                  },
                  pattern: {
                    value: /^[a-zA-Z\u00C0-\u024F]+$/,
                    message: "First Name is not formatted correctly.",
                  },
                  minLength: {
                    value: 3,
                    message: "First name must be at least 3 characters",
                  },
                })}
                error={_get(errors, "plusOne.firstName")}
              />
            </Column>
            <Column>
              <FormElement
                id="plusOne.lastName"
                label="Plus One Last Name"
                {...register("plusOne.lastName", {
                  maxLength: {
                    value: 20,
                    message: "Last name must be less than 20 characters",
                  },
                  pattern: {
                    value: /^[a-zA-Z\u00C0-\u024F]+$/,
                    message: "Last Name is not formatted correctly.",
                  },
                  minLength: {
                    value: 3,
                    message: "Last name must be at least 3 characters",
                  },
                })}
                error={_get(errors, "plusOne.lastName")}
              />
            </Column>
          </Row>
          <Row>
            <Column>
              <FormElement
                type="number"
                defaultValue="0"
                {...register("numberOfKids", {
                  valueAsNumber: true,
                  pattern: {
                    value: /[0-9]{1}/,
                    message: "Must be a number",
                  },
                  min: 0,
                  max: {
                    value: 12,
                    message: "Maximum 12 kids allowed",
                  },
                })}
                error={errors.numberOfKids}
                id="numberOfKids"
                label="Number of Kids"
              />
            </Column>
          </Row>
        </>
      )}
      <Row>
        <Column>
          <FormElement
            type="select"
            id="attendance"
            label="Attendance"
            {...register("attendance", {})}
          >
            <option value="PENDING">Pending</option>
            <option value="ATTENDING">Attending</option>
            <option value="DECLINED">Declined</option>
          </FormElement>
        </Column>
      </Row>
      <Row>
        <Column>
          <FormElement
            id="musicSuggestions"
            label="Music Suggestions"
            {...register("musicSuggestions", {
              maxLength: {
                value: 200,
                message: "Maximum 200 characters",
              },
            })}
            error={errors.comments}
          />
        </Column>
      </Row>
      <Row>
        <Column>
          <FormElement
            id="dietaryRestrictions"
            label="Dietary Restrictions"
            {...register("dietaryRestrictions", {
              maxLength: {
                value: 200,
                message: "Maximum 200 characters",
              },
            })}
            error={errors.comments}
          />
        </Column>
      </Row>
      <Row>
        <Column>
          <FormElement
            as="textarea"
            id="comments"
            label="Comments"
            {...register("comments", {
              maxLength: {
                value: 200,
                message: "Maximum 200 characters",
              },
            })}
            error={errors.comments}
          />
        </Column>
      </Row>
      <Submit type="submit">{isModifying ? "Modify" : "Create"}</Submit>
    </Container>
  );
}

function getDefaultValueFromGuest(user) {
  if (user && user.isConfirmed && !user.isDeclined) {
    return "ATTENDING";
  } else if (user && user.isDeclined && !user.isConfirmed) {
    return "DECLINED";
  } else {
    return "PENDING";
  }
}

export default GuestForm;
