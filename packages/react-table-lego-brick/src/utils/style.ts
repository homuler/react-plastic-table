import React from 'react';

import isNumber from 'lodash/isString';
import round from 'lodash/round';

function divideSize(size?: number | string, divisor = 1): number | string | undefined {
  if (size === void 0) {
    return void 0;
  }

  if (divisor === 1) {
    return size;
  }

  if (isNumber(size)) {
    return round(+size / divisor, 6);
  }

  return `calc(${size} / ${divisor})`;
}

export function normalizeWidth(style: React.CSSProperties, span = 1): React.CSSProperties {
  return {
    ...style,
    width: divideSize(style.width, span),
    maxWidth: divideSize(style.maxWidth, span),
    minWidth: divideSize(style.minWidth, span),
  };
}
