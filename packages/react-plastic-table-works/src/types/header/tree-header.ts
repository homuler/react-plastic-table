import { ColProps } from 'react-plastic-table-brick';
import { LayoutChangeCallback } from './commons';
import HeaderTree from '../../header/data/header-tree';

export interface TreeHeaderProps {
  headerTree: HeaderTree;
  colProps?: Array<ColProps | undefined | null>;
  onLayoutChange?: LayoutChangeCallback;
}
