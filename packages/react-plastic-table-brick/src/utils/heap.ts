type Comparator<T> = (x: T, y: T) => number;

/**
 * Max Heap
 */
export default class Heap<T> {
  queue: T[];
  private comparator?: Comparator<T>;

  constructor(comparator?: Comparator<T>) {
    this.queue = [];
    this.comparator = comparator;
  }

  push(item: T): void {
    this.queue.push(item);
    this.moveUp(this.size - 1);
  }

  pop(): T | undefined {
    if (this.size === 0) {
      return void 0;
    }

    const maxValue = this.peek();

    if (this.size === 1) {
      this.clear();
    } else {
      this.queue[0] = this.queue.pop() as T;
      this.moveDown(0);
    }

    return maxValue;
  }

  peek(): T | undefined {
    return this.queue[0];
  }

  get size(): number {
    return this.queue.length;
  }

  clear(): void {
    this.queue = [];
  }

  private compare(x: T, y: T): number {
    if (this.comparator) { return this.comparator(x, y); }

    if (x === y) { return 0; }

    return x > y ? 1 : -1;
  }

  private moveDown(index: number): void {
    const leftIndex = this.getLeftIndex(index);
    const rightIndex = this.getRightIndex(index);

    let largestIndex = index;

    if (leftIndex < this.size && this.compare(this.queue[leftIndex], this.queue[largestIndex]) > 0) {
      largestIndex = leftIndex;
    }

    if (rightIndex < this.size && this.compare(this.queue[rightIndex], this.queue[largestIndex]) > 0) {
      largestIndex = rightIndex;
    }

    if (largestIndex === index) { return; }

    this.swap(index, largestIndex);
    this.moveDown(largestIndex);
  }

  private moveUp(index: number): void {
    if (index === 0) { return; }

    const parentIndex = this.getParentIndex(index);

    if (this.compare(this.queue[parentIndex], this.queue[index]) < 0) {
      this.swap(parentIndex, index);
      this.moveUp(parentIndex);
    }
  }

  private swap(i: number, j: number): void {
    if (i >= this.size || j >= this.size) { return; }

    const x = this.queue[i];
    this.queue[i] = this.queue[j];
    this.queue[j] = x;
  }

  private getParentIndex(index: number): number {
    return (index - 1) >> 1;
  }

  private getLeftIndex(index: number): number {
    return index * 2 + 1;
  }

  private getRightIndex(index: number): number {
    return index * 2 + 2;
  }
}
