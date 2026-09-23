import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ArticleDetail } from './ArticleDetail';

describe('ArticleDetail', () => {
    it('should render the article title from the fixture item', async () => {
        const el = await ArticleDetail({
            blocksData: { id: '1', __typename: 'ComponentBlockArticleDetailBlock' } as any,
            app: { locale: 'cs' } as any,
            item: { title: 'My Article' } as any,
        });
        render(el);

        expect(screen.getByRole('heading', { level: 2, name: 'My Article' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Zobrazit vše' })).toBeInTheDocument();
    });
});
