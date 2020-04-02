import React from 'react';
import Image from './';
import '@testing-library/jest-dom';

import { render, waitFor } from '@testing-library/react';

import * as imageUtils from './utils/isImageValid';
import * as useIsVisibleUtils from '../hooks/useIsVisible/UseIsVisible';

const props = {
  id: 'id',
  src: 'https://www.a-valid-src.png/',
  alt: 'test',
  className: 'className',
  withLazy: false,
};

describe('Image', () => {
  beforeEach(() => {
    jest.spyOn(imageUtils, 'isImageValid');
    imageUtils.isImageValid = jest.fn(() => Promise.resolve(true));
  });

  afterEach(() => {
    imageUtils.isImageValid.mockRestore();
  });

  describe('when withLazy is not enabled', () => {
    it(`renders image`, () => {
      const { getAllByRole } = render(<Image {...props} />);
      const images = getAllByRole('img');
      const image = images[0];
      expect(images.length).toBe(1);
      expect(image.src).toEqual(props.src);
      expect(image.id).toEqual(props.id);
      expect(image.alt).toEqual(props.alt);
    });

    it('calls onLoad when valid src is provided', async () => {
      const onLoad = jest.fn();
      await render(<Image {...props} onLoad={onLoad} />);

      expect(onLoad).toHaveBeenCalledTimes(1);
      imageUtils.isImageValid.mockRestore();
    });

    it('calls onError when invalid src is provided', async () => {
      imageUtils.isImageValid = jest.fn(() => Promise.reject({ erroEvent: {} }));
      const onError = jest.fn();
      render(<Image {...props} onError={onError} />);

      await waitFor(() => expect(onError).toHaveBeenCalledTimes(1));
      expect(onError).toHaveBeenCalledWith({ erroEvent: {} });
    });
  });
  describe('when withLazy is enabled', () => {
    it('renders the image with null src if element is not visible', () => {
      jest.spyOn(useIsVisibleUtils, 'useIsVisible').mockReturnValue([false]);

      const { getAllByRole } = render(<Image {...props} withLazy />);
      const images = getAllByRole('img');
      const image = images[0];
      expect(images.length).toBe(1);
      expect(image.src).toEqual('');
    });
    it('renders the image with src if element is  visible', () => {
      jest.spyOn(useIsVisibleUtils, 'useIsVisible').mockReturnValue([true]);

      const { getAllByRole } = render(<Image {...props} withLazy />);
      const images = getAllByRole('img');
      const image = images[0];
      expect(images.length).toBe(1);
      expect(image.src).toEqual(props.src);
    });
  });
});
