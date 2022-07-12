import React, { ReactElement } from 'react';
import styles from './RadioButtons.module.scss';
import clsx from 'clsx';
import { UseFormRegister } from 'react-hook-form';

export interface RadioButtonsProps {
    items: string[];
    value: string | undefined;
    name: string;
    register: UseFormRegister<any>;
    error?: string | undefined;
    className?: string;
}

const RadioButtons = ({ items, value, name, register, error, className }: RadioButtonsProps): ReactElement => {
    const renderRadioButton = (item: string) => (
        <div key={item} className={clsx(styles.element, item === value && styles.active, 'mt-2 first:mt-0')}>
            <label className={styles.content}>
                <div className={styles.column}>
                    <div className={styles.dot} />
                </div>
                <p className={styles.placeholder}>{item}</p>
                <input
                    type="radio"
                    {...register(name)}
                    name={name}
                    value={item}
                    autoComplete="off"
                    className={styles.input}
                />
            </label>
        </div>
    );

    if (items.length === 0) return <></>;

    return (
        <div className={clsx(styles.wrapper, className)}>
            {items.map((e) => renderRadioButton(e))}
            {error && <p className={styles.error}>{error}</p>}
        </div>
    );
};

export { RadioButtons };
