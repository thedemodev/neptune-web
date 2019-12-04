import React from 'react';
import Types from 'prop-types';
import CloseIcon from '@transferwise/icons/react/close-circle';
import TickCircleIcon from '@transferwise/icons/react/tick-circle';

import './DosAndDonts.css';

const DosAndDonts = ({ dos, donts }) => (
  <div className="dos-and-donts">
    {dos.map((doThis, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <div className="item m-t-1" key={index}>
        <TickCircleIcon className="do" />
        <p className="m-l-2 m-b-0 text-primary">{doThis}</p>
      </div>
    ))}
    {donts.map((dont, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <div className="item m-t-1" key={index}>
        <CloseIcon className="dont" />
        <p className="m-l-2 m-b-0 text-primary">{dont}</p>
      </div>
    ))}
  </div>
);

DosAndDonts.defaultProps = {
  dos: [],
  donts: [],
};

DosAndDonts.propTypes = {
  dos: Types.arrayOf(Types.string),
  donts: Types.arrayOf(Types.string),
};

export default DosAndDonts;
