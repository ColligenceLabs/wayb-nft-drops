import { useEffect, useState } from 'react';

const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  useEffect(() => {
    const onResize = () => {
      setScreenSize(window.innerWidth);
    };

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return screenSize;
};
export default useScreenSize;
