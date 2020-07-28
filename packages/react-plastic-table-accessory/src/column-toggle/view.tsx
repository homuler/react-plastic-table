import React, { cloneElement } from 'react';
import styled from 'styled-components';

import cloneDeep from 'lodash/cloneDeep';
import set from 'lodash/set';

import { Checkbox, ColumnToggle } from '../types';

export const PopoverContainer = styled.div`
  position: absolute;
`;

const Indent = styled.div<{ indent: number }>`
  margin-left: ${(props): string => `${props.indent * 8}px` };
`;

function renderRow(
  renderer: ColumnToggle.ToggleRenderer,
  column: ColumnToggle.Column,
  path: string,
  columns: Array<ColumnToggle.Column>,
  onChange?: ColumnToggle.ToggleCallback,
): React.ReactElement {
  const handleChange: Checkbox.ChangeCallback = (e, checked) => {
    const nextColumn = { ...column, isVisible: checked };
    const nextColumns = cloneDeep(columns);
    set(nextColumns, path, nextColumn);

    if (onChange) {
      onChange(e, nextColumn, nextColumns);
    }
  };

  return cloneElement(renderer(column, handleChange), { key: column.id || path });
};

export const ColumnList: React.FunctionComponent<ColumnToggle.ColumnListProps> = (props: ColumnToggle.ColumnListProps) => {
  const { indent = 0, path = '', columns = [], onChange } = props;

  return (
    <>
      {
        columns.map((column, i) => {
          return (
            <>
              <Indent indent={ indent }>
                { renderRow(props.children, column, `${path}[${i}]`, columns, onChange) }
              </Indent>

              <ColumnList className={ props.className }
                indent={ indent + 1 }
                path={ `${path}[${i}].children` }
                columns={ column.children }
                onChange={ onChange }
              >
                { props.children }
              </ColumnList>
            </>
          );
        })
      }
    </>
  );
};
