import styled from 'styled-components';

const Input = styled.input.attrs(() => ({ type: 'checkbox' }))`
  position: absolute;
  visibility: hidden;
  pointer-events: none;
`;

export default Input;
