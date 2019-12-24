import { HeaderObj } from '../../types';
import { ThProps } from 'react-table-lego-brick';

type Orientation = 'horizontal' | 'vertical';

export default class HeaderTree {
  id: string;
  width: number;
  depth: number;

  private name?: string;
  private format?: (id: string, name?: string) => React.ReactNode;
  private isDummy: boolean;
  private parent: HeaderTree | null;
  private index: number;
  private level: number;
  private children: Array<HeaderTree>;

  private _thPropsForColumn?: Array<ThProps[]>;
  private _thPropsForRow?: Array<ThProps[]>;
  private _leaves?: Array<HeaderTree>;

  constructor(header: HeaderObj, isDummy = true, parent: HeaderTree | null = null, index = 0, level = 0) {
    this.id = header.id;
    this.name = header.name;
    this.format = header.format;
    this.isDummy = isDummy;
    this.parent = parent;
    this.index = index;
    this.level = level;
    this.width = 0;
    this.depth = 1;

    this.children = (header.children || []).map((child, i) => {
      const childNode =  new HeaderTree(child, false, this, i, level + 1);

      this.width += childNode.width;
      this.depth = Math.max(this.depth, childNode.depth + 1);

      return childNode;
    });

    if (this.width === 0) {
      this.width = 1;
    }
  }

  static fromHeaders(headers: Array<HeaderObj>): HeaderTree {
    const rootHeader = {
      id: 'root',
      children: headers,
    };

    return new HeaderTree(rootHeader);
  }

  find(id: string): HeaderTree | undefined {
    if (id === this.id) {
      return this;
    }

    for (const child of this.children) {
      const result = child.find(id);

      if (result) { return result; }
    }

    return void 0;
  }

  get nextSibling(): HeaderTree | undefined {
    if (this.parent === null) { return void 0; }

    const siblings = this.parent.children;

    if (siblings.length <= this.index + 1) { return void 0; }

    return siblings[this.index + 1];
  }

  get previousSibling(): HeaderTree | undefined {
    if (this.parent === null || this.index === 0) { return void 0; }

    return this.parent.children[this.index - 1];
  }

  get leaves(): Array<HeaderTree> {
    if (this._leaves) { return this._leaves; }

    if (this.children.length === 0) {
      return this._leaves = [this];
    }

    return this._leaves = Array.prototype.concat.apply([], this.children.map(x => x.leaves));
  }

  swapChildren(xIndex: number, yIndex: number): void {
    const x = this.children[xIndex];
    const y = this.children[yIndex];

    if (!x || !y) { return; }

    this.children[xIndex] = y;
    this.children[yIndex] = x;
    x.index = yIndex;
    y.index = xIndex;

    this.clearCache();
  }

  moveToNext(): void {
    const nextSibling = this.nextSibling;

    if (!nextSibling) { return; }

    this.parent?.swapChildren(this.index, this.index + 1);
  }

  moveToPrevious(): void {
    const previousSibling = this.previousSibling;

    if (!previousSibling) { return; }

    this.parent?.swapChildren(this.index, this.index - 1);
  }

  toHeaderObject(): HeaderObj {
    return {
      id: this.id,
      name: this.name,
      children: this.children.map(x => x.toHeaderObject()),
    };
  }

  toThPropsForColumn(): Array<ThProps[]> {
    if (this._thPropsForColumn) { return this._thPropsForColumn; }

    const thPropsByRows = this.buildThPropsForColumn(Array.from({ length: this.depth }, () => []), this.depth);

    if (this.isDummy) {
      return this._thPropsForColumn = thPropsByRows.slice(1);
    }

    return this._thPropsForColumn = thPropsByRows;
  }

  toThPropsForRow(): Array<ThProps[]> {
    if (this._thPropsForRow) { return this._thPropsForRow; }

    const thPropsForRow = this.buildThPropsForRow(this.depth);

    if (this.isDummy) {
      thPropsForRow[0].shift();
      return this._thPropsForRow = thPropsForRow;
    }

    return this._thPropsForRow = thPropsForRow;
  }

  private toThProps(orientation: Orientation, span = 1): ThProps {
    return {
      id: `${this.id}`,
      children: this.format ? this.format(this.id, this.name) : this.name,
      colSpan: orientation === 'horizontal' ? this.width : span,
      rowSpan: orientation === 'vertical' ? this.width : span,
    };
  }

  private buildThPropsForColumn(thProps: Array<ThProps[]>, maxDepth: number): Array<ThProps[]> {
    let result = thProps;

    if (this.children.length === 0) {
      result[this.level].push(this.toThProps('horizontal', maxDepth - this.level));

      return result;
    }

    this.children.forEach((child) => {
      result = child.buildThPropsForColumn(result, maxDepth);
    });

    result[this.level].push(this.toThProps('horizontal'));

    return result;
  }

  private buildThPropsForRow(maxDepth: number): Array<ThProps[]> {
    if (this.children.length === 0) {
      return [[this.toThProps('vertical', maxDepth - this.level)]];
    }

    const result = this.children.reduce((acc: Array<ThProps[]>, child) => {
      return acc.concat(child.buildThPropsForRow(maxDepth));
    }, []);

    result[0].unshift(this.toThProps('vertical'));

    return result;
  }

  private clearCache(): void {
    this._thPropsForColumn = void 0;
    this._thPropsForRow = void 0;
    this._leaves = void 0;

    this.parent?.clearCache();
  }
}
