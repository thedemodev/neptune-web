import React from 'react';
import Image from './Image';
import { action } from '@storybook/addon-actions';

import { text, boolean } from '@storybook/addon-knobs';

export default {
  component: Image,
  title: 'Image',
};

export const basic = () => {
  const src = text('src', 'https://i.picsum.photos/id/1025/600/200.jpg');
  const withLazy = boolean('withLazy', true);

  return (
    <>
      <Image
        alt="test"
        src={src}
        id="id1"
        onLoad={console.log('load 1')}
        onError={e => action(e)}
        withLazy={withLazy}
        className="m-t-5"
      />
      <Image
        alt="test"
        src={src}
        id="id2"
        onLoad={console.log('load 2')}
        onError={e => action(e)}
        withLazy={withLazy}
        className="m-t-5"
      />
      <Image
        alt="test"
        src={src}
        id="id3"
        onLoad={console.log('load 3')}
        onError={e => action(e)}
        withLazy={withLazy}
        className="m-t-5"
      />
    </>
  );
};
