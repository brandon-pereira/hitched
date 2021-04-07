import styled from "styled-components";

export const Container = styled.div`
  position: relative;
`;

export const Label = styled.label`
  color: ${({ theme }) => theme.colors.secondary};
  font-weight: 400;
  text-transform: uppercase;
  font-weight: 600;
  margin: 0 0 0.3rem 0;
  display: inline-block;
  a {
    color: inherit;
  }
  ${({ error, theme }) => error && `color: ${theme.colors.red};`}
`;

export const ErrorMessage = styled.span`
  color: ${({ theme }) => theme.colors.red};
  margin-top: 0.2rem;
  display: block;
  font-size: 0.9rem;
`;

export const InputContainer = styled.div``;

export const InputStyleHelper = styled.span`
  display: block;
  height: 2px;
  background: #ccc;
  position: relative;
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    bottom: 0;
    width: 0%;
    transition: width 0.5s;
    height: 2px;
    background: ${({ theme }) => theme.colors.secondary};
    transform: translate(-50%);
  }
  ${({ error, theme }) =>
    error &&
    `&, &:before { 
      
     background: ${theme.colors.red};
    }`}
`;

export const Input = styled.input`
  border: none;
  outline: none;
  background: #ededed;
  font-size: 1rem;
  box-sizing: border-box;
  padding: 0.7rem 0.6em;
  font-family: "Open Sans", sans-serif;
  appearance: none;
  width: 100%;
  resize: none;
  outline: none;
  display: block;
  &:disabled {
    background: #f2f2f2;
    color: #505050;
  }
  &:focus + span:before {
    width: 100%;
  }
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus {
    box-shadow: 0 0 0px 1000px white inset;
  }
`;

export const CheckboxContainer = styled.label`
  display: flex;
  align-items: center;
  ${Label} {
      order: 2;
      flex: 1;
      padding: 0.5rem 1rem;
      margin: 0 !important;
    }
    ${Input} {
      display: none;
      + ${InputStyleHelper} {
        background: #fff;
        display: flex;
        height: 2rem;
        width: 2rem;
        border-radius: 5px;
        box-shadow: inset 0 0 0 2px #ccc;
        align-items: center;
        justify-content: center;
        &:before {
          content: "";
          display: inline-block;
          position: static;
          transform: none;
          height: 0;
          width: 0;
          background: ${({ theme }) => theme.colors.secondary};;
          transition: all 0.2s cubic-bezier(0.17, 0.67, 0.77, 1.4);
          border-radius: 5px;
        }
      }
      &:checked {
        & + ${InputStyleHelper} {
          box-shadow: inset 0 0 0 2px ${({ theme }) => theme.colors.secondary};;
          &:before {
            height: 1.5rem;
            width: 1.5rem;
          }
        }
      }
    }
  }
`;
