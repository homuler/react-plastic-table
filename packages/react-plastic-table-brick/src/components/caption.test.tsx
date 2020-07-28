import React from 'react';

import assert from 'power-assert';
import { describe } from 'mocha';
import { renderInTable, cleanup } from '../utils/test';

import Caption from './caption';

describe('Caption', () => {
  function validateCaption(caption: HTMLElement, attrs: { [key: string]: string }): void {
    assert.equal(caption.tagName.toLowerCase(), 'caption');

    Object.keys(attrs).forEach((key) => {
      assert.equal(caption.getAttribute(key), attrs[key]);
    });
  }

  afterEach(() => { cleanup(); });

  it('renders a caption with specified attrs', () => {
    const attrs = { className: 'caption', id: 'id' };
    const expectedAttrs = { 'class': 'caption', id: 'id' };
    const { queryByText } = renderInTable(
      <Caption { ...attrs }>Hello World!</Caption>
    );

    const caption = queryByText('Hello World!') as HTMLElement;

    assert.notEqual(caption, null);
    validateCaption(caption, expectedAttrs);
  });
});
