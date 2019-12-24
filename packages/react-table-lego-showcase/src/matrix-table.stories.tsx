import React, { useCallback, useState } from 'react';
import { storiesOf } from '@storybook/react';

import { Td } from 'react-table-lego-brick';
import { MatrixTable, MatrixTableProps, HeaderObj } from 'react-table-lego-works';

type Props = Omit<MatrixTableProps, 'onLayoutChange'>;

const StatefulMatrixTable: React.FunctionComponent<Props> = (props: Props) => {
  const [columns, setColumns] = useState<Array<HeaderObj>>(props.columns);
  const [rows, setRows] = useState<Array<HeaderObj>>(props.rows);
  const onLayoutChange = useCallback((layout) => {
    if (layout.columns) { setColumns(layout.columns); }
    layout.widths?.commit();

    if (layout.rows) { setRows(layout.rows); }
    layout.heights?.commit();
  }, []);

  return (
    <MatrixTable { ...props } rows={ rows } columns={ columns } onLayoutChange={ onLayoutChange } />
  );
};

storiesOf('Table/MatrixTable', module)
  .add('Depth = 1', () => {
    const colProps = [
      { style: { width: 200 } },
      { style: { width: 200 } },
      { style: { width: 200 } },
    ];
    const columns = [
      { id: '0', name: '' },
      { id: 't', name: 'T' },
      { id: 'f', name: 'F' },
    ];
    const rows = [
      { id: 't', name: 'T' },
      { id: 'f', name: 'F' },
    ];
    const getContent = (columnId: string, rowId: string): string => {
      if (columnId !== rowId) {
        return 'F';
      }

      return columnId === 't' ? 'T' : 'F';
    };

    return (
      <StatefulMatrixTable colProps={ colProps } columns={ columns } rows={ rows }>
        {
          (columnId, rowId, props): React.ReactElement => {
            return <Td { ...props }>{ getContent(columnId, rowId) }</Td>;
          }
        }
      </StatefulMatrixTable>
    );
  });
