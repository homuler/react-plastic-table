import React from 'react';

import { TfootProps } from '../types';

const Tfoot: React.FunctionComponent<TfootProps> = (props: TfootProps) => {
  const { children, ...attrs } = props;

  return (<tfoot { ...attrs }>{ children }</tfoot>);
};

Tfoot.displayName = 'Tfoot';

export default Tfoot;
