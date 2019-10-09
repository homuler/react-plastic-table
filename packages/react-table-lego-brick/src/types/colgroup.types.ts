import { ColElement } from './col.types';

export interface ColGroupProps {
  offset?: number;
  children: ColElement | Array<ColElement>;
}
