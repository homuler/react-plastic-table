import React from 'react';

import { ThElement } from './th.types';
import { TdElement } from './td.types';
import { ReorderCallback } from './reorder.types';

type TableCellElement = ThElement | TdElement;

export interface TrProps extends React.HTMLAttributes<HTMLTableRowElement> {
  ref?: (node: HTMLTableRowElement) => void;
  onReorder?: ReorderCallback;
  rowIndex?: number;
  children?: TableCellElement | Array<TableCellElement>;
}
export type TrElement = React.ReactElement<TrProps>;
