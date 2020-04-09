import React from 'react';
import Markdwon from './Markdown';

export default {
  component: Markdwon,
  title: 'Markdwon',
};

export const basic = () => {
  return (
    <>
      <Markdwon value="Hello *world*" />
      <Markdwon value="Hello # Heading 1" />
    </>
  );
};
