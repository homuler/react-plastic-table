import React, { useCallback } from 'react';
import { DraggableCore, DraggableData } from 'react-draggable';

import { ResizeControlView } from './view';
import { ResizeData } from '../../types/resize';
import { ResizeAxis, ResizeControlProps } from '../../types/cell';

const MINIMUM_PX = 2;

function getCurrentSize(axis: ResizeAxis, node: HTMLDivElement | null): number | null {
  if (node === null || node.parentElement === null) { return null; }

  const rect = node.parentElement.getBoundingClientRect();

  return axis === 'x' ? rect.width : rect.height;
}

function convertToResizeData(axis: ResizeAxis, data: DraggableData): ResizeData {
  const { x, lastX, y, lastY } = data;

  const size = axis === 'x' ? Math.max(x, 0) : Math.max(y, 0);
  const last = axis === 'x' ? Math.max(lastX, 0) : Math.max(lastY, 0);
  const delta = size - last;

  return { size, last, delta };
}

const ResizeControl: React.FunctionComponent<ResizeControlProps> = (props: ResizeControlProps) => {
  const { axis = 'x', onResize, onReset } = props;
  const ref = React.createRef<HTMLDivElement>();

  const onStart = useCallback((e) => {
    e.stopPropagation();
  }, []);

  const onDrag = useCallback((e, data) => {
    e.stopPropagation();

    if (!onResize) { return; }

    onResize(e, convertToResizeData(axis, data));
  }, [axis, onResize]);

  const onStop = useCallback((e, data) => {
    e.stopPropagation();

    if (!onResize) { return; }

    const size = getCurrentSize(axis, ref.current);

    if (size === null) { return; }

    const args = convertToResizeData(axis, data);

    if (Math.abs(args.size - size) > 2 * MINIMUM_PX) {
      // TODO: calculate size correctly
      onResize(e, { size: size - 6, delta: size - 6 - Math.max(args.size, 0), last: args.last });
    }
  }, [axis, ref, onResize]);

  return (
    <DraggableCore
      grid={ [MINIMUM_PX, MINIMUM_PX] }
      onStart={ onStart }
      onDrag={ onDrag }
      onStop={ onStop }
    >
      <ResizeControlView ref={ ref } axis={ axis } onDoubleClick={ onReset } />
    </DraggableCore>
  );
}

ResizeControl.displayName = 'ResizeControl';

export default ResizeControl;
