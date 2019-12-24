import { TdProps, ThProps } from "react-table-lego-brick";

export interface DiagonalSplitCellContentProps {
  left?: React.ReactNode;
  right?: React.ReactNode;
  backgroundColor?: string;
}

export type DiagonalSplitTdProps = DiagonalSplitCellContentProps & Omit<TdProps, 'children'>;
export type DiagonalSplitThProps = DiagonalSplitCellContentProps & Omit<ThProps, 'children'>;
