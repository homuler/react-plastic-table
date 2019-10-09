import React from 'react';
import { createPortal } from 'react-dom';

interface Props {
  root: Element;
  children: React.ReactNode;
}

const Popover: React.FunctionComponent<Props> = (props: Props) => {
  return createPortal(props.children, props.root);
};

export default Popover;
