import React from 'react';
import { Link as LinkComponent } from './Link';

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

const Template: any = (args: any) => <LinkComponent {...args} />;

export const Link = Template.bind({});
