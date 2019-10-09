import { ResizeCallback, ResetSizeCallback } from './resize.types';

export type ResizeAxis = 'x' | 'y';
export type ResizeControlRenderer = (axis: ResizeAxis) => React.ReactNode;

export interface ResizeControlProps {
  className?: string;
  axis?: ResizeAxis;
  onResize?: ResizeCallback;
  onReset?: ResetSizeCallback;
  children?: ResizeControlRenderer;
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
  children?: ResizeControlRenderer;
}
