import React from 'react';
import { ColProps } from 'react-table-lego-brick';
import { HeaderObj, LayoutChangeCallback } from '../header/commons';
import HeaderTree from '../../header/data/header-tree';

export interface TreeHeaderTableProps<T> {
  className?: string;
  style?: React.CSSProperties;

  columns: Array<HeaderObj>;
  data: Array<T>;
  colProps?: Array<ColProps | undefined | null>;
  onLayoutChange: LayoutChangeCallback;

  children: (row: T, headerTree: HeaderTree, index: number) => React.ReactElement;
}
