import React from 'react';
import { isFragment } from 'react-is';

import flattenDeep from 'lodash/flattenDeep';
import { ValueOrArray } from '../types';

export function flatten<T = Exclude<React.ReactNode, React.ReactFragment>>(children: ValueOrArray<T | React.ReactFragment>): Array<T> {
  return flattenDeep(
    React.Children.toArray(children).map((child) => {
      if (isFragment(child)) {
        return flatten(child.props.children);
      }

      return child as T;
    })
  );
}
