import React from 'react';

export type DefaultSizeState = number | undefined;
export type SetDefaultSizeAction = React.Dispatch<React.SetStateAction<DefaultSizeState>>;

type CellSize = [DefaultSizeState, DefaultSizeState]; // [width, height];
type NodeRef = (node: HTMLElement | null) => void;

export type DefaultSizeReturnType = [CellSize, NodeRef];
