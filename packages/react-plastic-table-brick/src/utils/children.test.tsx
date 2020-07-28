import assert from 'power-assert';
import { describe } from 'mocha';

import React from 'react';
import { flatten } from './children';

describe('flatten', () => {
  context('when the children is Array', () => {
    context('and it does not include any Fragments', () => {
      const children = [
        <div key='1'>child1</div>,
        <div key='2'>child2</div>,
      ];

      it('returns the given children', () => {
        const results = flatten(children);

        assert.equal(results.length, 2);
        assert.equal((results[0] as React.ReactElement).props.children, 'child1');
        assert.equal((results[1] as React.ReactElement).props.children, 'child2');
      });
    });

    context('and it includes Fragments', () => {
      const children = [
        <div key='1'>child1</div>,
        <>
          <div>child2</div>
        </>,
        <>
          <><div>child3</div></>
          <div>child4</div>
        </>,
      ];

      it('extracts children of the Fragments', () => {
        const results = flatten(children);

        assert.equal(results.length, 4);
        assert.equal((results[0] as React.ReactElement).props.children, 'child1');
        assert.equal((results[1] as React.ReactElement).props.children, 'child2');
        assert.equal((results[2] as React.ReactElement).props.children, 'child3');
        assert.equal((results[3] as React.ReactElement).props.children, 'child4');
      });
    });
  });

  context('when the children is not Array', () => {
    context('nor Fragment', () => {
      const children = (<div>child1</div>);

      it('returns the given element', () => {
        const results = flatten(children);

        assert.equal(results.length, 1);
        assert.equal((results[0] as React.ReactElement).props.children, 'child1');
      });
    });

    context('and is Fragment', () => {
      const children = (
        <>
          <div>child1</div>
          <div>child2</div>
        </>
      );

      it('returns the children of the fragment', () => {
        const results = flatten(children);

        assert.equal(results.length, 2);
        assert.equal((results[0] as React.ReactElement).props.children, 'child1');
        assert.equal((results[1] as React.ReactElement).props.children, 'child2');
      });
    });
  });
});
