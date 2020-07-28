import React from 'react';

import assert from 'power-assert';
import { describe } from 'mocha';
import { render, fireEvent, queryAllByText, Matcher, MatcherFunction, RenderResult } from '@testing-library/react';

import ColGroup from './colgroup';
import Col from './col';
import Table from './table';
import Thead from './thead';
import Tr from './tr';
import Th from './th';

describe('Table', () => {
  const matchTag = (tagName: string, matcher?: MatcherFunction): Matcher => {
    return (content, element): boolean => {
      if (matcher && !matcher(content, element)) { return false; }

      return element.tagName.toLowerCase() === tagName;
    };
  };

  const matchResizeControl: Matcher = (_content, element): boolean => {
    return element.tagName.toLowerCase() === 'div' && element.children.length > 0;
  };

  function validateColumnWidths(renderResult: RenderResult, results: string[]): void {
    renderResult.queryAllByText(matchTag('col')).forEach((col, i) => {
      assert.equal(col.style.width, results[i]);
    });
  }

  function validateRowHeights(renderResult: RenderResult, results: string[]): void {
    renderResult.queryAllByText(matchTag('tr')).forEach((col, i) => {
      assert.equal(col.style.height, results[i]);
    });
  }

  context('when ColGroup and Thead are rendered', () => {
    context('and all the column widths can be calculated', () => {
      const table = (
        <Table>
          <ColGroup>
            <Col span={ 3 }/>
          </ColGroup>
          <Thead>
            <Tr>
              <Th colSpan={ 2 } style={ { width: 100 } }>X</Th>
              <Th rowSpan={ 2 } style={ { width: 100 } }>Y</Th>
            </Tr>
            <Tr>
              <Th style={ { width: 30 } }>X1</Th>
              <Th style={ { width: 70 } }>X2</Th>
            </Tr>
          </Thead>
        </Table>
      );
      const results = ['30px', '70px', '100px'];

      it('sets width to each col', async () => {
        const { findAllByText } = render(table);
        const cols = await findAllByText(matchTag('col')) as Array<HTMLTableColElement>;

        assert.equal(cols.length, results.length);

        cols.forEach((col, i) => {
          assert.equal(col.style.width, results[i]);
        });
      });

      context('and a table-header-width-resizer is dragged', () => {
        it('updates the width of header cells', async () => {
          const renderResult = render(table);
          const headerX = await renderResult.findByText(matchTag('th', (content) => (content === 'X'))) as HTMLElement;
          assert.notEqual(headerX, null);

          const resizeControls = queryAllByText(headerX, matchResizeControl);
          assert.equal(resizeControls.length, 2);
          const resizer = resizeControls[0];

          /** drag start */
          fireEvent.mouseDown(resizer, { clientX: 100, clientY: 10 });

          /** dragging */
          fireEvent.mouseMove(resizer, { clientX: 120, clientY: 20 });
          validateColumnWidths(renderResult, ['36px', '84px', '100px']);
          validateRowHeights(renderResult, ['', '']);

          fireEvent.mouseMove(resizer, { clientX: 80, clientY: 30 });
          validateColumnWidths(renderResult, ['24px', '56px', '100px']);
          validateRowHeights(renderResult, ['', '']);

          /** drag end */
          // TODO: test column widths
          fireEvent.mouseUp(resizer, { clientX: 80, clientY: 30 });
        });

        context('to the left edge of the cell', () => {
          it('updates the width of header cells', async () => {
            const renderResult = render(table);
            const headerY = await renderResult.findByText(matchTag('th', (content) => (content === 'Y'))) as HTMLElement;
            assert.notEqual(headerY, null);

            const resizeControls = queryAllByText(headerY, matchResizeControl);
            assert.equal(resizeControls.length, 2);
            const resizer = resizeControls[0];

            /** drag start */
            fireEvent.mouseDown(resizer, { clientX: 100, clientY: 10 });

            /** dragging */
            fireEvent.mouseMove(resizer, { clientX: -50, clientY: 10 });
            validateColumnWidths(renderResult, ['30px', '70px', '0px']);
            validateRowHeights(renderResult, ['', '']);

            /** drag end */
            // TODO: test column widths
            fireEvent.mouseUp(resizer, { clientX: 80, clientY: 10 });
          });
        });
      });

      context('and a table-header-height-resizer is dragged', () => {
        it('updates the height of header cells', async () => {
          const renderResult = render(table);
          const headerY = await renderResult.findByText(matchTag('th', (content) => (content === 'Y'))) as HTMLElement;
          assert.notEqual(headerY, null);

          const resizeControls = queryAllByText(headerY, matchResizeControl);
          assert.equal(resizeControls.length, 2);
          const resizer = resizeControls[1];

          /** drag start */
          fireEvent.mouseDown(resizer, { clientX: 100, clientY: 10 });

          /** dragging */
          fireEvent.mouseMove(resizer, { clientX: 120, clientY: 20 });
          validateColumnWidths(renderResult, ['30px', '70px', '100px']);
          validateRowHeights(renderResult, ['10px', '10px']);

          fireEvent.mouseMove(resizer, { clientX: 80, clientY: 4 });
          validateColumnWidths(renderResult, ['30px', '70px', '100px']);
          validateRowHeights(renderResult, ['2px', '2px']);

          /** drag end */
          // TODO: test column heights
          fireEvent.mouseUp(resizer, { clientX: 80, clientY: 5 });
        });

        context('to the bottom edge of the cell', () => {
          it('updates the height of header cells', async () => {
            const renderResult = render(table);
            const headerX = await renderResult.findByText(matchTag('th', (content) => (content === 'X'))) as HTMLElement;
            assert.notEqual(headerX, null);

            const resizeControls = queryAllByText(headerX, matchResizeControl);
            assert.equal(resizeControls.length, 2);
            const resizer = resizeControls[1];

            /** drag start */
            fireEvent.mouseDown(resizer, { clientX: 100, clientY: 10 });

            /** dragging */
            fireEvent.mouseMove(resizer, { clientX: 100, clientY: -10 });
            validateColumnWidths(renderResult, ['30px', '70px', '100px']);
            validateRowHeights(renderResult, ['0px', '']);

            /** drag end */
            // TODO: test column widths
            fireEvent.mouseUp(resizer, { clientX: 80, clientY: 10 });
          });
        });
      });
    });

    context('and widths of some columns are not known', () => {
      const table = (
        <Table>
          <ColGroup>
            <Col span={ 3 }/>
          </ColGroup>
          <Thead>
            <Tr>
              <Th colSpan={ 2 } style={ { width: 100 } }>X</Th>
              <Th colSpan={ 1 }>Y</Th>
            </Tr>
          </Thead>
        </Table>
      );
      // In browser, the third value may not be '0px'
      const results = ['50px', '50px', '0px'];

      it('sets width to each col', async () => {
        const { findAllByText } = render(table);
        const cols = await findAllByText(matchTag('col')) as Array<HTMLTableColElement>;

        assert.equal(cols.length, results.length);

        cols.forEach((col, i) => {
          assert.equal(col.style.width, results[i]);
        });
      });
    });
  });
});
