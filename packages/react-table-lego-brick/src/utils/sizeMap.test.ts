import assert from 'power-assert';
import { describe } from 'mocha';
import sinon from 'sinon';

import SizeMap from '../utils/sizeMap';

describe('SizeMap', () => {
  let sizeMap: SizeMap | null = null;
  let updateStore: sinon.SinonSpy | null = null;

  function assertValues(sizeMap: SizeMap, values: (number | undefined)[]): void {
    values.forEach((x, i) => {
      if (x === void 0) { return; }

      assert.equal(sizeMap.get(i), x);
    });
  }

  beforeEach(() => {
    updateStore = sinon.fake();
  });

  describe('#set', () => {
    beforeEach(() => {
      const store = new Map<number, number>();
      store.set(1, 100);
      store.set(2, 200);

      sizeMap = new SizeMap(store, updateStore as sinon.SinonSpy);
    });

    context('when the key exists', () => {
      context('and the value is undefined', () => {
        it('deletes the key', () => {
          const newSizeMap = (sizeMap as SizeMap).set(1, void 0);

          assert.equal(newSizeMap.size, 1);
          assertValues(newSizeMap, [,, 200]);
          assert.equal((updateStore as sinon.SinonSpy).calledOnceWith(newSizeMap.store), true);
        });
      });

      context('and the value is not undefined', () => {
        it('updates the value to the key', () => {
          const newSizeMap = (sizeMap as SizeMap).set(1, 150);

          assert.equal(newSizeMap.size, 2);
          assertValues(newSizeMap, [, 150, 200]);
          assert.equal((updateStore as sinon.SinonSpy).calledOnceWith(newSizeMap.store), true);
        });
      })
    });

    context('when the key does not exist yet', () => {
      context('and the value is undefined', () => {
        it('does nothing', () => {
          const newSizeMap = (sizeMap as SizeMap).set(3, void 0);

          assert.equal(newSizeMap.size, 2);
          assertValues(newSizeMap, [, 100, 200]);
          assert.equal((updateStore as sinon.SinonSpy).calledOnceWith(newSizeMap.store), true);
        });
      });

      context('and the value is not undefined', () => {
        it('sets the value to the key', () => {
          const newSizeMap = (sizeMap as SizeMap).set(3, 300);

          assert.equal(newSizeMap.size, 3);
          assertValues(newSizeMap, [, 100, 200, 300]);
          assert.equal((updateStore as sinon.SinonSpy).calledOnceWith(newSizeMap.store), true);
        });
      });
    });

    context('when called in a transaction', () => {
      it('sets the value to the key but does not commit', () => {
        const newSizeMap = (sizeMap as SizeMap).transaction().set(1, 150);

        assert.equal(newSizeMap.size, 2);
        assertValues(newSizeMap, [, 150, 200]);
        assert.equal((updateStore as sinon.SinonSpy).called, false);

        newSizeMap.commit();
        assert.equal((updateStore as sinon.SinonSpy).calledOnceWith(newSizeMap.store), true);
      });
    });
  });

  describe('#resize', () => {
    context('when the store is empty', () => {
      beforeEach(() => {
        sizeMap = new SizeMap(new Map(), updateStore as sinon.SinonSpy);
      });

      context('and the span value is not specified', () => {
        it('sets the value to the key', () => {
          const newSizeMap = (sizeMap as SizeMap).resize(2, { size: 100, delta: 100, last: 0 });

          assert.equal(newSizeMap.size, 1);
          assert.equal(newSizeMap.get(2), 100);
          assert.equal((updateStore as sinon.SinonSpy).calledOnceWith(newSizeMap.store), true);
        });
      });

      context('and the span value is larger than 1', () => {
        context('and delta is positive', () => {
          it('assigns size value evenly to the values of the consecutive keys', () => {
            const newSizeMap = (sizeMap as SizeMap).resize(2, { size: 180, delta: 30, last: 150 }, 3);

            assert.equal(newSizeMap.size, 3);
            assertValues(newSizeMap, [,, 60, 60, 60]);
            assert.equal((updateStore as sinon.SinonSpy).calledOnceWith(newSizeMap.store), true);
          });
        });

        context('and delta is negative', () => {
          it('assigns size value evenly to the values of the consecutive keys', () => {
            const newSizeMap = (sizeMap as SizeMap).resize(2, { size: 120, delta: -30, last: 150 }, 3);

            assert.equal(newSizeMap.size, 3);
            assertValues(newSizeMap, [,, 40, 40, 40]);
            assert.equal((updateStore as sinon.SinonSpy).calledOnceWith(newSizeMap.store), true);
          });
        });
      });
    });

    context('when the sizeMap is not empty but sparse', () => {
      beforeEach(() => {
        const store = new Map<number, number>();

        store.set(2, 100);
        store.set(5, 200);
        store.set(6, 300);

        sizeMap = new SizeMap(store, updateStore as sinon.SinonSpy);
      });

      context('and the span value is not specified', () => {
        context('and the sizeMap has the specified key', () => {
          it('sets the value to the key', () => {
            const newSizeMap = (sizeMap as SizeMap).resize(2, { size: 110, delta: 10, last: 100 });

            assert.equal(newSizeMap.size, 3);
            assertValues(newSizeMap, [,, 110,,, 200, 300]);
            assert.equal((updateStore as sinon.SinonSpy).calledOnceWith(newSizeMap.store), true);
          });
        });

        context('and the sizeMap does not have the specified key', () => {
          it('sets the value to the key', () => {
            const newSizeMap = (sizeMap as SizeMap).resize(3, { size: 150, delta: 10, last: 140 });

            assert.equal(newSizeMap.size, 4);
            assertValues(newSizeMap, [,, 100, 150,, 200, 300]);
            assert.equal((updateStore as sinon.SinonSpy).calledOnceWith(newSizeMap.store), true);
          });
        });
      });

      context('and the span value is larger than 1', () => {
        context('and some of the specified keys are missing', () => {
          context('and the value is larger than the total values', () => {
            it('estimates the missing values and adds delta proportionally to the values of the consecutive keys', () => {
              const newSizeMap = (sizeMap as SizeMap).resize(1, { size: 220, delta: 20, last: 200 }, 3);

              assert.equal(newSizeMap.size, 5);
              assertValues(newSizeMap, [, 55, 110, 55,, 200, 300]);
              assert.equal((updateStore as sinon.SinonSpy).calledOnceWith(newSizeMap.store), true);
            });

            context('and the value is smaller than the total values', () => {
              it('estimates the missing values and adds delta proportionally to the values of the consecutive keys', () => {
                const newSizeMap = (sizeMap as SizeMap).resize(2, { size: 280, delta: -120, last: 400 }, 4);

                assert.equal(newSizeMap.size, 5);
                assertValues(newSizeMap, [,, 70, 35, 35, 140, 300]);
                assert.equal((updateStore as sinon.SinonSpy).calledOnceWith(newSizeMap.store), true);
              });
            });
          });
        });
      });
    });

    context('when the sizeMap is not empty nor sparse', () => {
      beforeEach(() => {
        const store = new Map<number, number>();

        store.set(0, 50);
        store.set(1, 100);
        store.set(2, 150);
        store.set(3, 200);

        sizeMap = new SizeMap(store, updateStore as sinon.SinonSpy);
      });

      context('and the span value is not specified', () => {
        it('sets the value to the key', () => {
          const newSizeMap = (sizeMap as SizeMap).resize(1, { size: 200, delta: 100, last: 100 });

          assert.equal(newSizeMap.size, 4);
          assertValues(newSizeMap, [50, 200, 150, 200]);
          assert.equal((updateStore as sinon.SinonSpy).calledOnceWith(newSizeMap.store), true);
        });
      });

      context('and the span value is larger than 1', () => {
        context('and delta is positive', () => {
          it('adds delta proportionally to the values of the consecutive keys', () => {
            const newSizeMap = (sizeMap as SizeMap).resize(1, { size: 300, delta: 50, last: 250 }, 2);

            assert.equal(newSizeMap.size, 4);
            assertValues(newSizeMap, [50, 120, 180, 200]);
            assert.equal((updateStore as sinon.SinonSpy).calledOnceWith(newSizeMap.store), true);
          });
        });

        context('and delta is negative', () => {
          it('adds delta proportionally to the values of the consecutive keys', () => {
            const newSizeMap = (sizeMap as SizeMap).resize(1, { size: 200, delta: -50, last: 250 }, 2);

            assert.equal(newSizeMap.size, 4);
            assertValues(newSizeMap, [50, 80, 120, 200]);
            assert.equal((updateStore as sinon.SinonSpy).calledOnceWith(newSizeMap.store), true);
          });
        });
      });
    });

    context('when called in a transaction', () => {
      beforeEach(() => {
        sizeMap = new SizeMap(new Map<number, number>(), updateStore as sinon.SinonSpy);
      });

      it('sets the value to the key but does not commit', () => {
        const newSizeMap = (sizeMap as SizeMap).transaction().resize(2, { size: 100, delta: 100, last: 0 });

        assert.equal(newSizeMap.size, 1);
        assert.equal(newSizeMap.get(2), 100);
        assert.equal((updateStore as sinon.SinonSpy).called, false);

        newSizeMap.commit();

        assert.equal((updateStore as sinon.SinonSpy).calledOnceWith(newSizeMap.store), true);
      });
    });
  });

  describe('#swap', () => {
    beforeEach(() => {
      const store = new Map<number, number>();

      store.set(1, 100);
      store.set(2, 200);
      store.set(4, 400);
      store.set(6, 600);

      sizeMap = new SizeMap(store, updateStore as sinon.SinonSpy);
    });

    context('when xIdx < yIdx', () => {
      context('and the spans are not specified', () => {
        it('swaps the values', () => {
          const newSizeMap = (sizeMap as SizeMap).swap(1, 4);

          assert.equal(newSizeMap.size, 4);
          assertValues(newSizeMap, [, 400, 200,, 100,, 600]);
          assert.equal((updateStore as sinon.SinonSpy).calledOnceWith(newSizeMap.store), true);
        });
      });

      context('ane xSpan does not equal ySpan', () => {
        it('swaps the values', () => {
          const newSizeMap = (sizeMap as SizeMap).swap(0, 6, 3, 2);

          assert.equal(newSizeMap.size, 4);
          assertValues(newSizeMap, [600,,, 400,,, 100, 200]);
          assert.equal((updateStore as sinon.SinonSpy).calledOnceWith(newSizeMap.store), true);
        });
      });
    });

    context('when xIdx > yIdx', () => {
      context('and the spans are not specified', () => {
        it('swaps the values', () => {
          const newSizeMap = (sizeMap as SizeMap).swap(4, 1);

          assert.equal(newSizeMap.size, 4);
          assertValues(newSizeMap, [, 400, 200,, 100,, 600]);
          assert.equal((updateStore as sinon.SinonSpy).calledOnceWith(newSizeMap.store), true);
        });
      });

      context('ane xSpan does not equal ySpan', () => {
        it('swaps the values', () => {
          const newSizeMap = (sizeMap as SizeMap).swap(6, 0, 2, 3);

          assert.equal(newSizeMap.size, 4);
          assertValues(newSizeMap, [600,,, 400,,, 100, 200]);
          assert.equal((updateStore as sinon.SinonSpy).calledOnceWith(newSizeMap.store), true);
        });
      });
    });

    context('when the specified ranges are overlapping', () => {
      it('does nothing', () => {
        const newSizeMap = (sizeMap as SizeMap).swap(1, 3, 3, 2);

        assert.equal(newSizeMap.size, 4);
        assertValues(newSizeMap, [, 100, 200,, 400,, 600]);
        assert.equal((updateStore as sinon.SinonSpy).called, false);
      });
    });

    context('when called in a transaction', () => {
      it('swaps the values but does not commit', () => {
        const newSizeMap = (sizeMap as SizeMap).transaction().swap(1, 2);

        assert.equal(newSizeMap.size, 4);
        assertValues(newSizeMap, [, 200, 100,, 400,, 600]);
        assert.equal((updateStore as sinon.SinonSpy).called, false);

        newSizeMap.commit();

        assert.equal((updateStore as sinon.SinonSpy).calledOnceWith(newSizeMap.store), true);
      });
    });
  });

  describe('#delete', () => {
    beforeEach(() => {
      const store = new Map<number, number>();
      store.set(1, 100);
      store.set(2, 200);
      store.set(4, 400);

      sizeMap = new SizeMap(store, updateStore as sinon.SinonSpy);
    });

    context('when the key does not exist', () => {
      context('and the span is not specified', () => {
        it('does not delete any keys', () => {
          const newSizeMap = (sizeMap as SizeMap).delete(3);

          assert.equal(newSizeMap.size, 3);
          assertValues(newSizeMap, [, 100, 200,, 400]);
          assert.equal((updateStore as sinon.SinonSpy).calledOnceWith(newSizeMap.store), true);
        });
      });

      context('and span > 1', () => {
        it('deletes the keys within the specified range', () => {
          const newSizeMap = (sizeMap as SizeMap).delete(3, 2);

          assert.equal(newSizeMap.size, 2);
          assertValues(newSizeMap, [, 100, 200]);
          assert.equal((updateStore as sinon.SinonSpy).calledOnceWith(newSizeMap.store), true);
        });
      });
    });


    context('when the key exists', () => {
      context('and the span is not specified', () => {
        it('deletes the keys within the specified range', () => {
          const newSizeMap = (sizeMap as SizeMap).delete(2);

          assert.equal(newSizeMap.size, 2);
          assertValues(newSizeMap, [, 100,,, 400]);
          assert.equal((updateStore as sinon.SinonSpy).calledOnceWith(newSizeMap.store), true);
        });
      });

      context('and span > 1', () => {
        it('deletes the keys within the specified range', () => {
          const newSizeMap = (sizeMap as SizeMap).delete(2, 3);

          assert.equal(newSizeMap.size, 1);
          assertValues(newSizeMap, [, 100]);
          assert.equal((updateStore as sinon.SinonSpy).calledOnceWith(newSizeMap.store), true);
        });
      });
    });

    context('when called in a transaction', () => {
      it('deletes the keys within the specified range but does not commit', () => {
        const newSizeMap = (sizeMap as SizeMap).transaction().delete(1, 2);

        assert.equal(newSizeMap.size, 1);
        assertValues(newSizeMap, [,,,, 400]);
        assert.equal((updateStore as sinon.SinonSpy).called, false);

        newSizeMap.commit();

        assert.equal((updateStore as sinon.SinonSpy).calledOnceWith(newSizeMap.store), true);
      });
    });
  });

  describe('#clear', () => {
    context('when the store is empty', () => {
      beforeEach(() => {
        sizeMap = new SizeMap(new Map<number, number>(), updateStore as sinon.SinonSpy);
      });

      it('calls updateStore', () => {
        const newSizeMap = (sizeMap as SizeMap).clear();

        assert.equal(newSizeMap.size, 0);
        assert.equal((updateStore as sinon.SinonSpy).calledOnceWith(newSizeMap.store), true);
      });
    });

    context('when the store is not empty', () => {
      beforeEach(() => {
        const store = new Map<number, number>();
        store.set(1, 100);
        store.set(3, 300);

        sizeMap = new SizeMap(store, updateStore as sinon.SinonSpy);
      });

      it('clears the keys', () => {
        const newSizeMap = (sizeMap as SizeMap).clear();

        assert.equal(newSizeMap.size, 0);
        assert.equal((updateStore as sinon.SinonSpy).calledOnceWith(newSizeMap.store), true);
      });
    });

    context('when called in a transaction', () => {
      beforeEach(() => {
        const store = new Map<number, number>();
        store.set(1, 100);
        store.set(3, 300);

        sizeMap = new SizeMap(store, updateStore as sinon.SinonSpy);
      });

      it('clears the keys but does not commit', () => {
        const newSizeMap = (sizeMap as SizeMap).transaction().clear();

        assert.equal(newSizeMap.size, 0);
        assert.equal((updateStore as sinon.SinonSpy).called, false);

        newSizeMap.commit();

        assert.equal((updateStore as sinon.SinonSpy).calledOnceWith(newSizeMap.store), true);
      });
    });
  });
});
