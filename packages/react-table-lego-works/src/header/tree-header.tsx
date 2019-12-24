import React, { useContext } from 'react';

import { ColGroup, Col, Thead, Tr, Th, TableContext } from 'react-table-lego-brick';
import useNodeReorder from './useNodeReorder';
import { TreeHeaderProps } from '../types';

const TreeHeader: React.FunctionComponent<TreeHeaderProps> = (props: TreeHeaderProps) => {
  const { headerTree, onLayoutChange } = props;
  const { widths } = useContext(TableContext);

  const thProps = headerTree.toThPropsForColumn();
  const colCount = headerTree.width;
  const onReorder = useNodeReorder('column', headerTree, widths, onLayoutChange);

  return (
    <>
      <ColGroup>
        { Array.from({ length: colCount }, (_x, i) => (<Col key={ i } { ...(props.colProps[i] || {}) } />)) }
      </ColGroup>

      <Thead>
        {
          thProps.map((row, i) => {
            return (
              <Tr key={ i }>
                { row.map((cell) => (<Th key={ cell.id } { ...cell } reorderAxis='x' onReorder={ onReorder } />)) }
              </Tr>
            )
          })
        }
      </Thead>
    </>
  );
};

TreeHeader.displayName = 'TreeHeader';

export default TreeHeader;
