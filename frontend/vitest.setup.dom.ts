import { createElement, type ReactNode } from 'react';
import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

afterEach(() => {
    cleanup();
});

vi.mock('next/image', () => ({
    default: (props: { src?: string; alt?: string }) => {
        const { src, alt, ...rest } = props;
        return createElement('img', { src: typeof src === 'string' ? src : '', alt: alt ?? '', ...rest });
    },
}));

vi.mock('next/link', () => ({
    default: ({ href, children, ...rest }: { href: string; children?: ReactNode }) =>
        createElement('a', { href: typeof href === 'string' ? href : '', ...rest }, children),
}));

vi.mock('next/navigation', () => ({
    useRouter: vi.fn(() => ({
        push: vi.fn(),
        replace: vi.fn(),
        prefetch: vi.fn(),
        back: vi.fn(),
    })),
    usePathname: vi.fn(() => '/'),
    useSearchParams: vi.fn(() => new URLSearchParams()),
}));

vi.mock('./src/app/components/primitives/Icon/Icon', () => ({
    Icon: ({ name, onClick }: { name: string; onClick?: () => void }) =>
        name === '' ? null : createElement('span', { onClick }, createElement('svg', { 'data-testid': 'svg-stub' })),
    getIconName: (name: string) => (name === '' ? '' : name),
}));
