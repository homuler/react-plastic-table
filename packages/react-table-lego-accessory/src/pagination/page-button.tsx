import React from 'react';

import styled from 'styled-components';
import get from 'lodash/get';

interface Props {
  className?: string;
  children?: React.ReactNode;
  onClick?: (e: React.SyntheticEvent) => void;
};

const PageButtonLi = styled.li`
  list-style: none;

  align-content: flex-start;
  align-items: flex-start;
  justify-content: flex-start;

  width: ${(props): string => get(props.theme, 'accessory.pagination.button.width', '32px')};
  color: ${(props): string => get(props.theme, 'accessory.pagination.button.color', 'black')};
  border-color: ${(props): string => get(props.theme, 'accessory.pagination.button.borderColor', 'black')};
  border-width: ${(props): string => get(props.theme, 'accessory.pagination.button.borderWidth', '1px')};

  &:hover {
    background-color: #eee;
  }

  &.ellipsis-nav:hover {
    background-color: transparent;
  }

  & > button {
    border: none;
    margin: 0;
    padding: 0;
    background-color: transparent;
    cursor: pointer;

    display: inline-block;
    text-align: center;
    height: 100%;
    width: 100%;
  }

  & > button:focus {
    outline: none;
  }

  &.selected > button {
    font-weight: bold;
    cursor: default;
  }

  &.ellipsis-nav > button {
    cursor: default;
  }
`;

const PageButton: React.FunctionComponent<Props> = (props: Props) => {
  return (
    <PageButtonLi className={ props.className }>
      <button type='button' onClick={ props.onClick }>{ props.children }</button>
    </PageButtonLi>
  );
};

export default PageButton;
