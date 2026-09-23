import { useEffect, RefObject } from 'react';

export type ITriggerPosition = 'middle' | 'middle-bottom' | 'bottom';

export const useOnScroll = (
    ref: RefObject<any> | null | undefined,
    triggerPosition: ITriggerPosition,
    callback: () => void,
) => {
    useEffect(() => {
        const handleScroll = () => {
            if (!ref || !ref.current) return;

            const { innerHeight, scrollY } = window;

            const topOffset = Math.round(scrollY + ref.current.getBoundingClientRect().top);

            switch (triggerPosition) {
                case 'middle':
                    if (scrollY + (innerHeight * 1) / 2 >= topOffset) {
                        callback();
                    }
                    break;
                case 'middle-bottom':
                    if (scrollY + (innerHeight * 3) / 4 >= topOffset) {
                        callback();
                    }
                    break;
                case 'bottom':
                    if (scrollY + innerHeight >= topOffset) {
                        callback();
                    }
                    break;
                default:
                    break;
            }
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [callback, ref, triggerPosition]);
};
