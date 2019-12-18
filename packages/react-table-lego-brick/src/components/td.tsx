import React from 'react';

import { TdView } from './cell/view';
import ResizeControl from './cell/resize-control';
import useResize from './cell/useResize';
import { TdProps } from '../types';

const Td: React.FunctionComponent<TdProps> = (props: TdProps) => {
  const {
    rowIndex, columnIndex, resizeAxis = 'both',
    children,
    ...tdProps
  } = props;

  const resizeArgs = {
    columnIndex, colSpan: tdProps.colSpan,
    rowIndex, rowSpan: tdProps.rowSpan,
  };
  const { resizeColumn, resetColumn, resizeRow, resetRow } = useResize(resizeArgs);

  return (
    <TdView { ...tdProps }
      data-columnindex={ columnIndex }
      data-rowindex={ rowIndex }
    >
      { children }

      {
        (resizeAxis === 'both' || resizeAxis === 'x') &&
          <ResizeControl axis='x' onResize={ resizeColumn } onReset={ resetColumn } />
      }
      {
        (resizeAxis === 'both' || resizeAxis === 'y') &&
          <ResizeControl axis='y' onResize={ resizeRow } onReset={ resetRow } />
      }
    </TdView>
  );
};

Td.displayName = 'Td';

export default Td;
