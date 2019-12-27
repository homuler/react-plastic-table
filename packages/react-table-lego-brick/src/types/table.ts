import React from 'react';
import { DefaultTheme } from 'styled-components';

export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  theme?: DefaultTheme;
  children: React.ReactNode;
}
