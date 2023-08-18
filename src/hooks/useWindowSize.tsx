import React from 'react';

function useWindowSize() {
  const [windowSize, setWindowSize] = React.useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0,
  });
  React.useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return windowSize;
}

export default useWindowSize;
