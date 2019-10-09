import { createContext } from 'react';

import SizeMap from '../utils/sizeMap';

interface TableCommons {
  widths: SizeMap;
  heights: SizeMap;
}

const defaultTableContext: TableCommons = {
  widths: new SizeMap(new Map<number, number>(), () => {}),
  heights: new SizeMap(new Map<number, number>(), () => {}),
};
const TableContext = createContext(defaultTableContext);

export default TableContext;
