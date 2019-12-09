import { ColProps } from 'react-table-lego-brick';
import { HeaderObj, LayoutChangeCallback } from './commons.types';

export interface TreeHeaderProps {
  headers: Array<HeaderObj>;
  columns: Array<ColProps | undefined | null>;
  onLayoutChange?: LayoutChangeCallback;
}
