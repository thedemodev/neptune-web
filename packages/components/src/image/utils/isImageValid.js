// OnLoad and onError event don't fire on SSR. This is a workaround that eventually will be removed in future.
// https://github.com/facebook/react/issues/15446#issuecomment-484709466

export const isImageValid = src =>
  new Promise((resolve, reject) => {
    const img = document.createElement('img');
    img.onerror = errorEvent => reject(errorEvent);
    img.onload = () => resolve();
    img.src = src;
  });
