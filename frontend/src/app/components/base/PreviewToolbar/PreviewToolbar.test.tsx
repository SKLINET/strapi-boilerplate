import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createElement, type ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import { PreviewToolbar } from './PreviewToolbar';

// Mark client-side router links so a test can tell them from plain anchors.
vi.mock('next/link', () => ({
    default: ({ href, children, ...rest }: { href: string; children?: ReactNode }) =>
        createElement('a', { href, 'data-client-navigation': '', ...rest }, children),
}));

describe('PreviewToolbar', () => {
    beforeEach(() => {
        vi.stubEnv('NEXT_PUBLIC_API_BASE_PATH', 'https://cms.example.com');
    });

    it('should link the previewed page to its Strapi edit view', () => {
        render(
            <PreviewToolbar
                app={
                    {
                        locale: 'cs',
                        item: null,
                        page: { documentId: 'page-1', title: 'Home', url: 'homepage', publishedAt: '2026-01-01' },
                    } as any
                }
            />,
        );

        expect(screen.getByRole('link', { name: 'Go to Strapi admin' })).toHaveAttribute(
            'href',
            'https://cms.example.com/admin',
        );
        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('Publikováno')).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'Edit in Strapi' })).toHaveAttribute(
            'href',
            'https://cms.example.com/admin/content-manager/collection-types/api::page.page/page-1?plugins[i18n][locale]=cs',
        );
        expect(screen.getByRole('link', { name: 'Exit preview' })).toHaveAttribute('href', '/api/exit-preview');
    });

    it('should leave preview with a full page load, so the published version replaces the draft', () => {
        render(<PreviewToolbar app={{ locale: 'cs', item: null, page: null } as any} />);

        // A client-side navigation redraws the page from the router cache, still showing the draft.
        expect(screen.getByRole('link', { name: 'Exit preview' })).not.toHaveAttribute('data-client-navigation');
    });

    it('should link an article detail to the article instead of the page', () => {
        render(
            <PreviewToolbar
                app={
                    {
                        locale: 'cs',
                        item: { __typename: 'Article', documentId: 'article-4', title: 'Článek', publishedAt: null },
                        page: { documentId: 'page-7', title: 'Detail', url: 'clanky/:slug', publishedAt: '2026-01-01' },
                    } as any
                }
            />,
        );

        expect(screen.getByText('Článek')).toBeInTheDocument();
        // The status of the edited document, not the page around it.
        expect(screen.getByText('Koncept')).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'Edit in Strapi' })).toHaveAttribute(
            'href',
            'https://cms.example.com/admin/content-manager/collection-types/api::article.article/article-4?plugins[i18n][locale]=cs',
        );
    });

    it('should fall back to the admin home for an item type it cannot edit', () => {
        render(
            <PreviewToolbar
                app={
                    {
                        locale: 'cs',
                        item: { __typename: 'Unknown', documentId: 'x', title: 'Neznámý', publishedAt: null },
                        page: null,
                    } as any
                }
            />,
        );

        expect(screen.getByRole('link', { name: 'Edit in Strapi' })).toHaveAttribute(
            'href',
            'https://cms.example.com/admin',
        );
    });
});
