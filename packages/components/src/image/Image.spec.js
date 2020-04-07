import React from 'react';
import Image from './';
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import * as useHasIntersectedUtils from '../hooks/useHasIntersected/UseHasIntersected';
import { EmptyTransparentImage } from './Image';

const props = {
  id: 'id',
  src: 'https://www.a-valid-src.png/',
  alt: 'test',
  className: 'className',
  loading: 'eager',
};

describe('Image', () => {
  describe('when loading is not enabled', () => {
    it(`renders image`, () => {
      const { getAllByRole } = render(<Image {...props} />);
      const images = getAllByRole('img');
      const image = images[0];
      expect(images.length).toBe(1);
      expect(image.src).toEqual(props.src);
      expect(image.id).toEqual(props.id);
      expect(image.alt).toEqual(props.alt);
    });

    it('calls onLoad when image load event fires', () => {
      const onLoad = jest.fn();
      const { getByRole } = render(<Image {...props} onLoad={onLoad} />);
      fireEvent.load(getByRole('img'));

      expect(onLoad).toHaveBeenCalledTimes(1);
    });

    it('calls onError when image error event fires', () => {
      const onError = jest.fn();
      const { getByRole } = render(<Image {...props} onError={onError} />);

      fireEvent.error(getByRole('img'));
      expect(onError).toHaveBeenCalledTimes(1);
    });
  });
  describe('when loading is enabled', () => {
    it('renders the image with EmptyTransparentImage if element is not visible', () => {
      jest.spyOn(useHasIntersectedUtils, 'useHasIntersected').mockReturnValue([false]);

      const { getAllByRole } = render(<Image {...props} loading="lazy" />);
      const images = getAllByRole('img');
      const image = images[0];
      expect(images.length).toBe(1);
      expect(image.src).toEqual(EmptyTransparentImage);
    });
    it('renders the image with src if element is  visible', () => {
      jest.spyOn(useHasIntersectedUtils, 'useHasIntersected').mockReturnValue([true]);

      const { getAllByRole } = render(<Image {...props} loading="lazy" />);
      const images = getAllByRole('img');
      const image = images[0];
      expect(images.length).toBe(1);
      expect(image.src).toEqual(props.src);
    });
  });
});
