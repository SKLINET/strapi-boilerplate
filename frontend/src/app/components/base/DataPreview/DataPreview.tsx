import React, { ReactElement } from 'react';
import styles from './DataPreview.module.scss';
import clsx from 'clsx';
import { Heading } from '../../primitives/Heading/Heading';

interface DataPreviewProps {
    title: string;
    data: any;
    className?: string;
}

const DataPreview = ({ title, data, className }: DataPreviewProps): ReactElement => (
    <div className={clsx(styles.wrapper, className)}>
        <Heading tag="h2">{title}</Heading>
        <pre className="hideScrollbar">{JSON.stringify(data, null, 2)}</pre>
    </div>
);
export { DataPreview };
