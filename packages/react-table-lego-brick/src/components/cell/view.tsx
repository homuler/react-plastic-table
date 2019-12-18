import React from 'react';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';

import { DraggableViewProps, ResizeControlContainerProps, ResizeControlViewProps } from '../../types';

export const DraggingContent = styled.span`
  position: absolute;
  z-index: 2;
`;

const cellStyle = (): FlattenSimpleInterpolation => css`
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
`;

export const TdView = styled.td`
  ${cellStyle}
`;

export const ThView = styled.th.attrs<DraggableViewProps>((props) => ({ className: props.isDragging ? 'dragging' : void 0 }))<DraggableViewProps>`
  ${cellStyle}

  & > ${DraggingContent} {
    opacity: ${(props): string => props.isDragging ? '1' : '0'};
  }
`;


const CursorContainer = styled.div<ResizeControlContainerProps>`
  position: absolute;
  z-index: 100;
`;

const CursorContainerX = styled(CursorContainer)`
  cursor: col-resize;

  height: 100%;
  width: ${(props): string => `${props.theme.cursor.x.width}px`};
  top: 0;
  right: ${(props): string => `${-(props.theme.cursor.x.width) / 2}px`};
`;

const CursorContainerY = styled(CursorContainer)`
  cursor: row-resize;

  height: ${(props): string => `${props.theme.cursor.y.height}px`};
  width: 100%;
  bottom: ${(props): string => `${-(props.theme.cursor.y.height) / 2}px`};
  left: 0;
`;

const Cursor = styled.div`
  position: absolute;
  border-color: ${(props): string => props.theme.cursor.color};
  border-style: solid;
  opacity: 0;

  transition: all linear 100ms;

  th:hover &, td:hover & {
    opacity: 1;
  }
`;

const CursorX = styled(Cursor)`
  top: 2px;
  left: ${(props): string => `${(props.theme.cursor.x.width - 2) / 2}px`};
  height: calc(100% - 4px);
  width: 2px;
  border-width: 0 1px;
`;

const CursorY = styled(Cursor)`
  top: ${(props): string => `${(props.theme.cursor.y.height - 2) / 2}px`};
  left: 2px;
  height: 2px;
  width: calc(100% - 4px);
  border-width: 1px 0;
`;

export const ResizeControlView = React.forwardRef<HTMLDivElement, ResizeControlViewProps>((props: ResizeControlViewProps, ref) => {
  const { axis = 'x', ...containerProps } = props;
  const Container = axis === 'x' ? CursorContainerX : CursorContainerY;
  const Cursor = axis === 'x' ? CursorX : CursorY;

  return (
    <Container ref={ ref } { ...containerProps }>
      <Cursor />
    </Container>
  )
});

ResizeControlView.displayName = 'ResizeControlView';
