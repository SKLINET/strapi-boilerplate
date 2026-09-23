import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ArticleDetail } from './ArticleDetail';
import { app, article } from '../../../../storybook/fixtures';

const meta: Meta<typeof ArticleDetail> = {
    title: 'Blocks/ArticleDetail',
    component: ArticleDetail,
    parameters: {
        layout: 'fullscreen',
        // ArticleDetail is an async server component.
        react: { rsc: true },
    },
    args: {
        blocksData: { id: 'block-1', __typename: 'ComponentBlockArticleDetailBlock' } as never,
        app,
        item: article as never,
    },
    argTypes: {
        blocksData: { control: false, table: { disable: true } },
        app: { control: false, table: { disable: true } },
        item: { control: false, table: { disable: true } },
        className: { control: false, table: { disable: true } },
    },
};

export default meta;

type Story = StoryObj<typeof ArticleDetail>;

// The block currently renders the raw article data via DataPreview.
export const Default: Story = {};
