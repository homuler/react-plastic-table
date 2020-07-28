import React from 'react';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { Td, Th } from 'react-plastic-table-brick';

import { DiagonalSplitCell } from '../types';

type Props = {
  backgroundColor: string;
}

const cellStyle = (props: Props): FlattenSimpleInterpolation => css`
  background: linear-gradient(to top right, ${props.backgroundColor} 49.5%, black 49.5%, black 50.5%, ${props.backgroundColor} 50.5%);
`;

const DiagonalSplitTdView = styled(Td)`${cellStyle}`;
const DiagonalSplitThView = styled(Th)`${cellStyle}`;

const DiagonalSplitRight = styled.div`
  text-align: right;
`;

const DiagonalSplitLeft = styled.div`
  text-align: left;
`;

const DiagonalSplitContent: React.FunctionComponent<DiagonalSplitCell.ContentProps> = (props: DiagonalSplitCell.ContentProps) => {
  return (
    <>
      <DiagonalSplitRight>{ props.right }</DiagonalSplitRight>
      <DiagonalSplitLeft>{ props.left }</DiagonalSplitLeft>
    </>
  );
};

export const DiagonalSplitTd: React.FunctionComponent<DiagonalSplitCell.TdProps> = (props: DiagonalSplitCell.TdProps) => {
  const { left, right, backgroundColor = 'transparent', ...cellProps } = props;

  return (
    <DiagonalSplitTdView backgroundColor={ backgroundColor } { ...cellProps }>
      <DiagonalSplitContent left={ left } right={ right } />
    </DiagonalSplitTdView>
  );
};

DiagonalSplitTd.displayName = 'DiagonalSplitTd';

export const DiagonalSplitTh: React.FunctionComponent<DiagonalSplitCell.ThProps> = (props: DiagonalSplitCell.ThProps) => {
  const { left, right, backgroundColor = 'transparent', ...cellProps } = props;

  return (
    <DiagonalSplitThView backgroundColor={ backgroundColor } { ...cellProps }>
      <DiagonalSplitContent left={ left } right={ right } />
    </DiagonalSplitThView>
  );
};

DiagonalSplitTh.displayName = 'DiagonalSplitTh';
