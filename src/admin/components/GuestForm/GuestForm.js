import React from "react";

import FormElement from "./FormElement";
import { Column, Container, Row } from "./GuestForm.styles";

function GuestForm() {
  return (
    <Container>
      <div>
        <div>EDIT</div>
        <div>Send Message</div>
      </div>
      <Row>
        <Column>
          <FormElement id="email" label="Email" required type="email" />
        </Column>
      </Row>
      <Row>
        <Column>
          <FormElement id="firstName" label="First Name" required />
        </Column>
        <Column>
          <FormElement id="lastName" label="Last Name" required />
        </Column>
      </Row>
      <Row>
        <Column>
          <FormElement
            type="checkbox"
            id="plusOne.lastName"
            label="Additional Guests"
            required
          />
        </Column>
      </Row>
      <Row>
        <Column>
          <FormElement
            id="plusOne.firstName"
            label="Plus One First Name"
            required
          />
        </Column>
        <Column>
          <FormElement
            id="plusOne.lastName"
            label="Plus One Last Name"
            required
          />
        </Column>
      </Row>
      <Row>
        <Column>
          <FormElement
            as="input"
            type="number"
            id="numberOfKids"
            label="          Number of Kids"
            required
          />
        </Column>
      </Row>
      <Row>
        <Column>TODO: Select</Column>
      </Row>
      <Row>
        <Column>
          <FormElement
            as="textarea"
            id="plusOne.lastName"
            label="Last Name"
            required
          />
        </Column>
      </Row>
    </Container>
  );
}

export default GuestForm;
