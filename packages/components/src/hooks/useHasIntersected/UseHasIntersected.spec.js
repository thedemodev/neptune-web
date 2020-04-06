import { renderHook } from '@testing-library/react-hooks';
import useHasIntersected from '.';

describe('useHasIntersected', () => {
  const originalIntersectionObserver = window.IntersectionObserver;

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
      window.IntersectionObserver = originalIntersectionObserver;
    });
  });

  describe('when element is visible', () => {
    it('returns true if ref is valid and IntersectionObserver is supported', () => {
      const observe = jest.fn();
      const unobserve = jest.fn();
      window.IntersectionObserver = jest.fn(callback => {
        callback([{ isIntersecting: true }], { unobserve });
        return {
          observe,
          unobserve,
        };
      });

      const validRef = { current: 'a valid ref' };
      const { result } = renderHook(() => useHasIntersected(validRef));
      expect(result.current).toEqual([true]);
    });

    it('calls observer', () => {
      const observe = jest.fn();
      const unobserve = jest.fn();
      window.IntersectionObserver = jest.fn(() => ({
        observe,
        unobserve,
      }));

      const validRef = { current: 'a valid ref' };
      renderHook(() => useHasIntersected(validRef));

      expect(observe).toHaveBeenCalledWith(validRef.current);
      expect(unobserve).not.toHaveBeenCalledWith();
    });
  });

  describe('calls unobserve', () => {
    it('when element is intersecting ', () => {
      const observe = jest.fn();
      const unobserve = jest.fn();
      window.IntersectionObserver = jest.fn(callback => {
        callback([{ isIntersecting: true }], { unobserve });
        return {
          observe,
          unobserve,
        };
      });
      const validRef = { current: 'a valid ref' };
      renderHook(() => useHasIntersected(validRef));

      expect(unobserve).toHaveBeenCalledWith(validRef.current);
    });
  });
});
