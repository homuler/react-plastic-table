import { SizeMap } from 'react-table-lego-brick';

export interface HeaderObj {
  id: string;
  name?: string;
  format?: (id: string, name?: string) => React.ReactNode;
  isResizable?: boolean;
  isReorderable?: boolean;
  children?: Array<HeaderObj>;
}

export type TableLayout = {
  columns?: Array<HeaderObj>;
  rows?: Array<HeaderObj>;
  widths?: SizeMap;
  height?: SizeMap;
};

export type LayoutChangeCallback = (layout: TableLayout) => void;
