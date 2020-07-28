import React from 'react';

import { ThElement, TdElement } from './cell';
import { ReorderCallback } from './reorder';
import { ValueOrArray } from './common';

export interface TrProps extends React.HTMLAttributes<HTMLTableRowElement> {
  ref?: (node: HTMLTableRowElement) => void;
  onReorder?: ReorderCallback;
  rowIndex?: number;
  children?: ValueOrArray<ThElement | TdElement | React.ReactFragment>;
}

export type TrElement = React.ReactElement<TrProps>;
