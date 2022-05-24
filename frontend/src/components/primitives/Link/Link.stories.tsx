import React from 'react';
import { Link as LinkComponent, LinkProps } from './Link';
import { Story } from '@storybook/react/types-6-0';

export default {
    component: LinkComponent,
    title: 'Primitives/Link',
    argTypes: {
        page: { table: { disable: true } },
        params: { table: { disable: true } },
        locale: { table: { disable: true } },
    },
    args: {
        href: '/',
        children: 'I am Link',
    },
};

const Template: Story<LinkProps> = (args) => <LinkComponent {...args} />;

export const Link = Template.bind({});
