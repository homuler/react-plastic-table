import { useCallback, useRef, useState } from 'react';

import { normalizeClient } from '../utils/event';
import { DraggableArgs, DraggableHookReturnType, DragAxis, DragPosition } from '../types';

type ClientPosition = {
  x: number | null;
  y: number | null;
};

function calcRelativePosition(dragAxis: DragAxis, draggingNode: HTMLElement, cursorPosition: ClientPosition): DragPosition {
  const draggingRect = draggingNode.getBoundingClientRect();
  const thNode = draggingNode.parentElement as HTMLElement;
  const thRect = thNode.getBoundingClientRect();

  const targetPosition = {
    x: (dragAxis === 'none' || dragAxis === 'y' || cursorPosition.x === null) ? (thRect.left + thRect.right) / 2 : cursorPosition.x,
    y: (dragAxis === 'none' || dragAxis === 'x' || cursorPosition.y === null) ? (thRect.top + thRect.bottom) / 2 : cursorPosition.y,
  };

  return {
    x: targetPosition.x - thRect.left - draggingRect.width / 2,
    y: targetPosition.y - thRect.top - draggingRect.height / 2,
  }
}

export default function useDraggable(args: DraggableArgs): DraggableHookReturnType {
  const { axis, onStart, onDrag, onStop } = args;

  const ref = useRef<HTMLElement>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [position, setPosition] = useState<DragPosition>({ x: 0, y: 0 });

  const handleStart = useCallback((e, data) => {
    e.stopPropagation();

    if (axis === 'none') { return; }

    setIsDragging(true);

    if (!ref.current) { return; }

    const cursorPosition = normalizeClient(e);
    const nextPosition = calcRelativePosition(axis, ref.current, cursorPosition);
    setPosition(nextPosition);

    if (onStart) { onStart(e, data); }
  }, [setIsDragging, axis, ref, setPosition, onStart]);

  const handleDrag = useCallback((e, data) => {
    e.stopPropagation();

    if (axis === 'none' || !ref.current) { return; }

    const cursorPosition = normalizeClient(e);
    const nextPosition = calcRelativePosition(axis, ref.current, cursorPosition);
    setPosition(nextPosition);

    if (onDrag) { onDrag(e, data); }
  }, [axis, ref, setPosition, onDrag]);

  const handleStop = useCallback((e, data) => {
    e.stopPropagation();

    setIsDragging(false);
    setPosition({ x: 0, y: 0 });

    if (onStop) { onStop(e, data); }
  }, [setIsDragging, setPosition, onStop]);

  return { ref, isDragging, position, onStart: handleStart, onDrag: handleDrag, onStop: handleStop };
}
