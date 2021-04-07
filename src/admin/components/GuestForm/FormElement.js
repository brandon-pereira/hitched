import React from "react";

import {
  Container,
  CheckboxContainer,
  Input,
  InputContainer,
  InputStyleHelper,
  ErrorMessage,
  Label,
} from "./FormElement.styles";

const FormElement = React.forwardRef(function (
  { id, label, type, error, ...props },
  ref
) {
  return (
    <Container as={type === "checkbox" ? CheckboxContainer : undefined}>
      <Label error={Boolean(error)} htmlFor={id}>
        {label}
      </Label>
      <InputContainer>
        <Input ref={ref} id={id} name={id} type={type} {...props} />
        <InputStyleHelper error={Boolean(error)}></InputStyleHelper>
      </InputContainer>
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
    </Container>
  );
});

FormElement.displayName = "FormElement";

export default FormElement;
