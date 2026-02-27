import { ReactElement } from 'react';
import styles from './FormattedText.module.scss';
import clsx from 'clsx';
import { RichText } from '../../primitives/RichText/RichText';

interface FormattedTextProps {
    content: string;
    className?: string;
}

const FormattedText = ({ content, className }: FormattedTextProps): ReactElement => (
    <div className={clsx(styles.wrapper, className)}>
        <RichText content={content} />
    </div>
);

export { FormattedText };
