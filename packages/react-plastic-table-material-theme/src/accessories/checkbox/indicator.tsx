import styled from 'styled-components';
import round from 'lodash/round';

interface Props {
  className?: string;
  height?: number;
}

const Indicator = styled.span<Props>`
  display: inline-block;
  position: relative;
  left: 0;
  height: ${(props): string => `${props.height || 24}px`};
  width: ${(props): string => `${props.height || 24}px`};
  background-color: #eee;

  input:checked ~ & {
    background-color: #2AA1C0;
  }

  input:disabled ~ & {
    background-color: #eee;
  }

  label:hover > input:not([disabled]):checked + &,
  label:hover input:checked:focus + & {
    background-color: #0E647D;
  }

  &:after {
    content: '';
    position: absolute;
    display: none;

    top: ${(props): string => `${round((2 - Math.sqrt(2)) * (props.height || 24) / 4, 3)}px`};
    left: ${(props): string => `${(props.height || 24) / 2 - Math.floor((props.height || 24) / 10)}px`};
    width: ${(props): string => `${(props.height || 24) / 4 - Math.floor((props.height || 24) / 10)}px`};
    height: ${(props): string => `${(props.height || 24) / 2}px`};
    border-color: white;
    border-style: solid;
    border-width: ${(props): string => `0 ${Math.floor((props.height || 24) / 10)}px ${Math.floor((props.height || 24) / 10)}px 0`};
    transform: rotate(45deg);
  }

  input:checked ~ &:after {
    display: block;
  }

  input:disabled ~ &:after {
    border-color: #ccc;
  }

  & ~ .label {
    padding-left: ${(props): string => `${Math.floor((props.height || 24) / 4)}px`};
    font-size: ${(props): string => `${Math.floor((props.height || 24) * 0.9)}px`};

    position: relative;
    top: ${(props): string => `-${Math.ceil((props.height || 24) * 0.1)}px`};
  }
`;

export default Indicator;
