import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PreviewToolbar } from './PreviewToolbar';

describe('PreviewToolbar', () => {
    it('should render preview links and the page title', () => {
        vi.stubEnv('NEXT_PUBLIC_API_BASE_PATH', 'https://cms.example.com');

        render(
            <PreviewToolbar
                app={
                    {
                        locale: 'cs',
                        item: null,
                        page: {
                            title: 'Home',
                            documentId: 'page-1',
                            url: 'homepage',
                            publishedAt: '2026-01-01',
                        },
                    } as any
                }
            />,
        );

        expect(screen.getByRole('link', { name: 'Go to Strapi admin' })).toHaveAttribute(
            'href',
            'https://cms.example.com/admin',
        );
        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'Edit in Strapi' })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'Exit preview' })).toHaveAttribute('href', '/api/exit-preview');
    });
});
