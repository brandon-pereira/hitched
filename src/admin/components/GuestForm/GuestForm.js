import React from "react";
import { useForm } from "react-hook-form";
import _get from "lodash.get";

import FormElement from "./FormElement";
import { Column, Container, Submit, Row } from "./GuestForm.styles";

function GuestForm({ className }) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();
  const hasAdditionalGuests = watch("hasAdditionalGuests");
  const onSubmit = (data) => console.log(data);

  return (
    <Container className={className} onSubmit={handleSubmit(onSubmit)}>
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
                value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
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
                    message: "First name must be less than 20 characters",
                  },
                  minLength: {
                    value: 3,
                    message: "First name must be at least 3 characters",
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
                  max: {
                    value: 8,
                    message: "Maximum 8 kids allowed",
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
          <FormElement type="select" id="attending" label="Attending" />
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
      <Submit type="submit">Create</Submit>
    </Container>
  );
}

export default GuestForm;
