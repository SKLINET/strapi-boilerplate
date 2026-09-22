import { describe, expect, it } from 'vitest';
import { getArticleType, getArticleListType } from './index';

const image = {
    documentId: 'i1',
    url: 'https://cdn.example/a.jpg',
    alternativeText: '',
    width: 1,
    height: 1,
};

const article = {
    documentId: 'a1',
    title: 'Hello',
    category: { documentId: 'c1', title: 'News' },
    image,
    content: 'word',
    publishDate: '2024-01-01',
    slug: 'hello',
};

const app = {
    locale: 'cs',
    webSetting: { articleDetailPage: { url: 'articles/:slug' } },
} as any;

describe('getArticleType', () => {
    it('should return null for missing article, image, href or publishDate', () => {
        expect(getArticleType(null, app)).toBeNull();
        expect(getArticleType({ ...article, image: null }, app)).toBeNull();
        expect(getArticleType({ ...article, publishDate: null }, app)).toBeNull();
        expect(getArticleType(article as any, { locale: 'cs', webSetting: null } as any)).toBeNull();
    });

    it('should map article fields', () => {
        expect(getArticleType(article as any, app)).toMatchObject({
            id: 'a1',
            title: 'Hello',
            href: '/articles/hello',
            category: { id: 'c1', title: 'News' },
            image: { id: 'i1', url: 'https://cdn.example/a.jpg' },
            publishDate: '2024-01-01',
            content: 'word',
            totalTime: 1,
        });
    });
});

describe('getArticleListType', () => {
    it('should skip invalid entries', () => {
        expect(getArticleListType([null, article] as any, app)).toHaveLength(1);
    });
});
