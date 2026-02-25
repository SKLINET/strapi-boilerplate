'use client';

import { ReactElement, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Loader from 'nextjs-toploader';
import NProgress from 'nprogress';

const TopLoader = (): ReactElement => {
    const pathname = usePathname();

    const searchParams = useSearchParams();

    const router = useRouter();

    useEffect(() => {
        NProgress.done();
    }, [pathname, searchParams, router]);

    return <Loader color="#ff0000" showSpinner={false} />;
};

export { TopLoader };
