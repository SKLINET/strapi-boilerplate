import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export const useCurrentUrl = (): string | null => {
    const pathname = usePathname();

    const [url, setUrl] = useState<string | null>(null);

    useEffect(() => {
        const _url = new URL((process.env.NEXT_PUBLIC_BASE_PATH || '') + pathname);

        setUrl(_url.toString());
    }, [pathname]);

    return url;
};
