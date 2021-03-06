import React from 'react';

import { TrElement } from './tr';

type RowElement = TrElement | React.ReactFragment;

export interface RowGroupProps {
  offset?: number;
  children: RowElement | Array<RowElement>;
}

type RowIndex = number;
type ColumnIndex = number;

export type CellPosition = [RowIndex, ColumnIndex];
