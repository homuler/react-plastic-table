import React from 'react';

import { TrElement } from './tr.types';

type RowElement = TrElement | React.ReactFragment;

export interface RowGroupProps {
  children: RowElement | Array<RowElement>;
}

type RowIndex = number;
type ColumnIndex = number;

export type CellPosition = [RowIndex, ColumnIndex];
