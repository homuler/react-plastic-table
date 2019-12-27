import { DraggableEvent } from 'react-draggable';
import { DragAxis } from './draggable';

export interface ReorderingHeader {
  id?: string | null;
  columnIndex?: number | null;
  rowIndex?: number | null;
  node: HTMLElement;
}

export type ReorderCursor = {
  x: number;
  y: number;
};

export type ReorderCallback = (e: DraggableEvent, data: ReorderCursor, source: ReorderingHeader, target: ReorderingHeader) => void;
export type ReorderArgs = {
  axis: DragAxis;
  onReorder?: ReorderCallback;
};
