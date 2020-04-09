import React from 'react';
import Types from 'prop-types';
import commonmark from 'commonmark';

const Markdown = ({ value }) => {
  const reader = new commonmark.Parser();
  const writer = new commonmark.HtmlRenderer({ safe: true });

  if (!value) {
    return null;
  }

  const createMarkup = () => {
    const parsed = reader.parse(value);
    const __html = writer.render(parsed);

    return { __html };
  };

  return <div dangerouslySetInnerHTML={createMarkup()} />;
};

Markdown.propTypes = {
  value: Types.string.isRequired,
};

export default Markdown;
