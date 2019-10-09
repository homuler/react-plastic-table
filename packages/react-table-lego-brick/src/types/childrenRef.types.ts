export type ChildrenRefCallback<T> = (node: T, index: number, children: T[]) => void;
export type ChildRef<T> = (index: number, node: T) => void;
