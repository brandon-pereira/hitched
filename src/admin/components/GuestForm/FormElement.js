import React from "react";

import {
  Container,
  Input,
  InputContainer,
  InputStyleHelper,
  Label,
} from "./FormElement.styles";

function FormElement({ id, label, ...props }) {
  return (
    <Container>
      <Label htmlFor={id}>{label}</Label>
      <InputContainer>
        <Input className="rsvp--form--input" id={id} name={id} {...props} />
        <InputStyleHelper></InputStyleHelper>
      </InputContainer>
    </Container>
  );
}

export default FormElement;
