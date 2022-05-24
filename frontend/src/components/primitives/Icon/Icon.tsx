import React from 'react';
import clsx from 'clsx';
import styles from './Icon.module.scss';
import Symbio from '../../../../public/svg/symbio.svg';
import Tick from '../../../../public/svg/tick.svg';

export type Icons = 'tick' | 'symbio';

export interface IconProps {
    name: Icons;
    className?: string;
}

const Icon = ({ name, className }: IconProps): JSX.Element => {
    const renderIcon = (name: Icons): JSX.Element => {
        switch (name) {
            case 'tick':
                return <Tick />;
            case 'symbio':
                return <Symbio />;
            default:
                return <></>;
        }
    };
    return <div className={clsx(className, styles.wrapper)}>{name && renderIcon(name)}</div>;
};

Icon.whyDidYouRender = true;

export { Icon };
