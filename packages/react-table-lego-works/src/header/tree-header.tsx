import React, { useCallback, useContext, useMemo } from 'react';

import get from 'lodash/get';

import { ColGroup, Col, Thead, Tr, Th, TableContext, ReorderCallback, ReorderCursor, SizeMap } from 'react-table-lego-brick';
import HeaderTree from './data/header-tree';
import { TreeHeaderProps } from '../types';

function canSwap(source: HTMLElement, target: HTMLElement, { x }: ReorderCursor, direction: 'left' | 'right'): boolean {
  const sourceRect = source.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();

  const nextTargetRange = direction === 'left' ? [
    targetRect.left + sourceRect.width, targetRect.right + sourceRect.width
  ] : [
    targetRect.left - sourceRect.width, targetRect.right - sourceRect.width
  ];

  return (x - nextTargetRange[0]) * (x - nextTargetRange[1]) > 0;
}

function swapSizeMap(sizeMap: SizeMap, source: HTMLElement, target: HTMLElement): SizeMap {
  const xIdx = +(source.getAttribute('data-columnindex') as string);
  const xSpan = +(source.getAttribute('colspan') || 1);
  const yIdx = +(target.getAttribute('data-columnindex') as string);
  const ySpan = +(source.getAttribute('colspan') || 1);

  return sizeMap.swap(xIdx, yIdx, xSpan, ySpan);
}

const TreeHeader: React.FunctionComponent<TreeHeaderProps> = (props: TreeHeaderProps) => {
  const { headers, onLayoutChange } = props;
  const { widths } = useContext(TableContext);

  const [headerTree, thProps] = useMemo(() => {
    const tree = HeaderTree.fromHeaders(headers);
    return [tree, tree.toThPropsByRows()];
  }, [headers]);
  const colCount = headerTree.width;
  const onReorder: ReorderCallback = useCallback((_e, cursor, source, target) => {
    if (!onLayoutChange || !source.id) { return; }

    const sourceCell = headerTree.find(source.id);

    if (!sourceCell) { return; }

    if (get(sourceCell.previousSibling, 'id') === target.id && canSwap(source.node, target.node, cursor, 'left')) {
      sourceCell.moveToPrevious();

      // it might be better to calculate column index from the HeaderTree object
      swapSizeMap(widths.transaction(), source.node, target.node);
    } else if (get(sourceCell.nextSibling, 'id') === target.id && canSwap(source.node, target.node, cursor, 'right')) {
      sourceCell.moveToNext();

      // it might be better to calculate column index from the HeaderTree object
      swapSizeMap(widths.transaction(), source.node, target.node);
    } else {
      return;
    }

    onLayoutChange(headerTree.toHeaderObject().children, widths);
  }, [headerTree, widths, onLayoutChange]);

  return (
    <>
      <ColGroup>
        { Array.from({ length: colCount }, (_x, i) => (<Col key={ i } { ...(props.columns[i] || {}) } />)) }
      </ColGroup>

      <Thead>
        {
          thProps.map((row, i) => {
            return (
              <Tr key={ i }>
                { row.map((cell) => (<Th key={ cell.id } { ...cell } reorderAxis='x' onReorder={ onReorder } />)) }
              </Tr>
            )
          })
        }
      </Thead>
    </>
  );
};

export default TreeHeader;