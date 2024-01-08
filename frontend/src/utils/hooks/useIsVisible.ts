import { useState, useEffect, RefObject } from 'react';
import { ITriggerPosition } from './useOnScroll';
import { useOnScroll } from './useOnScroll';
import { usePathname } from 'next/navigation';

export const useIsVisible = (
    ref: RefObject<any>,
    triggerPosition: ITriggerPosition = 'middle-bottom',
): { isVisible: boolean } => {
    const asPath = usePathname();

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => setIsVisible(false), [asPath]);

    useOnScroll(ref, triggerPosition, () => setIsVisible(true));

    return { isVisible };
};
