import React, { useState, useCallback } from 'react';
import { storiesOf } from '@storybook/react';

import { Tr, Td, ColProps, TdElement } from 'react-table-lego-brick';
import { TreeHeaderTable, HeaderObj, HeaderTree } from 'react-table-lego-works';

interface Props<T> {
  colProps: Array<ColProps | null>;
  columns: Array<HeaderObj>;
  data: Array<T>;
  children: (row: T, column: HeaderTree, index: number) => TdElement;
}

function StatefulTreeHeaderTable<T>(props: Props<T>): React.ReactElement {
  const [columns, setColumns] = useState<Array<HeaderObj>>(props.columns);
  const onLayoutChange = useCallback((layout) => {
    if (layout.columns) { setColumns(layout.columns); }

    layout.widths?.commit();
    layout.heights?.commit();
  }, []);

  return (
    <TreeHeaderTable { ...props } columns={ columns } onLayoutChange={ onLayoutChange }>
      {
        (row, headerTree, i): TdElement => {
          const headers = headerTree.leaves;

          return (<Tr>{ headers.map((header) => props.children(row, header, i))}</Tr>);
        }
      }
    </TreeHeaderTable>
  );
};

storiesOf('Table/TreeHeaderTable', module)
  .add('Depth = 1', () => {
    const colProps = [
      { style: { width: 100 } },
      null,
      { style: { width: 200 } },
    ];
    const columns = [
      { id: 'x', name: 'X' },
      { id: 'y', name: 'Y' },
      { id: 'z', name: 'Z' },
    ];
    const data: { [key: string]: string }[] = [
      { x: 'x1', y: 'y1', z: 'z1' },
      { x: 'x2', y: 'y2', z: 'z2' },
      { x: 'x3', y: 'y3', z: 'z3' },
    ];

    return (
      <StatefulTreeHeaderTable colProps={ colProps } columns={ columns } data={ data }>
        { (row, header): TdElement => (<Td key={ header.id }>{ row[header.id] }</Td>)}
      </StatefulTreeHeaderTable>
    );
  });
