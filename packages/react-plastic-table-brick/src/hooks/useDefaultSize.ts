import { useCallback, useState } from 'react';

import { DefaultSizeState, DefaultSizeReturnType } from '../types';

export default function useDefaultSize(): DefaultSizeReturnType {
  const [defaultHeight, setDefaultHeight] = useState<DefaultSizeState>();
  const [defaultWidth, setDefaultWidth] = useState<DefaultSizeState>();

  const ref = useCallback((node) => {
    if (node !== null) {
      const rect = node.getBoundingClientRect();

      setDefaultHeight(rect.height);
      setDefaultWidth(rect.width);
    }
  }, [setDefaultHeight, setDefaultWidth]);

  return [[defaultWidth, defaultHeight], ref];
}
