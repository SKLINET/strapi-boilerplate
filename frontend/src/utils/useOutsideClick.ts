import { useEffect, RefObject } from 'react';

const useOutsideClick = (ref: RefObject<any>, additionRef: RefObject<any> | null, callback: () => void) => {
    const handleClick = (e: any) => {
        if (ref.current && !ref.current.contains(e.target)) {
            if (additionRef?.current && additionRef.current.contains(e.target)) {
                return null;
            }

            callback();
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        };
    });
};

export default useOutsideClick;
