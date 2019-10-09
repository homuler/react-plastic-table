import React from 'react';

export type Dimension = 'height' | 'width';

export type ResizeArgs = {
  columnIndex?: number;
  rowIndex?: number;
  colSpan?: number;
  rowSpan?: number;
};
export type ResizeData = {
  size: number;
  delta: number;
  last: number;
};
export type ResizeCallback = (e: React.SyntheticEvent<HTMLDivElement>, data: ResizeData) => void;
export type ResetSizeCallback = () => void;
export type ResizeReturnType = {
  resizeRow: ResizeCallback;
  resetRow: ResetSizeCallback;
  resizeColumn: ResizeCallback;
  resetColumn: ResetSizeCallback;
};
