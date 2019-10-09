import React from 'react';
import { isFragment } from 'react-is';

import flattenDeep from 'lodash/flattenDeep';

export function flatten(children: React.ReactNode): Array<React.ReactNode> {
  return flattenDeep(
    React.Children.toArray(children).map((child) => {
      if (isFragment(child)) {
        return flatten(child.props.children);
      }

      return child;
    })
  );
}
