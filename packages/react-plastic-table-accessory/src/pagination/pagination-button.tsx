import React from 'react';
import styled from 'styled-components';

import PropTypes from 'prop-types';
import * as NumberTypes from '../prop-types/number';

import PageButton from './page-button';

type PageClickCallback = (e: React.SyntheticEvent, page: number) => void;

interface Props {
  className?: string;

  currentPage?: number;
  boundaryRange?: number;
  siblingRange?: number;
  totalPages?: number;

  showEllipsis?: boolean;
  showFirstAndLastNav?: boolean;
  showPrevAndNextNav?: boolean;
  onChange?: PageClickCallback;
}

type Range = [number, number];

const PaginationButtonView = styled.ul`
  display: flex;
`;

function renderPageButtons(range: Range, selected: number, onChange?: PageClickCallback): Array<React.ReactElement> {
  const [from, to] = range;

  return Array.from({ length: to - from + 1 }, (_x, i) => {
    const x = i + from;
    const className = selected === x ? 'page-nav selected' : 'page-nav';

    return (
      <PageButton key={ x }
        className={ className }
        onClick={ (e): void => { if (onChange) { onChange(e, x); } } }
      >
        { x }
      </PageButton>
    );
  });
}

const PaginationButton: React.FunctionComponent<Props> = (props: Props) => {
  const {
    currentPage = 1, totalPages = Infinity, boundaryRange = 0, siblingRange = 0,
    showEllipsis = false, showFirstAndLastNav = false, showPrevAndNextNav = false, onChange,
  } = props;

  const leftRange: Range = [1, boundaryRange];
  const rightRange: Range = [totalPages - boundaryRange + 1, totalPages];
  const activeRange: Range = [Math.max(1, currentPage - siblingRange), Math.min(totalPages, currentPage + siblingRange)];
  const middleRange: Range = [Math.max(activeRange[0], leftRange[1] + 1), Math.min(activeRange[1], rightRange[0] - 1)];

  return (
    <PaginationButtonView className={ props.className }>
      {
        showFirstAndLastNav && (
          <PageButton className='first-nav' onClick={ (e): void => { if (onChange) { onChange(e, 1); } } }>«</PageButton>
        )
      }
      {
        showPrevAndNextNav && (
          <PageButton className='prev-nav'
            onClick={ (e): void => { if (onChange) { onChange(e, Math.max(1, currentPage - 1)); } } }
          >
            { '<' }
          </PageButton>
        )
      }
      { renderPageButtons(leftRange, currentPage, onChange) }
      { showEllipsis && (leftRange[1] + 1 < middleRange[0]) && (<PageButton className='ellipsis-nav'>...</PageButton>) }
      { renderPageButtons(middleRange, currentPage, onChange) }
      { showEllipsis && (middleRange[1] + 1 < rightRange[0]) && (<PageButton className='ellipsis-nav'>...</PageButton>) }
      { renderPageButtons(rightRange, currentPage, onChange) }
      {
        showPrevAndNextNav && (
          <PageButton className='next-nav'
            onClick={ (e): void => { if (onChange) { onChange(e, Math.min(totalPages, currentPage + 1)); } } }
          >
            { '>' }
          </PageButton>
        )
      }
      {
        showFirstAndLastNav && (
          <PageButton className='last-nav' onClick={ (e): void => { if (onChange) { onChange(e, totalPages); } } }>»</PageButton>
        )
      }
    </PaginationButtonView>
  );
};

PaginationButton.propTypes = {
  currentPage: NumberTypes.isNullOrPositive,
  boundaryRange: NumberTypes.isNullOrPositive,
  siblingRange: NumberTypes.isNullOrPositive,
  totalPages: NumberTypes.isPositive,
  showEllipsis: PropTypes.bool,
  showFirstAndLastNav: PropTypes.bool,
  showPrevAndNextNav: PropTypes.bool,
  onChange: PropTypes.func,
};

export default PaginationButton;
