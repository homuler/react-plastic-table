import React from 'react';

import { DragAxis } from './draggable';
import { ReorderCallback } from './reorder';
import { ResizeCallback, ResetSizeCallback } from './resize';

export type ResizeAxis = 'x' | 'y';

export interface ResizeControlProps {
  className?: string;
  axis?: ResizeAxis;
  onResize?: ResizeCallback;
  onReset?: ResetSizeCallback;
}

export interface ResizeControlContainerProps {
  className?: string;
  children?: React.ReactNode;
  onDoubleClick?: (e: React.SyntheticEvent) => void;
  onMouseDown?: (e: React.SyntheticEvent) => void;
  onMouseUp?: (e: React.SyntheticEvent) => void;
  onTouchStart?: (e: React.SyntheticEvent) => void;
  onTouchEnd?: (e: React.SyntheticEvent) => void;
}

export interface ResizeControlViewProps extends ResizeControlContainerProps {
  axis: ResizeAxis;
}

export type ResizeControlRenderer = (axis: ResizeAxis) => React.ReactNode;

interface CellProps extends React.ThHTMLAttributes<HTMLTableHeaderCellElement> {
  rowIndex?: number;
  columnIndex?: number;

  resizeAxis?: DragAxis;
  renderResizeControl?: (axis: 'x' | 'y') => ResizeControlRenderer;
}

export type TdProps = CellProps;
export type TdElement = React.ReactElement<TdProps>;

export interface ThProps extends CellProps {
  reorderAxis?: DragAxis;
  onReorder?: ReorderCallback;
}

export type ThElement = React.ReactElement<ThProps>;
