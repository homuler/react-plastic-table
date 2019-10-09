import { DraggableEventHandler } from 'react-draggable';

export type DragAxis = 'none' | 'x' | 'y' | 'both';
export type DraggableArgs = {
  axis: DragAxis;
  onStart?: DraggableEventHandler;
  onDrag?: DraggableEventHandler;
  onStop?: DraggableEventHandler;
};

export type DragPosition = {
  x: number;
  y: number;
};

export type DraggableHookReturnType = {
  ref: React.RefObject<HTMLElement>;
  isDragging: boolean;
  position: DragPosition;
  onStart: DraggableEventHandler;
  onDrag: DraggableEventHandler;
  onStop: DraggableEventHandler;
};

export interface DraggableViewProps {
  isDragging: boolean;
};
