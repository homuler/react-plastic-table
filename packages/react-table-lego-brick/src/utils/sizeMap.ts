import React from 'react';
import isNil from 'lodash/isNil';

import { ResizeData } from '../types';

type Store = Map<number, number>;
type SetStoreAction = React.Dispatch<React.SetStateAction<Store>>;

export default class SizeMap {
  private _data: Store;
  private _background: Store | null;
  private isChanged: boolean;
  private isInTransaction: boolean;

  constructor(data: Store, private updateData: SetStoreAction) {
    this._data = data;
    this._background = null;
    this.isChanged = false;
    this.isInTransaction = false;
  }

  get store(): Map<number, number> {
    return this._background || this._data;
  }

  get size(): number {
    return this.store.size;
  }

  transaction(): SizeMap {
    this.isInTransaction = true;

    return this;
  }

  get(index: number): number | undefined {
    return this.store.get(index);
  }

  set(index: number, value: number | undefined): SizeMap {
    this._set(index, value);
    this.onChange();

    return this;
  }

  resize(index: number, data: ResizeData, span = 1): SizeMap {
    const covered = this.slice(index, index + span);
    const [currentTotal, emptyCount] = covered.reduce(([size, count]: [number, number], x) => {
      return [size + (x || 0), count + (isNil(x) ? 1 : 0)];
    }, [0, 0]);

    for (let i = covered.length - 1; i >= 0; i--) {
      const nextSize = this.calcNextSize(data, covered[i], currentTotal, span, emptyCount);
      this._set(index + i, nextSize);
    }

    this.onChange();

    return this;
  }

  swap(xIdx: number, yIdx: number, xSpan = 1, ySpan = 1): SizeMap {
    const [leftIdx, leftSpan] = xIdx < yIdx ? [xIdx, xSpan] : [yIdx, ySpan];
    const [rightIdx, rightSpan] = xIdx < yIdx ? [yIdx, ySpan] : [xIdx, xSpan];

    if (leftIdx + leftSpan > rightIdx) {
      // ranges to be swapped are overlapping.
      return this;
    }

    const left = this.slice(rightIdx, rightIdx + rightSpan);
    const middle = this.slice(leftIdx + leftSpan, rightIdx);
    const right = this.slice(leftIdx, leftIdx + leftSpan);

    left.forEach((x, i) => { this._set(leftIdx + i, x); });
    middle.forEach((x, i) => { this._set(leftIdx + left.length + i, x); });
    right.forEach((x, i) => { this._set(leftIdx + left.length + middle.length + i, x); });

    this.onChange();

    return this;
  }

  delete(index: number, span = 1): SizeMap {
    this._delete(index, span);
    this.onChange();

    return this;
  }

  clear(): SizeMap {
    this.background.clear();
    this.onChange();

    return this;
  }

  commit(): void {
    if (this.isChanged) {
      this.updateData(this.background);
      this._data = this.background;
    }

    this._background = null;
    this.isChanged = false;
    this.isInTransaction = false;
  }

  slice(from: number, to: number): (number | undefined)[] {
    return Array.from({ length: to - from }, (_x, i) => (this.get(from + i)));
  }

  private get background(): Store {
    if (!this._background) {
      this._background = new Map(this._data);
    }

    return this._background;
  }

  private _set(index: number, value: number | undefined): void {
    if (value === void 0) {
      this.background.delete(index);
    } else {
      this.background.set(index, value);
    }
  }

  private _delete(index: number , span = 1): void {
    for (let i = index; i < index + span; i++) {
      this.background.delete(i);
    }
  }

  private calcNextSize(data: ResizeData, savedSize: number | undefined, currentTotal: number, count: number, emptyCount: number): number {
    if (data.last === 0) {
      // if the last size equals 0, then all the consecutive values must be 0, so assigns size value evenly.
      return data.size / count;
    }

    const unfixedTotal = data.last - currentTotal;
    const currentSize = savedSize === void 0 ? (unfixedTotal / emptyCount) : (savedSize as number);

    // resize proportionally
    return Math.max(0, currentSize + (data.delta * currentSize / data.last));
  }

  private onChange(): void {
    this.isChanged = true;

    if (!this.isInTransaction) {
      this.commit();
    }
  }
}
