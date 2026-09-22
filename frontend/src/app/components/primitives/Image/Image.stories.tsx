import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Image } from './Image';
import { image } from '../../../../storybook/fixtures';

const meta: Meta<typeof Image> = {
    title: 'Primitives/Image',
    component: Image,
    parameters: {
        layout: 'padded',
    },
    argTypes: {
        placeholder: {
            control: { type: 'radio' },
            options: ['empty', 'blur'],
        },
        loading: {
            control: { type: 'radio' },
            options: ['lazy', 'eager'],
        },
        quality: { control: { type: 'range', min: 1, max: 100, step: 1 } },
        className: { control: false, table: { disable: true } },
        style: { control: false, table: { disable: true } },
    },
};

export default meta;

type Story = StoryObj<typeof Image>;

export const FromSrc: Story = {
    args: {
        src: image.url,
        alt: image.alternativeText,
        width: 800,
        height: 533,
        sizes: '(max-width: 48rem) 100vw, 50vw',
    },
};

export const FromStrapiImage: Story = {
    args: {
        image,
        alt: image.alternativeText,
        sizes: '(max-width: 48rem) 100vw, 50vw',
    },
};

export const Fill: Story = {
    args: {
        src: image.url,
        alt: image.alternativeText,
        fill: true,
        sizes: '100vw',
    },
    render: ({ alt, ...args }) => (
        <div style={{ position: 'relative', width: '100%', height: '20rem' }}>
            <Image {...args} alt={alt ?? ''} />
        </div>
    ),
};
