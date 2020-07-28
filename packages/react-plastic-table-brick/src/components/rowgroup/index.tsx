import React from 'react';

import get from 'lodash/get';

import { flatten } from '../../utils/children';
import useColumnWidthMonitor from './useColumnWidthMonitor';
import { TrElement, ThElement, TdElement, RowGroupProps, CellPosition, ChildRef } from '../../types';

type Grid = boolean[][];

function paintGrid(grid: Grid, topLeft: CellPosition, bottomRight: CellPosition): void {
  const [top, left] = topLeft;
  const [bottom, right] = bottomRight;

  for (let i = top; i <= bottom; i++) {
    if (!grid[i]) { grid[i] = []; }

    for (let j = left; j <= right; j++) {
      grid[i][j] = true;
    }
  }
}

function findSpace(row: boolean[], start: number): number {
  for (let i = start; ; i++) {
    if (row[i]) { continue; }

    return i;
  }
}

function findPosition(grid: Grid, rowIndex: number, start: number, rowSpan: number, colSpan: number): CellPosition {
  const columnIndex = findSpace(grid[rowIndex] || [], start);
  const topLeft: CellPosition = [rowIndex, columnIndex];
  const bottomRight: CellPosition = [rowIndex + rowSpan - 1, columnIndex + colSpan - 1];

  paintGrid(grid, topLeft, bottomRight);

  return [rowIndex, columnIndex];
}

function buildTrElements(rows: Array<TrElement>, ref: ChildRef<HTMLTableRowElement>, offset = 0): Array<TrElement> {
  const grid: Grid = [];

  return rows.map((tr, i) => {
    const rowIndex = i + offset;
    let cursor = 0;

    const cells = (flatten<ThElement | TdElement>(tr.props.children || [])).map((cell) => {
      const { rowSpan = 1, colSpan = 1 } = cell.props;
      const [, columnIndex] = findPosition(grid, i, cursor, rowSpan, colSpan);

      cursor = columnIndex + 1;

      return React.cloneElement(cell, { rowIndex, columnIndex });
    });

    return React.cloneElement(tr, { ref: ref.bind(null, rowIndex), rowIndex }, cells);
  });
}


const RowGroup: React.FunctionComponent<RowGroupProps> = (props: RowGroupProps) => {
  const children = flatten(props.children);
  const ref = useColumnWidthMonitor(children.length);

  return (<>{ buildTrElements(children, ref, props.offset) }</>);
};

RowGroup.displayName = 'RowGroup';

RowGroup.propTypes = {
  children: function(props: Partial<RowGroupProps>, propName: string, componentName: string): Error | null {
    const children = flatten(React.Children.toArray(props[(propName as keyof RowGroupProps)]));

    if (children.some((child) => (get(child, 'type.displayName') !== 'Tr'))) {
      return new TypeError(`Each of the children of \`${componentName}\` must be \`Tr\``);
    }

    if (children.some((child, i) => (get(child, 'props.rowSpan', 1) > children.length - i))) {
      return new TypeError(`The height of child(\`Tr\`) must not exceed the height of \`${componentName}\``);
    }

    return null;
  },
};

export default RowGroup;
