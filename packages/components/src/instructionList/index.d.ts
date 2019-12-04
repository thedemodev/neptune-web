import React, { ReactNode } from 'react';

export interface Instruction {
  icon: ReactNode;
  text: ReactNode;
  help?: {
    title?: ReactNode | null;
    content: ReactNode;
  } | null;
  body?: ReactNode | null;
}

export interface InstructionListProps {
  instructions: Instruction[];
}

export const InstructionList: React.FunctionComponent<InstructionListProps>;
