import React, { ReactElement } from 'react';
import styles from './Icon.module.scss';
import clsx from 'clsx';
import dynamic from 'next/dynamic';

const Edit = dynamic(() => import('../../../../../public/icons/edit.svg'));
const Exit = dynamic(() => import('../../../../../public/icons/exit.svg'));

// Loader is special icon
import Loader from '../../../../../public/icons/loader.svg';

const Play = dynamic(() => import('../../../../../public/icons/play.svg'));
const SklinetRound = dynamic(() => import('../../../../../public/icons/sklinet-logo.svg'));
const Sklinet = dynamic(() => import('../../../../../public/icons/sklinet.svg'));

export type Icons = 'edit' | 'exit' | 'loader' | 'play' | 'sklinet-round' | 'sklinet' | '';

export const getIconName = (name: string): Icons => {
    let _name: Icons = '';

    switch (name) {
        case 'edit':
        case 'exit':
        case 'loader':
        case 'play':
        case 'sklinet-round':
        case 'sklinet':
            _name = name;
            break;
    }

    return _name;
};

export interface IconProps {
    name: Icons;
    onClick?: () => void;
    className?: string;
}

const Icon = ({ name, onClick, className }: IconProps): ReactElement => {
    const renderIcon = (name: Icons): JSX.Element => {
        switch (name) {
            case 'edit':
                return <Edit />;
            case 'exit':
                return <Exit />;
            case 'loader':
                return <Loader />;
            case 'play':
                return <Play />;
            case 'sklinet-round':
                return <SklinetRound />;
            case 'sklinet':
                return <Sklinet />;
            default:
                return <></>;
        }
    };

    if (name === '') return <></>;

    return (
        <span className={clsx(styles.wrapper, className)} onClick={onClick}>
            {renderIcon(name)}
        </span>
    );
};

export { Icon };
