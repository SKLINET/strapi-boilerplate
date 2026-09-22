import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Breadcrumbs } from './Breadcrumbs';
import { app } from '../../../../storybook/fixtures';

const meta: Meta<typeof Breadcrumbs> = {
    title: 'Molecules/Breadcrumbs',
    component: Breadcrumbs,
    parameters: {
        layout: 'padded',
    },
    args: {
        app,
    },
    argTypes: {
        app: { control: false, table: { disable: true } },
        className: { control: false, table: { disable: true } },
    },
};

export default meta;

type Story = StoryObj<typeof Breadcrumbs>;

export const Default: Story = {};

export const WithoutParent: Story = {
    args: {
        app: { ...app, page: { ...app.page, parent: null } } as typeof app,
    },
};

export const ArticleDetail: Story = {
    args: {
        app: {
            ...app,
            item: { __typename: 'Article', title: 'První článek', seo: null },
        } as unknown as typeof app,
    },
};
