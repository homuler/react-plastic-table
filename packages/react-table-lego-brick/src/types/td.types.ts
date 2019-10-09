import React from 'react';

export interface TdProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  rowIndex?: number;
  columnIndex?: number;
}
export type TdElement = React.ReactElement<TdProps>;
