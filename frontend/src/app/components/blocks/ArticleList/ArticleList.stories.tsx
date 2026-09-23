import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ArticleList } from './ArticleList';
import { app, article, articleCategories, image } from '../../../../storybook/fixtures';

const articles = [
    article,
    {
        ...article,
        id: 'a-2',
        title: 'Jak vybrat skleněné zábradlí',
        href: '/blog/sklenene-zabradlie',
        category: articleCategories[1],
        publishDate: '2026-02-04',
        totalTime: 5,
    },
    {
        ...article,
        id: 'a-3',
        title: 'Realizace: celoskleněná fasáda v Praze',
        href: '/blog/celosklenena-fasada',
        category: articleCategories[1],
        publishDate: '2026-03-12',
        totalTime: 7,
        image: { ...image, id: 'img-3' },
    },
];

const meta: Meta<typeof ArticleList> = {
    title: 'Blocks/ArticleList',
    component: ArticleList,
    parameters: {
        layout: 'fullscreen',
    },
    args: {
        blocksData: {
            id: 'block-1',
            countOnPage: 3,
            anchor: null,
            __typename: 'ComponentBlockArticlesListBlock',
        } as never,
        app,
        categoryId: null,
        data: {
            articles,
            categories: articleCategories,
            canLoadMore: true,
        },
    },
    argTypes: {
        blocksData: { control: false, table: { disable: true } },
        app: { control: false, table: { disable: true } },
        data: { control: false, table: { disable: true } },
        className: { control: false, table: { disable: true } },
    },
};

export default meta;

type Story = StoryObj<typeof ArticleList>;

// "Load more" calls a server action that is not available in Storybook.
export const Default: Story = {};

export const FilteredByCategory: Story = {
    args: {
        categoryId: 'c-2',
        data: {
            articles: articles.filter((e) => e.category?.id === 'c-2'),
            categories: articleCategories,
            canLoadMore: false,
        },
    },
};

export const SinglePage: Story = {
    args: {
        data: {
            articles,
            categories: articleCategories,
            canLoadMore: false,
        },
    },
};

export const EmptyList: Story = {
    args: {
        data: {
            articles: [],
            categories: articleCategories,
            canLoadMore: false,
        },
    },
};
