import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import { number, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import { PaginationButton } from 'react-plastic-table-accessory';

const StyledPaginationButton = styled(PaginationButton)`
  li:first-child, li:first-child > button {
    border-radius: 8px 0 0 8px;
  }

  li:last-child, li:last-child > button {
    border-radius: 0 8px 8px 0;
  }

  li {
    height: 32px;
    width: 32px;
    margin-left: -1px;

    color: #0a9b94;
    border-color: #0a9b94;
    border-style: solid;
  }

  li.selected {
    background-color: #0a9b94;
  }

  li > button {
    color: #0a9b94;
  }

  li.selected > button {
    color: white;
  }
`;

storiesOf('Accessories', module)
  .add('PaginationButton', () => {
    return (
      <PaginationButton currentPage={ number('Current Page', 5) }
        totalPages={ number('Total Pages', 20) }
        boundaryRange={ number('Boundary Range', 1) }
        siblingRange={ number('Sibling Range', 3) }
        showEllipsis={ boolean('Show Ellipsis', true) }
        showFirstAndLastNav={ boolean('Show First and Last Navigation', true) }
        showPrevAndNextNav={ boolean('Show Prev and Next Navigation', true) }
        onChange={ action('onChange') }
      />
    );
  })
  .add('PaginationButton(Styled)', () => {
    return (
      <StyledPaginationButton currentPage={ number('Current Page', 5) }
        totalPages={ number('Total Pages', 20) }
        boundaryRange={ number('Boundary Range', 1) }
        siblingRange={ number('Sibling Range', 3) }
        showEllipsis={ boolean('Show Ellipsis', true) }
        showFirstAndLastNav={ boolean('Show First and Last Navigation', true) }
        showPrevAndNextNav={ boolean('Show Prev and Next Navigation', true) }
        onChange={ action('onChange') }
      />
    );
  });
