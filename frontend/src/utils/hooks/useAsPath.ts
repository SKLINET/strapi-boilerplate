import { usePathname, useSearchParams } from 'next/navigation';

export const useAsPath = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams().toString();
    const hash = typeof window !== 'undefined' ? window.location.hash : '';

    const searchParamsString = searchParams.length > 0 ? `?${searchParams}` : '';

    return pathname + searchParamsString + hash;
};
