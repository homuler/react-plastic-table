import React from 'react';

import { Checkbox } from './checkbox';

export namespace ColumnToggle {
  export type Column = {
    id: string;
    name: string;
    isVisible: boolean;
    children?: Array<Column>;
  };

  export type ToggleCallback = (e: React.SyntheticEvent, column: Column, columns: Array<Column>) => void;
  export type ToggleRenderer = (column: Column, onChange: Checkbox.ChangeCallback) => React.ReactElement;

  export interface ColumnListProps {
    className?: string;
    indent?: number;
    path?: string;
    columns?: Array<Column>;
    onChange?: ToggleCallback;
    children: ToggleRenderer;
  }

  export interface ColumnToggleProps {
    className?: string;
    children?: React.ReactNode;
    renderToggle?: ToggleRenderer;
    onChange?: ToggleCallback;
    columns: Array<Column>;
  }
}
