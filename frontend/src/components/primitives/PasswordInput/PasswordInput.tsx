import React, { ReactElement, useState } from 'react';
import styles from './PasswordInput.module.scss';
import clsx from 'clsx';
import { Icon } from '../Icon/Icon';
import { UseFormRegister } from 'react-hook-form';

export interface PasswordInputProps {
    name: string;
    register: UseFormRegister<any>;
    error: string | undefined;
    placeholder?: string;
    className?: string;
}

const PasswordInput = ({ name, register, error, placeholder, className }: PasswordInputProps): ReactElement => {
    const [show, setShow] = useState<boolean>(false);

    return (
        <div className={clsx(styles.wrapper, className)}>
            <div className={styles.content}>
                <input
                    type={show ? 'text' : 'password'}
                    {...register(name)}
                    placeholder={placeholder}
                    autoComplete="off"
                    className={styles.input}
                />
                <Icon name={show ? 'hide' : 'show'} onClick={() => setShow(!show)} className={styles.icon} />
            </div>
            {error && <p className={styles.error}>{error}</p>}
        </div>
    );
};

export { PasswordInput };
