import styled from "styled-components";

export const Container = styled.div`
  position: relative;
`;

export const Label = styled.label`
  color: #024f8a;
  font-weight: 400;
  text-transform: uppercase;
  font-weight: 600;
  margin: 0 0 0.3rem 0;
  display: inline-block;
  a {
    color: inherit;
  }
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
    background: #5a7891;
    transform: translate(-50%);
  }
`;

export const Input = styled.input`
  border: none;
  outline: none;
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
  // &:focus {
  //   background: #fff;
  // }
  &:focus + span:before {
    width: 100%;
  }
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus {
    box-shadow: 0 0 0px 1000px white inset;
  }
`;
