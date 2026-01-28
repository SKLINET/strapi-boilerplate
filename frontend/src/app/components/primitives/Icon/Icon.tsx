import React, { ReactElement } from 'react';
import styles from './Icon.module.scss';
import clsx from 'clsx';

import Alert from '../../../../../public/icons/alert.svg';
import ArrowDown from '../../../../../public/icons/arrow-down.svg';
import ArrowLeft from '../../../../../public/icons/arrow-left.svg';
import ArrowRight from '../../../../../public/icons/arrow-right.svg';
import Attachment from '../../../../../public/icons/attachment.svg';
import ChevronDown from '../../../../../public/icons/chevron-down.svg';
import Cross from '../../../../../public/icons/cross.svg';
import Edit from '../../../../../public/icons/edit.svg';
import Exit from '../../../../../public/icons/exit.svg';
import Facebook from '../../../../../public/icons/facebook.svg';
import GridOff from '../../../../../public/icons/grid-off.svg';
import GridOn from '../../../../../public/icons/grid-on.svg';
import Instagram from '../../../../../public/icons/instagram.svg';
import Loader from '../../../../../public/icons/loader.svg';
import Play from '../../../../../public/icons/play.svg';
import Plus from '../../../../../public/icons/plus.svg';
import SklinetRound from '../../../../../public/icons/sklinet-logo.svg';
import Sklinet from '../../../../../public/icons/sklinet.svg';
import Symbio from '../../../../../public/icons/symbio.svg';
import Tick from '../../../../../public/icons/tick.svg';

export type Icons =
    | 'alert'
    | 'arrowDown'
    | 'arrowLeft'
    | 'arrowRight'
    | 'attachment'
    | 'chevronDown'
    | 'cross'
    | 'edit'
    | 'exit'
    | 'facebook'
    | 'gridOff'
    | 'gridOn'
    | 'instagram'
    | 'loader'
    | 'play'
    | 'plus'
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
    const renderIcon = (name: Icons): ReactElement => {
        switch (name) {
            case 'alert':
                return <Alert />;
            case 'arrowDown':
                return <ArrowDown />;
            case 'arrowLeft':
                return <ArrowLeft />;
            case 'arrowRight':
                return <ArrowRight />;
            case 'attachment':
                return <Attachment />;
            case 'chevronDown':
                return <ChevronDown />;
            case 'cross':
                return <Cross />;
            case 'edit':
                return <Edit />;
            case 'exit':
                return <Exit />;
            case 'facebook':
                return <Facebook />;
            case 'gridOff':
                return <GridOff />;
            case 'gridOn':
                return <GridOn />;
            case 'instagram':
                return <Instagram />;
            case 'loader':
                return <Loader />;
            case 'play':
                return <Play />;
            case 'plus':
                return <Plus />;
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
