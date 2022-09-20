import React, { ReactElement } from 'react';
import dynamic from 'next/dynamic';
import styles from './Icon.module.scss';
import clsx from 'clsx';

const ArrowLeft = dynamic(import('../../../../public/icons/arrow-left.svg'));
const ArrowRight = dynamic(import('../../../../public/icons/arrow-right.svg'));
const Hide = dynamic(import('../../../../public/icons/hide.svg'));
const Loader = dynamic(import('../../../../public/icons/loader.svg'));
const Show = dynamic(import('../../../../public/icons/show.svg'));
const Sklinet = dynamic(import('../../../../public/icons/sklinet.svg'));
const Tick = dynamic(import('../../../../public/icons/tick.svg'));
const Trash = dynamic(import('../../../../public/icons/trash.svg'));

export type Icons = 'arrowLeft' | 'arrowRight' | 'hide' | 'loader' | 'show' | 'sklinet' | 'tick' | 'trash' | '';

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

Icon.whyDidYouRender = true;

export { Icon };
