import React from 'react';

const useClickOutside = (
  ref: React.RefObject<Element>,
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!ref.current || ref.current.contains(e.target)) {
        console.log(e.target);
      } else {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', (e) => handleClickOutside(e));

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, setIsMenuOpen]);
};

export default useClickOutside;
