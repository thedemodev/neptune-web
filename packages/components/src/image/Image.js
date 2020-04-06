import React, { useRef } from 'react';
import Types from 'prop-types';
import { useHasIntersected } from '../hooks';

/**
 * Image.
 *
 * @param {string} [alt] - string that contains the alt text.
 * @param {string} [src] - string that contains the src text.
 * @param {string} [id] - string that contains the id text.
 * @param {function} [onLoad] - function that contains load callback.
 * @param {function} [onError] - function that contains error callback.
 * @param {boolean} [withLazy] - enables lazy loadind callback.
 *
 * @usage `<Image alt="alt" src="src" id="id1" onLoad={()=>{}} onError={())=>{}} withLazy={true} />`
 * */

const Image = ({ id, src, alt, onLoad, onError, className, withLazy }) => {
  const imageRef = useRef();
  // This needs to be always included because hooks cannot be called inside conditions/loops.
  const [hasIntersected] = useHasIntersected(imageRef);
  let imageSrc = src;

  // Prevent load if image is not visible and lazyload is enabled.
  if (withLazy && !hasIntersected) {
    imageSrc = null;
  }

  return (
    <img
      id={id}
      alt={alt}
      src={imageSrc}
      className={className}
      ref={imageRef}
      onLoad={onLoad}
      onError={e => onError(e)}
    />
  );
};

Image.propTypes = {
  id: Types.string,
  src: Types.string,
  alt: Types.string,
  onLoad: Types.func,
  onError: Types.func,
  className: Types.string,
  withLazy: Types.bool,
};

Image.defaultProps = {
  id: null,
  src: '',
  alt: '',
  className: '',
  onLoad: () => {},
  onError: () => {},
  withLazy: false,
};

export default Image;
