import assert from 'power-assert';
import { describe } from 'mocha';

import HeaderTree from './header-tree';
import { ThProps } from 'react-table-lego-brick';

describe('HeaderTree', () => {
  describe('#toThPropsForColumn', () => {
    function assertThProps(thProps: ThProps, id: string, children: React.ReactNode, colSpan: number, rowSpan: number): void {
      assert.equal(thProps.id, id);
      assert.equal(thProps.children, children);
      assert.equal(thProps.colSpan, colSpan);
      assert.equal(thProps.rowSpan, rowSpan);
    }

    context('when the header consists of one cell', () => {
      const headers = [{ id: '1', name: 'X' }];
      const headerTree = HeaderTree.fromHeaders(headers);

      it('returns an array which corresponds to 1x1 size header', () => {
        const thPropsByRows = headerTree.toThPropsForColumn();

        assert.equal(thPropsByRows.length, 1);
        assert.equal(thPropsByRows[0].length, 1);

        assertThProps(thPropsByRows[0][0], '1', 'X', 1, 1);
      });
    });

    context('when the header consits of two cells in one row', () => {
      /**
       * | X | Y |
       */
      const headers = [{ id: '1', name: 'X' }, { id: '2', name: 'Y', children: [] }];
      const headerTree = HeaderTree.fromHeaders(headers);

      it('returns an array which corresponds to 1x2 size header', () => {
        const thPropsByRows = headerTree.toThPropsForColumn();

        assert.equal(thPropsByRows.length, 1);
        assert.equal(thPropsByRows[0].length, 2);

        assertThProps(thPropsByRows[0][0], '1', 'X', 1, 1);
        assertThProps(thPropsByRows[0][1], '2', 'Y', 1, 1);
      });
    });

    context('when the header consits of two rows each of which includes one cell', () => {
      /**
       * | X |
       * +---+
       * | Y |
       */
      const headers = [{ id: '1', name: 'X', children: [{ id: '2', name: 'Y' }] }];
      const headerTree = HeaderTree.fromHeaders(headers);

      it('returns an array which corresponds to 2x1 size header', () => {
        const thPropsByRows = headerTree.toThPropsForColumn();

        assert.equal(thPropsByRows.length, 2);
        assert.equal(thPropsByRows[0].length, 1);
        assert.equal(thPropsByRows[1].length, 1);

        assertThProps(thPropsByRows[0][0], '1', 'X', 1, 1);
        assertThProps(thPropsByRows[1][0], '2', 'Y', 1, 1);
      });
    });

    context('when rowspan and colspan of some header cells are larger than 1', () => {
      /**
       * |       X      |    Y    |   |
       * +----+---------+----+----+   |
       * | X1 |    X2   |    |    | Z |
       * +----+----+----+ Y1 | Y2 |   |
       * | X3 | X4 | X5 |    |    |   |
       */
      const headers = [
        {
          id: '1',
          name: 'X',
          children: [
            { id: '2', name: 'X1', children: [{ id: '3', name: 'X3' }] },
            { id: '4', name: 'X2', children: [{ id: '5', name: 'X4' }, { id: '6', name: 'X5' }] },
          ],
        },
        { id: '7', name: 'Y', children: [{ id: '8', name: 'Y1' }, { id: '9', name: 'Y2' }] },
        { id: '10', name: 'Z' },
      ];
      const headerTree = HeaderTree.fromHeaders(headers);

      it('returns a corresponding array of th props', () => {
        const thPropsByRows = headerTree.toThPropsForColumn();

        assert.equal(thPropsByRows.length, 3);
        assert.equal(thPropsByRows[0].length, 3);
        assert.equal(thPropsByRows[1].length, 4);
        assert.equal(thPropsByRows[2].length, 3);

        assertThProps(thPropsByRows[0][0], '1', 'X', 3, 1);
        assertThProps(thPropsByRows[0][1], '7', 'Y', 2, 1);
        assertThProps(thPropsByRows[0][2], '10', 'Z', 1, 3);
        assertThProps(thPropsByRows[1][0], '2', 'X1', 1, 1);
        assertThProps(thPropsByRows[1][1], '4', 'X2', 2, 1);
        assertThProps(thPropsByRows[1][2], '8', 'Y1', 1, 2);
        assertThProps(thPropsByRows[1][3], '9', 'Y2', 1, 2);
        assertThProps(thPropsByRows[2][0], '3', 'X3', 1, 1);
        assertThProps(thPropsByRows[2][1], '5', 'X4', 1, 1);
        assertThProps(thPropsByRows[2][2], '6', 'X5', 1, 1);
      });
    });
  });
});
