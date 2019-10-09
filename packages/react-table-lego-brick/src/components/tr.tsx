import React, { useContext } from 'react';

import isNil from 'lodash/isNil';

import TableContext from '../contexts/tableContext';
import { TrProps } from '../types';

const Tr = React.forwardRef<HTMLTableRowElement, TrProps>((props: TrProps, ref) => {
  const { rowIndex, children, ...trProps } = props;
  const { heights } = useContext(TableContext);
  const height = isNil(rowIndex) ? void 0 : heights.get(rowIndex);
  const style = isNil(height) ? props.style : { ...(props.style || {}), height };

  return (
    <tr ref={ ref } { ...trProps } style={ style }>
      { children }
    </tr>
  );
});

Tr.displayName = 'Tr';

export default Tr;
