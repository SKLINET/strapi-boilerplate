'use client';

import React, { ReactElement, useState } from 'react';
import styles from './DataPreview.module.scss';
import clsx from 'clsx';
import { Heading } from '../../primitives/Heading/Heading';
import { Button } from '../../primitives/Button/Button';

interface DataPreviewProps {
    title?: string;
    data: any;
    className?: string;
}

const DataPreview = ({ title, data, className }: DataPreviewProps): ReactElement => {
    const [isFull, setIsFull] = useState(false);

    return (
        <div className={clsx(styles.wrapper, className)}>
            {title && <Heading tag="h2">{title}</Heading>}
            <pre className="hideScrollbar">{JSON.stringify(data, null, 2)}</pre>
            {!isFull && (
                <Button
                    type="outline"
                    color="black"
                    icon="arrowDown"
                    iconPosition="right"
                    onClick={() => setIsFull(true)}
                    className={styles.button}
                >
                    Zobrazit vše
                </Button>
            )}
        </div>
    );
};

export { DataPreview };
