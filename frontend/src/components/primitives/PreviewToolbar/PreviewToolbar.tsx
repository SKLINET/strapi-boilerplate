import Link from 'next/link';
import React, { ReactElement } from 'react';
import { ReactNode } from 'react';
import styles from './PreviewToolbar.module.scss';

const PreviewToolbar = (): ReactElement | null => {
    const leavePreview = () => {
        alert('leaving preview mode');
    };
    return (
        <div className={styles.toolbar}>
            <p>PREVIEW TOOLBAR</p>
            <Link className={styles.button} onClick={leavePreview} href={'/api/exit-preview'} prefetch={false}>
                Odísť z preview módu
            </Link>
        </div>
    );
};

PreviewToolbar.whyDidYouRender = true;

export { PreviewToolbar };
