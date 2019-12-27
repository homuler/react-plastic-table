import { TdProps as BrickTdProps, ThProps as BrickThProps } from "react-table-lego-brick";

export interface ContentProps {
  left?: React.ReactNode;
  right?: React.ReactNode;
  backgroundColor?: string;
}

export type TdProps = ContentProps & Omit<BrickTdProps, 'children'>;
export type ThProps = ContentProps & Omit<BrickThProps, 'children'>;
