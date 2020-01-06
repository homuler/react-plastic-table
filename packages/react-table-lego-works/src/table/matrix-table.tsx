import React, { useMemo, useContext } from 'react';

import { MatrixTableProps } from '../types';
import { ColGroup, Col, Table, Thead, Tbody, Tr, Th, RowGroup, TableContext, ThProps } from 'react-table-lego-brick';
import { DiagonalSplitTh } from 'react-table-lego-accessory';
import HeaderTree from '../header/data/header-tree';
import useNodeReorder from '../header/useNodeReorder';

const MatrixTable: React.FunctionComponent<MatrixTableProps> = (props: MatrixTableProps) => {
  const {
    className, style, columnLabel, rowLabel,
    columns, rows, colProps = [], onLayoutChange,
  } = props;
  const { widths, heights } = useContext(TableContext);

  const columnTree = useMemo(() => (HeaderTree.fromHeaders(columns)), [columns]);
  const rowTree = useMemo(() => (HeaderTree.fromHeaders(rows)), [rows]);
  const colCount = columnTree.width + rowTree.depth - 1;
  const thPropsForColumn = columnTree.toThPropsForColumn();
  const thPropsForRow = rowTree.toThPropsForRow();
  const onColumnReorder = useNodeReorder('column', columnTree, widths, onLayoutChange);
  const onRowReorder = useNodeReorder('row', rowTree, heights, onLayoutChange);

  return (
    <Table className={ className } style={ style }>
      <ColGroup>
        { Array.from({ length: colCount }, (_x, i) => (<Col key={ i } { ...(colProps[i] || {}) } />)) }
      </ColGroup>

      <Thead>
        {
          thPropsForColumn.map((propsInRow, i) => {
            return (
              <Tr key={ i }>
                {
                  i === 0 && (
                    <DiagonalSplitTh className='left-top-cell'
                      resizeAxis='none'
                      reorderAxis='none'
                      left={ rowLabel }
                      right={ columnLabel }
                      colSpan={ rowTree.depth - 1 }
                      rowSpan={ columnTree.depth - 1 }
                    />
                  )
                }
                { propsInRow.map((cell) => (<Th key={ cell.id } { ...cell } reorderAxis='x' onReorder={ onColumnReorder } />)) }
              </Tr>
            )
          })
        }
      </Thead>

      <Tbody>
        {
          thPropsForRow.map((propsInRow: ThProps[], i) => {
            const rowLeaf = rowTree.leaves[i];

            return (
              <RowGroup key={ rowLeaf.id } offset={ columnTree.depth + i }>
                <Tr>
                  { propsInRow.map((thProps) => (<Th key={ thProps.id } { ...thProps } reorderAxis='y' onReorder={ onRowReorder } />)) }
                  { columnTree.leaves.map((column) => (props.children(column.id, rowLeaf.id, { key: `${column.id}/${rowLeaf.id}` }))) }
                </Tr>
              </RowGroup>
            );
          })
        }
      </Tbody>
    </Table>
  );
};

MatrixTable.displayName = 'MatrixTable';

export default MatrixTable;
