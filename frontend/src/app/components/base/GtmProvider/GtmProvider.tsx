'use client';

import { ReactElement, ReactNode, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { GoogleTagManager } from '@next/third-parties/google';

interface GtmProviderProps {
    children: ReactNode;
    gtmCode: string | true | null;
}

const GtmProvider = ({ children, gtmCode }: GtmProviderProps): ReactElement => {
    const pathname = usePathname();
    const [currentPath, setCurrentPath] = useState(pathname);

    useEffect(() => {
        const handleURLChange = () => {
            setCurrentPath(window.location.pathname);
        };

        // history API listeners - because app router's usePathname doesn't work for this case
        window.addEventListener('popstate', handleURLChange);
        window.addEventListener('pushstate', handleURLChange);
        window.addEventListener('replacestate', handleURLChange);

        return () => {
            window.removeEventListener('popstate', handleURLChange);
            window.removeEventListener('pushstate', handleURLChange);
            window.removeEventListener('replacestate', handleURLChange);
        };
    }, []);

    const GTM_CODE = typeof gtmCode === 'string' ? gtmCode : null;

    useEffect(() => {
        const loadGTM = () => {
            if (!GTM_CODE) return;

            const script = document.createElement('script');
            script.id = 'gtm-script';
            script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_CODE}`;
            script.async = true;

            document.body.appendChild(script);

            script.onload = () => {
                if (typeof window?.ccCs !== 'undefined') {
                    window?.ccCs.init();
                }
                //
            };
        };

        const unloadGTM = () => {
            if (!GTM_CODE) return;

            const existingScript = document.getElementById('gtm-script');
            if (existingScript) {
                existingScript.remove();
            }
        };

        loadGTM();

        return () => {
            unloadGTM();
        };
    }, [currentPath, GTM_CODE]);

    useEffect(() => {
        if (typeof (window as any)?.ccCs !== 'undefined') {
            (window as any).ccCs.init();
        }
    }, [currentPath]);

    return (
        <>
            {GTM_CODE && <GoogleTagManager gtmId={String(GTM_CODE)} />}

            {children}

            {GTM_CODE && (
                <noscript
                    dangerouslySetInnerHTML={{
                        __html: `<!-- Google Tag Manager (noscript) -->
                            <iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_CODE}" height="0" width="0" style="display:none;visibility:hidden"></iframe>
                            <!-- End Google Tag Manager (noscript) -->`,
                    }}
                />
            )}
        </>
    );
};

export { GtmProvider };
