import { useCallback } from 'react';

import { DraggableEventHandler } from 'react-draggable';
import { ReorderArgs, ReorderingHeader, DraggableHookReturnType } from '../../types';
import { normalizeClient } from '../../utils/event';
import useDraggable from '../../hooks/draggable';

function buildReorderingHeader(node: HTMLElement): ReorderingHeader {
  const id = node.getAttribute('id');
  const columnIndex = node.getAttribute('data-columnindex');
  const rowIndex = node.getAttribute('data-rowindex');

  return {
    id,
    columnIndex: columnIndex ? +columnIndex : null,
    rowIndex: rowIndex ? +rowIndex : null,
    node,
  };
}

function isOutOfRange(min: number, max: number, value: number): boolean {
  return value < min || value > max;
}

export default function useReorder(args: ReorderArgs): DraggableHookReturnType {
  const { axis, onReorder } = args;

  const reorderCell: DraggableEventHandler = useCallback((e, data) => {
    if (!onReorder || axis === 'none') { return; }

    const sourceNode = data.node;
    const { x: cursorX, y: cursorY } = normalizeClient(e);
    const { x, y, height, width } = data.node.getBoundingClientRect();

    if (cursorX === null || cursorY === null) { return; }

    // calculate virtual cursor position.
    const virtualX = axis === 'x' || axis === 'both' || !isOutOfRange(x, x + width, cursorX) ? cursorX : x + width / 2;
    const virtualY = axis === 'y' || axis === 'both' || !isOutOfRange(y, y + height, cursorY) ? cursorY : y + height / 2;

    // Table header cell at the cursor position.
    const targetNode = Array.prototype.find.call(
      document.elementsFromPoint(virtualX, virtualY),
      (element: HTMLElement) => {
        if (element.tagName.toLowerCase() !== 'th') { return false; }

        return element !== sourceNode;
      },
    ) as HTMLElement | undefined;

    if (targetNode === void 0) { return; }

    const source = buildReorderingHeader(sourceNode);
    const target = buildReorderingHeader(targetNode);

    onReorder(e, { x: cursorX, y: cursorY }, source, target);
  }, [axis, onReorder]);
  const props = useDraggable({ axis, onDrag: reorderCell });

  return props;
}
