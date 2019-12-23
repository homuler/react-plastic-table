import React from 'react';

import { ThElement, TdElement } from './cell.types';
import { ReorderCallback } from './reorder.types';
import { ValueOrArray } from './common.types';

export interface TrProps extends React.HTMLAttributes<HTMLTableRowElement> {
  ref?: (node: HTMLTableRowElement) => void;
  onReorder?: ReorderCallback;
  rowIndex?: number;
  children?: ValueOrArray<ThElement | TdElement | React.ReactFragment>;
}

export type TrElement = React.ReactElement<TrProps>;
