import { useCallback, useContext } from 'react';

import isNil from 'lodash/isNil';

import TableContext from '../../contexts/tableContext';
import { ResizeArgs, ResizeReturnType, ResizeCallback, ResetSizeCallback, ResizeData } from '../../types';
import SizeMap from '../../utils/sizeMap';

function useResizeCellCallback(sizeMap: SizeMap, index: number | undefined, span: number): ResizeCallback {
  return useCallback((_e, data: ResizeData) => {
    if (isNil(index)) { return; }

    sizeMap.resize(index, data, span);
  }, [sizeMap, index, span]);
}

function useResetCellCallback(sizeMap: SizeMap, index: number | undefined, span: number): ResetSizeCallback {
  return useCallback(() => {
    if (isNil(index)) { return; }

    sizeMap.delete(index, span);
  }, [sizeMap, index, span]);
}

function useResizeCell(sizeMap: SizeMap, index: number | undefined, span: number): [ResizeCallback, ResetSizeCallback] {
  const resizeCell = useResizeCellCallback(sizeMap, index, span);
  const resetCell = useResetCellCallback(sizeMap, index, span);

  return [resizeCell, resetCell];
}

export default function useResize(args: ResizeArgs): ResizeReturnType {
  const { rowIndex, rowSpan = 1, columnIndex, colSpan = 1 } = args;
  const { widths, heights } = useContext(TableContext);

  const [resizeRow, resetRow] = useResizeCell(heights, rowIndex, rowSpan);
  const [resizeColumn, resetColumn] = useResizeCell(widths, columnIndex, colSpan);

  return { resizeRow, resetRow, resizeColumn, resetColumn };
}
