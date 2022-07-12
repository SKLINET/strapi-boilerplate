import React, { ReactElement, ReactNode, useRef, useState, useEffect } from 'react';
import styles from './Slider.module.scss';
import clsx from 'clsx';

export interface SliderProps {
    // Content
    children: ReactNode;

    // Controls
    controls?: 'top' | 'bottom' | 'none';
    leftBtnContent?: ReactNode;
    rightBtnContent?: ReactNode;

    // Class names
    className?: string;
    sliderClassName?: string;
    controlsClassName?: string;

    // Controls class names
    leftBtnClassName?: string;
    rightBtnClassName?: string;
}

const Slider = ({
    children,
    controls = 'none',
    leftBtnContent,
    leftBtnClassName,
    rightBtnContent,
    rightBtnClassName,
    className,
    sliderClassName,
    controlsClassName,
}: SliderProps): ReactElement => {
    const sliderRef = useRef<HTMLDivElement>(null);

    const [activeItem, setActiveItem] = useState<number>(0);
    const [disableLeftBtn, setDisableLeftBtn] = useState<boolean>(true);
    const [disableRightBtn, setDisableRightBtn] = useState<boolean>(false);

    useEffect(() => {
        const onScroll = () => {
            if (sliderRef?.current && sliderRef.current.childNodes.length > 0) {
                const itemsRef: any[] = [...sliderRef.current.childNodes];

                const sliderWidth = sliderRef.current.clientWidth;
                const sliderScrollWidth = sliderRef.current.scrollWidth;
                const sliderScroll = sliderRef.current.scrollLeft;
                const sliderPadding = itemsRef[0].offsetLeft;

                setDisableLeftBtn(sliderScroll === 0);
                setDisableRightBtn(sliderScrollWidth <= sliderWidth + sliderScroll + 1);

                const distance = sliderPadding + sliderScroll;

                for (let i = 0; i < itemsRef.length; i++) {
                    const _width = itemsRef[i].clientWidth;
                    const _offsetLeft = itemsRef[i].offsetLeft;

                    if (_offsetLeft + _width >= distance) {
                        setActiveItem(i);
                        break;
                    }
                }
            }
        };

        if (sliderRef?.current) {
            onScroll();
            sliderRef.current.addEventListener('scroll', onScroll, { passive: true });
        }

        return () => sliderRef?.current?.removeEventListener('scroll', onScroll);
    }, [sliderRef]);

    const scrollLeft = () => {
        if (sliderRef?.current && sliderRef.current.childNodes.length > 0) {
            const itemsRef: any[] = [...sliderRef.current.childNodes];

            let _left = 0;

            if (activeItem > 0) {
                const distance = sliderRef.current.scrollLeft + itemsRef[0].offsetLeft;
                const _offsetLeft = itemsRef[activeItem].offsetLeft;

                if (distance > _offsetLeft) {
                    _left = itemsRef[activeItem].offsetLeft - itemsRef[0].offsetLeft;
                } else {
                    _left = itemsRef[activeItem - 1].offsetLeft - itemsRef[0].offsetLeft;
                }
            }

            sliderRef.current.scroll({
                left: _left,
                behavior: 'smooth',
            });
        }
    };

    const scrollRight = () => {
        if (sliderRef?.current && sliderRef.current.childNodes.length > 0) {
            const itemsRef: any[] = [...sliderRef.current.childNodes];

            sliderRef.current.scroll({
                left:
                    activeItem < itemsRef.length - 1
                        ? itemsRef[activeItem + 1].offsetLeft - itemsRef[0].offsetLeft
                        : sliderRef.current.scrollWidth,
                behavior: 'smooth',
            });
        }
    };

    const renderControls = () => {
        if (!leftBtnContent && rightBtnContent) return <></>;

        return (
            <div className={controlsClassName}>
                {leftBtnContent && (
                    <button
                        className={clsx(leftBtnClassName, disableLeftBtn && 'disable')}
                        onClick={() => scrollLeft()}
                    >
                        {leftBtnContent}
                    </button>
                )}
                {rightBtnContent && (
                    <button
                        className={clsx(rightBtnClassName, disableRightBtn && 'disable')}
                        onClick={() => scrollRight()}
                    >
                        {rightBtnContent}
                    </button>
                )}
            </div>
        );
    };

    return (
        <div className={className}>
            {controls === 'top' && renderControls()}
            <div className={clsx(styles.slider, sliderClassName)} ref={sliderRef}>
                {children}
            </div>
            {controls === 'bottom' && renderControls()}
        </div>
    );
};

export { Slider };
