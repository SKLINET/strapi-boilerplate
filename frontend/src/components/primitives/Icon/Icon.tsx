import React, { ReactElement } from 'react';
import styles from './Icon.module.scss';
import clsx from 'clsx';
import dynamic from 'next/dynamic';
import config from '../../../../sklinet.config.json';

const ArrowLeft = dynamic(() => import('../../../../public/icons/arrow-left.svg'));
const ArrowRight = dynamic(() => import('../../../../public/icons/arrow-right.svg'));
const Hide = dynamic(() => import('../../../../public/icons/hide.svg'));
const Loader = dynamic(() => import('../../../../public/icons/loader.svg'));
const Show = dynamic(() => import('../../../../public/icons/show.svg'));
const Sklinet = dynamic(() => import('../../../../public/icons/sklinet.svg'));
const Tick = dynamic(() => import('../../../../public/icons/tick.svg'));
const Trash = dynamic(() => import('../../../../public/icons/trash.svg'));
const SklinetRound = dynamic(() => import('../../../../public/icons/sklinet-logo.svg'));
const Exit = dynamic(() => import('../../../../public/icons/exit.svg'));
const Edit = dynamic(() => import('../../../../public/icons/edit.svg'));

export type Icons =
    | 'arrowLeft'
    | 'arrowRight'
    | 'hide'
    | 'loader'
    | 'show'
    | 'sklinet'
    | 'tick'
    | 'trash'
    | 'sklinet-round'
    | 'exit'
    | 'edit'
    | '';

export const getIconName = (name: string): Icons => {
    let _name: Icons = '';

    switch (name) {
        case 'arrowLeft':
        case 'arrowRight':
        case 'hide':
        case 'loader':
        case 'show':
        case 'sklinet':
        case 'tick':
        case 'trash':
        case 'sklinet-round':
        case 'exit':
        case 'edit':
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
    if (name === '') return <></>;

    const renderIcon = (name: Icons): JSX.Element => {
        switch (name) {
            case 'arrowLeft':
                return <ArrowLeft />;
            case 'arrowRight':
                return <ArrowRight />;
            case 'hide':
                return <Hide />;
            case 'loader':
                return <Loader />;
            case 'show':
                return <Show />;
            case 'sklinet':
                return <Sklinet />;
            case 'tick':
                return <Tick />;
            case 'trash':
                return <Trash />;
            case 'sklinet-round':
                return <SklinetRound />;
            case 'exit':
                return <Exit />;
            case 'edit':
                return <Edit />;
            default:
                return <></>;
        }
    };
    return (
        <span className={clsx(styles.wrapper, className)} onClick={onClick}>
            {renderIcon(name)}
        </span>
    );
};

Icon.whyDidYouRender = config.whyDidYouRender.active;

export { Icon };
