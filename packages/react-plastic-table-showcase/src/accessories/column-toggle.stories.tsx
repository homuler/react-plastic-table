import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Checkbox, ColumnToggleButton } from 'react-plastic-table-accessory';

storiesOf('Accessories', module)
  .add('ColumnToggle/Checkbox', () => {
    return (
      <>
        <Checkbox label='Controlled' checked={ true } onChange={ action('onChanged') } />
        <Checkbox label='Uncontrolled' />
        <Checkbox label='Disabled' disabled={ true } />
      </>
    );
  })
  .add('ColumnToggle', () => {
    const columns = [
      { id: '1', name: 'Column A', isVisible: true },
      {
        id: '2', name: 'Column B', isVisible: true,
        children: [
          { id: '2-1', name: 'Column B-1', isVisible: false, children: [{ id: '2-1-1', name: 'Column B-1-1', isVisible: false }] },
          { id: '2-2', name: 'Column B-2', isVisible: true },
        ],
      },
    ];

    return (
      <ColumnToggleButton columns={ columns } onChange={ action('onChange') }>
        Toggle
      </ColumnToggleButton>
    );
  });
