import React from 'react';
import Types from 'prop-types';
import CloseIcon from '@transferwise/icons/react/close-circle';
import TickCircleIcon from '@transferwise/icons/react/tick-circle';

import InstructionList from '../../instructionList';

import './DosAndDonts.css';

const DosAndDonts = ({ dos, donts }) => {
  return (
    <div className="dos-and-donts">
      <InstructionList
        instructions={[
          ...dos.map(text => ({
            icon: <TickCircleIcon className="do" />,
            text,
          })),
          ...donts.map(text => ({
            icon: <CloseIcon className="dont" />,
            text,
          })),
        ]}
      />
    </div>
  );
};

DosAndDonts.defaultProps = {
  dos: [],
  donts: [],
};

DosAndDonts.propTypes = {
  dos: Types.arrayOf(Types.string),
  donts: Types.arrayOf(Types.string),
};

export default DosAndDonts;
