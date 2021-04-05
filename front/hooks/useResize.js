import { useState, useLayoutEffect } from 'react';

const useResize = () => {
  const [size, setSize] = useState([0, 0]);
  const [isMobile, setIsMobile] = useState(false); // < 768
  const [isTablet, setIsTablet] = useState(false); // < 1080
  const [isDesktop, setIsDekstop] = useState(false); // >= 1080

  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
      setIsMobile(window.innerWidth < 768 && window.innerWidth !== 0);
      setIsTablet(window.innerWidth < 1080 && window.innerWidth !== 0);
      setIsDekstop(window.innerWidth >= 1080 && window.innerWidth !== 0);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return { isMobile, isTablet, isDesktop, windowWidth: size[0], windowHeight: size[1] };
};

export default useResize;
