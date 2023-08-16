import React, { ReactElement, useRef } from 'react';
import styles from './Button.module.scss';
import clsx from 'clsx';
import { ButtonBlockProps } from '../../../blocks/ButtonBlock/ButtonBlock';
import { useIsVisible } from '../../../utils/hooks/useIsVisible';
import { Button as _Button } from '../../primitives/Button/Button';
import { getPageUrl } from '../../../utils/getPageUrl';

export type ButtonProps = {
    blocksData: ButtonBlockProps['blocksData'];
    app: ButtonBlockProps['app'];
};

const Button = ({ blocksData: { label, page, file, icon }, app }: ButtonProps): ReactElement => {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible] = useIsVisible(ref);

    return (
        <div className={clsx(styles.wrapper, isVisible && styles.isVisible)} ref={ref}>
            <_Button href={getPageUrl(page?.data?.attributes?.url || '')}>{label || ''}</_Button>
        </div>
    );
};

export { Button };
