'use client';

import React, { ReactElement, useRef, useEffect } from 'react';
import styles from './BigNumber.module.scss';
import clsx from 'clsx';
import { Paragraph } from '../../primitives/Paragraph/Paragraph';
import { useCountUp } from 'react-countup';
import { countDecimals } from '../../../../utils/countDecimals';
import { getFormattedPrice } from '../../../../utils/getFormattedPrice';

export interface BigNumberProps {
    data: {
        id: string;
        value: number;
        additionLabel: string | null;
    };
    allowIncrement?: boolean;
    className?: string;
}

const BigNumber = ({
    data: { value, additionLabel },
    allowIncrement = false,
    className,
}: BigNumberProps): ReactElement => {
    const realValueRef = useRef<HTMLSpanElement>(null);

    const { start } = useCountUp({
        delay: 0.3,
        duration: 1.5,
        ref: realValueRef,
        start: value * 0.8,
        end: value,
        decimal: ',',
        decimals: countDecimals(value),
        separator: ' ',
        startOnMount: false,
        useEasing: true,
    });

    useEffect(() => {
        if (allowIncrement) {
            start();
        }
    }, [allowIncrement, start]);

    return (
        <div className={clsx(styles.wrapper, className)}>
            <div className={styles.valueWrapper}>
                <Paragraph className={clsx(styles.value, styles.fake)}>
                    {getFormattedPrice(value)}
                    {additionLabel ? additionLabel : ''}
                </Paragraph>
                <p className={clsx(styles.value, styles.real)}>
                    <span ref={realValueRef}>{getFormattedPrice(value * 0.8)}</span>
                    {additionLabel ? additionLabel : ''}
                </p>
            </div>
        </div>
    );
};

export { BigNumber };
