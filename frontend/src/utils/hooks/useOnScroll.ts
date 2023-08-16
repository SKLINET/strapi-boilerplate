import { useEffect, RefObject } from 'react';

export type ITriggerPosition = 'middle' | 'middle-bottom' | 'bottom';

export const useOnScroll = (
    ref: RefObject<any> | null | undefined,
    triggerPosition: ITriggerPosition,
    callback: () => void,
) => {
    useEffect(() => {
        let timeout: NodeJS.Timeout | null = null;

        const handleScroll = () => {
            if (!ref || !ref.current) return;

            const { innerHeight, pageYOffset } = window;

            const topOffset = Math.round(pageYOffset + ref.current.getBoundingClientRect().top);

            switch (triggerPosition) {
                case 'middle':
                    if (pageYOffset + (innerHeight * 1) / 2 >= topOffset) {
                        callback();
                    }
                    break;
                case 'middle-bottom':
                    if (pageYOffset + (innerHeight * 3) / 4 >= topOffset) {
                        callback();
                    }
                    break;
                case 'bottom':
                    if (pageYOffset + innerHeight >= topOffset) {
                        callback();
                    }
                    break;
                default:
                    break;
            }
        };

        timeout = setTimeout(() => handleScroll(), 150);
        window.addEventListener('scroll', () => handleScroll(), { passive: true });

        return () => {
            if (timeout) clearTimeout(timeout);
            window.removeEventListener('scroll', () => handleScroll());
        };
    }, [callback, ref, triggerPosition]);
};
