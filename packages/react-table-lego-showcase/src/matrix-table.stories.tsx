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
  .add('Truth Table', () => {
    const colProps = [
      { style: { width: 200 } },
      { style: { width: 200 } },
      { style: { width: 200 } },
    ];
    const columns = [
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
  })
  .add('Blood Types Compatibility', () => {
    const colProps = [
      { style: { width: 80 } },
      { style: { width: 80 } },
      { style: { width: 80 } },
      { style: { width: 80 } },
      { style: { width: 80 } },
      { style: { width: 80 } },
      { style: { width: 80 } },
      { style: { width: 80 } },
      { style: { width: 80 } },
      { style: { width: 80 } },
      { style: { width: 80 } },
    ];
    const columns = [
      {
        id: 'donor', name: 'Donor', children: [
          { id: 'o', name: 'O', children: [{ id: 'o-minus', name: 'O-' }, { id: 'o-plus', name: 'O+' }] },
          { id: 'a', name: 'A', children: [{ id: 'a-minus', name: 'A-' }, { id: 'a-plus', name: 'A+' }] },
          { id: 'b', name: 'B', children: [{ id: 'b-minus', name: 'B-' }, { id: 'b-plus', name: 'B+' }] },
          { id: 'ab', name: 'AB', children: [{ id: 'ab-minus', name: 'AB-' }, { id: 'ab-plus', name: 'AB+' }] },
        ],
      },
    ];
    const rows = [
      {
        id: 'recipient', name: 'Recipient', children: [
          { id: 'o', name: 'O', children: [{ id: 'o-minus', name: 'O-' }, { id: 'o-plus', name: 'O+' }] },
          { id: 'a', name: 'A', children: [{ id: 'a-minus', name: 'A-' }, { id: 'a-plus', name: 'A+' }] },
          { id: 'b', name: 'B', children: [{ id: 'b-minus', name: 'B-' }, { id: 'b-plus', name: 'B+' }] },
          { id: 'ab', name: 'AB', children: [{ id: 'ab-minus', name: 'AB-' }, { id: 'ab-plus', name: 'AB+' }] },
        ],
      },
    ];
    const getBloodType = (id: string): [number, number] => {
      const matched = id.match(/(\w+)-(plus|minus)/) as RegExpMatchArray;

      const group = matched[1] === 'o' ? 0 : matched[1] === 'ab' ? 2 : 1;
      const rh = matched[2] === 'minus' ? 0 : 1;
      return [group, rh];
    };
    const getContent = (columnId: string, rowId: string): React.ReactElement => {
      const donorType = getBloodType(columnId);
      const recipientType = getBloodType(rowId);
      const yes = <span style={ { color: 'green' } }>✔</span>;
      const no = <span style={ { color: 'red' } }>✗</span>;

      if (donorType[0] > recipientType[0]) { return no; }
      if (donorType[0] === 1 && recipientType[0] === 1) {
        if (columnId[0] != rowId[0]) { return no; } // A x B or B x A

        return donorType[1] > recipientType[1] ? no : yes;
      }
      return donorType[1] > recipientType[1] ? no : yes;
    };

    return (
      <StatefulMatrixTable colProps={ colProps } columns={ columns } rows={ rows } style={ { textAlign: 'center' } }>
        {
          (columnId, rowId, props): React.ReactElement => {
            return <Td { ...props }>{ getContent(columnId, rowId) }</Td>;
          }
        }
      </StatefulMatrixTable>
    );
  });
