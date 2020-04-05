import React from 'react';
import Image from './Image';
import { action } from '@storybook/addon-actions';

import { text, boolean } from '@storybook/addon-knobs';

export default {
  component: Image,
  title: 'Image',
};

export const basic = () => {
  const src = text('src', 'https://i.picsum.photos/id/1025/600/300.jpg');
  const withLazy = boolean('withLazy', true);

  return (
    <Image
      alt="test"
      src={src}
      id="id1"
      onLoad={action('load')}
      onError={e => action(e)}
      withLazy={withLazy}
    />
  );
};
