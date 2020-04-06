import { renderHook } from '@testing-library/react-hooks';
import useHasIntersected from '.';

describe('useHasIntersected', () => {
  const originalIntersectionObserver = window.IntersectionObserver;
  let observe;
  let unobserve;

  beforeEach(() => {
    observe = jest.fn();
    unobserve = jest.fn();
  });
  afterEach(() => {
    window.IntersectionObserver = originalIntersectionObserver;
  });

  describe('when element is not visible', () => {
    it('returns true if ref is an invalid ref', () => {
      const invalidRef = null;
      const { result } = renderHook(() => useHasIntersected(invalidRef));
      expect(result.current).toEqual([true]);
    });
    it('returns true if ref is valid and IntersectionObserver is not supported', () => {
      window.IntersectionObserver = null;

      const validRef = { current: 'a valid ref' };
      const { result } = renderHook(() => useHasIntersected(validRef));
      expect(result.current).toEqual([true]);
    });
    it('returns false if ref is valid', () => {
      window.IntersectionObserver = jest.fn(callback => {
        callback([{ isIntersecting: false }], { unobserve });
        return {
          observe,
          unobserve,
        };
      });

      const validRef = { current: 'a valid ref' };
      const { result } = renderHook(() => useHasIntersected(validRef));
      expect(result.current).toEqual([false]);
    });
  });

  describe('when element is visible', () => {
    it('returns true if ref is valid and IntersectionObserver is supported', () => {
      window.IntersectionObserver = jest.fn(callback => {
        callback([{ isIntersecting: true }], { unobserve });
        return {
          observe,
          unobserve,
        };
      });

      const validRef = { current: 'a valid ref' };
      const { result } = renderHook(() => useHasIntersected(validRef));
      expect(observe).toHaveBeenCalledTimes(1);
      expect(result.current).toEqual([true]);
    });

    it('calls observer', () => {
      window.IntersectionObserver = jest.fn(() => ({
        observe,
        unobserve,
      }));

      const validRef = { current: 'a valid ref' };
      renderHook(() => useHasIntersected(validRef));
      expect(observe).toHaveBeenCalledTimes(1);
      expect(observe).toHaveBeenCalledWith(validRef.current);
      expect(unobserve).not.toHaveBeenCalled();
    });
  });

  describe('calls unobserve', () => {
    it('when element is intersecting ', () => {
      window.IntersectionObserver = jest.fn(callback => {
        callback([{ isIntersecting: true }], { unobserve });
        return {
          observe,
          unobserve,
        };
      });

      const validRef = { current: 'a valid ref' };
      renderHook(() => useHasIntersected(validRef));
      expect(unobserve).toHaveBeenCalledTimes(1);
      expect(unobserve).toHaveBeenCalledWith(validRef.current);
    });
  });
});
