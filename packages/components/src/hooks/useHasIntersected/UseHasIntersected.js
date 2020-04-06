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
  const [hasIntersected, setHasIntersected] = useState(false);

  const isValidRef = () => {
    return elRef && elRef.current;
  };

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
    // Check if window is define for SSR.
    if (!window || !window.IntersectionObserver || !isValidRef()) {
      // Old browsers fallback
      setHasIntersected(true);
    } else if (!didCancel) {
      observer = new IntersectionObserver(handleOnIntersect, ObserverParams);
      observer.observe(elRef.current);
    }
    // Cleanup function that runs for every render and on unmount and clean the previous render value.
    return () => {
      didCancel = true;
      // on component cleanup, we remove the listener if it has been created.
      if (observer) {
        observer.unobserve(elRef.current);
      }
    };
  }, [elRef]);
  return [hasIntersected];
};
