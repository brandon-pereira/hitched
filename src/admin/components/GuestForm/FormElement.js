import React from "react";

import {
  Container,
  CheckboxContainer,
  Input,
  InputContainer,
  InputStyleHelper,
  ErrorMessage,
  Label,
  Select,
} from "./FormElement.styles";

const FormElement = React.forwardRef(function (
  { id, label, type, error, children, ...props },
  ref
) {
  return (
    <Container as={type === "checkbox" ? CheckboxContainer : undefined}>
      <Label error={Boolean(error)} htmlFor={id}>
        {label}
      </Label>
      <InputContainer>
        {type === "select" ? (
          <Select
            ref={ref}
            id={id}
            name={id}
            as="select"
            children={children}
            {...props}
          />
        ) : (
          <Input ref={ref} id={id} name={id} type={type} {...props} />
        )}
        <InputStyleHelper error={Boolean(error)}></InputStyleHelper>
      </InputContainer>
      {error && <ErrorMessage>{error.message || "Invalid Value"}</ErrorMessage>}
    </Container>
  );
});

FormElement.displayName = "FormElement";

export default FormElement;
