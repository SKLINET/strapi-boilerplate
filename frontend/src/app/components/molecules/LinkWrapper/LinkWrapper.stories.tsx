import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { LinkWrapper } from './LinkWrapper';
import { Heading } from '../../primitives/Heading/Heading';
import { Text } from '../../primitives/Text/Text';

const meta: Meta<typeof LinkWrapper> = {
    title: 'Molecules/LinkWrapper',
    component: LinkWrapper,
    parameters: {
        layout: 'padded',
    },
    args: {
        href: '/blog/prvni-clanek',
        alt: 'První článek',
        openInNewTab: false,
    },
    argTypes: {
        href: { control: 'text' },
        alt: { control: 'text' },
        children: { control: false, table: { disable: true } },
        className: { control: false, table: { disable: true } },
        linkClassName: { control: false, table: { disable: true } },
        contentClassName: { control: false, table: { disable: true } },
    },
    // The whole block is clickable; the content sits above the stretched link.
    render: (args) => (
        <LinkWrapper {...args}>
            <Heading tag="h3">První článek</Heading>
            <Text>Celá tato karta je klikatelná díky roztaženému odkazu pod obsahem.</Text>
        </LinkWrapper>
    ),
};

export default meta;

type Story = StoryObj<typeof LinkWrapper>;

export const Default: Story = {};
