import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useAsPath = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams().toString();

    const [hash, setHash] = useState(() => (typeof window !== 'undefined' ? window.location.hash : ''));

    useEffect(() => {
        const getHash = () => (typeof window !== 'undefined' ? window.location.hash : '');

        const onHashChange = () => {
            setHash(getHash());
        };

        // Set initial hash
        setHash(getHash());

        // Listen for hash changes
        if (typeof window !== 'undefined') {
            window.addEventListener('hashchange', onHashChange);

            // Also listen for popstate events which can affect hash
            window.addEventListener('popstate', onHashChange);

            return () => {
                window.removeEventListener('hashchange', onHashChange);
                window.removeEventListener('popstate', onHashChange);
            };
        }
    }, []);

    const searchParamsString = searchParams.length > 0 ? `?${searchParams}` : '';

    return pathname + searchParamsString + hash;
};
