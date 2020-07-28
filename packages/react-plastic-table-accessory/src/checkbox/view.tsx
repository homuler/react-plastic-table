import styled from 'styled-components';

export const Label = styled.label`
  position: relative;
  display: block;

  > *:hover {
    cursor: pointer;
  }
`;

export const Input = styled.input.attrs(() => ({ type: 'checkbox' }))`
  position: relative;

  &:disabled:hover, &:disabled ~ *:hover {
    cursor: not-allowed;
  }
`;

export const Indicator = styled.span`
  display: inline-block;
  position: relative;
`;

export const Span = styled.span`
  position: relative;

  &:hover {
    cursor: pointer;
  }
`;
