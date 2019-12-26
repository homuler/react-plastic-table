import { ColProps, TdElement } from 'react-table-lego-brick';
import { HeaderObj, LayoutChangeCallback } from '../header/commons';

interface CellProps {
  key: string;
}

export interface MatrixTableProps {
  className?: string;

  columnLabel?: string;
  rowLabel?: string;

  columns: Array<HeaderObj>;
  rows: Array<HeaderObj>;
  colProps?: Array<ColProps | undefined | null>;
  onLayoutChange: LayoutChangeCallback;

  children: (columnId: string, rowId: string, props: CellProps) => TdElement;
}
