import React from 'react';
import { DraggableCore } from 'react-draggable';

import { ThView, DraggingContent } from './cell/view';
import ResizeControl from './cell/resize-control';
import useResize from './cell/useResize';
import useReorder from './cell/useReorder';
import { ThProps } from '../types';

const Th: React.FunctionComponent<ThProps> = (props: ThProps) => {
  const {
    rowIndex, columnIndex,
    resizeAxis = 'both', onReorder, reorderAxis = 'none',
    children,
    ...thProps
  } = props;

  const resizeArgs = {
    columnIndex, colSpan: thProps.colSpan,
    rowIndex, rowSpan: thProps.rowSpan,
  };
  const { resizeColumn, resetColumn, resizeRow, resetRow } = useResize(resizeArgs);
  const { ref, isDragging, position , ...coreProps } = useReorder({ axis: reorderAxis, onReorder });
  const style: React.CSSProperties = { position: 'absolute', left: position.x, top: position.y };

  return (
    <DraggableCore { ...coreProps }>
      <ThView { ...thProps }
        isDragging={ isDragging }
        data-columnindex={ columnIndex }
        data-rowindex={ rowIndex }
      >
        { children }
        <DraggingContent ref={ ref } style={ style }>{ children }</DraggingContent>

        {
          (resizeAxis === 'both' || resizeAxis === 'x') &&
            <ResizeControl axis='x' onResize={ resizeColumn } onReset={ resetColumn } />
        }
        {
          (resizeAxis === 'both' || resizeAxis === 'y') &&
            <ResizeControl axis='y' onResize={ resizeRow } onReset={ resetRow } />
        }
      </ThView>
    </DraggableCore>
  );
};

Th.displayName = 'Th';

export default Th;
