import React, { ReactElement, useRef } from 'react';
import styles from './Error.module.scss';
import clsx from 'clsx';
import { ErrorBlockProps } from '../../../blocks/ErrorBlock/ErrorBlock';
import { useIsVisible } from '../../../utils/hooks/useIsVisible';
import { Heading } from '../../primitives/Heading/Heading';
import { Paragraph } from '../../primitives/Paragraph/Paragraph';

export type ErrorProps = {
    blocksData: ErrorBlockProps['blocksData'];
    app: ErrorBlockProps['app'];
};

const Error = ({ blocksData: { title, description }, app }: ErrorProps): ReactElement => {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible] = useIsVisible(ref);

    return (
        <div className={clsx(styles.wrapper, isVisible && styles.isVisible)} ref={ref}>
            <Heading tag="h1">{title}</Heading>
            {description && <Paragraph>{description}</Paragraph>}
        </div>
    );
};

export { Error };
