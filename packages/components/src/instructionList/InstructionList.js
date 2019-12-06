import classNames from 'classnames';
import React from 'react';
import Types from 'prop-types';
import HelpCircleIcon from '@transferwise/icons/react/help-circle';

import Popover from '../popover';

import './InstructionList.css';

const InstructionList = ({ className, instructions }) => (
  <div className={classNames('instruction-list', className)}>
    {instructions.map(({ icon, text, help, body }, i) => {
      return (
        // eslint-disable-next-line react/no-array-index-key
        <div key={i} className="instruction">
          <div className="instruction__main">
            <div className="instruction__icon m-r-2">{icon}</div>
            <div className="instruction__text">
              <strong>{text}</strong>
            </div>
            {help && (
              <div className="instruction__help m-l-2">
                <Popover preferredPlacement="bottom-left" title={help.title} content={help.content}>
                  <HelpCircleIcon size="sm" />
                </Popover>
              </div>
            )}
          </div>
          {body && <div className="instruction__body m-t-1">{body}</div>}
        </div>
      );
    })}
  </div>
);

InstructionList.propTypes = {
  className: Types.string,
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

InstructionList.defaultProps = {
  className: null,
};

export default InstructionList;
