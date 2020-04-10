import React from 'react';
import Image from './';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import * as useHasIntersectedUtils from '../common/hooks/useHasIntersected/useHasIntersected';
import { EmptyTransparentImage } from './Image';

const props = {
  id: 'id',
  src: 'https://www.a-valid-src.png/',
  alt: 'test',
  className: 'className',
  loading: 'lazy',
};

describe('Image', () => {
  describe('when lazy loading is not enabled', () => {
    it(`renders image`, () => {
      const { getAllByRole } = render(<Image {...props} loading="eager" />);
      const images = getAllByRole('img');
      expect(images).toHaveLength(1);
      const image = images[0];
      expect(image.src).toEqual(props.src);
      expect(image.id).toEqual(props.id);
      expect(image.alt).toEqual(props.alt);
    });
  });

  describe('when lazy loading is enabled', () => {
    it('renders the image with EmptyTransparentImage if element is not visible', () => {
      jest.spyOn(useHasIntersectedUtils, 'useHasIntersected').mockReturnValue([false]);

      const { getAllByRole } = render(<Image {...props} />);
      const images = getAllByRole('img');
      const image = images[0];
      expect(images.length).toBe(1);
      expect(image.src).toEqual(EmptyTransparentImage);
    });
    it('renders the image with src if element is visible', () => {
      jest.spyOn(useHasIntersectedUtils, 'useHasIntersected').mockReturnValue([true]);

      const { getAllByRole } = render(<Image {...props} />);
      const images = getAllByRole('img');
      const image = images[0];
      expect(images.length).toBe(1);
      expect(image.src).toEqual(props.src);
    });
  });
});
