import { useState, useEffect } from 'react';

const ObserverParams = {
  threshold: 0.1,
};

export const useIsVisible = elRef => {
  const [isVisible, setIsVisible] = useState(false);

  const isValidRef = () => {
    return elRef && elRef.current;
  };

  const handleOnIntersect = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(elRef.current);
      }
    });
  };

  useEffect(() => {
    let observer;
    let didCancel = false;
    if (!isVisible) {
      if (isValidRef()) {
        // Check if window is define for SSaR.
        if (window && window.IntersectionObserver && !didCancel) {
          observer = new IntersectionObserver(handleOnIntersect, ObserverParams);
          observer.observe(elRef.current);
        } else {
          // Old browsers fallback
          setIsVisible(true);
        }
      } else {
        // if the elRef is not valid.
        setIsVisible(true);
      }
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
  return [isVisible];
};
