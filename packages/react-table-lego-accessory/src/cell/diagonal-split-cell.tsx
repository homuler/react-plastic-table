import React from 'react';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { Td, Th } from 'react-table-lego-brick';

import { DiagonalSplitCellContentProps, DiagonalSplitTdProps, DiagonalSplitThProps } from '../types';

const cellStyle = (): FlattenSimpleInterpolation => css`
  background: linear-gradient(to top right, 49.5%, black 49.5%, black 50.5%, 50.5%);
  line-height: 1;
`;

const DiagonalSplitTdView = styled(Td)`${cellStyle}`;
const DiagonalSplitThView = styled(Th)`${cellStyle}`;

const DiagonalSplitRight = styled.div`
  text-align: right;
`;

const DiagonalSplitLeft = styled.div`
  text-align: left;
`;

const DiagonalSplitContent: React.FunctionComponent<DiagonalSplitCellContentProps> = (props: DiagonalSplitCellContentProps) => {
  return (
    <>
      <DiagonalSplitRight>{ props.right }</DiagonalSplitRight>
      <DiagonalSplitLeft>{ props.left }</DiagonalSplitLeft>
    </>
  );
};

export const DiagonalSplitTd: React.FunctionComponent<DiagonalSplitTdProps> = (props: DiagonalSplitTdProps) => {
  return (
    <DiagonalSplitTdView>
      <DiagonalSplitContent left={ props.left } right={ props.right } />
    </DiagonalSplitTdView>
  );
};

DiagonalSplitTd.displayName = 'DiagonalSplitTd';

export const DiagonalSplitTh: React.FunctionComponent<DiagonalSplitThProps> = (props: DiagonalSplitThProps) => {
  return (
    <DiagonalSplitThView>
      <DiagonalSplitContent left={ props.left } right={ props.right } />
    </DiagonalSplitThView>
  );
};

DiagonalSplitTh.displayName = 'DiagonalSplitTh';
