import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('../../organisms/Navbar/Navbar', () => ({
    Navbar: () => <div>navbar</div>,
}));

vi.mock('../../organisms/Footer/Footer', () => ({
    Footer: () => <div>footer</div>,
}));

import { Layout } from './Layout';

describe('Layout', () => {
    it('should wrap children in main and render navbar and footer', () => {
        render(
            <Layout app={{ locale: 'cs' } as any}>
                <p>Page content</p>
            </Layout>,
        );

        expect(screen.getByText('navbar')).toBeInTheDocument();
        expect(screen.getByRole('main')).toHaveTextContent('Page content');
        expect(screen.getByText('footer')).toBeInTheDocument();
    });
});
