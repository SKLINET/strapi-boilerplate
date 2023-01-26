import { useEffect } from 'react';

const useOnScroll = (ref: any, triggerPosition: 'middle' | 'middle-bottom' | 'bottom', callback: () => void) => {
    const handleScroll = () => {
        if (ref.current) {
            let refToTop = 0;

            let element = ref.current;
            while (element.localName !== 'body') {
                refToTop += element.offsetTop;
                element = element.parentNode;
            }
            const windowToTop = window.scrollY;
            const windowHeight = window.innerHeight;

            switch (triggerPosition) {
                case 'middle':
                    if (windowToTop + (windowHeight * 1) / 2 >= refToTop) {
                        callback();
                    }
                    break;
                case 'middle-bottom':
                    if (windowToTop + (windowHeight * 3) / 4 >= refToTop) {
                        callback();
                    }
                    break;
                case 'bottom':
                    if (windowToTop + windowHeight >= refToTop) {
                        callback();
                    }
                    break;
                default:
                    break;
            }
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        setTimeout(() => handleScroll(), 100);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    });
};

export { useOnScroll };
