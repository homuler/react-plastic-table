import React, { useMemo } from 'react';

import { TreeHeaderTableProps } from '../types';
import { flattenNode, Table, Tbody, RowGroup } from 'react-plastic-table-brick';
import HeaderTree from '../header/data/header-tree';
import TreeHeader from '../header/tree-header';

function TreeHeaderTable<T>(props: TreeHeaderTableProps<T>): React.ReactElement {
  const {
    className, style, columns, colProps, onLayoutChange,
    data, children,
  } = props;

  const columnTree = useMemo(() => (HeaderTree.fromHeaders(columns)), [columns]);

  let offset = columnTree.depth;

  return (
    <Table className={ className } style={ style }>
      <TreeHeader headerTree={ columnTree } colProps={ colProps } onLayoutChange={ onLayoutChange } />

      <Tbody>
        {
          data.map((row: T, i) => {
            const rows = children(row, columnTree, i);
            const length = flattenNode(rows).length;
            const rowGroup = <RowGroup key={ i } offset={ offset }>{ rows }</RowGroup>;

            offset += length;
            return rowGroup;
          })
        }
      </Tbody>
    </Table>
  );
};

TreeHeaderTable.displayName = 'TreeHeaderTable';

export default TreeHeaderTable;
