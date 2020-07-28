import React, { useMemo, useState } from 'react';
import { ThemeProvider } from 'styled-components';

import TableContext from '../contexts/tableContext';
import defaultTheme from '../themes/defaultTheme';

import { TableProps } from '../types';
import SizeMap from '../utils/sizeMap';

const Table: React.FunctionComponent<TableProps> = (props: TableProps) => {
  const { children, theme = defaultTheme, ...tableProps } = props;

  const [widths, setWidths] = useState(() => (new Map<number, number>()));
  const [heights, setHeights] = useState(() => (new Map<number, number>()));
  const contextValue = useMemo(() => ({
    widths: new SizeMap(widths, setWidths),
    heights: new SizeMap(heights, setHeights),
  }), [widths, setWidths, heights, setHeights]);

  return (
    <ThemeProvider theme={ theme }>
      <table { ...tableProps }>
        <TableContext.Provider value={ contextValue }>
          { children }
        </TableContext.Provider>
      </table>
    </ThemeProvider>
  );
};

Table.displayName = 'Table';

export default Table;
