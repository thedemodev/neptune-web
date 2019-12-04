import React from 'react';
import MoneyIcon from '@transferwise/icons/react/money';
import IdIcon from '@transferwise/icons/react/id';
import HomeIcon from '@transferwise/icons/react/home';

import InstructionList from './InstructionList';

const InstructionListDocs = () => {
  const instructions = [
    {
      icon: <MoneyIcon size="md" />,
      text: 'Add money to your account',
      help: {
        title: 'Add money to your account',
        content: (
          <>
            To open your account, you’ll need to add money to it at least once.
            <br />
            This isn’t a fee — it’s still your money. It just means that you’re ready to go once
            you’re verified.
          </>
        ),
      },
    },
    {
      icon: <IdIcon size="md" />,
      text: 'You uploaded you identity documents',
    },
    {
      icon: <HomeIcon size="md" />,
      text: 'You entered your card delivery address',
      body: (
        <>
          Flat 3 Chaplin House, Shepperton Road
          <br />
          London N1 2NE
          <br />
          <a href="#foo">Edit address</a>
        </>
      ),
      help: {
        title: 'Enter your card address',
        content: 'When your card is ready we’ll post it to your home address.',
      },
    },
  ];

  return (
    <div className="container">
      <section className="section">
        <div className="row m-t-4">
          <div className="col-md-6">
            <h2>Instruction list / Requirement list</h2>
            <p>Things the customer needs to do or has done.</p>
            <div className="m-t-2">
              {/* eslint-disable react/jsx-indent */}
              <pre className="tw-docs-code">{`<InstructionList instructions={[
  {
    icon: <HomeIcon size="md" />,
    text: 'You entered your card delivery address',
    body: (
      <>
        Flat 3 Chaplin House, Shepperton Road
        <br />
        London N1 2NE
        <br />
        <a href="#foo">Edit address</a>
      </>
    ),
    help: {
      title: 'Enter your card address',
      content: 'When your card is ready we’ll post it to your home address.',
    },
  }
]} />`}</pre>
              {/* eslint-enable react/jsx-indent */}
            </div>
            <p>The `icon` and `text` properties are required.</p>
          </div>
          <div className="col-md-6">
            <InstructionList instructions={instructions} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default InstructionListDocs;
