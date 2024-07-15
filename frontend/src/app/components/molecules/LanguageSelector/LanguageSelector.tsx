'use client';

import React, { ReactElement, useCallback } from 'react';
import styles from './LanguageSelector.module.scss';
import clsx from 'clsx';
import { IApp } from '../../../../types/base/app';
import { getTranslatedUrl } from '../../../../utils/base/getTranslatedUrl';

interface LanguageSelectorProps {
    app: IApp;
    className?: string;
}

const LanguageSelector = ({ app, className }: LanguageSelectorProps): ReactElement => {
    const changeLocale = useCallback(
        (e: string) => {
            const url = getTranslatedUrl(e, app);

            if (url) {
                window.location.href = url;
            }
        },
        [app],
    );

    return (
        <button
            type="button"
            onClick={() => changeLocale(app.locale === 'cs' ? 'en' : 'cs')}
            className={clsx(styles.wrapper, className)}
            aria-label={'Change locale'}
        >
            {app.locale === 'cs' ? 'EN' : 'CS'}
        </button>
    );
};

export { LanguageSelector };
