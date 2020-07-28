
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
type Props = { [key: string]: any };

export function isPositive(props: Props, propName: string, componentName: string): Error | null {
  const value = props[propName];

  if (typeof value !== 'number') {
    return new Error(`Invalid type of \`${propName}\` supplied to \`${componentName}\`. Validation failed.`);
  }

  if (value < 0) {
    return new Error(`\`${propName}\` of \`${componentName}\` must be positive, but is ${value}`);
  }

  return null;
}

export function isNullOrPositive(props: Props, propName: string, componentName: string): Error | null {
  const value = props[propName];

  if (value === null || value === void 0) { return null; }

  return isPositive(props, propName, componentName);
}
