import React from 'react';

import assert from 'power-assert';
import { describe } from 'mocha';
import { RenderResult } from '@testing-library/react';
import { renderInTable } from '../utils/test';

import Thead from './thead';
import Tr from './tr';
import Th from './th';

type Position = [number, number];
type Positions = Position[][];

describe('Thead', () => {
  function validatePositions(renderResult: RenderResult, positions: Positions): void {
    const { getAllByText } = renderResult;
    const trs = getAllByText((_content, element) => {
      return element.tagName.toLowerCase() === 'tr';
    }) as Array<HTMLTableRowElement>;

    assert.equal(trs.length, positions.length);

    trs.forEach((row, i) => {
      const cells = row.children;

      assert.equal(cells.length, positions[i].length);

      Array.prototype.forEach.call(cells, (cell: HTMLTableCellElement, j) => {
        const position = positions[i][j];

        assert.equal(cell.getAttribute('data-rowindex'), `${position[0]}`);
        assert.equal(cell.getAttribute('data-columnindex'), `${position[1]}`);
      });
    });
  }

  afterEach(() => {
    Array.prototype.forEach.call(
      document.body.children,
      (child) => { document.body.removeChild(child); },
    );
  });

  it('renders header cells with their rowIndex and columnIndex', () => {
    const renderResult = renderInTable(
      <Thead>
        <Tr>
          <Th rowSpan={ 2 }>X</Th>
          <Th colSpan={ 2 }>Y</Th>
        </Tr>
        <Tr>
          <Th>Z</Th>
          <Th>W</Th>
        </Tr>
      </Thead>
    );
    const results: Positions = [[[0, 0], [0, 1]], [[1, 1], [1, 2]]];

    validatePositions(renderResult, results);
  });
});
