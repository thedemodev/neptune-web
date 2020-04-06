import { useState, useEffect } from 'react';

const ObserverParams = {
  threshold: 0.1,
};

/**
 * useHasIntersected.
 * Use this custom hook to detect when an element has became visible inside the viewport. This hook checks only if the intersection happend.
 * Once the intersection has happened the hook will not return false even if the element gets out of the viewport.
 *
 * @param {object} [elRef] - node object that contains a react reference to the element that needs to be observed.
 *
 * @usage `const [hasIntersected] = useHasIntersected(imageRef);`
 * */
export const useHasIntersected = elRef => {
  const isValidRef = () => {
    return elRef && elRef.current;
  };

  const [hasIntersected, setHasIntersected] = useState(false);

  const handleOnIntersect = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setHasIntersected(true);
        observer.unobserve(elRef.current);
      }
    });
  };

  useEffect(() => {
    let observer;
    let didCancel = false;

    // Check if window is define for SSR and Old browsers fallback
    if (typeof window === 'undefined' || !window.IntersectionObserver) {
      return [true];
    }

    if (!isValidRef()) {
      setHasIntersected(true);
    }
    if (!didCancel) {
      observer = new IntersectionObserver(handleOnIntersect, ObserverParams);
      observer.observe(elRef.current);
    }
    return () => {
      didCancel = true;
      if (observer) {
        observer.unobserve(elRef.current);
      }
    };
  }, [elRef]);
  return [hasIntersected];
};
