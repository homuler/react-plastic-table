import assert from 'power-assert';
import { describe } from 'mocha';

import Heap from './heap';

describe('Heap', () => {
  let heap: Heap<number> | null = null;

  describe('#pop', () => {
    context('when using default comparator', () => {
      beforeEach(() => {
        heap = new Heap<number>();
      });

      context('and the queue is empty', () => {
        it('returns undefined', () => {
          assert.equal(heap!.pop(), void 0);
        });
      });

      context('and the queue size equals 1', () => {
        beforeEach(() => {
          heap!.push(1);
        });

        it('pops the root of the tree', () => {
          assert.equal(heap!.size, 1);
          assert.equal(heap!.pop(), 1);
          assert.equal(heap!.size, 0);
        });
      });

      context('and queue size is larger than 1', () => {
        context('and distinct items are pushed', () => {
          context('in ascending order', () => {
            beforeEach(() => {
              Array.from({ length: 20 }, (_x, i) => i).forEach((v) => { heap!.push(v); });
            });

            it('pops items in correct order', () => {
              assert.equal(heap!.size, 20);

              for (let i = 0; i < 20; i++) {
                assert.equal(heap!.pop(), 19 - i);
              }

              assert.equal(heap!.size, 0);
            });
          });

          context('in decending order', () => {
            beforeEach(() => {
              Array.from({ length: 20 }, (_x, i) => i).forEach((v) => { heap!.push(v); });
            });

            it('pops items in correct order', () => {
              assert.equal(heap!.size, 20);

              for (let i = 0; i < 20; i++) {
                assert.equal(heap!.pop(), 19 - i);
              }

              assert.equal(heap!.size, 0);
            });
          });

          context('in randomized order', () => {
            beforeEach(() => {
              [2, 7, 1, 9, 6, 5, 8, 10, 3, 4].forEach((v) => { heap!.push(v); });
            });

            it('pops items in correct order', () => {
              assert.equal(heap!.size, 10);

              for (let i = 0; i < 10; i++) {
                assert.equal(heap!.pop(), 10 - i);
              }

              assert.equal(heap!.size, 0);
            });
          });
        });

        context('and some pushed items have same value', () => {
          beforeEach(() => {
            [2, 6, 3, 4, 3, 1, 1, 5, 7, 1].forEach((v) => { heap!.push(v); });
          });

          it('pushes the values to the tree and heapifies it', () => {
            assert.equal(heap!.size, 10);

            [7, 6, 5, 4, 3, 3, 2, 1, 1, 1].forEach((v) => {
              assert.equal(heap!.pop(), v);
            });
          });
        });
      });
    });

    context('when using a custom comparator', () => {
      beforeEach(() => {
        heap = new Heap<number>((x, y): number => {
          if (x === y) { return 0; }

          return x < y ? 1 : -1;
        });
      });

      context('and distinct items are pushed', () => {
        beforeEach(() => {
          [2, 7, 1, 9, 6, 5, 8, 10, 3, 4].forEach((v) => { heap!.push(v); });
        });

        it('pops items in correct order', () => {
          assert.equal(heap!.size, 10);

          for (let i = 0; i < 10; i++) {
            assert.equal(heap!.pop(), i + 1);
          }

          assert.equal(heap!.size, 0);
        });
      });

      context('and some pushed items have same value', () => {
        beforeEach(() => {
          [2, 6, 3, 4, 3, 1, 1, 5, 7, 1].forEach((v) => { heap!.push(v); });
        });

        it('pushes the values to the tree and heapifies it', () => {
          assert.equal(heap!.size, 10);

          [1, 1, 1, 2, 3, 3, 4, 5, 6, 7].forEach((v) => {
            assert.equal(heap!.pop(), v);
          });
        });
      });
    });
  });
});
