import React from 'react';
import styled from 'styled-components';

import { ResizeControlRenderer, ResizeControlContainerProps, ResizeControlViewProps } from '../../types';

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

const defaultRenderer: ResizeControlRenderer = function(axis) {
  return axis === 'x' ? <CursorX /> : <CursorY />;
}

const ResizeControlView = React.forwardRef<HTMLDivElement, ResizeControlViewProps>((props: ResizeControlViewProps, ref) => {
  const { axis = 'x', children = defaultRenderer, ...containerProps } = props;
  const Container = axis === 'y' ? CursorContainerY : CursorContainerX;

  return (
    <Container ref={ ref } { ...containerProps }>
      { children(axis) }
    </Container>
  )
});

ResizeControlView.displayName = 'ResizeControlView';

export default ResizeControlView;
