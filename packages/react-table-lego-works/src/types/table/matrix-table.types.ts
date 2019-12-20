import { ColProps } from 'react-table-lego-brick';
import { HeaderObj, LayoutChangeCallback } from '../header/commons.types';

export interface MatrixTableProps {
  className?: string;

  columns: Array<HeaderObj>;
  rows: Array<HeaderObj>;
  colProps?: Array<ColProps | undefined | null>;
  onLayoutChange?: LayoutChangeCallback;

  children: (column: HeaderObj, row: HeaderObj) => React.ReactNode;
}
