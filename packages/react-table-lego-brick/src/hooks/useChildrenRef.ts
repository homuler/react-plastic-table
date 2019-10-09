import { useRef, useCallback } from 'react';

import { ChildrenRefCallback, ChildRef } from '../types';

export default function useChildrenRef<T>(callback: ChildrenRefCallback<T>): ChildRef<T> {
  const children = useRef<T[]>([]);

  const ref = useCallback((i, node) => {
    if (node === null) { return; }

    children.current[i] = node;

    callback(node, i, children.current);
  }, [callback]);

  return ref;
}
