import React, { ReactElement } from 'react';
import styles from './Icon.module.scss';
import clsx from 'clsx';

import Alert from '../../../../../public/icons/alert.svg';
import Edit from '../../../../../public/icons/edit.svg';
import Exit from '../../../../../public/icons/exit.svg';
import Loader from '../../../../../public/icons/loader.svg';
import Play from '../../../../../public/icons/play.svg';
import SklinetRound from '../../../../../public/icons/sklinet-logo.svg';
import Sklinet from '../../../../../public/icons/sklinet.svg';
import Symbio from '../../../../../public/icons/symbio.svg';
import Tick from '../../../../../public/icons/tick.svg';

export type Icons =
    | 'alert'
    | 'edit'
    | 'exit'
    | 'loader'
    | 'play'
    | 'sklinet-round'
    | 'sklinet'
    | 'symbio'
    | 'tick'
    | '';

export const getIconName = (name: string): Icons => {
    let _name: Icons = '';

    switch (name) {
        case '':
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
            case 'alert':
                return <Alert />;
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
            case 'symbio':
                return <Symbio />;
            case 'tick':
                return <Tick />;
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
