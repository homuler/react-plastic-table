import { useCallback, useContext } from 'react';
import useChildrenRef from '../../hooks/useChildrenRef';
import Heap from '../../utils/heap';

import TableContext from '../../contexts/tableContext';
import { ChildRef } from '../../types';

type Cell = {
  width: number;
  index: number;
  span: number;
}

function cellComparator(x: Cell, y: Cell): number {
  if (x.index === y.index) {
    if (x.span === y.span) { return 0; }

    return x.span < y.span ? 1 : -1;
  }

  return x.index < y.index ? 1 : -1;
}

function isOverlapped(x: Cell, y: Cell | undefined): boolean {
  if (y === void 0) {
    return false;
  }

  return ((y.index + y.span) - x.index) * (y.index - (x.index + x.span)) < 0;
}

function calcWidths(cells: Array<Cell>): Map<number, number> {
  const heap = new Heap<Cell>(cellComparator);

  cells.forEach((cell) => { heap.push(cell); });

  const widths = new Map<number, number>();

  while (heap.size > 0) {
    const leftMost = heap.pop() as Cell;

    while (isOverlapped(leftMost, heap.peek())) {
      // NOTE: For cells are sorted, cell indices must be same if they are overlapped.
      const cell = heap.pop() as Cell;
      const splittedCell = {
        width: cell.width - leftMost.width,
        index: leftMost.index + leftMost.span,
        span: cell.span - leftMost.span,
      };

      if (splittedCell.span > 0) {
        heap.push(splittedCell);
      }
    }

    for (let i = 0; i < leftMost.span; i++) {
      widths.set(leftMost.index + i, leftMost.width / leftMost.span);
    }
  }

  return widths;
}

function buildCellsFromRows(rows: Array<HTMLTableRowElement>): Array<Cell> {
  const cells: Array<Cell> = [];

  rows.forEach((row) => {
    Array.prototype.forEach.call(row.childNodes, (cell: HTMLTableCellElement) => {
      const columnIndex = cell.getAttribute('data-columnindex'); // TODO: avoid hard coding

      if (columnIndex == void 0) { return; }

      const colSpan = cell.colSpan;
      const width = cell.offsetWidth;

      cells.push({ width, index: +columnIndex, span: colSpan });
    });
  });

  return cells;
}

export default function useColumnWidthMonitor(childrenCount: number): ChildRef<HTMLTableRowElement> {
  const { widths } = useContext(TableContext);

  const callback = useCallback((_node, _i, rows: HTMLTableRowElement[]) => {
    const count = rows.reduce((acc: number, x) => (x === void 0 ? acc : acc + 1), 0);

    if (count < childrenCount) { return; }

    const cells = buildCellsFromRows(rows);
    const colWidths = calcWidths(cells);

    widths.transaction();

    colWidths.forEach((value, key) => {
      if (widths.get(key) === void 0) {
        widths.set(key, value);
      }
    });

    widths.commit();
  }, [childrenCount, widths]);

  return useChildrenRef<HTMLTableRowElement>(callback);
}
