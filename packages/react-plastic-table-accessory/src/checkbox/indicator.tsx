import styled from 'styled-components';

interface Props {
  className?: string;
  height?: number;
}

const Indicator = styled.span<Props>`
  display: inline-block;
  position: relative;

  & ~ .label {
    position: relative;
  }

  input:disabled ~ &,
  input:disabled ~ .label {
    cursor: not-allowed;
  }
`;

export default Indicator;
