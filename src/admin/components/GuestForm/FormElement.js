import React from "react";

import {
  Container,
  CheckboxContainer,
  Input,
  InputContainer,
  InputStyleHelper,
  Label,
} from "./FormElement.styles";

function FormElement({ id, label, type, ...props }) {
  return (
    <Container as={type === "checkbox" ? CheckboxContainer : undefined}>
      <Label htmlFor={id}>{label}</Label>
      <InputContainer>
        <Input
          className="rsvp--form--input"
          id={id}
          name={id}
          type={type}
          {...props}
        />
        <InputStyleHelper></InputStyleHelper>
      </InputContainer>
    </Container>
  );
}

export default FormElement;
