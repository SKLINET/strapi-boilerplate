import { useState, useEffect, RefObject } from 'react';
import { ITriggerPosition } from './useOnScroll';
import { useOnScroll } from './useOnScroll';
import { useRouter } from 'next/router';

export const useIsVisible = (ref: RefObject<any>, triggerPosition: ITriggerPosition = 'middle-bottom'): [boolean] => {
    const [isVisible, setIsVisible] = useState(false);

    const { asPath } = useRouter();

    useEffect(() => setIsVisible(false), [asPath]);

    useOnScroll(ref, triggerPosition, () => setIsVisible(true));

    return [isVisible];
};
