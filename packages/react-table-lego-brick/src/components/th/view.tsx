import styled from 'styled-components';

import { DraggableViewProps } from '../../types';

export const DraggingContent = styled.span`
  position: absolute;
  z-index: 2;
`;

export const ThView = styled.th.attrs<DraggableViewProps>((props) => ({ className: props.isDragging ? 'dragging' : void 0 }))<DraggableViewProps>`
  position: relative;

  &.dragging::after {
    content: '';
    position: absolute;
    display: block;
    z-index: 1;
    background-color: white;
    opacity: 0.7;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  & > ${DraggingContent} {
    opacity: ${(props): string => props.isDragging ? '1' : '0'};
  }
`;
