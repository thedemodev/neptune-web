import React from 'react';
import Types from 'prop-types';

const Markdown = ({ value }) => {
  return <>{value}</>;
};

Markdown.propTypes = {
  value: Types.string.isRequired,
};

export default Markdown;
