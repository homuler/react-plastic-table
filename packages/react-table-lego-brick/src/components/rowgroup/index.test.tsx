import React from 'react';

import assert from 'power-assert';
import { describe, Suite } from 'mocha';
import { RenderResult } from '@testing-library/react';
import { renderInThead, cleanup } from '../../utils/test';

import RowGroup from '.';
import Tr from '../tr';
import Th from '../th';

type Position = [number, number];
type Positions = Position[][];

function layoutContext(_contexts: TemplateStringsArray, layout: string[]): (fn: (this: Suite) => void) => Suite {
  return (fn: (this: Suite) => void): Suite => context(`\n      ${layout.join('\n      ')}`, fn);
}

describe('RowGroup', () => {
  function validatePositions(renderResult: RenderResult, positions: Positions): void {
    const { getAllByText } = renderResult;
    const trs = getAllByText((_content, element) => {
      return element.tagName.toLowerCase() === 'tr';
    }) as Array<HTMLTableRowElement>;

    assert.equal(trs.length, positions.length);

    trs.forEach((row, i) => {
      const cells = row.children;

      assert.equal(cells.length, positions[i].length);

      Array.prototype.forEach.call(cells, ((cell: HTMLTableCellElement, j) => {
        const position = positions[i][j];

        assert.equal(cell.getAttribute('data-rowindex'), `${position[0]}`);
        assert.equal(cell.getAttribute('data-columnindex'), `${position[1]}`);
      }));
    });
  }

  afterEach(() => { cleanup(); });

  context('when the children has a single row but no cells', () => {
    const rowGroup = (
      <RowGroup>
        <Tr></Tr>
      </RowGroup>
    );
    const results: Positions = [[]];

    it('renders a tr', () => {
      const renderResult = renderInThead(rowGroup);

      validatePositions(renderResult, results);
    });
  });

  context('when the layout is like:', () => {
    layoutContext`${['| X | Y | Z |']}`(() => {
      const rowGroup = (
        <RowGroup>
          <Tr>
            <Th>X</Th>
            <Th>Y</Th>
            <Th>Z</Th>
          </Tr>
        </RowGroup>
      );
      const results: Positions = [[[0, 0], [0, 1], [0, 2]]];

      it('renders cells with their rowIndex and cellIndex value', () => {
        const renderResult = renderInThead(rowGroup);

        validatePositions(renderResult, results);
      });
    });

    layoutContext`${[
      '| X |   Y   |',
      '|   | W | Z |',
    ]}`(() => {
      const rowGroup = (
        <RowGroup>
          <Tr>
            <Th rowSpan={ 2 }>X</Th>
            <Th colSpan={ 2 }>Y</Th>
          </Tr>
          <Tr>
            <Th>W</Th>
            <Th>Z</Th>
          </Tr>
        </RowGroup>
      );
      const results: Positions = [[[0, 0], [0, 1]], [[1, 1], [1, 2]]];

      it('renders cells with their rowIndex and cellIndex value', () => {
        const renderResult = renderInThead(rowGroup);

        validatePositions(renderResult, results);
      });
    });

    layoutContext`${[
      '|   |     Y     |     Z     |',
      '| X | V |   W   | O |   P   |',
      '|   | S | T | U |   | Q | R |',
    ]}`(() => {
      const rowGroup = (
        <RowGroup>
          <Tr>
            <Th rowSpan={ 3 } colSpan={ 2 }>X</Th>
            <Th colSpan={ 3 }>Y</Th>
            <Th colSpan={ 3 }>Z</Th>
          </Tr>
          <Tr>
            <Th>V</Th>
            <Th colSpan={ 2 }>W</Th>
            <Th rowSpan={ 2 }>O</Th>
            <Th colSpan={ 2 }>P</Th>
          </Tr>
          <Tr>
            <Th>S</Th>
            <Th>T</Th>
            <Th>U</Th>
            <Th>Q</Th>
            <Th>R</Th>
          </Tr>
        </RowGroup>
      );
      const results: Positions = [[[0, 0], [0, 2], [0, 5]], [[1, 2], [1, 3], [1, 5], [1, 6]], [[2, 2], [2, 3], [2, 4], [2, 6], [2, 7]]];

      it('renders cells with their rowIndex and cellIndex value', () => {
        const renderResult = renderInThead(rowGroup);

        validatePositions(renderResult, results);
      });
    });

    layoutContext`${[
      '|   |      b        | c |',
      '| a +---+-------+---+---+',
      '|   | d |       |   f   |',
      '+---+---+   e   +-------+',
      '|   g   |       |       |',
      '+-------+-------+       |',
      '|   i   | j |   |   h   |',
      '+-------+---+ k |       |',
      '|     l     |   |       |'
    ]}`(() => {
      const rowGroup = (
        <RowGroup>
          <Tr>
            <Th rowSpan={ 2 }>a</Th>
            <Th colSpan={ 4 }>b</Th>
            <Th>c</Th>
          </Tr>
          <Tr>
            <Th>d</Th>
            <Th rowSpan={ 2 } colSpan={ 2 }>e</Th>
            <Th colSpan={ 2 }>f</Th>
          </Tr>
          <Tr>
            <Th colSpan={ 2 }>g</Th>
            <Th rowSpan={ 3 } colSpan={ 2 }>h</Th>
          </Tr>
          <Tr>
            <Th colSpan={ 2 }>i</Th>
            <Th>j</Th>
            <Th rowSpan={ 2 }>k</Th>
          </Tr>
          <Tr>
            <Th colSpan={ 3 }>l</Th>
          </Tr>
        </RowGroup>
      );
      const results: Positions = [[[0, 0], [0, 1], [0, 5]], [[1, 1], [1, 2], [1, 4]], [[2, 0], [2, 4]], [[3, 0], [3, 2], [3, 3]], [[4, 0]]];

      it('renders cells with their rowIndex and cellIndex value', () => {
        const renderResult = renderInThead(rowGroup);

        validatePositions(renderResult, results);
      });
    });

    // collapsed
    layoutContext`${[
      '| X | Y | Z |',
      '|   | W | W | W | V |',
      '| T | T |       |    ',
    ]}`(() => {
      const rowGroup = (
        <RowGroup>
          <Tr>
            <Th rowSpan={ 2 }>X</Th>
            <Th>Y</Th>
            <Th rowSpan={ 2 }>Z</Th>
          </Tr>
          <Tr>
            <Th rowSpan={ 2 } colSpan={ 3 }>W</Th>
            <Th>V</Th>
          </Tr>
          <Tr>
            <Th colSpan={ 2 }>T</Th>
          </Tr>
        </RowGroup>
      );
      const results: Positions = [[[0, 0], [0, 1], [0, 2]], [[1, 1], [1, 4]], [[2, 0]]];

      it('renders cells with their rowIndex and cellIndex value', () => {
        const renderResult = renderInThead(rowGroup);

        validatePositions(renderResult, results);
      });
    });
  });
});
