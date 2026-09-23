import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Breadcrumbs } from './Breadcrumbs';

describe('Breadcrumbs', () => {
    it('should render parent links and the current page title', () => {
        render(
            <Breadcrumbs
                app={
                    {
                        locale: 'cs',
                        item: null,
                        page: {
                            title: 'Current',
                            parent: { title: 'Parent', url: 'parent', parent: null, seo: null },
                        },
                        webSetting: {},
                    } as any
                }
            />,
        );

        expect(screen.getByRole('link', { name: 'Parent' })).toHaveAttribute('href', '/parent');
        expect(screen.getByText('Current')).toBeInTheDocument();
    });

    it('should render the article title when the current item is an article', () => {
        render(
            <Breadcrumbs
                app={
                    {
                        locale: 'cs',
                        item: { __typename: 'Article', title: 'Article title', seo: null },
                        page: { title: 'Blog', parent: null },
                        webSetting: {},
                    } as any
                }
            />,
        );

        expect(screen.getByText('Article title')).toBeInTheDocument();
    });
});
