import React, { ReactElement, useRef, useEffect } from 'react';
import styles from './BigNumber.module.scss';
import clsx from 'clsx';
import { IBigNumber } from '../../../types/bigNumber';
import { Paragraph } from '../../primitives/Paragraph/Paragraph';

export interface BigNumberProps {
    data: IBigNumber;
    allowIncrement?: boolean;
    className?: string;
}

// In milliseconds
const COUNTING_DURATION = 1500;

const INCREMENT_MIN_DELAY = COUNTING_DURATION * 0.004;

const BigNumber = ({
    data: { value, additionLabel, content },
    allowIncrement = false,
    className,
}: BigNumberProps): ReactElement => {
    const realValueRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (!realValueRef || !realValueRef.current || !allowIncrement) return;

        if (value <= 0) return;

        let interval: NodeJS.Timeout | null = null;

        realValueRef.current.innerText = '0';
        let _increment = 1;
        let _duration = (COUNTING_DURATION / value) * _increment;

        while (_duration < INCREMENT_MIN_DELAY) {
            _increment = _increment + 1;
            _duration = (COUNTING_DURATION / value) * _increment;
        }

        _duration = Math.round(_duration);

        interval = setInterval(() => {
            if (realValueRef && realValueRef.current) {
                const _newValue = Number(realValueRef.current.innerText) + _increment;

                realValueRef.current.innerText = _newValue.toString();

                if (_newValue >= value && interval) clearInterval(interval);
            }
        }, _duration);

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [realValueRef, value, allowIncrement]);

    return (
        <div className={clsx(styles.wrapper, className)}>
            <div className={styles.valueWrapper}>
                <Paragraph className={clsx(styles.value, styles.fake)}>
                    {value}
                    {additionLabel ? additionLabel : ''}
                </Paragraph>
                <p className={clsx(styles.value, styles.real)}>
                    <span ref={realValueRef}>0</span>
                    {additionLabel ? additionLabel : ''}
                </p>
            </div>
            <Paragraph className={styles.content}>{content}</Paragraph>
        </div>
    );
};

export { BigNumber };
