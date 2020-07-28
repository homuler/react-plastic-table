import React from 'react';

import { ColProps } from '../types';

const Col: React.FunctionComponent<ColProps> = (props: ColProps) => {
  return (<col { ...props } />);
};

Col.displayName = 'Col';

export default Col;
