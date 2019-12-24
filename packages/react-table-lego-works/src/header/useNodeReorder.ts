import { useCallback } from 'react';
import HeaderTree from './data/header-tree';
import { SizeMap, ReorderCallback } from 'react-table-lego-brick';
import { LayoutChangeCallback, TableLayout } from '../types';

type TreeType = 'column' | 'row';
type Direction = 'previous' | 'next';

function canSwap(source: HTMLElement, target: HTMLElement, cursorPosition: number, direction: Direction): boolean {
  const sourceRect = source.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();

  const nextTargetRange = direction === 'previous' ? [
    targetRect.left + sourceRect.width, targetRect.right + sourceRect.width
  ] : [
    targetRect.left - sourceRect.width, targetRect.right - sourceRect.width
  ];

  return (cursorPosition - nextTargetRange[0]) * (cursorPosition - nextTargetRange[1]) > 0;
}

function swapSizeMap(treeType: TreeType, sizeMap: SizeMap, source: HTMLElement, target: HTMLElement): SizeMap {
  const [indexAttr, spanAttr] = treeType === 'column' ? ['data-columnindex', 'colspan'] : ['data-rowindex', 'rowspan'];
  const xIdx = +(source.getAttribute(indexAttr) as string);
  const xSpan = +(source.getAttribute(spanAttr) || 1);
  const yIdx = +(target.getAttribute(indexAttr) as string);
  const ySpan = +(source.getAttribute(spanAttr) || 1);

  return sizeMap.swap(xIdx, yIdx, xSpan, ySpan);
}

function buildLayout(treeType: TreeType, headerTree: HeaderTree, sizeMap: SizeMap): TableLayout {
  const [headerKey, sizeKey] = treeType === 'column' ? ['columns', 'widths'] : ['rows', 'heights'];

  return { [headerKey]: headerTree.toHeaderObject().children, [sizeKey]: sizeMap };
}

export default function useNodeReorder(treeType: TreeType, headerTree: HeaderTree, sizeMap: SizeMap, onLayoutChange?: LayoutChangeCallback): ReorderCallback {
  return useCallback((_e, cursor, source, target) => {
    if (!source.id) { return; }

    const sourceCell = headerTree.find(source.id);

    if (!sourceCell) { return; }

    const position = treeType === 'column' ? cursor.x : cursor.y;

    if (sourceCell.previousSibling?.id === target.id && canSwap(source.node, target.node, position, 'previous')) {
      sourceCell.moveToPrevious();

      // TODO: it might be better to calculate column index from the HeaderTree object
      swapSizeMap(treeType, sizeMap.transaction(), source.node, target.node);
    } else if (sourceCell.nextSibling?.id === target.id && canSwap(source.node, target.node, position, 'next')) {
      sourceCell.moveToNext();

      // TODO: it might be better to calculate column index from the HeaderTree object
      swapSizeMap(treeType, sizeMap.transaction(), source.node, target.node);
    } else {
      return;
    }

    if (onLayoutChange) {
      onLayoutChange(buildLayout(treeType, headerTree, sizeMap));
    } else {
      sizeMap.commit();
    }
  }, [treeType, headerTree, sizeMap, onLayoutChange]);
};
