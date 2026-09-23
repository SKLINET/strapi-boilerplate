import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('react-scroll-parallax', () => ({
    Parallax: ({ children }: { children?: React.ReactNode }) => <div>{children}</div>,
}));

vi.mock('next/dynamic', () => ({
    default: () =>
        function MockParallax({ children }: { children?: React.ReactNode }) {
            return <div>{children}</div>;
        },
}));

import { Parallax } from './Parallax';

describe('Parallax', () => {
    it('should render children through the parallax wrapper', () => {
        render(
            <Parallax speed={-10}>
                <p>Parallax content</p>
            </Parallax>,
        );

        expect(screen.getByText('Parallax content')).toBeInTheDocument();
    });
});
