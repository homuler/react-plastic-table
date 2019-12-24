import React, { useMemo, useContext } from 'react';

import { MatrixTableProps } from '../types';
import { Table, Tbody, Tr, Th, RowGroup, TableContext, ThProps } from 'react-table-lego-brick';
import TreeHeader from '../header/tree-header';
import HeaderTree from '../header/data/header-tree';
import useNodeReorder from '../header/useNodeReorder';

const MatrixTable: React.FunctionComponent<MatrixTableProps> = (props: MatrixTableProps) => {
  const { className, columns, rows, colProps = [], onLayoutChange } = props;
  const { heights } = useContext(TableContext);

  const columnTree = useMemo(() => (HeaderTree.fromHeaders(columns)), [columns]);
  const rowTree = useMemo(() => (HeaderTree.fromHeaders(rows)), [rows]);
  const thPropsForRow = rowTree.toThPropsForRow();
  const onRowReorder = useNodeReorder('row', rowTree, heights, onLayoutChange);

  return (
    <Table className={ className }>
      <TreeHeader headerTree={ columnTree } colProps={ colProps } onLayoutChange={ onLayoutChange } />

      <Tbody>
        {
          thPropsForRow.map((propsInRow: ThProps[], i) => {
            const rowLeaf = rowTree.leaves[i];

            return (
              <RowGroup key={ rowLeaf.id } offset={ columnTree.depth + i }>
                <Tr>
                  { propsInRow.map((thProps) => (<Th key={ thProps.id } { ...thProps } reorderAxis='y' onReorder={ onRowReorder } />)) }
                  { columnTree.leaves.slice(rowTree.depth - 1).map((column) => (props.children(column.id, rowLeaf.id, { key: `${column.id}/${rowLeaf.id}` }))) }
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
