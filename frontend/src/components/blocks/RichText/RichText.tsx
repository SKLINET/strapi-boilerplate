import React, { ReactElement, useRef } from 'react';
import styles from './RichText.module.scss';
import clsx from 'clsx';
import { RichTextBlockProps } from '../../../blocks/RichTextBlock/RichTextBlock';
import { useIsVisible } from '../../../utils/hooks/useIsVisible';
import { RichText as _RichText } from '../../primitives/RichText/RichText';

export type RichTextProps = {
    blocksData: RichTextBlockProps['blocksData'];
    app: RichTextBlockProps['app'];
};

const RichText = ({ blocksData: { content }, app }: RichTextProps): ReactElement => {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible] = useIsVisible(ref);

    return (
        <div className={clsx(styles.wrapper, isVisible && styles.isVisible)} ref={ref}>
            {content && <_RichText content={content} />}
        </div>
    );
};

export { RichText };
