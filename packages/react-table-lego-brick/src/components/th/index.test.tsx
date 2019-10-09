import React from 'react';

import assert from 'power-assert';
import { describe } from 'mocha';
import { Matcher } from '@testing-library/react';
import { renderInThead } from '../../utils/test';

import Th from '../th';
import { ThProps } from '../../types';

describe('Th', () => {
  function validateProps(thElement: HTMLTableHeaderCellElement, props: ThProps): void {
    if (props.columnIndex) {
      assert.equal(thElement.getAttribute('data-columnindex'), `${props.columnIndex}`);
    }

    if (props.rowIndex) {
      assert.equal(thElement.getAttribute('data-rowindex'), `${props.rowIndex}`);
    }

    assert.equal(thElement.getAttribute('colspan'), props.colSpan);
    assert.equal(thElement.getAttribute('rowspan'), props.rowSpan);
    assert.equal(thElement.getAttribute('scope'), props.scope);

    const className = thElement.getAttribute('class');

    if (className && props.className) {
      assert(className.includes(props.className));
    }
  }

  const matchTh: Matcher = (_content, element): boolean => {
    return element.tagName.toLowerCase() === 'th';
  };

  const matchResizeControl: Matcher = (_content, element): boolean => {
    return element.tagName.toLowerCase() === 'div' && element.children.length > 0;
  };

  afterEach(() => {
    Array.prototype.forEach.call(
      document.body.children,
      (child) => { document.body.removeChild(child); },
    );
  });

  context('when resizeAxis is not specified', () => {
    const props: ThProps = { colSpan: 2, rowSpan: 3 };

    it('renders 2 ResizeControls', () => {
      const { queryByText, queryAllByText } = renderInThead(<tr><Th { ...props }>X</Th></tr>);

      const thElement = queryByText(matchTh);

      assert.notEqual(thElement, null);
      validateProps(thElement as HTMLTableHeaderCellElement, props);

      const resizeControls = queryAllByText(matchResizeControl);
      assert.equal(resizeControls.length, 2);
    });
  });

  context("when resizeAxis is 'both'", () => {
    const props: ThProps = { columnIndex: 1, rowIndex: 2, resizeAxis: 'both' };

    it('renders 2 ResizeControls', () => {
      const { queryByText, queryAllByText } = renderInThead(<tr><Th { ...props }>X</Th></tr>);

      const thElement = queryByText(matchTh);

      assert.notEqual(thElement, null);
      validateProps(thElement as HTMLTableHeaderCellElement, props);

      const resizeControls = queryAllByText(matchResizeControl);
      assert.equal(resizeControls.length, 2);
    });
  });

  context("when resizeAxis is 'x'", () => {
    const props: ThProps = { className: 'test', scope: 'row', resizeAxis: 'x' };

    it('renders a ResizeControlX', () => {
      const { queryByText, queryAllByText } = renderInThead(<tr><Th { ...props }>X</Th></tr>);

      const thElement = queryByText(matchTh);

      assert.notEqual(thElement, null);
      validateProps(thElement as HTMLTableHeaderCellElement, props);

      const resizeControls = queryAllByText(matchResizeControl);
      assert.equal(resizeControls.length, 1);
      assert.equal(getComputedStyle(resizeControls[0]).cursor, 'col-resize');
    });
  });

  context("when resizeAxis is 'y'", () => {
    const props: ThProps = { resizeAxis: 'y' };

    it('renders a ResizeControlY', () => {
      const { queryByText, queryAllByText } = renderInThead(<tr><Th { ...props }>X</Th></tr>);

      const thElement = queryByText(matchTh);

      assert.notEqual(thElement, null);
      validateProps(thElement as HTMLTableHeaderCellElement, props);

      const resizeControls = queryAllByText(matchResizeControl);
      assert.equal(resizeControls.length, 1);
      assert.equal(getComputedStyle(resizeControls[0]).cursor, 'row-resize');
    });
  });
});
