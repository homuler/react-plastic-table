import React from 'react';

import { TbodyProps } from '../types';

const Tbody: React.FunctionComponent<TbodyProps> = (props: TbodyProps) => {
  const { children, ...attrs } = props;

  return (<tbody { ...attrs }>{ children }</tbody>);
};

Tbody.displayName = 'Tbody';

export default Tbody;
