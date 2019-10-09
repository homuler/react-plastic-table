import React from 'react';

import RowGroup from './rowgroup';
import { TheadProps } from '../types';

const Thead: React.FunctionComponent<TheadProps> = (props: TheadProps) => {
  return (
    <thead>
      <RowGroup>
        { props.children }
      </RowGroup>
    </thead>
  );
};

Thead.displayName = 'Thead';

export default Thead;
