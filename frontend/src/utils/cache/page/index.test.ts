import { beforeEach, describe, expect, it, vi } from 'vitest';

const cacheTag = vi.fn();

vi.mock('../tag', () => ({
    cacheTag: (...args: unknown[]) => cacheTag(...args),
}));

import { isSystemPageSlug, tagBlocks, tagNotFoundPage, tagPage } from './index';

beforeEach(() => {
    cacheTag.mockClear();
});

describe('tagPage', () => {
    it('should always tag the redirect table and the system resources', () => {
        tagPage({ locale: 'cs' });

        expect(cacheTag).toHaveBeenCalledWith('redirect');
        expect(cacheTag).toHaveBeenCalledWith('system-resource', { locale: 'cs' });
    });

    it('should tag the web setting, its page and menu relations', () => {
        tagPage({
            locale: 'cs',
            webSetting: {
                documentId: 'ws1',
                homePage: { documentId: 'home' },
                articlesPage: { documentId: 'blog' },
                articleDetailPage: { documentId: 'detail' },
                mainMenu: { documentId: 'menu1' },
            },
        });

        expect(cacheTag).toHaveBeenCalledWith('web-setting', { id: 'ws1', locale: 'cs' });
        expect(cacheTag).toHaveBeenCalledWith('web-setting', { locale: 'cs' });
        expect(cacheTag).toHaveBeenCalledWith('page', { id: 'home', locale: 'cs' });
        expect(cacheTag).toHaveBeenCalledWith('page', { id: 'blog', locale: 'cs' });
        expect(cacheTag).toHaveBeenCalledWith('page', { id: 'detail', locale: 'cs' });
        expect(cacheTag).toHaveBeenCalledWith('menu', { id: 'menu1', locale: 'cs' });
    });

    it('should skip an unresolved relation instead of tagging undefined', () => {
        tagPage({ locale: 'cs', webSetting: { documentId: 'ws1', mainMenu: null } });

        expect(cacheTag).not.toHaveBeenCalledWith('menu', expect.anything());
    });

    it('should tag the page record and the detail item', () => {
        tagPage({
            locale: 'cs',
            page: { documentId: 'p1', url: 'clanky/:slug' },
            item: { __typename: 'Article', documentId: 'a1' },
        });

        expect(cacheTag).toHaveBeenCalledWith('page', { id: 'p1', locale: 'cs' });
        expect(cacheTag).toHaveBeenCalledWith('article', { id: 'a1', locale: 'cs' });
    });

    it('should not write a collective listing tag, so one article publish keeps the page shell', () => {
        tagPage({
            locale: 'cs',
            page: { documentId: 'p1' },
            item: { __typename: 'Article', documentId: 'a1' },
        });

        expect(cacheTag).not.toHaveBeenCalledWith('article', { locale: 'cs' });
    });

    it('should ignore an item typename without its own detail route', () => {
        tagPage({ locale: 'cs', item: { __typename: 'Menu', documentId: 'm1' } });

        expect(cacheTag).not.toHaveBeenCalledWith('menu', { id: 'm1', locale: 'cs' });
    });

    it('should tag records found in the page content and the block props', () => {
        tagPage({
            locale: 'cs',
            page: {
                documentId: 'p1',
                content: [
                    {
                        __typename: 'ComponentBlockFormBlock',
                        form: { __typename: 'FormBuilderBuiltForm', documentId: 'f1' },
                    },
                ],
            },
            blocksPropsMap: {
                block1: { data: [{ __typename: 'Article', documentId: 'a2' }] },
            },
        });

        expect(cacheTag).toHaveBeenCalledWith('built-form', { id: 'f1', locale: 'cs' });
        expect(cacheTag).toHaveBeenCalledWith('article', { id: 'a2', locale: 'cs' });
    });
});

describe('tagBlocks', () => {
    it('should walk nested structures and tag every known record', () => {
        tagBlocks(
            {
                template: {
                    __typename: 'Template',
                    documentId: 't1',
                    content: [{ __typename: 'ArticleCategory', documentId: 'c1' }],
                },
            },
            'cs',
        );

        expect(cacheTag).toHaveBeenCalledWith('template', { id: 't1', locale: 'cs' });
        expect(cacheTag).toHaveBeenCalledWith('article-category', { id: 'c1', locale: 'cs' });
    });

    it('should omit the locale for a global type', () => {
        tagBlocks({ __typename: 'Icon', documentId: 'i1' }, 'cs');

        expect(cacheTag).toHaveBeenCalledWith('icon', { id: 'i1' });
    });

    it('should skip a typename that is not a known cache type', () => {
        tagBlocks({ __typename: 'ComponentSharedSeo', documentId: 's1' }, 'cs');

        expect(cacheTag).not.toHaveBeenCalled();
    });

    it('should skip a record without a documentId', () => {
        tagBlocks({ __typename: 'Article' }, 'cs');

        expect(cacheTag).not.toHaveBeenCalled();
    });

    it('should survive a cyclic payload', () => {
        const node: Record<string, unknown> = { __typename: 'Article', documentId: 'a1' };
        node.self = node;

        expect(() => tagBlocks(node, 'cs')).not.toThrow();
        expect(cacheTag).toHaveBeenCalledExactlyOnceWith('article', { id: 'a1', locale: 'cs' });
    });
});

describe('tagNotFoundPage', () => {
    it('should write only the bare page tag, so any page publish can make the URL valid again', () => {
        tagNotFoundPage('cs');

        expect(cacheTag).toHaveBeenCalledExactlyOnceWith('page', { locale: 'cs' });
    });
});

describe('isSystemPageSlug', () => {
    it.each([{ slug: ['404'] }, { slug: ['500'] }, { slug: ['cs', '404'] }])(
        'should detect $slug as a system page',
        ({ slug }) => {
            expect(isSystemPageSlug(slug)).toBe(true);
        },
    );

    it.each([{ slug: [] }, { slug: ['clanky'] }, { slug: ['clanky', '404'] }])(
        'should not treat $slug as a system page',
        ({ slug }) => {
            expect(isSystemPageSlug(slug)).toBe(false);
        },
    );
});
