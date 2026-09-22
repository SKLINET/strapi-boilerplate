import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ParallaxProvider } from 'react-scroll-parallax';
import { Parallax } from './Parallax';
import { Heading } from '../../primitives/Heading/Heading';
import { Text } from '../../primitives/Text/Text';

const meta: Meta<typeof Parallax> = {
    title: 'Molecules/Parallax',
    component: Parallax,
    parameters: {
        layout: 'fullscreen',
    },
    args: {
        speed: -20,
    },
    argTypes: {
        speed: { control: { type: 'range', min: -50, max: 50, step: 5 } },
        children: { control: false, table: { disable: true } },
        className: { control: false, table: { disable: true } },
    },
    // Parallax needs the provider the app mounts in `providers.tsx`, plus
    // enough page height for the scroll effect to be visible.
    decorators: [
        (Story) => (
            <ParallaxProvider>
                <div style={{ padding: '4rem 2rem' }}>
                    <Text>Skrolujte dole ↓</Text>
                    <div style={{ height: '60vh' }} />
                    <Story />
                    <div style={{ height: '80vh' }} />
                </div>
            </ParallaxProvider>
        ),
    ],
};

export default meta;

type Story = StoryObj<typeof Parallax>;

export const Default: Story = {
    render: (args) => (
        <Parallax {...args}>
            <Heading tag="h2">Obsah s parallaxom</Heading>
        </Parallax>
    ),
};
