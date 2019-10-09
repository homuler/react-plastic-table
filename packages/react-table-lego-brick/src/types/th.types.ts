import React from 'react';

import { DragAxis } from './draggable.types';
import { ReorderCallback } from './reorder.types';

export interface ThProps extends React.ThHTMLAttributes<HTMLTableHeaderCellElement> {
  rowIndex?: number;
  columnIndex?: number;

  resizeAxis?: DragAxis;
  onReorder?: ReorderCallback;
  reorderAxis?: DragAxis;
}
export type ThElement = React.ReactElement<ThProps>;
