export type ValueOrArray<T> = T | RecursiveArray<T>;

/* eslint-disable @typescript-eslint/no-empty-interface */
export interface RecursiveArray<T> extends Array<ValueOrArray<T>> {}
/* eslint-enable @typescript-eslint/no-empty-interface */
