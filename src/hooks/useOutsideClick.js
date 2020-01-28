import { useEffect } from 'react';

export default function useOutsideClick(onOutsideClick, elementRef) {
  useEffect(() => {
    const handleClick = e => elementRef.current && !elementRef.current.contains(e.target) && onOutsideClick(e)
    if (elementRef.current) {
      document.addEventListener('click', handleClick)
    }
    return () => document.removeEventListener('click', handleClick)
  }, [onOutsideClick, elementRef])
}