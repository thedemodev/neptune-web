import React, { ReactNode } from 'react';

export interface Instruction {
  icon: ReactNode;
  text: ReactNode;
  help?: {
    title?: ReactNode;
    content: ReactNode;
  } | null;
  body?: ReactNode;
}

export interface InstructionListProps {
  instructions: Instruction[];
}

export const InstructionList: React.FunctionComponent<InstructionListProps>;
