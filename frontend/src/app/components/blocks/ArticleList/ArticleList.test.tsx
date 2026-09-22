import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

vi.mock('../../../actions/fetch-articles', () => ({
    fetchArticles: vi.fn(),
}));

import { ArticleList } from './ArticleList';
import { fetchArticles } from '../../../actions/fetch-articles';

const app = {
    locale: 'cs',
    preview: false,
    webSetting: { articlesPage: { url: 'blog' } },
    systemResources: [
        { codename: 'all', value: 'All' },
        { codename: 'load_more', value: 'Load more' },
        { codename: 'go_to_value', value: 'Go to {value}' },
        { codename: 'filter_by_value', value: 'Filter by {value}' },
    ],
} as any;

const article = {
    id: '1',
    title: 'First article',
    href: '/blog/first',
    category: { id: 'c1', title: 'News' },
    image: { id: 'img', url: '/x.jpg', width: 1, height: 1, alternativeText: '' },
    totalTime: 1,
    publishDate: '2026-01-01',
    content: null,
};

const blocksData = { id: '1', countOnPage: 1, anchor: null, __typename: 'ComponentBlockArticlesListBlock' };

describe('ArticleList', () => {
    beforeEach(() => {
        vi.mocked(fetchArticles).mockReset();
    });

    it('should render filters and article links', () => {
        render(
            <ArticleList
                blocksData={blocksData as any}
                app={app}
                data={{ articles: [article], categories: [{ id: 'c1', title: 'News' }], canLoadMore: false }}
                categoryId={null}
            />,
        );

        expect(screen.getByRole('link', { name: 'All' })).toHaveAttribute('href', '/blog');
        expect(screen.getByRole('link', { name: 'Filter by News' })).toHaveAttribute('href', '/blog?filter=c1');
        expect(screen.getByRole('link', { name: 'Go to First article' })).toHaveAttribute('href', '/blog/first');
        expect(screen.getByText('First article')).toBeInTheDocument();
        expect(screen.queryByRole('button', { name: 'Load more' })).not.toBeInTheDocument();
    });

    it('should render an empty list without article links', () => {
        render(
            <ArticleList
                blocksData={blocksData as any}
                app={app}
                data={{ articles: [], categories: [], canLoadMore: false }}
                categoryId={null}
            />,
        );

        expect(screen.getByRole('link', { name: 'All' })).toBeInTheDocument();
        expect(screen.queryByRole('link', { name: /Go to / })).not.toBeInTheDocument();
    });

    it('should load more articles when the button is clicked', async () => {
        const user = userEvent.setup();
        vi.mocked(fetchArticles).mockResolvedValue({
            articles: [article, { ...article, id: '2', title: 'Second article', href: '/blog/second' }],
            canLoadMore: false,
        });

        render(
            <ArticleList
                blocksData={blocksData as any}
                app={app}
                data={{ articles: [article], categories: [], canLoadMore: true }}
                categoryId={null}
            />,
        );

        await user.click(screen.getByRole('button', { name: 'Load more' }));

        await waitFor(() => {
            expect(screen.getByRole('link', { name: 'Go to Second article' })).toBeInTheDocument();
        });
        expect(fetchArticles).toHaveBeenCalled();
    });
});
