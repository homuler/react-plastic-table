import React from 'react';

import { TdProps } from '../types';

const Td: React.FunctionComponent<TdProps> = (props: TdProps) => {
  const { rowIndex, columnIndex, children, ...tdProps } = props;

  return (
    <td { ...tdProps }
      data-columnindex={ columnIndex }
      data-rowindex={ rowIndex }
    >
      { children }
    </td>
  );
};

Td.displayName = 'Td';

export default Td;
