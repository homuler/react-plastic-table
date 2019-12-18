import React from 'react';

import { TdElement, ThElement } from './cell.types';
import { ReorderCallback } from './reorder.types';

type TableCellElement = ThElement | TdElement;

export interface TrProps extends React.HTMLAttributes<HTMLTableRowElement> {
  ref?: (node: HTMLTableRowElement) => void;
  onReorder?: ReorderCallback;
  rowIndex?: number;
  children?: TableCellElement | Array<TableCellElement>;
}
export type TrElement = React.ReactElement<TrProps>;
