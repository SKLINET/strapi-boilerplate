import { useEffect, RefObject } from 'react';

export const useOutsideClick = (ref: RefObject<any>, additionRef: RefObject<any> | null, callback: () => void) => {
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target)) {
                if (additionRef?.current && additionRef.current.contains(e.target)) {
                    return null;
                }

                callback();
            }
        };

        document.addEventListener('click', handleClick, { passive: true });

        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, [additionRef, callback, ref]);
};
