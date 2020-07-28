import React, { useState, useCallback, useRef } from 'react';

import Checkbox from '../checkbox';
import Popover from '../popover';
import { ColumnList, PopoverContainer } from './view';
import { ColumnToggle } from '../types';

const defaultToggleRenderer: ColumnToggle.ToggleRenderer = (column, onChange) => {
  return (<Checkbox checked={ column.isVisible } label={ column.name } onChange={ onChange } />);
};

const ColumnToggleButton: React.FunctionComponent<ColumnToggle.ColumnToggleProps> = (props: ColumnToggle.ColumnToggleProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleClick = useCallback(() => { setIsOpen(!isOpen); }, [isOpen, setIsOpen]);
  const containerRef = useRef<HTMLDivElement>(null);

  const { columns, onChange, renderToggle = defaultToggleRenderer } = props;

  return (
    <div className={ props.className }>
      <button onClick={ handleClick }>
        { props.children }
      </button>

      <PopoverContainer ref={ containerRef } />

      {
        isOpen && containerRef.current && (
          <Popover root={ containerRef.current }>
            <ColumnList columns={ columns } onChange={ onChange }>
              { renderToggle }
            </ColumnList>
          </Popover>
        )
      }
    </div>
  );
};

export default ColumnToggleButton;
