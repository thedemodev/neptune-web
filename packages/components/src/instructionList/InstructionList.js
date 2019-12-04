import React from 'react';
import Types from 'prop-types';
import HelpCircleIcon from '@transferwise/icons/react/help-circle';

import Popover from '../popover';

import './InstructionList.css';

const InstructionList = ({ instructions }) => {
  const items = instructions.map(({ icon, text, help, body }, i) => {
    return (
      // eslint-disable-next-line react/no-array-index-key
      <div key={i} className="instruction m-t-3">
        <div className="instruction__main">
          <div className="instruction__icon m-r-2">{icon}</div>
          <div className="instruction__text">
            <div>
              <strong>{text}</strong>
            </div>
          </div>
          {help && (
            <div className="instruction__help m-l-2">
              <Popover preferredPlacement="top" title={help.title} content={help.content}>
                <HelpCircleIcon size="sm" />
              </Popover>
            </div>
          )}
        </div>
        {body && <div className="instruction__body m-t-1">{body}</div>}
      </div>
    );
  });

  return <div className="instruction-list">{items}</div>;
};

InstructionList.propTypes = {
  instructions: Types.arrayOf(
    Types.shape({
      icon: Types.node.isRequired,
      text: Types.node.isRequired,
      help: Types.shape({
        title: Types.node,
        content: Types.node.isRequired,
      }),
      body: Types.node,
    }),
  ).isRequired,
};

export default InstructionList;
