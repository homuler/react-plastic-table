import React from 'react';

import { CaptionProps } from '../types';

const Caption: React.FunctionComponent<CaptionProps> = (props: CaptionProps) => {
  const { children, ...attrs } = props;

  return (<caption { ...attrs }>{ children }</caption>);
};

Caption.displayName = 'Caption';

export default Caption;
