import React, { ReactElement } from 'react';
import dynamic from 'next/dynamic';
import styles from './Icon.module.scss';
import clsx from 'clsx';

const ArrowLeft = dynamic(import('../../../../public/svg/arrow-left.svg'));
const ArrowRight = dynamic(import('../../../../public/svg/arrow-right.svg'));
const Hide = dynamic(import('../../../../public/svg/hide.svg'));
const Show = dynamic(import('../../../../public/svg/show.svg'));
const Symbio = dynamic(import('../../../../public/svg/symbio.svg'));
const Tick = dynamic(import('../../../../public/svg/tick.svg'));

export type Icons = 'arrowLeft' | 'arrowRight' | 'hide' | 'show' | 'tick' | 'symbio';

export interface IconProps {
    name: Icons;
    onClick?: () => void;
    className?: string;
}

const Icon = ({ name, onClick, className }: IconProps): ReactElement => {
    const renderIcon = (name: Icons): JSX.Element => {
        switch (name) {
            case 'arrowLeft':
                return <ArrowLeft />;
            case 'arrowRight':
                return <ArrowRight />;
            case 'hide':
                return <Hide />;
            case 'show':
                return <Show />;
            case 'tick':
                return <Tick />;
            case 'symbio':
                return <Symbio />;
            default:
                return <></>;
        }
    };
    return (
        <div className={clsx(className, styles.wrapper)} onClick={onClick}>
            {name && renderIcon(name)}
        </div>
    );
};

Icon.whyDidYouRender = true;

export { Icon };
