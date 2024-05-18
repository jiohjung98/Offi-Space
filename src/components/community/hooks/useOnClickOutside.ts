import { RefObject, useEffect } from 'react';

export default function useOnClickOutside<T extends HTMLElement>(
  ref: RefObject<T>,
  handler: (event: MouseEvent | TouchEvent) => void
) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };

    const isTouchEvent = (event: MouseEvent | TouchEvent): event is TouchEvent =>
      'touches' in event;

    const mousedownHandler = (event: MouseEvent) => {
      if (!isTouchEvent(event)) {
        listener(event);
      }
    };

    const touchstartHandler = (event: TouchEvent) => {
      if (isTouchEvent(event)) {
        listener(event);
      }
    };

    document.addEventListener('mousedown', mousedownHandler);
    document.addEventListener('touchstart', touchstartHandler);

    return () => {
      document.removeEventListener('mousedown', mousedownHandler);
      document.removeEventListener('touchstart', touchstartHandler);
    };
  }, [ref, handler]);
}
