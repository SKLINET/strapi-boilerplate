import { NavigateOptions } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import NProgress from 'nprogress';

export const usePush = () => {
    const router = useRouter();

    const { push } = router;

    const _push = (href: string, options?: NavigateOptions) => {
        NProgress.start();
        push(href, options);
    };

    return _push;
};
