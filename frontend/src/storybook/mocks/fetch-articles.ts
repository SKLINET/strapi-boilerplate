import { IArticle } from '../../types/article';

/**
 * Browser-safe stand-in for the `fetch-articles` server action.
 *
 * The real module is marked `'use server'` and pulls in the Strapi and Elastic
 * providers, which cannot run in the browser. `.storybook/main.ts` aliases the
 * action to this file so client components that call it (ArticleList) still
 * render — "load more" simply returns nothing.
 */
export const fetchArticles = async (): Promise<{ articles: IArticle[]; canLoadMore: boolean }> => ({
    articles: [],
    canLoadMore: false,
});
